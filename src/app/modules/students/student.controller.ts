import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import cathAsync from '../../utils/catchAsync';

const getAllStudents = cathAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
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
const updateStudent = cathAsync(async(req,res)=>{
  const {studentId} = req.params;
  const { student} = req.body;
  const result = await StudentServices.updatedStudentFromDB(studentId, student);
  sendResponse(res,{
    success: true,
    statusCode: httpStatus.OK,
    message: "Student updated successfully",
    data: result
  })
})
const deleteStudent = cathAsync(async (req, res) => {
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
  deleteStudent,
  updateStudent
};
