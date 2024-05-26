import config from '../../config';
import { TStudent } from '../students/student.Interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // user object
  const userData: Partial<TUser> = {};
  // error handling

  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = 'student';

  // set manually id generated id
  userData.id = '2030100001';
  // create user

  const newUser = await User.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // references id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};
export const UserService = {
  createStudentIntoDB,
};
