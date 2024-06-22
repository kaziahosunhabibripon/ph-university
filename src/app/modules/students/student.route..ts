import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
const router = express.Router();

router.get('/', auth(USER_ROLE.superAdmin), StudentControllers.getAllStudents);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.superAdmin),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  StudentControllers.deleteStudent,
);
export const StudentRoutes = router;
