const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = []; 

// SIGN UP ROUTE
app.post('/api/register', (req, res) => {
    const userData = req.body;
    if (students.find(s => s.regEmail === userData.regEmail)) {
        return res.status(400).json({ error: "Email already exists" });
    }
    // Fixed OTP for Group 25 demo
    students.push({ ...userData, isVerified: false, otp: "123456" });
    res.status(201).json({ message: "OTP Sent" });
});

// VERIFY ROUTE
app.post('/api/verify', (req, res) => {
    const { email, code } = req.body;
    const student = students.find(s => s.regEmail === email);
    if (student && code === "123456") {
        student.isVerified = true;
        return res.json({ success: true });
    }
    res.status(400).json({ error: "Invalid OTP" });
});

// LOGIN ROUTE (Nickname or Email)
app.post('/api/login', (req, res) => {
    const { identifier, password } = req.body;
    const student = students.find(s => 
        (s.regEmail === identifier || s.regNick === identifier) && s.regPass === password
    );
    if (!student) return res.status(401).json({ error: "Invalid credentials" });
    if (!student.isVerified) return res.status(403).json({ error: "Verify email first" });
    res.json({ success: true, user: student });
});

// FORGOT PASSWORD
app.post('/api/forgot-password', (req, res) => {
    res.json({ message: "Reset link sent to your student email." });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
