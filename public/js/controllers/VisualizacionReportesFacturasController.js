'use strict';
/*para filtrar*/
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ObtenerListaFacturas);
let outputTotal = document.getElementById('txtTotal');
let outputTotalPendientes = document.getElementById('txtTotalPendientes');
let outputContPagadas = document.getElementById('txtContPagadas');
let outputContPendientes = document.getElementById('txtContPendientes');
let outputTotalFacturas = document.getElementById('txtTotalFacturas');
/* let arregloListaFacturas = []; */
let listaPersonas = [];

let posicionJ;
let facturasTotal = 0;

let btnfiltroFecha = document.getElementById('btnFiltroFechas');
let inputFechaInicio = document.getElementById('txtFechaInicio');
let inputFechaHasta = document.getElementById('txtFechaHasta');
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
  let arregloListaFacturas = [];
  let result = await ObtenerFacturaBaseDatos();
  if (result != {} && result.resultado == true) {
    arregloListaFacturas = result.ListaFacturasDB;
  }

  let lista = arregloListaFacturas.filter(
    (n) =>
      n.Fecha.substring(0, 10) >= inputFechaInicio.value &&
      n.Fecha.substring(0, 10) <= inputFechaHasta.value
  );
  ImprimirDatos(lista);
}

function Limpiar() {
  inputFechaInicio.value = '';
  inputFechaHasta.value = '';
  ObtenerListaFacturas();
}

function ValidarFecha() {
  let fecHoy = new Date();
  let fechaInicio = new Date(inputFechaInicio.value.replace('-', '/'));
  let fechaFinal = new Date(inputFechaHasta.value.replace('-', '/'));

  if (fechaInicio > fechaFinal) {
    ImprimirMsjError('La fecha de la inicio debe ser menor a la fecha final ');
    ResaltarInputInvalido('txtFechaIni');
    ResaltarLabelInvalido('txtFechaIni');
    return false;
  }
}

/****llamada de funcion***/

ObtenerListaFacturas();

/***********/

async function ObtenerListaFacturas() {
  let result = await ObtenerFacturaBaseDatos();
  if (result != {} && result.resultado == true) {
    let arregloListaFacturas = result.ListaFacturasDB;
    facturasTotal = arregloListaFacturas.length;
    console.log(arregloListaFacturas);
    await GetListaPersonas();
    ImprimirDatos(arregloListaFacturas);
  } else {
    ImprimirMsjError(result.msj);
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

async function ImprimirDatos(arregloListaFacturas) {
  let filtro = inputFiltro.value;
  let tbody = document.getElementById('tablaReportes');
  tbody.innerHTML = '';
  let nombrePersona;
  let sumaTotal = 0;
  let sumaTotalPendientes = 0;
  let contPendientes = 0;
  let contPagadas = 0;

  for (let i = 0; i < arregloListaFacturas.length; i++) {
    for (let j = 0; j < listaPersonas.length; j++) {
      if (listaPersonas[j]._id === arregloListaFacturas[i].Identificacion) {
        nombrePersona = listaPersonas[j].Nombre;
        posicionJ = j;
        break;
      }
    }

    if (
      arregloListaFacturas[i].NumeroFactura.toString().includes(filtro) ||
      ObtenerEstadoFactura(arregloListaFacturas[i].Estado)
        .toLowerCase()
        .includes(filtro) ||
      arregloListaFacturas[i].Fecha.toString().includes(filtro) ||
      nombrePersona.toLowerCase().includes(filtro) ||
      arregloListaFacturas[i].TotalAPagar.toString().includes(filtro) ||
      arregloListaFacturas[i].NumeroFactura.toString().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaNumeroFactura = fila.insertCell();
      let celdaCliente = fila.insertCell();
      let celdaFecha = fila.insertCell();
      let celdaMontoFacturado = fila.insertCell();
      let celdaEstado = fila.insertCell();
      let celdaAcciones = fila.insertCell();

      let btnVer = document.createElement('button');
      btnVer.onclick = function () {
        location.href =
          'VistaFactura.html?_idFactura=' + arregloListaFacturas[i]._id;
      };
      btnVer.type = 'button';
      btnVer.innerText = '🔍';
      btnVer.title = 'VER FACTURA';

      let divBtns = document.createElement('div');
      divBtns.appendChild(btnVer);
      celdaNumeroFactura.innerHTML = arregloListaFacturas[i].NumeroFactura;

      celdaCliente.innerHTML = nombrePersona;

      let fechaFacturacion = new Date(
        arregloListaFacturas[i].Fecha.replace('Z', '')
      );
      celdaFecha.innerHTML =
        fechaFacturacion.getDate() +
        '/' +
        (fechaFacturacion.getMonth() + 1) +
        '/' +
        fechaFacturacion.getFullYear();

      celdaMontoFacturado.innerHTML =
        '₡' + formatoNumero(arregloListaFacturas[i].TotalAPagar);
      celdaEstado.innerHTML = ObtenerEstadoFactura(
        arregloListaFacturas[i].Estado
      );
      celdaAcciones.appendChild(divBtns);
      if (ObtenerEstadoFactura(arregloListaFacturas[i].Estado) === 'Pagada') {
        sumaTotal = sumaTotal + arregloListaFacturas[i].TotalAPagar;
        contPagadas = contPagadas + 1;
      } else {
        if (
          ObtenerEstadoFactura(arregloListaFacturas[i].Estado) === 'Pendiente'
        ) {
          sumaTotalPendientes =
            sumaTotalPendientes + arregloListaFacturas[i].TotalAPagar;
          contPendientes = contPendientes + 1;
        }
      }
    }
  }
  outputTotal.innerHTML = '₡' + formatoNumero(sumaTotal);
  outputTotalPendientes.innerHTML = '₡' + formatoNumero(sumaTotalPendientes);
  outputContPagadas.innerHTML = contPagadas;
  outputContPendientes.innerHTML = contPendientes;
  outputTotalFacturas.innerHTML = facturasTotal;
}

$(document).ready(() => {
  $('th').each(function (columna) {
    $(this).click(function () {
      let datos = $('table').find('tbody > tr').get();

      datos.sort(function (a, b) {
        let valor1 = $(a).children('td').eq(columna).text().toUpperCase();
        let valor2 = $(b).children('td').eq(columna).text().toUpperCase();

        return valor1 < valor2 ? -1 : valor1 > valor2 ? 1 : 0;
      });

      $.each(datos, function (indice, elemento) {
        $('tbody').append(elemento);
      });
    });
  });
});
