'use strict';

let PersonaLogueada = GetSesionActiva();
console.log(PersonaLogueada);

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
  let filtro = inputFiltro.value.toLowerCase();
  var tbody = document.getElementById('tbdMascotas');
  tbody.innerHTML = '';

  for (let i = 0; i < listaMascota.length; i++) {

    ////////////////////////////////////////////////////////////////////
    if (listaMascota[i].Nombre.toLowerCase().includes(filtro) 
    ) {
    //FILTROS //////////////////////////////////////////////////////////
    

    if ((PersonaLogueada.Rol==0||PersonaLogueada.Rol==1)
    ||(PersonaLogueada.Rol==2)
    ||(PersonaLogueada.Rol==3 && PersonaLogueada._id==listaMascota[i].IdPersona)) {
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
      btnEdit.onclick = function(){
        LimpiarLSMascotaConsultada();
        SetMascotaConsultada(listaMascota[i]);
        const timeoutId = setTimeout(function(){
          window.location.replace('./RegistrarMascota.html?_id='+ listaMascota[i]._id);
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
      //Imorimir Datos de la Cita
      ///////////////////////////////////////////////////

      celdaNombre.innerHTML = listaMascota[i].Nombre;
      celdaEspecie.innerHTML = listaMascota[i].Especie;
      celdaObservaciones.innerHTML =listaMascota[i].Observaciones;
      celdaAcciones.appendChild(divBtns);
    }
  }
}


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

