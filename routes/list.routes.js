const express = require("express");
const app = express();

const List = require("../models/List");

//Registrarse
app.post('/list/new', async (req, res) => {
    
    const nuevaLista = await new List({description: req.body.description,
                                        userDef: req.body.userDef, createdBy: req.body.createdBy,
                                        default: req.body.default});

    nuevaLista.save((err, listaDB) => {
    
        if (err) {
            return res.json({message: "hubo un error"});
        }

        res.json(listaDB);
    });

});

app.get('/list/all/:id', async (req, res) => {
    let id = req.params.id;
    List.find({createdBy: id}).populate("createdBy", "username email").exec( (err, listas)=> {
        
        if (err) {
            return res.json({message: "Hubo un error"});
        }

        res.json(listas);
    });
});

app.put('/list/update/:id', async (req, res) => {
    
    let id = req.params.id;

    

    List.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true }, (err, listaDB) => {
        if(err){
            return res.json({ message: "Hubo un error" });
        }

        res.json({ list: listaDB });

    });

});

app.delete('/list/delete/:id', async (req, res) => {
    let id = req.params.id;

    List.findById( id, (err, listDb)=>{

        listDb.pagado = true;
        
        listDb.save( () => {
            
            if(err){
                return res.status(500).json({message: "Hubo un error"})
            }

            res.json({message: "Deuda eliminada"});

        });
    });

});

module.exports = app;