const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Load client secrets from a local file.
const credentials = JSON.parse(fs.readFileSync('service-account.json'));

// Authorize a client with credentials
const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

// Helper function to get all features
async function getFeatures() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2:C',
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        return [];
    }
    return rows.map(([id, title, votes]) => ({
        id,
        title,
        votes: parseInt(votes, 10),
    }));
}

// Helper function to update vote count
async function updateVote(id, delta) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2:C',
    });
    const rows = res.data.values;
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) {
        throw new Error('Feature not found');
    }
    const currentVotes = parseInt(rows[rowIndex][2], 10);
    const newVotes = currentVotes + delta;
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!C${rowIndex + 2}`,
        valueInputOption: 'RAW',
        requestBody: {
            values: [[newVotes.toString()]],
        },
    });
    return newVotes;
}

// Route to get all features
app.get('/votes', async (req, res) => {
    try {
        const features = await getFeatures();
        res.json(features);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to update vote count
app.post('/vote', async (req, res) => {
    const { id, delta } = req.body;
    if (!id || typeof delta !== 'number') {
        return res.status(400).send('Invalid request');
    }
    try {
        const newVotes = await updateVote(id, delta);
        res.json({ id, votes: newVotes });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to get feature by ID
app.get('/votes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const features = await getFeatures();
        const feature = features.find(item => item.id === id);
        if (!feature) {
            return res.status(404).send('Feature not found');
        }
        res.json(feature);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
