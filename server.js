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
