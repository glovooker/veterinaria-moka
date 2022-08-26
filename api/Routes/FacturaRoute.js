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
        Estado: 1,
        NumeroFactura:body.NumeroFactura,
        _idCita: body._idCita,

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
    Factura.find((err, ListaFacturasDB) => {
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
          ListaFacturasDB,
        });
      }
    }).sort({Fecha:'desc'});
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




router.get('/BuscarFacturaPorId', (req, res) => {
    let params = req.query;
    Factura.findOne({ _id: params._id }, (err, FacturaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                FacturaDB
            });
        }
    });
});



router.post('/ModificarEstado', function(req, res){
    let body = req.body;
    Factura.updateOne({_id: body._id},{
       $set: {
        Estado: body.Estado
       }
    }, (err, info) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo actualizar los datos: ',
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






// este es solo para pruebas NO UTILIZAR YA QUE LA FACTURA NO SE MODIFICA SOLO EL ESTADO QUE ESTA ARRIBA SU FUNCION
router.post('/ModificarFacturaTesting', function(req, res){
    let body = req.body;
    Factura.updateOne({_id: body._id},{
       $set: {
        Fecha: body.Fecha,
        Identificacion: body.Identificacion
       }
    }, (err, info) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo actualizar los datos: ',
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




module.exports = router;