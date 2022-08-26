'use strict';

let PersonaLogueada = GetSesionActiva();
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

let mascotaOutput = document.getElementById('outMascota');
let clienteOuput = document.getElementById('outCliente');
let observaciones = document.getElementById('txtObservaciones');
let totalPagar = document.getElementById('outTotal');
let selectMetodo = document.getElementById('selMetodoPago');
let ccv = document.getElementById('txtCcv');

let boton_realizar = document.getElementById('btnPagar');
let btnAgregarMetodo = document.getElementById('btnAgregarMetodo');





async function CargarDatos() {
    let consultante = await DatosPersona(mascotaConsultada.IdPersona);

    mascotaOutput.value = mascotaConsultada.Nombre;
    clienteOuput.value = consultante.Duenno;
    totalPagar.value = pCita.Usuario;
    selectMetodo.value = pCita.Especie;
}

