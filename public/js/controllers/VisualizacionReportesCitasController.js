'use strict';
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);


let listaCitas = [];
/****llamada de funcion***/
GetListaCitas()
/******************/

async function GetListaCitas() {
    let result = await ObtenerListaCitas('C');
    if (result != {} && result.resultado == true) {
        listaCitas = result.ListaCitasBD;    
        ImprimirDatos(); 
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}



async function ImprimirDatos() {
    let filtro = inputFiltro.value;
    let tbody = document.getElementById('tablaReportes');
    tbody.innerHTML = '';

    
    
    for (let i = 0; i < listaCitas.length; i++) {
          
        if(listaCitas[i].Estado.toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNombreCliente = fila.insertCell();
            let celdaNombreMascota= fila.insertCell();
            let celdaFecha = fila.insertCell();
            let celdaHoraInicio = fila.insertCell();
            let celdaHoraFinal = fila.insertCell();
            let celdaNombreVet = fila.insertCell();
            let celdaEstado = fila.insertCell();
            let celdaAcciones = fila.insertCell();

            /* let btnVer = document.createElement('button');
            btnVer.onclick = function(){
                location.href = 'VistaFactura.html?_id=' + arregloListaFacturas[i]._id
            };
            btnVer.type = 'button';
            btnVer.innerText = '🔍';
            btnVer.title = 'VER FACTURA';
            let divBtns = document.createElement('div');
            divBtns.appendChild(btnVer); */

            celdaNombreCliente.innerHTML = cliente.Nombre;
            celdaNombreMascota.innerHTML = mascota.Nombre;
            celdaHoraInicio.innerHTML = listaCitas[i].HoraInicio;
            celdaHoraFinal.innerHTML = listaCitas[i].HoraFinal;
            let fechaCita = new Date(listaCitas[i].FecInicio.replace('Z',''));
            celdaFecha.innerHTML = fechaCita.getDate() + '/' + (fechaCita.getMonth() +1) + '/' + fechaCita.getFullYear();
            celdaNombreVet.innerHTML = veterinario.Nombre;
            celdaEstado.innerHTML = ObtenerEstadoCita(listaCitas[i].Estado);

        }
    }
}















            
           

            
            
            
    
         

            
    




    
    

    


