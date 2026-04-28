let allGigs = [];
let allApplications = []; // Stores: { applicant, ownerEmail, gigTitle }

app.post('/api/post-gig', (req, res) => {
    allGigs.push(req.body); // req.body includes 'owner' (email)
    res.status(201).send();
});

app.post('/api/apply', (req, res) => {
    // When someone applies, we store who the owner is
    allApplications.push(req.body); 
    res.status(201).send();
});

// GET notifications for a specific user
app.get('/api/notifications', (req, res) => {
    const user = req.query.user;
    // Filter so only the person who POSTED the gig sees the APPLICANT
    const myNotifications = allApplications.filter(app => app.ownerEmail === user);
    res.json(myNotifications);
});
