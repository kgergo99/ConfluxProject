import express from 'express';
import fs from 'fs';
import https from 'https';

const port = 3000;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/bulkdata', (req, res) => {    
    const data = JSON.parse(fs.readFileSync('../BulkData/default-cards.json'));
    fs.readFile('../BulkData/default-cards.json', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const jsonData = JSON.parse(data);
        const name = req.query.name;
        const id = req.query.id;
        const ids = req.query.ids;
        const cardwithset = req.query.cardwithset;
        const cardfordeck = req.query.cardfordeck;
        if (ids) {
            const idArray = ids.split(',');
            const filteredData = jsonData.filter(card => idArray.includes(card.id));
            res.json(filteredData);
        } else if (id) {
            const filteredData = jsonData.find(card => card.id == id);
            if (filteredData) {
                res.json(filteredData);
            } else {
                res.status(404).json({ error: `Card with ID ${id} not found.` });
            }
        } else if (name) {
            const filteredData = jsonData.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
            if (filteredData.length > 0) {
                res.json(filteredData);
            } else {
                res.status(404).json({ error: `Card with name ${name} not found.` });
            }
        }
        else if (cardwithset) {
            const filteredData = jsonData
            .filter((card) =>
                card.name.toLowerCase().includes(cardwithset.toLowerCase())
            )
            .map((card) => ({
                id: card.id,
                name: card.name,
                set: card.set,
                set_id: card.set_id,
                set_name: card.set_name,
                image_uris: card.image_uris,
                set_uri: card.set_uri,
                prices: card.prices,
                cmc: card.cmc,
                colors: card.colors,
                type_line: card.type_line,
                card_faces: card.card_faces
            }));
        res.json(filteredData);
        }
        else if (cardfordeck) {
            const filteredData = jsonData.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
            if (filteredData.length > 0) {
                const basicData = filteredData.map(card => ({
                    id: card.id,
                    name: card.name,
                    set: card.set,
                    set_id: card.set_id,
                    set_name: card.set_name,
                    image_uris: card.image_uris,
                    set_uri: card.set_uri,
                    prices: card.prices,
                    cmc: card.cmc,
                    colors: card.colors,
                    type_line: card.type_line,
                }));
                res.json(basicData);
            } else {
                res.status(404).json({ error: `Card with name ${name} not found.` });
            }
        } else {
            res.json([]);
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});