import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Enrolled Course is created successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
};
