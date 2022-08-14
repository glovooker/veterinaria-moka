"use strict";

const mongoose = require("mongoose");

const schemaTarjeta = new mongoose.Schema({
  NumTarjeta: { type: Number, requiered: true, unique: true },
  FecExpira: { type: String, requiered: true, unique: false },
  Cvv: { type: Number, requiered: true, unique: false },
  Nombre: { type: String, requiered: false, unique: false },
  _idPersona: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Tarjeta", schemaTarjeta, "Tarjetas");
