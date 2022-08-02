const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product or service.'],
      enum: [
        'Phone',
        'Laptop',
        'Tablet',
        'Desktop',
        'Printer',
        'Network',
        'Other',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please enter e description of the problem.'],
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Open', 'In-Progress', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
