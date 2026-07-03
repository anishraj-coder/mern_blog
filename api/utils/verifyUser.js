import { errorHandler } from './error.js';
import Session from '../models/session.model.js';
import User from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  try {
    const session = await Session.findOne({ sessionToken: token });
    if (!session) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ sessionToken: token });
      return next(errorHandler(401, 'Session expired. Please sign in again.'));
    }
    const user = await User.findById(session.userId);
    if (!user) {
      return next(errorHandler(401, 'User not found'));
    }
    req.user = { id: user._id.toString(), isAdmin: user.isAdmin };
    next();
  } catch (error) {
    next(error);
  }
};
