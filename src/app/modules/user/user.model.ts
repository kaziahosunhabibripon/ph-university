import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
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
      enum: {
        values: ['in-progress', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
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
export const User = model<TUser>('User', userSchema);
