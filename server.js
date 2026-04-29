const express = require('express');
const path = require('path');
const app = express();

// 1. MIDDLEWARE: Essential for reading form data and serving files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database for Demo/Defense
const users = [
    { email: 'test@uniport.edu.ng', nick: 'Roland', pass: '12345' }
];

// 2. LOGIN API: Handles the Professional Sign-In
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;
    
    // Check if user exists (Searching by email or nickname)
    const user = users.find(u => u.email === identifier || u.nick === identifier);

    if (user && user.pass === password) {
        console.log(`Login Successful: ${identifier}`);
        res.status(200).json({ message: "Welcome to GigPort" });
    } else {
        console.log(`Login Failed: ${identifier}`);
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// 3. REGISTER API: Handles the Account Creation
app.post('/api/register', (req, res) => {
    const { regEmail, regName } = req.body;
    console.log(`New Registration: ${regEmail}`);
    
    // In a real app, you'd save to a DB and send a real email here.
    // For the defense, we just trigger the OTP screen.
    res.status(200).json({ message: "OTP Sent" });
});

// 4. VERIFY API: Handles the Identity Check
app.post('/api/verify', (req, res) => {
    const { code } = req.body;
    
    // The demo "Master Code" is 123456
    if (code === "123456") {
        res.status(200).json({ message: "Verified" });
    } else {
        res.status(400).json({ message: "Invalid Code" });
    }
});

// 5. VERCEL PORT CONFIGURATION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`GigPort Server running on port ${PORT}`);
});
