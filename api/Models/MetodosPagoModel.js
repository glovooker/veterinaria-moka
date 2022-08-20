"use strict";

const mongoose = require("mongoose");

const schemaTarjeta = new mongoose.Schema({
  _idC: { type: String, required: true, unique: false },
  NumTarjeta: { type: Number, required: true, unique: false },
  FecExpira: { type: String, required: true, unique: false },
  Cvv: { type: Number, required: true, unique: false },
  Nombre: { type: String, required: false, unique: false },
});

module.exports = mongoose.model("Tarjeta", schemaTarjeta, "Tarjetas");
