'use strict';

let fecha = document.getElementById('txtfecha');
let veterinario = document.getElementById('txtveterinario');

const tablaReservaciones = document.querySelector('#tablaCitas tbody');

imprimirReservaciones();

function limpiar(){
    formulario.reset();
}


function imprimirReservaciones(){ 
    
    tablaReservaciones.innerHTML = '';
    let listaReservaciones = obtenerListaReser();
    for (let i = 0; i < listaReservaciones.length; i++) {
        let fila = tablaReservaciones.insertRow();
        fila.insertCell().innerHTML = listaReservaciones[i].FechaEntra;  
        fila.insertCell().innerHTML = listaReservaciones[i].HoraEntra;
        fila.insertCell().innerHTML = listaReservaciones[i].Cliente;
        fila.insertCell().innerHTML = listaReservaciones[i].Doctor;
        fila.insertCell().innerHTML = listaReservaciones[i].Mascota;
        fila.insertCell().innerHTML = listaReservaciones[i].Estado;
        fila.insertCell().innerHTML = listaReservaciones[i].Cuidados;
    }
 }; 