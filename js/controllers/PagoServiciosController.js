'use strict';

let pNumServicio = 4;
let pNumCliente = 4;
let selMetodoPago = document.getElementById('selMetodoPago');

btnPagar.addEventListener('click', nuevoMetodoPago);


imprimeServicio(pNumServicio);
imprimirMetodosPago(pNumCliente);

function imprimeServicio(pNumServicio){
    let servicio = ObtenerServicio(pNumServicio);
    if (servicio != null)   { 
        document.getElementById('outCliente').value = servicio.Cliente;
        document.getElementById('outMascota').value = servicio.Mascota;
        document.getElementById('outTotal').value = servicio.Total;
        
    } 
}

function imprimirMetodosPago(pNumCliente){
    let option = document.createElement('option');
    let valor = new Date().getTime();
    let listaMetodos = ObtenerMetodoPagoCliente(pNumCliente);
    for (let i = 0; i < listaMetodos.length; i++) { 
        option.value = listaMetodos[i].NumTarjeta;
        console.log(listaMetodos[i].NumTarjeta); 
        option.text = 'Tarjeta';
        selMetodoPago.appendChild(option);        
    }
};

function nuevoMetodoPago() {
    location.href = 'MetodosPago.html';
}