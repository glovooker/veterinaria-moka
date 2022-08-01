'use strict';

let fecha1 = document.getElementById('txtfecha1');
let fecha2 = document.getElementById('txtfecha2');

const tablaReservaciones = document.querySelector('#tablaReservaciones tbody');

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
        fila.insertCell().innerHTML = listaReservaciones[i].FechaSale; 
        fila.insertCell().innerHTML = listaReservaciones[i].HoraEntra;
        fila.insertCell().innerHTML = listaReservaciones[i].HoraSale;
        fila.insertCell().innerHTML = listaReservaciones[i].Cliente;
        fila.insertCell().innerHTML = listaReservaciones[i].Mascota;
        fila.insertCell().innerHTML = listaReservaciones[i].Cuidados;
    }
 }; 