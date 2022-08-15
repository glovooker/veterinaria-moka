'use strict';

const express = require('express');
const router = express.Router();
const Persona = require('../Models/PersonaModel');

router.post('/RegistrarPersona',(req, res)=>{
    let body = req.body;
    let nuevaPersona = new Persona({
        Cedula: body.Cedula,
        Nombre: body.Nombre,
        Correo: body.Correo,
        Password: body.Password,
        Telefono: body.Telefono,
        Direccion: body.Direccion,  
        Rol: body.Rol,
        PerfilFB: body.PerfilFB,
        PerfilIG: body.PerfilIG,
        PerfilTW: body.PerfilTW,
        FotoPerfil: body.FotoPerfil,
        Estado: 1
    });
    nuevaPersona.save((err, personaDB) =>{
        if (err) {
            res.json({
                resultado: false,
                msj: 'Error al registrar la persona :', err
                });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado exitosamente', personaDB
            });
        }
    });
});

router.get('/ListarPersonas', (req, res)=>{ 
    Persona.find((err, ListaPersonasBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj:'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera satisfactoria',
                ListaPersonasBD
            });
        }
    }).sort({Nombre:1, Rol:1});
});

router.get('/BuscarPersona', (req, res) => {
    let params = req.query;
    if (params.Cedula != "" && params.Cedula != null && params.Cedula != undefined) {
        Persona.findOne({Cedula: params.Cedula}, (err, personaDB) => {
            if (err) {
                res.json({
                    resultado: false,
                    msj: 'No se pudo obtener datos: ',
                    err
                });
            } else {
                res.json({ 
                    resultado: true,
                    msj: 'Los datos se obtuvieron de manera correcta: ',
                    personaDB
                });
            }
        } 
        );
    } else if ((params._id != "" && params._id != null && params._id!= undefined) && (params.Cedula == "" || params.Cedula == null || params.Cedula == undefined)) {
        Persona.findOne({_id: params._id}, (err, personaDB) => {
            if (err) {
                res.json({
                    resultado: false,
                    msj: 'No se pudo obtener datos: ',
                    err
                });
            } else {

                res.json({
                    resultado: true,
                    msj: 'Los datos se obtuvieron de manera correcta por id: ',
                    personaDB
                });
            }
        } 
        );
    }
} );

router.get('/AutenticarPersona', (req, res) => {
    let params = req.query;
    Persona.findOne({
        Correo: params.Correo,
        Password: params.Password
    }, (err, personaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        } else {
            if (personaDB == null) {
                res.json({
                    resultado: false,
                    msj: 'Usuario y/o contraseña incorrectos ',
                    personaDB
                });
            } else if (Number(personaDB.Estado) == 0) {
                //inactivo                
                res.json({
                    resultado: false,
                    msj: 'Usuario inactivo, comuníquese con el administrador',
                    personaDB
                });
            } else {
                res.json({
                    resultado: true,
                    msj: 'Los datos se obtuvieron de manera correcta: ',
                    personaDB
                });
            }
        }
    });
});

router.post('/ModificarPersona', function(req, res){
    let body = req.body;
    Persona.updateOne({_id: body._id},{
       $set: req.body
    }, (err, info) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo actualizar los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se actualizaron de manera satisfactoria',
                info
            });
        }
    }
    );
});

router.get('/BuscarPersonaPorCedula',(req, res) => {
    let params = req.query;
    Persona.findOne({Cedula: params.Cedula},(err,personaDB)=>{
        if(err || personaDB===null){
            res.json({
                resultado:false,
                msj:'No se pudo obtener datos',
                err
            });
        }else{
            res.json({
                resultado:true,
                msj:'Datos encontrados',
                personaDB

            })
        }
    });
});

module.exports = router;