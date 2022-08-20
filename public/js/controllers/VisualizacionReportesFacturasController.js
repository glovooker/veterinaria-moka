'use strict';
/*para filtrar*/
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);
let outputTotal = document.getElementById('txtTotal');
let outputTotalPendientes = document.getElementById('txtTotalPendientes');
let outputContPagadas = document.getElementById('txtContPagadas');
let outputContPendientes = document.getElementById('txtContPendientes');

let arregloListaFacturas = [];
let listaPersonas = [];
let nombrePersona;
let posicionJ;
/****llamada de funcion***/

ObtenerListaFacturas();

/***********/

async function ObtenerListaFacturas() {
    let result = await ObtenerFacturaBaseDatos();
    if (result != {} && result.resultado == true) {
        arregloListaFacturas = result.ListaFacturasDB;
        await GetListaPersonas();
        ImprimirDatos();
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function GetListaPersonas() {
    let result = await ObtenerListaPersonas();
    if (result != {} && result.resultado == true) {
        listaPersonas = result.ListaPersonasBD;
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    let filtro = inputFiltro.value;
    let tbody = document.getElementById('tablaReportes');
    tbody.innerHTML = '';
    
    let sumaTotal = 0;
    let sumaTotalPendientes = 0;
    let contPendientes = 0;
    let contPagadas = 0;
    
    
    for (let i = 0; i < arregloListaFacturas.length; i++) {
        if(arregloListaFacturas[i].TotalAPagar.toString().includes(filtro) || arregloListaFacturas[i].NumeroFactura.toString().includes(filtro) || ObtenerEstadoFactura(arregloListaFacturas[i].Estado).toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNumeroFactura = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaFecha = fila.insertCell();
            let celdaMontoFacturado = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaAcciones = fila.insertCell();

            let btnVer = document.createElement('button');
            btnVer.onclick = function(){
                location.href = 'VistaFactura.html?_id=' + arregloListaFacturas[i]._id
            };
            btnVer.type = 'button';
            btnVer.innerText = '🔍';
            btnVer.title = 'VER FACTURA';

            
           

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnVer);
            celdaNumeroFactura.innerHTML = arregloListaFacturas[i].NumeroFactura;
            

            for (let j = 0; j < listaPersonas.length; j++){
                if (listaPersonas[j]._id === arregloListaFacturas[i].Identificacion){
                    nombrePersona = listaPersonas[j].Nombre
                    posicionJ = j;
                }

            }
    
            celdaCliente.innerHTML = nombrePersona;

            let fechaFacturacion = new Date(arregloListaFacturas[i].Fecha.replace('Z',''));
            celdaFecha.innerHTML = fechaFacturacion.getDate() + '/' + (fechaFacturacion.getMonth() +1) + '/' + fechaFacturacion.getFullYear();
            
            celdaMontoFacturado.innerHTML = '₡'+arregloListaFacturas[i].TotalAPagar;
            celdaEstado. innerHTML = ObtenerEstadoFactura(arregloListaFacturas[i].Estado);
            celdaAcciones.appendChild(divBtns);
            if (ObtenerEstadoFactura(arregloListaFacturas[i].Estado) === 'Pagada'){
                sumaTotal= sumaTotal + arregloListaFacturas[i].TotalAPagar
                contPagadas= contPagadas+1
            }else{
                if (ObtenerEstadoFactura(arregloListaFacturas[i].Estado) === 'Pendiente'){
                    sumaTotalPendientes= sumaTotalPendientes + arregloListaFacturas[i].TotalAPagar
                    contPendientes= contPendientes+1
                }
            }
        }



    }
    outputTotal.innerHTML = '₡'+ sumaTotal
    outputTotalPendientes.innerHTML = '₡'+ sumaTotalPendientes;
    outputContPagadas.innerHTML = contPagadas;
    outputContPendientes.innerHTML = contPendientes;

}
    
    

    


/********/


