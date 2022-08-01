"use strict";

let veterinario = document.getElementById("txtVet");
let mascota = document.getElementById("mascotatxt");
let date = document.getElementById("fecha");

const tablaCitasEliminar = document.querySelector("#tablaCitasEliminar tbody");

imprimirMascotas();

function limpiar() {
  formulario.reset();
}

function imprimirMascotas() {
  tablaCitasEliminar.innerHTML = "";
  let listaCitas = obtenerListaMascota();
  for (let i = 0; i < listaCitas.length; i++) {
    let fila = tablaCitasEliminar.insertRow();
    fila.insertCell().innerHTML = listaCitas[i].Nombre;
    fila.insertCell().innerHTML = listaCitas[i].TipoMascota;
    fila.insertCell().innerHTML = listaCitas[i].Informacion;
    fila.insertCell().innerHTML = listaCitas[i].Accion;
  }
}
