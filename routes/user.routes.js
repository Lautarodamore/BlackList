const express = require("express");
const app = express();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Registrarse
app.post('/signUp', async (req, res) => {
    
    const nuevoUsuario = await new User({username: req.body.username, email: req.body.email, password: req.body.password, group: req.body.group, role: req.body.role,});
    nuevoUsuario.save((err, usuarioDB) => {
        if (err) {
            return res.json({message: "Este suarrio ya existe"});
        }

        res.json(nuevoUsuario);
    });
});

//Iniciar sesion
app.post('/signIn', async (req, res) => {
    User.findOne({email: req.body.email}, (err, usuarioDB) => {
        
        if (err) {
            return res.status(500).json({err});
        }

        if( !usuarioDB ){
            return res.status(400).json({err: "Usuario o password inexistente1"});
        }

        if ( !bcrypt.compareSync(req.body.password, usuarioDB.password) ) {
            return res.status(400).json({err: "Usuario o password inexistente2"});
        }

        let token = jwt.sign({usuario: usuarioDB, },
            process.env.FIRMA, {expiresIn: "6hr"});

        res.json({
            token,
            usuarioDB
        });    
    });
    
});

//Devolver usuario segun grupo
app.post('/users/group', async (req, res) => {
    User.find({group: req.body.group}, (err, usuariosDB) => {
        
        if (err) {
            return res.status(500).json({err});
        }

        if( !usuariosDB ){
            return res.status(400).json({err: "Usuario o password inexistente1"});
        }

        res.json(usuariosDB);    
    });
    
});


module.exports = app;