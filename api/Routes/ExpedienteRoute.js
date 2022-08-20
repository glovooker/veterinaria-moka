"use strict";

const express = require("express");
const router = express.Router();
const Expediente = require("../Models/ExpedienteModel");

router.post('/RegistrarExpediente', (req, res)=>{
    let body = req.body;
    let nuevoExpediente = new Expediente({
        Nombre: body.Nombre,
        Duenno: body.Duenno,
        Usuario: body.Usuario,
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
    Expediente.deleteMany({_id: body._id}, (err, result)=>{
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

router.put('/ActualizarExpediente', function(req, res){
    let body = req.body
    Expediente.updateOne({_id:body._id}, {
        $set: req.body
    }, function (err, info){
        if(err){
            res.json({
                resultado:false,
                msj: 'Ha ocurrido un error inesperado y no se pudo actualizar la información',
                err
            })
        }else{
            res.json({
                resultado:false,
                msj: 'Los datos se han actualizado con éxtio',
                info
            });
        }
    });
});

router.get('/BuscarExpedientePorId', (req, res) => {
    let params = req.query;
    Expediente.findOne({ _id: params._id }, (err, expedienteDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos del objeto solicitado: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                expedienteDB
            });
        }
    });
});


module.exports = router;