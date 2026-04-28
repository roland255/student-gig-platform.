const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = []; 
let gigs = [];

// --- SIGN UP & OTP ---
app.post('/api/register', (req, res) => {
    const userData = req.body;
    if (students.find(s => s.regEmail === userData.regEmail)) {
        return res.status(400).json({ error: "Email already in use" });
    }
    // Hardcoded 123456 for the Group 25 demo
    students.push({ ...userData, isVerified: false, otp: "123456" });
    res.status(201).json({ message: "OTP Sent" });
});

// --- VERIFY ---
app.post('/api/verify', (req, res) => {
    const { email, code } = req.body;
    const student = students.find(s => s.regEmail === email);
    if (student && code === "123456") {
        student.isVerified = true;
        return res.json({ success: true });
    }
    res.status(400).json({ error: "Invalid OTP" });
});

// --- FLEXIBLE LOGIN ---
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;
    const student = students.find(s => 
        (s.regEmail === identifier || s.regNick === identifier) && s.regPass === password
    );
    if (!student) return res.status(401).json({ error: "Invalid credentials" });
    if (!student.isVerified) return res.status(403).json({ error: "Verify email first" });
    res.json({ success: true, user: student });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
