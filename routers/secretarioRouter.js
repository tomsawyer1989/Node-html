const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const pool = require('../connect');

const secretarioRouter = express.Router();

secretarioRouter.use(bodyParser.json());

secretarioRouter.route('/login')
.post(async (req,res) => {
    try {
        const user = req.body;
        let isFound = false;
        let id = 0;
        const {rows} = await pool.query('SELECT * FROM secretario');
        rows.map(item => {
            if (item.username === user.username && item.password === user.password){
                isFound = true;
                id = item.id;
            }
        });
        if(isFound === true){
            const token = jwt.sign({user: user.username}, 'my_secret_key');
            res.json(
                {success: true, status: 'Login Successful!', id: id, username: user.username, token: token}
            );
        }
        else {
            res.json(
                {success: false, status: '¡¡ Usuario no registrado !!'}
            );
        }
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = secretarioRouter;