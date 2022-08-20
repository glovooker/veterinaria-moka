'use strict';
/*para filtrar*/
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);
let inputTotal = document.getElementById('txtTotal');

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
    
    
    for (let i = 0; i < arregloListaFacturas.length; i++) {
        if(arregloListaFacturas[i].TotalAPagar.toString().includes(filtro) || arregloListaFacturas[i].NumeroFactura.toString().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNumeroFactura = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaFecha = fila.insertCell();
            let celdaMontoFacturado = fila.insertCell();
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
            celdaAcciones.appendChild(divBtns);
            sumaTotal= sumaTotal + arregloListaFacturas[i].TotalAPagar
        }


    }
    inputTotal.innerHTML = '₡'+ sumaTotal

}
    
    

    


/********/


