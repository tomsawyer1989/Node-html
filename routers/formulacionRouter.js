const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const formulacionRouter = express.Router();

formulacionRouter.use(bodyParser.json());

formulacionRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM formulacion');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { visita_id, medicamento_id, dosis } = req.body;
        await pool.query(
            `INSERT INTO formulacion (visita_id, medicamento_id, dosis) VALUES(
                '${visita_id}','${medicamento_id}','${dosis}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})

formulacionRouter.route('/:visita_id')
.get(async (req,res) => {
    try {
        const { visita_id } = req.params;
        const {rows} = await pool.query(`SELECT * FROM formulacion WHERE visita_id = '${visita_id}'`);
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = formulacionRouter;