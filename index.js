"use strict"

var mongoose = require("mongoose");
var app = require("./app");
var port = 3600;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/portafolio")
    .then(()=>{
       console.log("conexion establecida satisfactoriamente...")
       //Creacion de servidor
       app.listen(port, ()=>{
           console.log("El servidor se ha creado con exito y esta corriendo en el localhost:3600");
       })
    })
    .catch(err => console.log(err));