"use strict";

let mascotaRese = document.getElementById("mascota");

const tablaReservaciones = document.querySelector(
  "#tablaReservacionesEliminar tbody"
);

imprimirReservaciones();

function limpiar() {
  formulario.reset();
}

function imprimirReservaciones() {
  tablaReservaciones.innerHTML = "";
  let listaReservaciones = obtenerListaReser();
  for (let i = 0; i < listaReservaciones.length; i++) {
    let fila = tablaReservaciones.insertRow();
    fila.insertCell().innerHTML = listaReservaciones[i].FechaEntra;
    fila.insertCell().innerHTML = listaReservaciones[i].HoraEntra;
    fila.insertCell().innerHTML = listaReservaciones[i].HoraSale;
    fila.insertCell().innerHTML = listaReservaciones[i].Cuidados;
  }
}
