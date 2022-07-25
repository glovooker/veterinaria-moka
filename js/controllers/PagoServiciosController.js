'use strict';

let pNumServicio = 4;
let pNumCliente = 4;
let selMetodoPago = document.getElementById('selMetodoPago');

btnAgregarMetodo.addEventListener('click', nuevoMetodoPago);

imprimeServicio(pNumServicio);

function imprimeServicio(pNumServicio){
    let servicio = ObtenerServicio(pNumServicio);
    if (servicio != null)   { 
        document.getElementById('outCliente').value = servicio.Cliente;
        document.getElementById('outMascota').value = servicio.Mascota;
        document.getElementById('outTotal').value = servicio.Total;
        imprimirTarjetas(pNumCliente);        
    } 
}

function imprimirTarjetas(pNumCliente){
    let option;
    let listaMetodos = ObtenerMetodoPagoCliente(pNumCliente);
    console.log(listaMetodos.length);
    for (let i = 0; i < listaMetodos.length; i++) { 
        option = document.createElement('option');
        option.value = listaMetodos[i].NumTarjeta; 
        option.text = listaMetodos[i].NumTarjeta;
        selMetodoPago.appendChild(option);        
    }
};

function nuevoMetodoPago() {
    location.href = 'MetodosPago.html';
}