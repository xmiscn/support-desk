const express = require('express');
const router = express.Router({ mergeParams: true });

const { protectRoute } = require('../middleware/authMiddleware');
const { getNotes, addNote } = require('../controllers/noteController');

router.route('/').get(protectRoute, getNotes).post(protectRoute, addNote);

module.exports = router;
