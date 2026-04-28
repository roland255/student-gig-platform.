let gigs = [
    { title: "Library Assistant", desc: "Help organize books in the faculty library.", pay: "₦2,000" }
];

app.get('/api/gigs', (req, res) => res.json(gigs));

app.post('/api/post-gig', (req, res) => {
    gigs.push(req.body);
    res.status(201).send({ message: "Gig added" });
});
