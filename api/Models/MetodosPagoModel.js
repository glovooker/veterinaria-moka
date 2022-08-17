"use strict";

const mongoose = require("mongoose");

const schemaTarjeta = new mongoose.Schema({
  NumTarjeta: { type: Number, required: true, unique: true },
  FecExpira: { type: String, required: true, unique: false },
  Cvv: { type: Number, required: true, unique: false },
  Nombre: { type: String, required: false, unique: false },
});

module.exports = mongoose.model("Tarjeta", schemaTarjeta, "Tarjetas");
