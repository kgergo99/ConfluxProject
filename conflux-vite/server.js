import express from 'express';
import fs from 'fs';
import https from 'https';

const port = 3000;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); //http://localhost:5173
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bulkDataFilePath = '../BulkData/default-cards.json';
const jsonFileUrl = 'https://api.scryfall.com/bulk-data/default-cards';

function downloadJsonFile() {
    console.log('Downloading default-cards.json...');
    https.get(jsonFileUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const jsonData = JSON.parse(data);
            const downloadUrl = jsonData.download_uri;
            https.get(downloadUrl, (res) => {
                const fileName = 'default-cards.json';
                if (!fs.existsSync('../BulkData')){
                    fs.mkdirSync('../BulkData');
                }
                const file = fs.createWriteStream(bulkDataFilePath);
                res.pipe(file);
                res.on('end', () => {
                    console.log(`Downloaded default-cards.json and saved as ${bulkDataFilePath}`);
                });
            });
        });
    }).on('error', (err) => {
        console.error(`Error while downloading default-cards.json: ${err}`);
    }); 
}

if (!fs.existsSync(bulkDataFilePath)) {
    downloadJsonFile();
}

app.get('/bulkdata', (req, res) => {    
    fs.readFile(bulkDataFilePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const jsonData = JSON.parse(data);
        const name = req.query.name;
        const id = req.query.id;
        const ids = req.query.ids;
        const cardreduced = req.query.cardreduced;
        if (ids) {
            const idArray = ids.split(',');
            const filteredData = jsonData.filter(card => (idArray.includes(card.id) && card.layout != "art_series"));
            res.json(filteredData);
        } else if (id) {
            const filteredData = jsonData.find(card => card.id == id);
            if (filteredData) {
                res.json(filteredData);
            } else {
                res.status(404).json({ error: `Card with ID ${id} not found.` });
            }
        } else if (name) {
            const filteredData = jsonData.filter(card => (card.name.toLowerCase().includes(name.toLowerCase()) && card.layout != "art_series"));
            if (filteredData.length > 0) {
                res.json(filteredData);
            } else {
                res.status(404).json({ error: `Card with name ${name} not found.` });
            }
        }
        else if (cardreduced) {
            const filteredData = jsonData.filter(card => (card.name.toLowerCase().includes(cardreduced.toLowerCase()) && card.layout != "art_series"));
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
                    card_faces: card.card_faces
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