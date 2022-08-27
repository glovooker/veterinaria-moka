'use strict';

let btnMascota1 = document.getElementById('btnMascota1');

// btnMascota1.addEventListener('click', CrearMascota1);

let PersonaLogueada = GetSesionActiva();

const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);

let listaMascota = [];

GetListaMascota();

async function GetListaMascota() {
  let result = await ObtenerListaMascota();
  if (result != {} && result.resultado == true) {
    listaMascota = result.ListaMascotaBD;
    ImprimirDatos();
  } else {
    imprimirMsjError(result.msj);
    return;
  }
}

async function ImprimirDatos() {
  let filtro = inputFiltro.value;
  filtro = filtro.toLowerCase();
  let tbody = document.getElementById('tbdMascotas');
  tbody.innerHTML = '';

  for (let i = 0; i < listaMascota.length; i++) {
    let mascotaNombre = listaMascota[i].Nombre;
    let mascotaEspecie = listaMascota[i].Especie;

    if (
      mascotaNombre != null &&
      mascotaEspecie != null &&
      mascotaNombre != undefined &&
      mascotaEspecie != undefined
    ) {
      mascotaNombre = mascotaNombre.toLowerCase();
      mascotaEspecie = mascotaEspecie.toLowerCase();
      ////////////////////////////////////////////////////////////////////
      if (mascotaNombre.includes(filtro) || mascotaEspecie.includes(filtro)) {
        //FILTROS //////////////////////////////////////////////////////////
        if (
          PersonaLogueada.Rol == 0 ||
          PersonaLogueada.Rol == 1 ||
          (PersonaLogueada.Rol == 2 &&
            PersonaLogueada._id == listaMascota[i].IdPersona) ||
          (PersonaLogueada.Rol == 3 &&
            PersonaLogueada._id == listaMascota[i].IdPersona)
        ) {
          let fila = tbody.insertRow();
          let celdaNombre = fila.insertCell();
          let celdaEspecie = fila.insertCell();
          let celdaObservaciones = fila.insertCell();
          let celdaAcciones = fila.insertCell();

          ////////////////////////////////////////////////////
          //VER PERFIL MASCOTA
          ////////////////////////////////////////////////////
          let btnVerMascota = document.createElement('button');
          btnVerMascota.onclick = function () {
            LimpiarLSMascotaConsultada();
            SetMascotaConsultada(listaMascota[i]);
            const timeoutId = setTimeout(function () {
              window.location.replace('./PerfilMascota.html?acc=Q');
            }, 1000);
          };
          btnVerMascota.type = 'button';
          btnVerMascota.innerText = '🔍​';
          btnVerMascota.title = 'Ver Perfil Mascota';
          btnVerMascota.classList.add('DetalleBtn');

          ////////////////////////////////////////////////////
          //MODIFICAR MASCOTA
          ////////////////////////////////////////////////////
          let btnEdit = document.createElement('button');
          btnEdit.onclick = function () {
            LimpiarLSMascotaConsultada();
            SetMascotaConsultada(listaMascota[i]);
            const timeoutId = setTimeout(function () {
              window.location.replace(
                './RegistrarMascota.html?acc=M&_id=' + listaMascota[i]._id
              );
            }, 1000);
          };

          btnEdit.type = 'button';
          btnEdit.innerText = '✏️​';
          btnEdit.title = 'Editar';
          btnEdit.classList.add('modificarBtn');

          ////////////////////////////////////////////////////
          //Expediente Detalle
          ////////////////////////////////////////////////////
          let btnCrearReser = document.createElement('button');
          btnCrearReser.onclick = function () {
            LimpiarLSMascotaConsultada();
            SetMascotaConsultada(listaMascota[i]);
            const timeoutId = setTimeout(function () {
              window.location.replace('./ExpedienteDetalle.html?acc=Q');
            }, 1000);
          };

          btnCrearReser.type = 'button';
          btnCrearReser.innerText = '📝';
          btnCrearReser.title = 'Expediente';
          btnCrearReser.classList.add('eliminarBtn');

          let divBtns = document.createElement('div');
          divBtns.appendChild(btnVerMascota);
          divBtns.appendChild(btnEdit);
          divBtns.appendChild(btnCrearReser);
          //////////////////////////////////////////////////
          //Imorimir Datos de la Mascota
          ///////////////////////////////////////////////////

          celdaNombre.innerHTML = listaMascota[i].Nombre;
          celdaEspecie.innerHTML = listaMascota[i].Especie;
          celdaObservaciones.innerHTML = listaMascota[i].Observaciones;
          celdaAcciones.appendChild(divBtns);
        }
      }
    }
  }
}

function CrearMascota1() {
  window.location.replace('./RegistrarMascota.html?acc=C');
}

async function CrearMascota() {
  let result = await RegistrarMascota(
    document.getElementById('txtNombreMascota').value,
    document.getElementById('txtTipoDeMascota').value,
    '5',
    document.getElementById('txtInfoAdicional').value,
    document.getElementById('btnSubirImg').value,
    JSON.parse(localStorage.getItem('datosPersonaConsultada'))._id
  );

  if (result.resultado == true) {
    ImprimirMsjSuccess(result.msj);
    const timeoutId = setTimeout(function () {
      if (acc == 'N') {
        window.location.replace('./CrudMascotas.html');
      } else {
        window.location.replace('./CrudMascotas.html');
      }
    }, 2000);
  } else {
    ImprimirMsjError(result.msj);
  }
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
