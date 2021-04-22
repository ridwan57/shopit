import express from 'express';

import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
module.exports = router;
