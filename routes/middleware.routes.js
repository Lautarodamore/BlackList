const express = require("express");
const app = express();

const jwt = require('jsonwebtoken');

//Funcion que verifica token y devuelve el usuario registrado
//y sino un error
app.post('/middle/verify', (req, res) =>{
    let token = req.body.token;
    
    try {

        let usuario = jwt.verify(token, process.env.FIRMA);

        if (usuario) {
            res.json({usuario});    
        } else{
            res.json({
                err: "Error de autenticacion",
                flag: "N"
            });
        }

        } catch (error) {
            res.json({error,
                flag: "N"});
        } 
});


module.exports = app;