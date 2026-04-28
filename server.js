const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = []; // Stores full profile + { isVerified: false, otp: "123456" }
let gigs = [];

// 1. SIGN UP ROUTE
app.post('/api/register', (req, res) => {
    const userData = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
    
    const newUser = { ...userData, isVerified: false, otp: "123456" }; // Hardcoded 123456 for your demo
    users.push(newUser);
    
    console.log(`Verification code for ${userData.email} is: 123456`);
    res.status(201).json({ message: "Code sent to email" });
});

// 2. VERIFY EMAIL ROUTE
app.post('/api/verify', (req, res) => {
    const { email, code } = req.body;
    const user = users.find(u => u.email === email);
    
    if (user && code === "123456") {
        user.isVerified = true;
        return res.json({ success: true });
    }
    res.status(400).json({ error: "Invalid verification code" });
});

// 3. LOGIN ROUTE (Flexible: Email or Username)
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;
    const user = users.find(u => (u.email === identifier || u.nickname === identifier) && u.password === password);
    
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    if (!user.isVerified) return res.status(403).json({ error: "Please verify your email first" });
    
    res.json({ success: true, user });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
