import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import User from '../models/User';
import crypto from 'crypto';
import ErrorHandler from '../utils/errorHandler';
import { sendToken } from '../utils/jwtToken';
import { SendEmail } from '../utils/SendEmail';

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const creatingUser = {
    name,
    email,
    password,
    avatar: {
      public_id: '12345',
      url:
        'https://res.cloudinary.com/dhhstdwuq/image/upload/v1615340422/t5u7zscroqss5wdzcquy.jpg',
    },
  };
  const user = await new User(creatingUser).save();
  sendToken(user, 200, res);
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please provide email passwords', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email password', 401));
  }
  //checks

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email password', 401));
  }
  sendToken(user, 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.send({ message: 'Already loggedOut' });
  }
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.send({ message: 'LoggedOut' });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('Use no with his email', 405));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/password/reset/${resetToken}`;

  const message = `Your password rest token is as follow  \n \n ${resetUrl} 
  \n\n`;

  try {
    await SendEmail({
      email: user.email,
      subject: 'SHOPI password recovery',
      message,
    });
    res.send({ success: true });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler('Reset failed', 501));
  }
});

//resetpassowrd

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  console.log('reset', req.params.token);
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler('Password toke is invalide or expiresd', 405));
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new ErrorHandler('Password doest not match', 400));
  }
  //setup new password

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res);
});
