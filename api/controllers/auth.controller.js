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
    username.trim() === '' ||
    email.trim() === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const cleanUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();

  // Robust email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    console.log(`[AUDIT] [${new Date().toISOString()}] Signup failed: Invalid email format (Email: ${normalizedEmail})`);
    return next(errorHandler(400, 'Invalid email format'));
  }

  // Password length restriction
  if (password.length < 6) {
    console.log(`[AUDIT] [${new Date().toISOString()}] Signup failed: Password too short (Username: ${cleanUsername})`);
    return next(errorHandler(400, 'Password must be at least 6 characters long'));
  }

  try {
    // Explicit duplicate check for better user-facing errors
    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: cleanUsername }
      ]
    });

    if (existingUser) {
      const duplicateField = existingUser.email === normalizedEmail ? 'Email' : 'Username';
      console.log(`[AUDIT] [${new Date().toISOString()}] Signup failed: Duplicate ${duplicateField.toLowerCase()} (Username: ${cleanUsername}, Email: ${normalizedEmail})`);
      return next(errorHandler(400, `${duplicateField} already exists`));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username: cleanUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(`[AUDIT] [${new Date().toISOString()}] User signed up successfully (Username: ${cleanUsername}, Email: ${normalizedEmail})`);
    res.json('Signup successful');
  } catch (error) {
    console.error(`[AUDIT] [${new Date().toISOString()}] Signup runtime error:`, error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const validUser = await User.findOne({ email: normalizedEmail });
    if (!validUser) {
      console.log(`[AUDIT] [${new Date().toISOString()}] Signin failed: User not found (Email: ${normalizedEmail})`);
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      console.log(`[AUDIT] [${new Date().toISOString()}] Signin failed: Invalid password (User ID: ${validUser._id})`);
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

    console.log(`[AUDIT] [${new Date().toISOString()}] User signed in successfully (User ID: ${validUser._id}, Email: ${normalizedEmail})`);

    res
      .status(200)
      .cookie('access_token', sessionToken, {
        httpOnly: true,
        expires: expiresAt,
      })
      .json(rest);
  } catch (error) {
    console.error(`[AUDIT] [${new Date().toISOString()}] Signin runtime error (Email: ${normalizedEmail}):`, error);
    next(error);
  }
};
