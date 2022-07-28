'use strict';

let ListaMetodosPago = [
    { NumCliente: 1, Cliente: 'Andrey Villalobos', NumTarjeta: '1234567890123456', Vencimiento: '31/07/2025', CVV: '123', TarjetaHabiente: 'Andrey Villalobos' },
    { NumCliente: 2, Cliente: 'Johel Lopez', NumTarjeta: '1234789103265489', Vencimiento: '31/12/2023', CVV: '456', TarjetaHabiente: 'Johel Lopez' },
    { NumCliente: 3, Cliente: 'Randall Badilla', NumTarjeta: '1234931057950365', Vencimiento: '31/01/2026', CVV: '789', TarjetaHabiente: 'Randall Badilla' },
    { NumCliente: 4, Cliente: 'Cris Hemsworth', NumTarjeta: '8701635122457850', Vencimiento: '30/05/2024', CVV: '987', TarjetaHabiente: 'Cris Hemsworth' },
    { NumCliente: 4, Cliente: 'Cris Hemsworth', NumTarjeta: '9873124603219873', Vencimiento: '31/10/2027', CVV: '654', TarjetaHabiente: 'Cris Hemsworth' },
];

function ObtenerMetodosPago(){
    return ListaMetodosPago;
}

function ObtenerMetodoPagoCliente(pNumCliente) {
    let result = [];
    let j = 0;
    for (let i = 0; i < ListaMetodosPago.length; i++) {
        if (ListaMetodosPago[i].NumCliente == pNumCliente) {
            result[j]=(ListaMetodosPago[i]);
            j+=1;
        }
    }  
    return result;
}

 function guardarMetodoPago(pNumCliente, pCliente, pNumTarjeta,pVencimiento,pCVV,pTarjetaHabiente){
    let nuevoMetodoPago = {} 
    nuevoMetodoPago.NumCliente = pNumCliente;
    nuevoMetodoPago.Cliente = pCliente;
    nuevoMetodoPago.NumTarjeta = pNumTarjeta;
    nuevoMetodoPago.Vencimiento = pVencimiento;
    nuevoMetodoPago.CVV = pCVV;    
    nuevoMetodoPago.TarjetaHabiente = pTarjetaHabiente;
    ListaMetodosPago[ListaMetodosPago.length] = nuevoMetodoPago;
 }