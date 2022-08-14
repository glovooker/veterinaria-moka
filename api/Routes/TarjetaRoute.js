"use strict";

const express = require("express");
const router = express.Router();
const Tarjeta = require("../Models/TarjetaModel");

router.post("/RegistrarTarjeta", (req, res) => {
  let body = req.body;
  let nuevaTarjeta = new Tarjeta({
    NumTarjeta: body.NumTarjeta,
    FecExpira: body.FecExpira,
    Cvv: body.Cvv,
    Nombre: body.Nombre,
    _idPersona: body._idPersona,
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

router.get("/ListarTarjetas", (req, res) => {
  Tarjeta.find((err, ListaTarjetasBD) => {
    if (err) {
      res.json({
        resultado: false,
        msj: "No se pudo obtener los datos: ",
        err,
      });
    } else {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        ListaTarjetasBD,
      });
    }
  });
});

router.get("/ListarTarjetasCliente", (req, res) => {
  let params = req.query;
   if ((params._idPersona != "" && params._idPersona != null && params._idPersona!= undefined) && (params.Cedula == "" || params.Cedula == null || params.Cedula == undefined)){
   Tarjeta.find({ _idPersona: params._idPersona }, (err, tarjetaDB) => {
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
}});

router.delete("/EliminarTarjetas", function (req, res) {
  let body = req.body;
  Tarjeta.remove({ _id: body._id }, (err, result) => {
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
