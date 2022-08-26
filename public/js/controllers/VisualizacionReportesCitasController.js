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
  let result = await ObtenerListaCitas('C');

  if (result != {} && result.resultado == true) {
    listaCitas = result.ListaCitasBD;
  }
  let lista = listaCitas.filter(
    (n) =>
      n.FecInicio >= inputFechaInicio.value &&
      n.FecInicio <= inputFechaHasta.value
  );
  /*  console.log(lista) */
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
  let result = await ObtenerListaCitas('C');
  if (result != {} && result.resultado == true) {
    let listaCitas = result.ListaCitasBD;
    totalCitas = listaCitas.length;
    /* console.log(listaCitas) */
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
  let vetNombre, clienteNombre, mascotaNombre;
  tbody.innerHTML = '';
  let contFinalizadas = 0;
  let contCanceladas = 0;
  let contAprobadas = 0;

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
    for (let l = 0; l < listaPersonas.length; l++) {
      if (listaPersonas[l]._id === listaCitas[i]._idVeterinario) {
        vetNombre = listaPersonas[l].Nombre;
        break;
      }
    }

    if (
      ObtenerEstadoCita(listaCitas[i].Estado).toLowerCase().includes(filtro) ||
      clienteNombre.toLowerCase().includes(filtro) ||
      listaCitas[i].FecInicio.toString().includes(filtro) ||
      mascotaNombre.toLowerCase().includes(filtro) ||
      vetNombre.toLowerCase().includes(filtro) ||
      listaCitas[i].HoraInicio.toString().includes(filtro) ||
      listaCitas[i].HoraFinal.toString().includes(filtro) ||
      listaCitas[i].Observaciones.toLowerCase().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaFecha = fila.insertCell();
      let celdaNombreCliente = fila.insertCell();
      let celdaNombreMascota = fila.insertCell();
      let celdaHoraInicio = fila.insertCell();
      let celdaNombreVet = fila.insertCell();
      let celdaEstado = fila.insertCell();
      let celdaObservaciones = fila.insertCell();

      /* let btnVer = document.createElement('button');
            btnVer.onclick = function(){
                location.href = 'VistaFactura.html?_id=' + arregloListaFacturas[i]._id
            };
            btnVer.type = 'button';
            btnVer.innerText = '🔍';
            btnVer.title = 'VER FACTURA';
            let divBtns = document.createElement('div');
            divBtns.appendChild(btnVer); */
      let fechaCita = new Date(listaCitas[i].FecInicio.replace('-', '/'));
      celdaFecha.innerHTML =
        fechaCita.getDate() +
        '/' +
        (fechaCita.getMonth() + 1) +
        '/' +
        fechaCita.getFullYear();

      celdaNombreCliente.innerHTML = clienteNombre;

      celdaNombreMascota.innerHTML = mascotaNombre;

      celdaHoraInicio.innerHTML = listaCitas[i].HoraInicio;

      celdaNombreVet.innerHTML = vetNombre;

      celdaEstado.innerHTML = ObtenerEstadoCita(listaCitas[i].Estado);
      if (ObtenerEstadoCita(listaCitas[i].Estado) === 'Aprobado') {
        contAprobadas = contAprobadas + 1;
      }
      if (ObtenerEstadoCita(listaCitas[i].Estado) === 'Finalizado') {
        contFinalizadas = contFinalizadas + 1;
      }
      if (ObtenerEstadoCita(listaCitas[i].Estado) === 'Cancelado') {
        contCanceladas = contCanceladas + 1;
      }
      celdaObservaciones.innerHTML = listaCitas[i].Observaciones;
    }
  }
  // document.getElementById('outputTotalCitas').innerHTML = totalCitas;
  // document.getElementById('outputAprobadas').innerHTML = contAprobadas;
  // document.getElementById('outputFinalizadas').innerHTML = contFinalizadas;
  // document.getElementById('outputCanceladas').innerHTML = contCanceladas;
}
