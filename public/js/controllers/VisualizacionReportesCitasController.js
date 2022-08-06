'use strict';

let veterinario = document.getElementById('txtVet');
let ranking = document.getElementById('ranking');
let cliente = document.getElementById('txtUser');
let mascota = document.getElementById('mascotatxt');

const tablaReportes = document.querySelector('#tablaReportes tbody');

let mostrar = true;

imprimirCitas();

document.getElementById('bttn').addEventListener('submit',limpiar);
document.getElementById('buscar').addEventListener('onclick', filtrar);

function limpiar(){
    formulario.reset();
}


function imprimirCitas(){ 
    
    tablaReportes.innerHTML = '';
    let listaCitas = ObtenerCitas();
    for (let i = 0; i < listaCitas.length; i++) {
        let fila = tablaReportes.insertRow();
        fila.insertCell().innerHTML = listaCitas[i].Cliente; 
        fila.insertCell().innerHTML = listaCitas[i].Mascota;
        fila.insertCell().innerHTML = listaCitas[i].Doctor;
        fila.insertCell().innerHTML = listaCitas[i].Fechas;
        fila.insertCell().innerHTML = listaCitas[i].Hora;
        fila.insertCell().innerHTML = listaCitas[i].Ranking;
    }
 }; 