const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const Note = require('../models/notesModel');

// @desc - Get notes for a ticket
// @route - GET /api/tickets/:ticketId/notes
// @access - Private

const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

// @desc - Create ticket notes
// @route - POST /api/tickets/:ticketId/notes
// @access - Private

const addNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized.');
  }

  const note = await Note.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    isStaff: false,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = { getNotes, addNote };
