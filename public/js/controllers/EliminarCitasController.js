"use strict";

let veterinario = document.getElementById("txtVet");
let mascota = document.getElementById("mascotatxt");
let date = document.getElementById("fecha");

const tablaCitasEliminar = document.querySelector("#tablaCitasEliminar tbody");

imprimirCitas();

function limpiar() {
  formulario.reset();
}

function imprimirCitas() {
  tablaCitasEliminar.innerHTML = "";
  let listaCitas = obtenerListaCita();
  for (let i = 0; i < listaCitas.length; i++) {
    let fila = tablaCitasEliminar.insertRow();
    fila.insertCell().innerHTML = listaCitas[i].Fecha;
    fila.insertCell().innerHTML = listaCitas[i].Hora;
    fila.insertCell().innerHTML = listaCitas[i].Doctor;
    fila.insertCell().innerHTML = listaCitas[i].Mascota;
    fila.insertCell().innerHTML = listaCitas[i].Estado;
    fila.insertCell().innerHTML = listaCitas[i].Motivo;
    fila.insertCell().innerHTML = listaCitas[i].Accion;
  }
}
