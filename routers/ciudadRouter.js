const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const ciudadRouter = express.Router();

ciudadRouter.use(bodyParser.json());

ciudadRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM ciudad');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = ciudadRouter;