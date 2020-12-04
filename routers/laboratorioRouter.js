const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const laboratorioRouter = express.Router();

laboratorioRouter.use(bodyParser.json());

laboratorioRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM laboratorio');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = laboratorioRouter;