import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { USER_STATUS } from './user.constants';
const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      // select: false,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },

    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'faculty', 'student'],
        message: '{VALUE} is not a valid role',
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: USER_STATUS,
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);
// pre save middleware bcrypt the password before saving it to the database

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

// post save middleware set empty string after saving password

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimeStamp;
};
export const User = model<IUser, UserModel>('User', userSchema);
