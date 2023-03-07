import express from 'express';
import fs from 'fs';

const port = 3000;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/bulkdata', (req, res) => {
    const data = JSON.parse(fs.readFileSync('../BulkData/default-cards.json'));
    const name = req.query.name;
    const id = req.query.id;
    if (id) {
        const filteredData = data.find(card => card.id == id);
        if (filteredData) {
            res.json(filteredData);
        } else {
            res.status(404).json({ error: `Card with ID ${id} not found.` });
        }
    } else if (name) {
        const filteredData = data.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
        if (filteredData) {
            res.json(filteredData);
        } else {
            res.status(404).json({ error: `Card with ID ${name} not found.` });
        }
    } else {
        //res.status(404).json({ error: "Card not found with given name" });
        res.json(data);
    }
    //res.json(data);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});