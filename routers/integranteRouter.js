const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const integranteRouter = express.Router();

integranteRouter.use(bodyParser.json());

integranteRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM integrante');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { paciente_id, nombre, cedula, parentesco } = req.body;
        await pool.query(
            `INSERT INTO integrante (paciente_id, nombre, cedula, parentesco) VALUES(
                '${paciente_id}','${nombre}','${cedula}','${parentesco}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = integranteRouter;