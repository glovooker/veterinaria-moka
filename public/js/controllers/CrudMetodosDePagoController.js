"use strict";

const inputFiltro = document.getElementById("txtFiltro");
inputFiltro.addEventListener("keyup", ImprimirDatos);
let listaTarjetas = [];

GetListaTarjetas();

async function GetListaTarjetas() {
  let result = await ObtenerListaTarjetas();
  if (result != {} && result.resultado == true) {
    lista = result.listaTarjetasDB;
    ImprimirDatos();
  } else {
    imprimirMsjError(result.msj);
    return;
  }
}

async function ImprimirDatos() {
  let filtro = inputFiltro.value.toLowerCase();
  var tbody = document.getElementById("tbdTarjetas");
  tbody.innerHTML = "";

  for (let i = 0; i < listaTarjetas.length; i++) {
    if (
      listaTarjetas[i].NumTarjeta.includes(filtro) ||
      ObtenerRol(listaTarjetas[i].Rol).toLowerCase().includes(filtro) ||
      ObtenerEstado(listaTarjetas[i].Estado).toLowerCase().includes(filtro)
    ) {
      let fila = tbody.insertRow();
      let celdaNumTarjeta = fila.insertCell();
      let celdaExpiracion = fila.insertCell();
      let celdaCCV = fila.insertCell();
      let celdaNombreTarjeta = fila.insertCell();

      ////////////////////////////////////////////////////
      //VER PERFIL PERSONA
      ////////////////////////////////////////////////////
      let btnPerfil = document.createElement("button");
      btnPerfil.onclick = function () {
        LimpiarLSPersonaConsultada();
        SetPersonaConsultada(listaTarjetas[i]);
        const timeoutId = setTimeout(function () {
          window.location.replace("./PerfilPersona.html");
        }, 1000);
      };
      btnPerfil.type = "button";
      btnPerfil.innerText = "🔍​";
      btnPerfil.title = "Ver Perfil";
      btnPerfil.classList.add("DetalleBtn");

      ////////////////////////////////////////////////////
      //MODIFICAR PERSONA
      ////////////////////////////////////////////////////
      let btnEdit = document.createElement("button");
      btnEdit.onclick = function () {
        LimpiarLSPersonaConsultada();
        SetPersonaConsultada(listaTarjetas[i]);
        const timeoutId = setTimeout(function () {
          // desplegar los datos de la persona consultada para que puedan ser modificados
          window.location.replace("./CrearCuentaCliente.html");
        }, 1000);
      };
      btnEdit.type = "button";
      btnEdit.innerText = "✏️​";
      btnEdit.title = "Editar";
      btnEdit.classList.add("modificarBtn");

      ////////////////////////////////////////////////////
      //BORRADO LOGICO DE LA PERSONA
      ////////////////////////////////////////////////////
      let btnInactivar = document.createElement("button");
      btnInactivar.onclick = async function () {
        let confirmacion = false;
        let msj = "Desea inactivar el registro de " + listaTarjetas[i].Nombre;
        if (listaTarjetas[i].Estado == 0) {
          msj = "Desea activar el registro de " + listaTarjetas[i].Nombre;
        }

        await Swal.fire({
          title: msj,
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
          icon: "warning",
        }).then((res) => {
          confirmacion = res.isConfirmed;
        });
        if (confirmacion == true) {
          let vEstado = 0;
          if (listaTarjetas[i].Estado == 0) {
            vEstado = 1;
          }

          let result = await ModificarTarjetas(
            listaTarjetas[i]._id,
            listaTarjetas[i].NumTarjeta,
            listaTarjetas[i].Expiracion,
            listaTarjetas[i].CCV,
            listaTarjetas[i].NombreTarjeta,
            vEstado
          );

          if (result.resultado == true) {
            ImprimirMsjSuccess(result.msj);
          } else {
            ImprimirMsjError(result.msj);
          }

          await GetListaTarjetas();
        }
      };

      btnInactivar.type = "button";
      btnInactivar.innerText = "💡";
      btnInactivar.title = "Activar/Desactivar";
      btnInactivar.classList.add("eliminarBtn");

      let divBtns = document.createElement("div");
      divBtns.appendChild(btnPerfil);
      divBtns.appendChild(btnEdit);
      divBtns.appendChild(btnInactivar);

      celdaNumTarjeta.innerHTML = listaTarjetas[i].NumTarjeta;
      celdaExpiracion.innerHTML = listaTarjetas[i].Expiracion;
      celdaCCV.innerHTML = listaTarjetas[i].CCV;
      celdaNombreTarjeta.innerHTML = listaTarjetas[i].NombreTarjeta;
 
      celdaAcciones.appendChild(divBtns);
    }
  }
}
