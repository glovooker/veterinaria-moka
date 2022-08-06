let fecha = document.getElementById('dateFilter');
var suma = 0;

document.getElementById('bttn').addEventListener('submit',limpiar);

function limpiar(){
    formulario.reset();
}

const tablaReportes = document.querySelector('#tablaReportes tbody');

imprimirCitas();
imprimirResumenDinero();
filtrarNum();

function imprimirCitas(){ 
    tablaReportes.innerHTML = '';
    let listaCitas = obtenerFinanc();
    for (let i = 0; i < listaCitas.length; i++) {
        let fila = tablaReportes.insertRow();
        fila.insertCell().innerHTML = listaCitas[i].factura; 
        fila.insertCell().innerHTML = listaCitas[i].Dinero;
        fila.insertCell().innerHTML = listaCitas[i].Fechas;
    }
 };
 

function imprimirResumenDinero(){
    const resumenDinero = document.getElementById('resumenDineroTot') 
    let dineroCantidad = obtenerDineroTotal();
    let suma = 0;
    for (let i = 0; i < dineroCantidad.length; i++) {
        suma += dineroCantidad[i];
    }
    document.getElementById('resumenDinero').value = suma
}

