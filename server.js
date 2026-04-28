const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Allows the server to read data sent from the frontend
app.use(express.static(path.join(__dirname, 'public')));

// This is a temporary "database" in the server's memory
let studentApplications = [];

// 1. GET ROUTE: To see the stored information
app.get('/api/applications', (req, res) => {
    res.json(studentApplications);
});

// 2. POST ROUTE: To receive and store new information
app.post('/api/apply', (req, res) => {
    const newEntry = req.body;
    studentApplications.push(newEntry); // Save the data
    console.log("New Application Received:", newEntry);
    res.status(201).json({ message: "Data stored successfully!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
