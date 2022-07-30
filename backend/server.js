const express = require('express');

// Get the environment variables from .env
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;

// Initialization
const app = express();

// Define routes - generic route
app.get('/', (req, res) => {
  // res.send('Hello');
  res.status(201).json({ message: 'Welcome to the Support Desk API' });
});

// Define the routes for the user API
// Use the routes defined in userRoutes.js
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
