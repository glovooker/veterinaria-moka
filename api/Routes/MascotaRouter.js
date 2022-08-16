'use strict';

const express = require('express');
const router = express.Router();
const Mascota = require('../Models/MascotaModel');

router.post('/RegistrarMascota', (req, res) => {
  let body = req.body;
  let nuevaMascota = new Mascota({
    Nombre: body.Nombre,
    Especie: body.Especie,
    Estrellas: body.Estrellas,
    FotoMascota: body.FotoMascota,
    Observaciones: body.Observaciones,
    IdPersona: body.IdPersona,
  });
  nuevaMascota.save((err, mascotaDB) => {
    if (err) {
      res.json({
        resultado: false,
        msj: 'Error al registrar la mascota : ',
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: 'Registro realizado de manera correcta',
        mascotaDB,
      });
    }
  });
});

router.get('/ListarMascota', (req, res) => {
  Mascota.find((err, ListaMascotaBD) => {
    if (err) {
      res.json({
        resultado: false,
        msj: 'No se pudo encontar la información',
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: 'La información se encontró con éxito',
        ListaMascotaBD,
      });
    }
  }).sort({ Nombre: 1, Rol: 1 });
});

router.get('/BuscarMascota', (req, res) => {
    let params = req.query;
    if (params._id != "" && params._id != null && params._id!= undefined) {
       Mascota.findOne({_id: params._id}, (err, mascotaDB) => {
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
                    mascotaDB
                });
            }
        } 
        );
    }
} );

router.post('/ModificarMascota', function (req, res) {
  let body = req.body;
  Mascota.updateOne(
    { IdPersona: body.IdPersona },
    {
      $set: req.body,
    },
    function (err, info) {
      if (err) {
        res.json({
          resultado: false,
          msj: 'No se pudo actualizar los datos: ',
          err,
        });
      } else {
        res.json({
          resultado: false,
          msj: 'Los datos se han actualizado con éxito',
          info,
        });
      }
    }
  );
});

router.get('/BuscarMascotasPersona', (req, res) => {
  let params = req.query;
  if (
    params.IdPersona != '' &&
    params.IdPersona != null &&
    params.IdPersona != undefined
  ) {
    Mascota.find({ IdPersona: params.IdPersona }, (err, IdPersonaBD) => {
      if (err) {
        res.json({
          resultado: false,
          msj: 'No se pudo encontar la información',
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: 'La información se encontró con éxito',
          IdPersonaBD,
        });
      }
    });
  } else if (
    params.IdPersona != '' &&
    params.IdPersona != null &&
    params.IdPersona != undefined &&
    (params.Nombre == '' || params.Nombre == null || params.Nombre == undefined)
  ) {
    Mascota.find({ IdPersona: params.IdPersona }, (err, IdPersonaBD) => {
      if (err) {
        res.json({
          resultado: false,
          msj: 'No se pudo obtener datos: ',
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: 'Los datos se obtuvieron de manera correcta por id: ',
          IdPersonaBD,
        });
      }
    });
  }
});

module.exports = router;
