const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @desc - Get all tickets of a user
// @route - GET /api/tickets
// @access - Private

const getTickets = asyncHandler(async (req, res) => {
  // Get the user from the token
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: user._id });

  res.status(200).json(tickets);
});

// @desc - Get ticket of a user
// @route - GET /api/tickets/:id
// @access - Private

const getTicket = asyncHandler(async (req, res) => {
  // Get the user from the token
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(ticket);
});

// @desc - Create a new user ticket
// @route - POST /api/tickets/
// @access - Private

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Please provide a product and a description');
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: 'New',
  });

  res.status(201).json(ticket);
});

// @desc - Delete a user ticket
// @route - DELETE /api/tickets/:id
// @access - Private

const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const ticket = await Ticket.findById({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await ticket.remove();
  res.status(200).json({ message: 'Ticket deleted successfully' });
});

// @desc - Update ticket of a user
// @route - PUT /api/tickets/:id
// @access - Private

const updateTicket = asyncHandler(async (req, res) => {
  // Get the user from the token
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTicket,
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
