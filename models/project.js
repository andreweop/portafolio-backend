"use strict"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var projectSchema = Schema({
    name: String,
    description: String,
    service: String,
    started: Number,
    completed: Number,
    image: String,
    
});
module.exports = mongoose.model("Project", projectSchema)
//project es el nombre que le doy en la bd. la base de datos convierte todo a minuscula y lo pluraliza
