import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  motherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  email: string;
  avatar?: string;
  bloodGroup: 'A+' | 'B+' | 'O+' | 'AB+' | 'A-' | 'B-' | 'O-' | 'AB-';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profilePic?: string;
  presentAddress: string;
  permanentAddress: string;
  isDeleted: boolean;
};

// for static methods

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
