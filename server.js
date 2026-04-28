const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// This serves your HTML file automatically
app.use(express.static(path.join(__dirname, 'public')));

// Your "Kitchen" (The API data)
app.get('/api/gigs', (req, res) => {
    res.json([
        { id: 1, title: "Graphic Designer", pay: "₦10,000" },
        { id: 2, title: "Content Writer", pay: "₦5,000" },
        { id: 3, title: "Social Media Manager", pay: "₦15,000" }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
