const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');

// Instead of defining as second argument the function like:
// router.get('/', (req, res) => {res.send('Register Route)}
// use the function from userController.js

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
