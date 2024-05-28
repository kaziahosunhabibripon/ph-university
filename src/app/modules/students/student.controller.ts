import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import cathAsync from '../../utils/catchAsync';

const getAllStudents = cathAsync(async (_req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students fetched successfully',
    data: result,
  });
});
const getSingleStudent = cathAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Student data is fetched successfully',
    data: result,
  });
});

const deleteOneStudent = cathAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteOneStudent,
};