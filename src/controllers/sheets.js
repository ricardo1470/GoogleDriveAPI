const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


/**
 * https://developers.google.com/oauthplayground
 * link for tokens
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SHEETS;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });


const createSheet = (req, res) => {
    sheets.spreadsheets.create({
        resource: {
            properties: {
                title: 'My test Google Sheets'
            }
        }
    }, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        //res.json(`Created sheet: ${response.data.spreadsheetId}`);
        console.log(`Created sheet: ${response.data.spreadsheetId}`);
        return sheetId = response.data.spreadsheetId;
    })
    //res.json(`Created sheet: ${response.data.spreadsheetId}`);
}

const getSheets = (req, res) => {}

// crea una hoja de plantilla
const createTemplate = async (req, res) => {

}

const writeSheet = async (req, res) => {
    const spreadsheetId = '1wiSszIRLh_R4DRlU6blnzY1r4-M4u1R0C0r_c2Msywo';

    const metadata = await sheets.spreadsheets.get({
        auth: oauth2Client,
        spreadsheetId,
    });

    const getRows = await sheets.spreadsheets.values.get({
        auth: oauth2Client,
        spreadsheetId,
        range: 'Hoja 1!A2:F',
    });

    await sheets.spreadsheets.values.append({
        auth: oauth2Client,
        spreadsheetId,
        range: 'Hoja 1!A2:F',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                ['Nicolas', 'male',	'3.Senior',	'WI', 'Spanish', 'Tennis'],
            ]
        }
    });

    res.send(getRows.data)
}

module.exports = {
    createSheet,
    writeSheet,
}