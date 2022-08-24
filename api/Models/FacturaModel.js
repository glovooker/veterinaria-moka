'use strict';
const mongoose = require('mongoose');
const schemaFacturas = new mongoose.Schema({
    Identificacion: {type:String, required:false, unique:false},
    Detalles: [{
            Cantidad:{ type: Number, required: false, unique: false },
            Descripcion:{ type: String, required: false, unique: false },
            PrecioUnitario:{ type: Number, required: false, unique: false },
            SubTotal:{ type: Number, required:false, unique: false }
            
        }],
    TotalAPagar: { type: Number, required: false, unique: false}, 
    Fecha: { type: Date, required: false, unique: false},
    Estado: { type: Number, required: false, unique: false},
    NumeroFactura: {type:Number, required: false, unique: false}


});

    

module.exports = mongoose.model('Factura', schemaFacturas, 'Facturas')