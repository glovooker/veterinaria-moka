'use strict';

const express = require('express');
const router = express.Router();
const Cita = require('../Models/CitaModel');

router.post('/RegistrarCita',(req, res)=>{
    let body = req.body;
    let nuevaCita = new Cita({
        FecInicio: body.FecInicio,
        HoraInicio: body.HoraInicio,
        FecFinal: body.FecFinal,
        HoraFinal: body.HoraFinal,
        Tipo: body.Tipo,
        Observaciones: body.Observaciones,
        MotivoCancela: body.MotivoCancela,  
        Estado: body.Estado,
        Estrellas: 0,
        _idVeterinario: body._idVeterinario,
        _idCliente: body._idCliente,
        _idMascota: body._idMascota 
    });
    nuevaCita.save((err, citaDB) =>{
        if (err) {
            res.json({
                resultado: false,
                msj: 'Error al registrar la cita :', err
                });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado exitosamente', citaDB
            });
        }
    });
});

router.get('/ListarCitas', (req, res)=>{ 
    Cita.find((err, ListaCitasBD) => {
        if (err) {
            res.json({
                resultado: false,
                msj:'No se pudo obtener los datos de las citas: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera satisfactoria',
                ListaCitasBD
            });
        }
    }).sort({FecInicio:-1, HoraInicio:1,FecFinal:1,FecFinal:1,_idVeterinario:1, _idCliente:1,_idMascota:1});
});

router.post('/ModificarCita', function(req, res){
    let body = req.body;
    Cita.updateOne({_id: body._id},{
       $set: {
             MotivoCancela: body.MotivoCancela,
             Estado: body.Estado,
             Estrellas: body.Estrellas
        }       
    }, (err, info) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo actualizar la cita: ',
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

router.get('/BuscarCita', (req, res) => {
    let params = req.query;
    if (params._id != "" && params._id != null && params._id!= undefined) {
        Cita.findOne({_id: params._id}, (err, citaDB) => {
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
                    citaDB
                });
            }
        } 
        );
    }
} );

module.exports = router;