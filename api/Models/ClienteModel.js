'use strict'

const mongoose = require('mongoose');

const schemaCliente = new mongoose.Schema({ 
    Identificacion: {type: Number, requiered: true, unique: true},
    Nombre: {type: String, requiered: true, unique: false},
    Apellido1: {type: String, requiered: true, unique: false},
    Apellido2: {type: String, requiered: true, unique: false},   
    Estado: {type: String, requiered: true, unique: false},
    Email: {type: String, requiered: true, unique: true},
    Password: {type: String, requiered: true, unique: false},
    Telefono: {type: Number, requiered: true, unique: false},
    Rol: {type: Number, requiered: true, unique: false}
});

module.exports = mongoose.model('Cliente',schemaCliente, 'Clientes');
