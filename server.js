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
