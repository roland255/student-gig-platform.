const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Temporary Databases (Stored in RAM)
let users = []; 
let gigs = []; 
let applications = []; 

// --- AUTHENTICATION ROUTES ---
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) return res.status(400).json({error: "User exists"});
    users.push({ email, password });
    res.status(201).json({ message: "Account created!" });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({error: "Invalid credentials"});
    res.json({ message: "Login successful", email: user.email });
});

// --- GIG ROUTES ---
app.post('/api/post-gig', (req, res) => {
    gigs.push(req.body); // Body: { title, pay, desc, ownerEmail }
    res.status(201).json({ message: "Gig posted!" });
});

app.get('/api/gigs', (req, res) => res.json(gigs));

// --- APPLICATION ROUTES (The Backend Handling) ---
app.post('/api/apply', (req, res) => {
    applications.push(req.body); // Body: { gigTitle, applicantEmail, ownerEmail }
    res.status(201).json({ message: "Applied successfully!" });
});

// ADMIN/OWNER VIEW: Only see data meant for you
app.get('/api/my-applicants', (req, res) => {
    const email = req.query.email;
    const myData = applications.filter(app => app.ownerEmail === email);
    res.json(myData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
