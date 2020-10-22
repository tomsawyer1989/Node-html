const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const pacientesRouter = express.Router();

pacientesRouter.use(bodyParser.json());

pacientesRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM pacientes');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { nombre, cedula, edad } = req.body;
        await pool.query(
            `INSERT INTO pacientes (nombre, cedula, edad) VALUES('${nombre}','${cedula}','${edad}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})
.put(async (req,res) => {
    try {
        const { nombre, cedula } = req.body;
        await pool.query(`UPDATE pacientes SET nombre = '${nombre}' WHERE cedula = '${cedula}'`);
        res.send('ACTUALIZADO');
    } 
    catch (error) {
        console.log(error);
    }
})
.delete(async (req,res) => {
    try {
        const { cedula } = req.body;
        await pool.query(`DELETE FROM pacientes WHERE cedula = '${cedula}'`);
        res.send('ELIMINADO');
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = pacientesRouter;