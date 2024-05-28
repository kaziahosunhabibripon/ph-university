import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemester,
);

router.get('/', academicSemesterController.getAllAcademicSemesters);
export const AcademicSemesterRoutes = router;
