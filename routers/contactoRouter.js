const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const contactoRouter = express.Router();

contactoRouter.use(bodyParser.json());

contactoRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM contacto');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { paciente_id, nombre, telefono, email, parentesco } = req.body;
        await pool.query(
            `INSERT INTO contacto (paciente_id, nombre, telefono, email, parentesco) VALUES(
                '${paciente_id}','${nombre}','${telefono}','${email}', '${parentesco}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})

contactoRouter.route('/:paciente_id')
.get(async (req,res) => {
    try {
        const { paciente_id } = req.params;
        const {rows} = await pool.query(`SELECT * FROM contacto WHERE paciente_id = '${paciente_id}'`);
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = contactoRouter;