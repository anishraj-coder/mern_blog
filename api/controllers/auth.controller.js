import User from '../models/user.model.js';
import Session from '../models/session.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import crypto from 'crypto';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Generate random secure token for the session
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiration

    const newSession = new Session({
      userId: validUser._id,
      sessionToken,
      expiresAt,
    });
    await newSession.save();

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', sessionToken, {
        httpOnly: true,
        expires: expiresAt,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
