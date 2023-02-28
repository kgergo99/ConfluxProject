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
    const data = fs.readFileSync('../BulkData/default-cards.json');
    res.json(JSON.parse(data));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});