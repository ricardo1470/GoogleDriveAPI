const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { create } = require('domain');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({version: 'v3', auth: oauth2Client});

const filePath = path.join(__dirname, './text.txt');

const createData = async (req, res) => {
    try{
        const response = await drive.files.create({
            requestBody:{
                name: 'text.txt',
                mimeType: 'text/plain'
            },
            media:{
                mimeType: 'text/plain',
                body: fs.createReadStream(filePath)
            }
        })
        res.json(response.data);
        console.log(response.data);
    } catch(err) {
        console.log(err.message);
    }
}

const deletData = async (req, res) => {
    try{
        const response = await drive.files.delete({
            fileId: '1Mo2y7mYGk3tcRCfSo30QYeVmeWIFE34a'
        })
        res.json(response.data);
        console.log(response.data, response.status);
    } catch(err) {
        console.log(err.message);
    }
}

const getData = async (req, res) => {
    try{
        const response = await drive.files.list({
            pageSize: 20,
            fields: 'nextPageToken, files(id, name)'
        })
        res.render('index.html', { message : response.data});
        //res.json(response.data);
        console.log(response.data);
    } catch(err) {
        console.log(err.message);
    }
}

const readData = async (req, res) => {
    try {
        const response = await drive.files.get({
            fileId: '150mn-1cVAf8RWtl1mr3ffxwI-xrEVkAg',
            alt: 'media'
        })
        res.render('index.html', { message : response.data});
        console.log(response.data);
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = {
    createData,
    deletData,
    getData,
    readData
}
