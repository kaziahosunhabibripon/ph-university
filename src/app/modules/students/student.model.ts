import { Schema, model } from 'mongoose';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from './student.Interface';

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [25, 'First Name must be less than 25 characters'],
    trim: true,
  },
  middleName: {
    type: String,
    maxlength: [25, 'First Name must be less than 25 characters'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    maxlength: [25, 'First Name must be less than 25 characters'],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    maxlength: [25, 'First Name must be less than 25 characters'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    maxlength: [25, 'First Name must be less than 25 characters'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation  is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian name is required'] },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian contactNo is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian  address is required'],
  },
});
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required'],
      unique: true,
    },
    name: {
      type: userSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender Type is required'],
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender."',
      },
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'contactNo is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency ContactNo is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'],
        message:
          "Blood Group field must be either 'A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-' or 'AB-'.",
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian is required'],
    },
    profilePic: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

// Query middleware
studentSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
