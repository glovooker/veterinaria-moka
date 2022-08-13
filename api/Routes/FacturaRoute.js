'use strict';

const express = require('express');
const router = express.Router();
const Factura = require('../Models/FacturaModel');



router.post('/RegistrarFactura', (req,res) => {
    let body=req.body;
    let nuevaFactura = new Factura({
        //LOS DE LA IZQUIERDA o SEA LOS KEYS HACEN REFERENCIAL AL MODELO , HAY QUE PONERLOS IGUAL AL MODELO
        Identificacion:  body.Identificacion,
        TotalAPagar: body.TotalAPagar,
        Fecha: body.Fecha,
        Estado: 0

    });
    nuevaFactura.save((err,FacturaDB) => {
        if(err){
            res.json({
                resultado:false,
                msj:'No ha podido resgistrar la persona a causa del siguiente error: ', err
            })
        }else{
            res.json({
                resultado:true,
                msj:'Registro realizado de manera correcta',
                FacturaDB
            })
        }
    });
});




router.get('/ListarFacturas', (req, res) => {
    Factura.find((err, ListaFacturasBD) => {
      if (err) {
        res.json({
          resultado: false,
          msj: 'No se pudo obtener los datos: ',
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: 'Los datos se obtuvieron de manera correcta: ',
          ListaFacturasBD,
        });
      }
    });
  });






  router.post('/RegistrarDetalles', function (req, res) {
   
    let body = req.body;
    let detalles = JSON.parse(body.Detalles);
    let mi_id = body._id;
    let error;
    detalles.forEach(item => {
        setTimeout(function () {
            Factura.updateOne({ _id: mi_id }, {
                $push:{
                    Detalles:
                    {
                        Cantidad: item.Cantidad,
                        Descripcion: item.Descripcion,
                        PrecioUnitario:item.PrecioUnitario,
                        SubTotal: item.SubTotal

                    }
                }
            }, (err) => {
                if(err){
                    error = err;
                }
            });
        }, 3000);
    });

    if (error) {
        res.json({
            resultado: false,
            msj: 'Ocurrio un error inesperado y no se pudieron actualizar los intereses',
            error
        });
    } else {

       return res.json({
            resultado: true,
            msj: 'Los datos se actualizaron de manera correcta',
        });
    }
});

module.exports = router;