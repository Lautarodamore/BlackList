const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post('/signUp', async (req, res) => {
    
    const nuevoUsuario = await new User({username: req.body.username, email: req.body.email, password: req.body.password});
    nuevoUsuario.save((err, usuarioDB) => {
        if (err) {
            return res.json({message: "Este suarrio ya existe"});
        }

        res.json(nuevoUsuario);
    });
});

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
        
        res.json(token);    
    });
    
});

module.exports = app;