import httpStatus from 'http-status';
import cathAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = cathAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Offered Course Created Successfully',
    data: result,
  });
});
const getAllOfferedCourse = cathAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Offered Course Created Successfully',
    data: req.body,
  });
});
const getSingleOfferedCourse = cathAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Offered Course Created Successfully',
    data: req.body,
  });
});
const updateOfferedCourse = cathAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
      id,
      req.body,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Offered Course updated Successfully',
      data: result,
    });
});
const deleteOfferedCourse = cathAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Offered Course Created Successfully',
    data: req.body,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
