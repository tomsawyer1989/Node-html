const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const medicamentoRouter = express.Router();

medicamentoRouter.use(bodyParser.json());

medicamentoRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM medicamento');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = medicamentoRouter;