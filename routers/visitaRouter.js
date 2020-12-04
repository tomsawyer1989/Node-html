const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const visitaRouter = express.Router();

visitaRouter.use(bodyParser.json());

visitaRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM visita');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { paciente_id, temperatura, fecha, peso, presion, observaciones } = req.body;
        await pool.query(
            `INSERT INTO visita (paciente_id, temperatura, fecha, peso, presion, observaciones) VALUES(
                '${paciente_id}','${temperatura}','${fecha}','${peso}', '${presion}', '${observaciones}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})

visitaRouter.route('/:paciente_id')
.get(async (req,res) => {
    try {
        const { paciente_id } = req.params;
        const {rows} = await pool.query(`SELECT * FROM visita WHERE paciente_id = '${paciente_id}'`);
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

visitaRouter.route('/informe/mensual')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query(`SELECT date_part('month', visita.fecha) as mes, COUNT(date_part('month', visita.fecha)) AS cantidad FROM visita 
            GROUP BY mes ORDER BY mes ASC`);
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})

module.exports = visitaRouter;