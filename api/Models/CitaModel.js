'use strict'

const mongoose = require('mongoose');

const schemaCita = new mongoose.Schema({  
    FecInicio: {type: String, required: true, unique: false},
    HoraInicio: {type: String, required: true, unique: false},
    FecFinal: {type: String, required: false, unique: false},
    HoraFinal: {type: String, required: false, unique: false}, 
    Tipo: {type: Number, required: true, unique: false}, 
    Observaviones: {type: String, required: false, unique: false},   
    MotivoCancela: {type: String, required: false, unique: false}, 
    Estado: {type: Number, required: true, unique: false}, 
    Veterinario : {type: Schema.ObjectId, ref: "Usuario" }, 
    Cliente : {type: Schema.ObjectId, ref: "Cliente" },
    Mascota : {type: Schema.ObjectId, ref: "Mascota" }
});

module.exports = mongoose.model('Cita', schemaCita, 'Citas');