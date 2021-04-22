import catchAsyncErrors from './catchAsyncErrors';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler';
import User from '../models/User';

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log('token:', token);

  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('decoded:', decoded);
  req.user = await User.findById(decoded.id);
  console.log('user:', req.user);

  next();
});

// Handling users roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
