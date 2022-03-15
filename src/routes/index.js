const express = require('express');
const router = express.Router();

const { getInit } = require('../controllers/init');
const { createData, getData, deletData, readData } = require('../controllers/drive');

const { createSheet, writeSheet } = require('../controllers/sheets');

router.get('/', getInit);

//create data
router.get('/drive', createData);
router.get('/del', deletData);
router.get('/get', getData);
router.get('/read', readData);

//create sheets
router.get('/sheets', createSheet);
router.get('/sheets/get', writeSheet);

module.exports = router;
