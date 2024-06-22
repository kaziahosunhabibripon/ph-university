import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  OfferedCourseController.getAllOfferedCourse,
);
router.get(
  '/my-offered-courses',
  auth(USER_ROLE.student),
  OfferedCourseController.getMyOfferedCourse,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  OfferedCourseController.getSingleOfferedCourse,
);

router.post(
  '/create-offered-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  OfferedCourseController.deleteOfferedCourse,
);
export const OfferedCourseRoutes = router;
