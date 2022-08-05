const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
// Allows to use async/await in the controller
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// @desc  - Register a new user
// @route - POST /api/users
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
  //destructure the req.body for some validation
  const { name, email, password } = req.body;
  console.log('Starting to register user');
  //validate the req.body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }
  //Check if user already exists:
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('User could not be created');
  }
});

// @desc - Login a user
// @route - POST /api/users/login
// @access - Public
const loginUser = asyncHandler(async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;
  // Find the user by email
  const user = await User.findOne({ email });

  // if the user exists and the hashed password matches the password in the database
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc - Get current user
// @route - GET /api/users/me
// @access - Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// Generate the JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
