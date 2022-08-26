'use strict';

// let mascotaConsultada = GetMascotaConsultada();

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

let _id = urlParams.get('_id');

let mascotaOutput = document.getElementById('outMascota');
let clienteOuput = document.getElementById('outCliente');
let observaciones = document.getElementById('txtObservaciones');
let totalPagar = document.getElementById('outTotal');
let selectMetodo = document.getElementById('selMetodoPago');
let ccv = document.getElementById('txtCcv');

let boton_realizar = document.getElementById('btnPagar');
let btnAgregarMetodo = document.getElementById('btnAgregarMetodo');


CargarDatos();

function CargarDatos(pPersona, pMascota, pFactura){
    mascotaOutput.value = pMascota.Nombre;
    clienteOuput.value = pPersona.Nombre;
    totalPagar.value = pFactura.TotalAPagar;
}






