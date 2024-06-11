import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Logged in Successfully !',
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Password Changed Successfully !',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Access token is retrieved Successfully !',
    data: result,
  });
});
export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
