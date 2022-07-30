// Allows to use async/await in the controller
const asyncHandler = require('express-async-handler');

// @desc  - Register a new user
// @route - POST /api/users
// @access - Public
const registerUser = asyncHandler(async (req, res) => {
  //destructure the req.body for some validation
  const { name, email, password } = req.body;

  //validate the req.body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }
  res.send('Register Route');
});

// @desc - Login a user
// @route - POST /api/users/login
// @access -
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route');
});

module.exports = {
  registerUser,
  loginUser,
};
