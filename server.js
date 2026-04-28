const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = []; 
let gigs = []; 
let applications = []; 

// Updated Registration to handle full profile
app.post('/api/register', (req, res) => {
    const userData = req.body; // Includes: name, nickname, dob, gender, university, country, state, city, email, password
    if (users.find(u => u.email === userData.email)) {
        return res.status(400).json({error: "User already exists"});
    }
    users.push(userData);
    res.status(201).json({ message: "Account created successfully!" });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({error: "Invalid credentials"});
    res.json({ message: "Login successful", user: user });
});

app.get('/api/gigs', (req, res) => res.json(gigs));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
