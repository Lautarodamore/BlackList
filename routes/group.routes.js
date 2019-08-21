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

app.get('/groups/gets', async (req, res) => {
  Group.find((err, gruposDB) => {
        
              if (err) {
                  return res.status(500).json({err});
              }

              if( !gruposDB ){
                  return res.status(400).json({err: "No hay grupos que mostrar..."});
              }

              res.json(gruposDB);    
      });

});

app.get('/gruopname/:group', async (req, res) => {
  let nombreGrupo = req.params.group;

  Group.findOne({name: nombreGrupo}, (err, grupoDB) => {
      
      if (err) {
          return res.status(500).json({err});
      }

      if( !grupoDB ){
          return res.status(400).json({err: "Grupo inexistente"});
      }

      res.json(grupoDB);    
  });
  
});

module.exports = app;