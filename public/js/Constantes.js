'use strict';
const apiUrl = 'http://localhost:3000/api';

function ObtenerEstado(pEstado) {
  switch (Number(pEstado)) {
    case 1:
      return 'Activo';
    default:
      return 'Inactivo';
  }
}

function ObtenerRol(pRol) {
  switch (Number(pRol)) {
    case 0:
      return 'Administrador';
    case 1:
      return 'Secretaria';
    case 2:
      return 'Veterinario';
    case 3:
      return 'Cliente';
  }
}

function ImprimirMsjError(msj) {
  Swal.fire({
    title: 'Error!',
    text: msj,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
}

function ImprimirMsjSuccess(msj) {
  Swal.fire({
    title: 'Excelente!',
    text: msj,
    icon: 'success',
    confirmButtonText: 'Ok',
  });
}

function LabelInvalido(plabelID) {
  var obj = document.getElementById(plabelID);
  var orig = obj.style;
  obj.style = 'color:red;';

  setTimeout(function () {
    obj.style = orig;
  }, 4000);
}

function InputInvalido(pinputID) {
  var obj = document.getElementById(pinputID);
  var orig = obj.style;
  obj.style = 'border: 1px solid red;';

  setTimeout(function () {
    obj.style = orig;
  }, 5000);
}

function TxtInvalido(ptextareaID) {
  var obj = document.getElementById(ptextareaID);
  var orig = obj.style;
  obj.style = 'border: 1px solid red;';

  setTimeout(function () {
    obj.style = orig;
  }, 5000);
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
    ].join(':')
  );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function ObtenerEstadoCita(pEstado) {
  switch (pEstado) {
    case 'R':
      return 'Registrado';
    case 'A':
      return 'Aprobado';
    case 'C':
      return 'Cancelado';
    case 'F':
      return 'Finalizado';
    case 'P':
      return 'Pagado';
  }
}

function ObtenerTipoCita(pTipo) {
  switch (pTipo) {
    case 'C':
      return 'Cita';
    default:
      return 'Reservación';
  }
}

function ObtenerEstadoFactura(pEstado) {
  switch (Number(pEstado)) {
    case 1:
      return 'Pendiente';
    default:
      return 'Pagada';
  }
}

const formatoNumero = (number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1,';
  return number.toString().replace(exp, rep);
};


//funcion para truncar numeros
    
function trunc (x, posiciones = 0) {
  var s = x.toString()
  var l = s.length
  var decimalLength = s.indexOf('.') + 1
  var numStr = s.substr(0, decimalLength + posiciones)
  return Number(numStr)
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