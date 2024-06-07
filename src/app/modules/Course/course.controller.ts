import httpStatus from 'http-status';
import cathAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = cathAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is created successfully',
    data: result,
  });
});
const getAllCourses = cathAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});
const getSingleCourse = cathAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is update successfully',
    data: result,
  });
});
const deleteCourse = cathAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course is deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
