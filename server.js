const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// This handles the main page
app.get('/', (req, res) => {
  res.send("Group 25 Student Gig Platform API is Live!");
});

// Port for Render to use
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
