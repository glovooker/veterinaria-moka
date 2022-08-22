'use strict'

const mongoose = require('mongoose');

const schemaCita = new mongoose.Schema({  
    FecInicio: {type: String, required: true, unique: false},
    HoraInicio: {type: String, required: true, unique: false},
    FecFinal: {type: String, required: false, unique: false},
    HoraFinal: {type: String, required: false, unique: false}, 
    Tipo: {type: String, required: true, unique: false}, 
    Observaciones: {type: String, required: false, unique: false},   
    MotivoCancela: {type: String, required: false, unique: false}, 
    Estado: {type: String, required: true, unique: false}, 
    Estrellas:{type: Number, requiered: true, unique: false},
    _idVeterinario: {type: String, required: false, unique: false}, 
    _idCliente: {type: String, required: true, unique: false}, 
    _idMascota : {type: String, required: true, unique: false},
    EstrellasVeterinario:{type: Number, requiered: true, unique: false},
    ObservacionesVeterinario: {type: String, required: false, unique: false},
});

module.exports = mongoose.model('Cita', schemaCita, 'Citas');