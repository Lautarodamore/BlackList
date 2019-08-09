const express = require('express');
const app = express();

let Group = require('../models/Group');

app.post('/group/new', async (req, res) => {

    let nuevoGrupo = await new Group({num_group: req.body.numero, name: req.body.name});

    nuevoGrupo.save((err, groupDB) => {
        if (err) {
          return res.json({message: "hubo un error"});
        }

        res.json(groupDB);
    })
});

module.exports = app;