export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'faculty' | 'student';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
};
