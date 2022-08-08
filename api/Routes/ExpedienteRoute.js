"use strict";

const express = require("express");
const router = express.Router();
const Expediente = require("../Models/ExpedienteModel");

router.post('/RegistrarExpediente', (req, res)=>{
    let body = req.body;
    let nuevoExpediente = new Expediente({
        Nombre: body.Nombre,
        Especie: body.Especie,
        Estrellas: body.Estrellas,
        Observaciones: body.Observaciones,
        FotoPerfil: body.FotoPerfil,
        Padecimientos: body.Padecimientos,
        Citas: body.Citas,
        Reservaciones: body.Reservaciones,
        Cliente: body.Cliente
    });
    nuevoExpediente.save((err, expedienteDB)=>{
        if(err){
            res.json({
            resultado: false,
            msj: "No se pudo registrar el expediente, ocurrio el siguiente error: ",
            err,
            });
        }else{
            res.json({
            resultado: true,
            msj: "Registro realizado de manera correcta",
            expedienteDB,
            });   
        }
    });
});

router.get('/ListarExpediente',(req, res)=>{
    Expediente.find((err, ListaExpedienteDB)=>{
        if(err){
            res.json({
                resultado: false,
                msj: 'No se pudo encontar la información',
                err,
            });
        }else{
            res.json({
                resultado: true,
                msj: 'La información se encontró con éxito',
                ListaExpedienteDB,
            });
        }
    });
});

router.delete('/EliminarExpediente', function(req, res){
    let body = req.body;
    Expediente.remove({_id: body._id}, (err, result)=>{
        if(err){
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar los datos: ',
                err,
            });
        }else{
            res.json({
                resultado: true,
                msj: 'Se eliminó la información con éxito',
                result,
            });
        }
    });
});

module.exports = router;