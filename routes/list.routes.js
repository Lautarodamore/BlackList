const express = require("express");
const app = express();
const axios = require("axios");

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

app.post('/list/all/:id', async (req, res) => {
    let id = req.params.id;
    List.find({createdBy: id, pagado: false}).populate("userDef", "username email").exec( (err, listas)=> {
        
        if (err) {
            return res.json({message: "Hubo un error"});
        }

        res.json(listas);
    });
});

app.post('/list/alldistinct/:id', async (req, res) => {
    let id = req.params.id;
    List.find({createdBy: id, pagado: false}).distinct("userDef").exec( (err, listas)=> {
        
        if (err) {
            return res.json({message: "Hubo un error"});
        }

        res.json(listas);
    });
});


app.post('/list/most/:id', async (req, res) => {
    
  let idUrl = req.params.id;   
  let response = await axios.post(`https://blacklist-luxsys.herokuapp.com/list/all/${idUrl}`);

  let response2 = await axios.post(`https://blacklist-luxsys.herokuapp.com/list/alldistinct/${idUrl}`);
  
  let arrayDeudores =response.data;
  let arrayDeIds =  response2.data;
  
  let arrayTotal = [];
  let arrayFinal = [];

  arrayDeIds.forEach(id => {
    let sumaTotal = masDeudores(arrayDeudores, id);
    arrayTotal.push(sumaTotal);
  });

  arrayTotal.forEach(async deudor => {
    let response = await axios.post(`https://blacklist-luxsys.herokuapp.com/users/${deudor.id}`);
    console.log(response.data);
    let newDeudor = await insertarUsername(deudor, response.data);
    console.log(newDeudor);
    arrayFinal.push(newDeudor);
  });
  
  setTimeout(() => {
    res.json(arrayFinal);
  }, 1500);

    
});

app.post('/list/mosted/:id', async (req, res) => {

    let id = req.params.id;
    let response = await axios.post(`https://blacklist-luxsys.herokuapp.com/list/most/${id}`);
    
    let listaDeudores = response.data;

    listaDeudores.sort(function(deudorA, deudorB){return deudorB.deudaFinal-deudorA.deudaFinal});

    listaDeudores.slice(0, 3);

    res.json(listaDeudores);
});

app.put('/list/update/:id', async (req, res) => {
    
    let id = req.params.id;
    
    List.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true }).populate("userDef", "username email").exec((err, listaDB) => {
        
        if(err){
            return res.json({ message: "Hubo un error" });
        }

        res.json({ list: listaDB });

    });

});
//Poner una fecha
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

//Crear una funcion que te traiga el distintc
function masDeudores(lista, id) {
    
    let listaDeudor = [];
    
    
    lista.forEach(user => {
        if (user.userDef._id == id) {
            listaDeudor.push(user.default);           
        }
    });

    let suma = listaDeudor.reduce((a, b) => a + b, 0);


    let usuarioFinal = {id, deudaFinal: suma, username: ""};

    return usuarioFinal;
}

function insertarUsername(deudor, username) {
    
    deudor.username = username;

    return deudor;
}

module.exports = app;