'use strict'

let pNumCliente = 4;

imprimirMetodosPago(pNumCliente);

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