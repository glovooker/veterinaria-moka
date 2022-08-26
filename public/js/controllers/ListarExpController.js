'use strict';

let PersonaLogueada = GetSesionActiva();
console.log(PersonaLogueada);

const cuerpoTabla = document.getElementById('tbdPlatillos');
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', imprimirDatos);

let listaExpediente = [];

ObtenerExpedienteLista();

async function ObtenerExpedienteLista() {
  let result = await GetExpediente();
  if (result != {} && result.resultado == true) {
    listaExpediente = result.ListaExpedienteDB;
    imprimirDatos();
    console.log(listaExpediente);
  } else {
    imprimirError(result.msj);
    return;
  }
}

async function imprimirDatos() {
  let filtro = inputFiltro.value.toLowerCase();
  var tablaExpediente = document.getElementById('cuerpoExpedientetbl');
  tablaExpediente.innerHTML = '';

  for (let i = 0; i < listaExpediente.length; i++) {
    if (
      listaExpediente[i].Nombre.toLowerCase().includes(filtro) ||
      listaExpediente[i].Especie.toLowerCase().includes(filtro) ||
      listaExpediente[i].Estrellas.toString().includes(filtro) ||
      listaExpediente[i].Citas.toString().includes(filtro) ||
      listaExpediente[i].Reservaciones.toString().includes(filtro)
    ) {
      let fila = tablaExpediente.insertRow();
      let celdaNumeroExpediente = fila.insertCell();
      let celdaNombre = fila.insertCell();
      let celdaDuennoMascota = fila.insertCell();
      let celdaUsuario = fila.insertCell();
      let celdaEspecie = fila.insertCell();
      let celdaPadecimientos = fila.insertCell();
      let celdaCitas = fila.insertCell();
      let celdaReservaciones = fila.insertCell();

      let btnEditar = document.createElement('button');
      btnEditar.onclick = async function () {
        window.location.href =
          'Actualizar_RegistrarExpediente.html?_id=' + listaExpediente[i]._id;
      };

      btnEditar.type = 'button';
      btnEditar.innerText = '✏️';
      btnEditar.title = 'EDITAR';
      btnEditar.classList.add('btnTabla');

      let btnDelete = document.createElement('button');
      btnDelete.onclick = async function () {
        let confirmacion = false;
        await Swal.fire({
          title: 'Desea eliminar el expediente de ' + listaExpediente[i].Nombre,
          showDenyButton: true,
          confirmbButtonText: 'Confirmar',
          denyButtonText: 'Cancelar',
          icon: 'warning',
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let result = await EliminarExpediente(listaExpediente[i]._id);
          if (result.resultado == true) {
            Exito(result.msj);
          } else {
            imprimirError(result.msj);
          }
          await GetExpediente();
        }
      };

      btnDelete.type = 'button';
      btnDelete.innerText = '🗑️';
      btnDelete.title = 'ELIMINAR';
      btnDelete.classList.add('btnTabla');

      let divButtons = document.createElement('div');
      divButtons.appendChild(btnEditar);
      divButtons.appendChild(btnDelete);

      celdaNumeroExpediente.innerHTML = listaExpediente[i].NumeroExpediente;
      celdaNombre.innerHTML = listaExpediente[i].Nombre;
      celdaDuennoMascota.innerHTML = listaExpediente[i].Duenno;
      celdaUsuario.innerHTML = listaExpediente[i].Usuario;
      celdaEspecie.innerHTML = listaExpediente[i].Especie;
      celdaPadecimientos.innerHTML = listaExpediente[i].Padecimientos;
      celdaCitas.innerHTML = listaExpediente[i].Citas;
      celdaReservaciones.innerHTML = listaExpediente[i].Reservaciones;
    } //Logins
  } //Filtros
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
