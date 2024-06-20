// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicDepartment } from './../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.Interface';
import { Student } from '../students/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { USER_ROLE } from './user.constants';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // user object
  const userData: Partial<IUser> = {};
  // error handling

  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';
  userData.email = payload.email;
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    // send image cloudinary
    const path = file?.path;
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    // create user

    const newUser = await User.create([userData], { session });

    // create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // references id
    payload.profilePic = secure_url;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'faculty';
  userData.email = payload.email;
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId();
    // send image cloudinary
    const path = file?.path;
    const imageName = `${userData.id}${payload?.name?.firstName}`;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profilePic = secure_url;
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};
const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'admin';
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const path = file?.path;
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profilePic = secure_url;
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === USER_ROLE.student) {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
