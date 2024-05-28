import { ObjectId, Types } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.Interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // user object
  const userData: Partial<TUser> = {};
  // error handling

  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';

  const admissionSemester: any = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  userData.id = await generateStudentId(admissionSemester);
  // create user

  const newUser = await User.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // references id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserService = {
  createStudentIntoDB,
};
