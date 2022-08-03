const express = require('express');
const router = express.Router();

const { protectRoute } = require('../middleware/authMiddleware');

// Needed because format of Notes URL will look like
// /api/ticket/:ticketId/notes
// Re-Route into Notes Router
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

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
