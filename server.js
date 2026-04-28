const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Temporary "Database" (Stored in RAM)
let allGigs = []; 
let allApplications = []; 

// 1. GET ALL GIGS: So anyone can see what's available
app.get('/api/gigs', (req, res) => {
    res.json(allGigs);
});

// 2. POST A GIG: Saves the gig and the email of the person who posted it
app.post('/api/post-gig', (req, res) => {
    allGigs.push(req.body); 
    res.status(201).json({ message: "Gig published successfully!" });
});

// 3. APPLY FOR A GIG: Saves the applicant's info and links it to the owner
app.post('/api/apply', (req, res) => {
    allApplications.push(req.body);
    res.status(201).json({ message: "Application sent!" });
});

// 4. PRIVATE NOTIFICATIONS: Only shows applications for gigs YOU posted
app.get('/api/my-notifications', (req, res) => {
    const userEmail = req.query.email;
    const filteredApps = allApplications.filter(app => app.ownerEmail === userEmail);
    res.json(filteredApps);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
