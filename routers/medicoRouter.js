const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const medicoRouter = express.Router();

medicoRouter.use(bodyParser.json());

medicoRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM medico');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { secretario_id, barrio_id, nombre, cedula, direccion, eps, universidad, created_at } = req.body;
        await pool.query(
            `INSERT INTO medico (secretario_id, barrio_id, nombre, cedula, direccion, eps, universidad, created_at) VALUES(
                '${secretario_id}','${barrio_id}','${nombre}','${cedula}','${direccion}','${eps}','${universidad}','${created_at}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})
.put(async (req,res) => {
    try {
        const { id, secretario_id, barrio_id, nombre, cedula, direccion, eps, universidad, created_at } = req.body;
        await pool.query(`UPDATE medico SET secretario_id = '${secretario_id}', barrio_id = '${barrio_id}', nombre = '${nombre}', cedula = '${cedula}', direccion = '${direccion}',
            eps = '${eps}', universidad = '${universidad}', created_at = '${created_at}' WHERE id = '${id}'`);
        res.send('ACTUALIZADO');
    } 
    catch (error) {
        console.log(error);
    }
})
.delete(async (req,res) => {
    try {
        const { cedula } = req.body;
        await pool.query(`DELETE FROM medico WHERE cedula = '${cedula}'`);
        res.send('ELIMINADO');
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = medicoRouter;