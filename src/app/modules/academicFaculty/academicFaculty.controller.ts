import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';
import cathAsync from '../../utils/catchAsync';

const createAcademicFaculty = cathAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = cathAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculties fetched successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = cathAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is fetched successfully',
    data: result,
  });
});

const updateAcademicFaculty = cathAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
  getSingleAcademicFaculty,
};
