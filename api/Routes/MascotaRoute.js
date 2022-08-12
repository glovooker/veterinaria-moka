"use strict";

const express = require("express");
const router = express.Router();
const Mascota = require("../Models/MascotaModel");

router.post('/RegistrarMascota', (req, res)=>{
    let body = req.body;
    let nuevaMascota = new Mascota({
        Nombre: body.Nombre,
        Especie: body.Especie,
        FotoMascota: body.FotoMascota,
        Observaciones: body.Observaciones,
    });
    nuevaMascota.save((err, mascotaDB)=>{
        if(err){
            res.json({
            resultado: false,
            msj: "No se pudo registrar la mascota, ocurrio el siguiente error: ",
            err,
            });
        }else{
            res.json({
            resultado: true,
            msj: "Registro realizado de manera correcta",
            mascotaDB,
            });   
        }
    });
});

router.get('/ListarMascota',(req, res)=>{
    Mascota.find((err, ListaMascotaDB)=>{
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
                ListaMascotaDB,
            });
        }
    });
});

router.delete('/EliminarMascota', function(req, res){
    let body = req.body;
    Mascota.remove({_id: body._id}, (err, result)=>{
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

router.put('/ActualizarMascota', function(req, res){
    let body = req.body
    Mascota.updateOne({_id:body._id}, {
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
                msj: 'Los datos se han actualizado con éxito',
                info
            });
        }
    });
});

module.exports = router;