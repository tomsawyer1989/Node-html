const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const inventarioRouter = express.Router();

inventarioRouter.use(bodyParser.json());

inventarioRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM inventario');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {                   // Esto debería ser un GET con params serializado, en lugar de un POST con body.
    try {
        const { laboratorio_id, medicamento_id } = req.body;
        const {rows} = await pool.query(
            `SELECT * FROM inventario WHERE laboratorio_id = '${laboratorio_id}' AND medicamento_id = '${medicamento_id}'`
        );
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.put(async (req,res) => {
    try {
        const { laboratorio_id, medicamento_id, cantidad, unidades } = req.body;
        const resultado = cantidad - unidades;
        const {rows} = await pool.query(`UPDATE inventario SET cantidad = '${resultado}' WHERE laboratorio_id = '${laboratorio_id}'
            AND medicamento_id = '${medicamento_id}'`);
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = inventarioRouter;