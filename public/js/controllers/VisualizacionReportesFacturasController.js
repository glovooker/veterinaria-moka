'use strict';
/*para filtrar*/
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);

let arregloListaFacturas = [];
/****llamada de funcion***/
ObtenerListaFacturas();
/***********/

async function ObtenerListaFacturas() {
    let result = await ObtenerFacturaBaseDatos();
    if (result != {} && result.resultado == true) {
        arregloListaFacturas = result.ListaFacturasDB;
        ImprimirDatos();
        console.log(arregloListaFacturas);
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    let tbody = document.getElementById('tablaReportes');
    tbody.innerHTML = '';
    let sumaTotal = 0;
    let inputTotal = document.getElementById('txtTotal');


    let filtro = inputFiltro.value;

    for (let i = 0; i < arregloListaFacturas.length; i++) {
        if(arregloListaFacturas[i].TotalAPagar.toString().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNumeroFactura = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaFecha = fila.insertCell();
            let celdaMontoFacturado = fila.insertCell();
            let celdaAcciones = fila.insertCell();

            let btnVer = document.createElement('button');
            btnVer.onclick = function(){
                location.href = 'VistaFactura.html?_id=' + arregloListaFacturas[i]._id + '&NumeroFactura=' + arregloListaFacturas.NumeroFactura;
            };
            btnVer.type = 'button';
            btnVer.innerText = '🔍';
            btnVer.title = 'VER FACTURA';
            /* btnEdit.classList.add('btnsTabla'); */

            
           

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnVer);
            

            celdaNumeroFactura.innerHTML = arregloListaFacturas[i].Estado;
            celdaCliente.innerHTML = 'CLIENTE'

            let fechaFacturacion = new Date(arregloListaFacturas[i].Fecha.replace('Z',''));
            celdaFecha.innerHTML = fechaFacturacion.getDate() + '/' + (fechaFacturacion.getMonth() +1) + '/' + fechaFacturacion.getFullYear();
            
            celdaMontoFacturado.innerHTML = '₡'+arregloListaFacturas[i].TotalAPagar;
            celdaAcciones.appendChild(divBtns);
            sumaTotal= sumaTotal + arregloListaFacturas[i].TotalAPagar
        }


    }
    inputTotal.innerHTML = '₡'+ sumaTotal

}
