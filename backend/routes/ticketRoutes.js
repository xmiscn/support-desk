const express = require('express');
const router = express.Router();

const { protectRoute } = require('../middleware/authMiddleware');
const {
  getTicket,
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

router
  .route('/')
  .get(protectRoute, getTickets)
  .post(protectRoute, createTicket);

router
  .route('/:id')
  .get(protectRoute, getTicket)
  .delete(protectRoute, deleteTicket)
  .put(protectRoute, updateTicket);

module.exports = router;
