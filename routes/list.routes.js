const express = require("express");
const app = express();

const List = require("../models/List");

//Registrarse
app.post('/list/new', async (req, res) => {
    
    const nuevaLista = await new List({description: req.body.description, userDef: req.body.userDef, createdBy: req.body.createdBy, default: req.body.default});
    nuevaLista.save((err, listaDB) => {
        if (err) {
            return res.json({message: "hubo un error"});
        }

        res.json(listaDB);
    });
});

app.get('/list/all/:id', async (req, res) => {
    let id = req.params.id;
    List.find({createdBy: id}).populate("User", "username email").exec( (err, listas)=> {
        if (err) {
            return res.json({message: "hubo un error"});
        }

        res.json(listas);
    });

});

module.exports = app;