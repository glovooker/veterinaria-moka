'use strict';
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', GetListaCitas);

/* let listaCitas = []; */
let listaPersonas = [];
let listaMascotas = [];
let totalCitas;
/****llamada de funcion***/
GetListaCitas();
/******************/

let btnfiltroFecha = document.getElementById('btnFiltroFechas');
let inputFechaInicio = document.getElementById('txtFechaInicio');
let inputFechaHasta = document.getElementById('txtFechaFin');
let btnLimpiar = document.getElementById('btnLimpiar');

btnfiltroFecha.addEventListener('click', FiltrarPorFechas);
btnLimpiar.addEventListener('click', Limpiar);

async function FiltrarPorFechas() {
  if (ValidarCampos() === false) {
    return false;
  } else {
    if (ValidarFecha() === false) {
      return false;
    }
  }
  let listaCitas = [];
  let result = await ObtenerListaCitas('R');

  if (result != {} && result.resultado == true) {
    listaCitas = result.ListaCitasBD;
  }
  let lista = listaCitas.filter(
    (n) =>
      n.FecInicio >= inputFechaInicio.value &&
      n.FecInicio <= inputFechaHasta.value
  );
  //   console.log(lista);
  ImprimirDatos(lista);
}

function Limpiar() {
  inputFechaInicio.value = '';
  inputFechaHasta.value = '';
  GetListaCitas();
}

function ValidarFecha() {
  let fechaInicio = new Date(inputFechaInicio.value.replace('-', '/'));
  let fechaFinal = new Date(inputFechaHasta.value.replace('-', '/'));

  if (fechaInicio > fechaFinal) {
    ImprimirMsjError('La fecha de la inicio debe ser menor a la fecha final ');
    ResaltarInputInvalido('txtFechaIni');
    ResaltarLabelInvalido('txtFechaIni');
    return false;
  }
}

/*************************************/

async function GetListaCitas() {
  let result = await ObtenerListaCitas('R');
  if (result != {} && result.resultado == true) {
    let listaCitas = result.ListaCitasBD;
    totalCitas = listaCitas.length;
    console.log(listaCitas);
    await GetListaPersonas();
    await GetListaMascota();
    ImprimirDatos(listaCitas);
  } else {
    imprimirMsjError(result.msj);
    return;
  }
}

async function GetListaPersonas() {
  let result = await ObtenerListaPersonas();
  if (result != {} && result.resultado == true) {
    listaPersonas = result.ListaPersonasBD;
  } else {
    imprimirMsjError(result.msj);
    return;
  }
}

async function GetListaMascota() {
  let result = await ObtenerListaMascota();
  if (result != {} && result.resultado == true) {
    listaMascotas = result.ListaMascotaBD;
  } else {
    imprimirMsjError(result.msj);
    return;
  }
}

async function ImprimirDatos(listaCitas) {
  let filtro = inputFiltro.value;
  let tbody = document.getElementById('tablaReportes');
  let clienteNombre, mascotaNombre;
  tbody.innerHTML = '';
  /*  let contFinalizadas=0;
    let contCanceladas=0;
    let contAprobadas=0 */

  for (let i = 0; i < listaCitas.length; i++) {
    for (let j = 0; j < listaPersonas.length; j++) {
      if (listaPersonas[j]._id === listaCitas[i]._idCliente) {
        clienteNombre = listaPersonas[j].Nombre;
        break;
      }
    }
    for (let k = 0; k < listaMascotas.length; k++) {
      if (listaMascotas[k]._id === listaCitas[i]._idMascota) {
        mascotaNombre = listaMascotas[k].Nombre;
        break;
      }
    }

    if (
      ObtenerEstadoCita(listaCitas[i].Estado).toLowerCase().includes(filtro) ||
      listaCitas[i].FecInicio.toString().includes(filtro) ||
      listaCitas[i].FecFinal.toString().includes(filtro) ||
      listaCitas[i].HoraInicio.toString().includes(filtro) ||
      listaCitas[i].HoraFinal.toString().includes(filtro) ||
      clienteNombre.toLowerCase().includes(filtro) ||
      mascotaNombre.toLowerCase().includes(filtro) ||
      listaCitas[i].Observaciones.toLowerCase().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaFechaEntrada = fila.insertCell();
      let celdaFechaSalida = fila.insertCell();
      let celdaHoraInicio = fila.insertCell();
      let celdaHoraFinal = fila.insertCell();
      let celdaNombreCliente = fila.insertCell();
      let celdaNombreMascota = fila.insertCell();
      let celdaObservaciones = fila.insertCell();

      let fechaCita = new Date(listaCitas[i].FecInicio.replace('-', '/'));
      celdaFechaEntrada.innerHTML =
        fechaCita.getDate() +
        '/' +
        (fechaCita.getMonth() + 1) +
        '/' +
        fechaCita.getFullYear();

      let fechaCitaSalida = new Date(listaCitas[i].FecFinal.replace('-', '/'));
      celdaFechaSalida.innerHTML =
        fechaCitaSalida.getDate() +
        '/' +
        (fechaCitaSalida.getMonth() + 1) +
        '/' +
        fechaCitaSalida.getFullYear();

      celdaHoraInicio.innerHTML = listaCitas[i].HoraInicio;
      celdaHoraFinal.innerHTML = listaCitas[i].HoraFinal;

      celdaNombreCliente.innerHTML = clienteNombre;

      celdaNombreMascota.innerHTML = mascotaNombre;

      celdaObservaciones.innerHTML = listaCitas[i].Observaciones;
    }
  }
  // document.getElementById('outputTotalCitas').innerHTML =  totalCitas;
  /*   document.getElementById('outputAprobadas').innerHTML = contAprobadas
    document.getElementById('outputFinalizadas').innerHTML = contFinalizadas
    document.getElementById('outputCanceladas').innerHTML = contCanceladas */
}
