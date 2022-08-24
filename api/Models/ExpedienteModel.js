'use strict'

const mongoose = require('mongoose');

const schemaExpediente = new mongoose.Schema({
    Nombre: {type: String, requiered: true, unique: false},
    Duenno: {type: String, requiered: true, unique: false},
    Usuario: {type: String, requiered: true, unique: false},
    Especie: {type: String, requiered: true, unique: false},
    Estrellas: {type: Number, requiered: true, unique: false}, 
    Observaciones: {type: String, requiered: false, unique: false},    
    FotoPerfil: {type: String, requiered:false, unique: false},
    Padecimientos: {type: String, requiered:false, unique: false},
    Citas: {type: Number, requiered:false, unique: false},
    Reservaciones: {type: Number, requiered:false, unique: false},
    NumeroExpediente:{type: Number, requiered: true, unique: true},
    //Cliente : {type: Schema.ObjectId, ref: "Cliente" }
});

module.exports = mongoose.model('Expediente', schemaExpediente, 'Expedientes');