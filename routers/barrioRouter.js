const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const barrioRouter = express.Router();

barrioRouter.use(bodyParser.json());

barrioRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM barrio');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = barrioRouter;