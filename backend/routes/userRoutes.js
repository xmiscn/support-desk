const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  getMe,
} = require('../controllers/userController');

const { protectRoute } = require('../middleware/authMiddleware');

// Instead of defining as second argument the function like:
// router.get('/', (req, res) => {res.send('Register Route)}
// use the function from userController.js

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute, getMe);

module.exports = router;
