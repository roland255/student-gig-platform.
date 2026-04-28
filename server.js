const express = require('express');
const app = express();
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;
    // This looks for a match in either the 'email' or 'nickname' field
    const user = users.find(u => 
        (u.email === identifier || u.nickname === identifier) && 
        u.password === password
    );
    
    if (!user) return res.status(401).json({ error: "Access Denied" });
    res.json({ message: "Welcome", user });
});
// Add these routes to your server.js
app.get('/api/marketplace', (req, res) => {
    // Returns all active gigs posted by students
    res.json(gigs);
});

app.post('/api/apply-gig', (req, res) => {
    const { gigId, applicantEmail } = req.body;
    // Log the application in the system
    applications.push({ gigId, applicantEmail, date: new Date() });
    res.status(200).json({ message: "Application submitted to owner" });
});
