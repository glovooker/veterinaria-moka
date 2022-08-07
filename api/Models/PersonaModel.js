'use strict'

const mongoose = require('mongoose');

const schemaPersona = new mongoose.Schema({ 
    Cedula: {type: Number, requiered: true, unique: true},
    Nombre: {type: String, requiered: true, unique: false}, 
    Correo: {type: String, requiered: true, unique: true},
    Password: {type: String, requiered: true, unique: false}, 
    Telefono: {type: Number, requiered: true, unique: false},
    Direccion: {type: String, requiered: true, unique: false},        
    Rol: {type: Number, requiered: true, unique: false},
    PerfilFB:{type: String, requiered: false, unique: false},   
    PerfilIG:{type: String, requiered: false, unique: false},  
    PerfilTW:{type: String, requiered: false, unique: false},  
    FotoPerfil: {type: String, required: false, unique: false},
    Estado: {type: Number, requiered: true, unique: false}
});

module.exports = mongoose.model('Persona',schemaPersona, 'Personas');
