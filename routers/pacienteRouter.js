const express = require('express');
const bodyParser = require('body-parser');

const pool = require('../connect');

const validate = require('../validate');

const pacienteRouter = express.Router();

pacienteRouter.use(bodyParser.json());

pacienteRouter.route('/')
.get(async (req,res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM paciente');
        res.send(rows);
    } 
    catch (error) {
        console.log(error);
    }
})
.post(async (req,res) => {
    try {
        const { medico_id, barrio_id, ciudad_id, nombre, cedula, edad, direccion, geolocalizacion, created_at } = req.body;
        await pool.query(
            `INSERT INTO paciente (medico_id, barrio_id, ciudad_id, nombre, cedula, edad, direccion, geolocalizacion, created_at) 
                VALUES('${medico_id}','${barrio_id}','${ciudad_id}','${nombre}','${cedula}','${edad}','${direccion}','${geolocalizacion}','${created_at}')`
        );
        res.send('INSERTADO');
    } 
    catch (error) {
        console.log(error);
    }
})
.put(async (req,res) => {
    try {
        const { id, medico_id, barrio_id, ciudad_id, nombre, cedula, edad, direccion, geolocalizacion, created_at } = req.body;
        await pool.query(`UPDATE paciente SET medico_id = '${medico_id}', barrio_id = '${barrio_id}', ciudad_id = '${ciudad_id}', nombre = '${nombre}', cedula = '${cedula}',
            edad = '${edad}', direccion = '${direccion}', geolocalizacion = '${geolocalizacion}', created_at = '${created_at}' WHERE id = '${id}'`);
        res.send('ACTUALIZADO');
    } 
    catch (error) {
        console.log(error);
    }
})
.delete(async (req,res) => {
    try {
        const { cedula } = req.body;
        await pool.query(`DELETE FROM paciente WHERE cedula = '${cedula}'`);
        res.send('ELIMINADO');
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = pacienteRouter;