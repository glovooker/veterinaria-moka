"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Tarjeta = require("../Models/MetodosPagoModel");

router.post("/RegistrarTarjeta", (req, res) => {
  let body = req.body;
  let nuevaTarjeta = new Tarjeta({
    _idC: body._idC,
    NumTarjeta: body.NumTarjeta,
    FecExpira: body.FecExpira,
    Cvv: body.Cvv,
    Nombre: body.Nombre,
  });
  nuevaTarjeta.save((err, tarjetaDB) => {
    if (err) {
      res.json({
        resultado: false,
        msj: "No se pudo registrar la tarjeta, ocurrio el siguiente error: ",
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta",
        tarjetaDB,
      });
    }
  });
});

router.get("/obtener-tarjetas", (req, res) => {
  Tarjeta.find((error, lista) => {
    if (error) {
      res.json({
        msj: "No se pudo hacer el listado de usuarios",
        error,
      });
    } else {
      res.json({
        msj: "Usuario listados correctamente",
        lista,
      });
    }
  });
});

router.get("/ListarTarjetasCliente", (req, res) => {
  let params = req.query;
  // console.log(params._idC);
  if (params._idC != "" && params._idC != null && params._idC != undefined) {
    Tarjeta.find({ _idC: params._idC }, (err, tarjetaDB) => {
      if (err) {
        res.json({
          resultado: false,
          msj: "No se pudo obtener datos: ",
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: "Los datos se obtuvieron de manera correcta por id: ",
          tarjetaDB,
        });
      }
    });
  }
});

router.delete("/EliminarTarjetas", function (req, res) {
  let body = req.body;
  Tarjeta.remove({ _idC: body._idC }, (err, result) => {
    if (err) {
      res.json({
        resultado: false,
        msj: "No se pudo eliminar los datos: ",
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: "Los datos se eliminarion de manera correcta",
        result,
      });
    }
  });
});

module.exports = router;
