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

barrioRouter.route('/informe')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query(`SELECT barrio.nombre, COUNT(barrio.nombre) AS cantidad FROM barrio 
            INNER JOIN paciente on barrio.id = paciente.barrio_id 
            GROUP BY barrio.nombre ORDER BY cantidad DESC`);
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = barrioRouter;