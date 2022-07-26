'use strict';

let PersonaLogueada = GetSesionActiva();
console.log(PersonaLogueada);

const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);

let listaCitas = [];

GetListaCitas();

async function GetListaCitas() {
  let result = await ObtenerListaCitas('C');
  if (result != {} && result.resultado == true) {
    listaCitas = result.ListaCitasBD;
    ImprimirDatos();
  } else {
    imprimirMsjError(result.msj);
    return;
  }
}

async function ImprimirDatos() {
  let filtro = inputFiltro.value;
  filtro = filtro.toLowerCase();
  let tbody = document.getElementById('tbdCitas');
  tbody.innerHTML = '';

  console.log(listaCitas.length);

  for (let i = 0; i < listaCitas.length; i++) {
    let veterinario = await DatosPersona(listaCitas[i]._idVeterinario, null);
    let cliente = await DatosPersona(listaCitas[i]._idCliente, null);
    let mascota = await DatosMascota(listaCitas[i]._idMascota);
    let estadoCita = ObtenerEstadoCita(listaCitas[i].Estado);

    let veterinarioNombre = veterinario.Nombre;
    let clienteNombre = cliente.Nombre;
    let mascotaNombre = mascota.Nombre;
    let estadoCitaActual = estadoCita;

    console.log(listaCitas[i]);

    if (
      veterinarioNombre != null &&
      clienteNombre != null &&
      mascotaNombre != null &&
      veterinarioNombre != undefined &&
      clienteNombre != undefined &&
      mascotaNombre != undefined
    ) {
      veterinarioNombre = veterinarioNombre.toLowerCase();
      clienteNombre = clienteNombre.toLowerCase();
      mascotaNombre = mascotaNombre.toLowerCase();
      estadoCitaActual = estadoCitaActual.toLowerCase();

      //FILTROS //////////////////////////////////////////////////////////
      if (
        veterinarioNombre.includes(filtro) ||
        clienteNombre.includes(filtro) ||
        mascotaNombre.includes(filtro) ||
        estadoCitaActual.includes(filtro)
      ) {
        //////////////////////////////////////////////////////////////////
        if (
          PersonaLogueada.Rol == 0 ||
          PersonaLogueada.Rol == 1 ||
          (PersonaLogueada.Rol == 2 &&
            PersonaLogueada._id == listaCitas[i]._idVeterinario) ||
          (PersonaLogueada.Rol == 3 &&
            PersonaLogueada._id == listaCitas[i]._idCliente)
        ) {
          //////////////////////////////////////////////////////////////////

          let fila = tbody.insertRow();
          let celdaFecha = fila.insertCell();
          let celdaHora = fila.insertCell();
          let celdaVeterinario = fila.insertCell();
          let celdaCliente = fila.insertCell();
          let celdaMascota = fila.insertCell();
          let celdaEstado = fila.insertCell();
          let celdaObservaciones = fila.insertCell();
          let celdaAcciones = fila.insertCell();

          ////////////////////////////////////////////////////
          //Aprobar Cita
          ////////////////////////////////////////////////////
          let btnAprobar = document.createElement('button');
          btnAprobar.onclick = async function () {
            let confirmacion = false;
            await Swal.fire({
              title: 'Desea Aprobar la cita ' + mascota.Nombre,
              showDenyButton: true,
              confirmButtonText: 'Confirmar',
              denyButtonText: 'Cancelar',
              icon: 'warning',
            }).then((res) => {
              confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
              let result = await ModificarCita(
                listaCitas[i]._id,
                '',
                'A',
                listaCitas[i].Estrellas,
                listaCitas[i].EstrellasVeterinario,
                listaCitas[i].ObservacionesVeterinario
              );

              if (result.resultado == true) {
                ImprimirMsjSuccess(result.msj);
              } else {
                ImprimirMsjError(result.msj);
              }
              await GetListaCitas();
            }
          };
          btnAprobar.type = 'button';
          btnAprobar.innerText = 'A​';
          btnAprobar.title = 'Aprobar Cita';
          btnAprobar.classList.add('DetalleBtn');

          ////////////////////////////////////////////////////
          //Cancelar Cita
          ////////////////////////////////////////////////////
          let btnCancelar = document.createElement('button');
          btnCancelar.onclick = async function () {
            let confirmacion = false;
            await Swal.fire({
              title: 'Desea Cancelar la cita ' + mascota.Nombre,
              showDenyButton: true,
              confirmButtonText: 'Confirmar',
              denyButtonText: 'Cancelar',
              icon: 'warning',
            }).then((res) => {
              confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
              let result = await ModificarCita(
                listaCitas[i]._id,
                'Cancelacion',
                'C',
                listaCitas[i].Estrellas,
                listaCitas[i].EstrellasVeterinario,
                listaCitas[i].ObservacionesVeterinario
              );

              if (result.resultado == true) {
                ImprimirMsjSuccess(result.msj);
              } else {
                ImprimirMsjError(result.msj);
              }

              await GetListaCitas();
            }
          };

          btnCancelar.type = 'button';
          btnCancelar.innerText = 'C​';
          btnCancelar.title = 'Cancelar Cita';
          btnCancelar.classList.add('modificarBtn');

          ////////////////////////////////////////////////////
          //Finalizar Cita
          ////////////////////////////////////////////////////
          let btnFinalizar = document.createElement('button');

          btnFinalizar.onclick = async function () {
            let confirmacion = false;

            await Swal.fire({
              title: 'Desea finalizar la cita ' + mascota.Nombre,
              showDenyButton: true,
              confirmButtonText: 'Confirmar',
              denyButtonText: 'Cancelar',
              icon: 'warning',
            }).then((res) => {
              confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
              window.location.replace(
                './FinalizarCitaReservacion.html?_idCita=' + listaCitas[i]._id
              );
            }
          };

          btnFinalizar.type = 'button';
          btnFinalizar.innerText = 'F';
          btnFinalizar.title = 'Finalizar Cita';
          btnFinalizar.classList.add('eliminarBtn');

          ////////////////////////////////////////////////////
          //Pagar Cita
          ////////////////////////////////////////////////////
          let btnPagar = document.createElement('button');

          btnPagar.onclick = async function () {
            let confirmacion = false;

            await Swal.fire({
              title: 'Desea pagar la cita ' + mascota.Nombre,
              showDenyButton: true,
              confirmButtonText: 'Confirmar',
              denyButtonText: 'Cancelar',
              icon: 'warning',
            }).then((res) => {
              confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
              window.location.replace(
                './ReservacionPagoServicios.html?id=' + listaCitas[i]._id
              );
            }
          };

          btnPagar.type = 'button';
          btnPagar.innerText = 'P';
          btnPagar.title = 'Pagar Cita';
          btnPagar.classList.add('modificarBtn');

          ////////////////////////////////////
          //Incluir los botones en Acciones
          ////////////////////////////////////

          let divBtns = document.createElement('div');

          if (PersonaLogueada.Rol == 0 || PersonaLogueada.Rol == 1) {
            if (listaCitas[i].Estado == 'R') {
              divBtns.appendChild(btnAprobar);
            }
          }

          if (listaCitas[i].Estado == 'R' || listaCitas[i].Estado == 'A') {
            divBtns.appendChild(btnCancelar);
          }

          if (PersonaLogueada.Rol == 0 || PersonaLogueada.Rol == 2) {
            if (listaCitas[i].Estado == 'A') {
              divBtns.appendChild(btnFinalizar);
            }
          }

          if (listaCitas[i].Estado == 'F') {
            divBtns.appendChild(btnPagar);
          }

          ///////////////////////////////////////////
          //Imorimir Datos de la Cita
          ///////////////////////////////////////////
          celdaFecha.innerHTML = listaCitas[i].FecInicio;
          celdaHora.innerHTML = listaCitas[i].HoraInicio;
          celdaVeterinario.innerHTML = veterinario.Nombre;
          celdaCliente.innerHTML = cliente.Nombre;
          celdaMascota.innerHTML = mascota.Nombre;
          celdaEstado.innerHTML = estadoCita;
          celdaObservaciones.innerHTML = listaCitas[i].Observaciones;
          celdaAcciones.appendChild(divBtns);
        } //roles
      }
    } //filtros
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
