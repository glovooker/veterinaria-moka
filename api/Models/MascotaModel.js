'use strict'

const mongoose = require('mongoose');

const schemaMascota = new mongoose.Schema({  
    Nombre: {type: String, requiered: true, unique: false},
    Especie: {type: String, requiered: true, unique: false},
    Estrellas: {type: Number, requiered: true, unique: false}, 
    Observaciones: {type: String, requiered: false, unique: false},    
    FotoMascota: {type: String, requiered:false, unique: false},
    IdPersona:{type: Number, requiered:false, unique: false}
});

module.exports = mongoose.model('Mascota', schemaMascota, 'Mascotas'); 