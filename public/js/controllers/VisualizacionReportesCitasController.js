'use strict';
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);


let listaCitas = [];
let listaPersonas=[];
let listaMascotas=[];
/****llamada de funcion***/
GetListaCitas()
/******************/

async function GetListaCitas() {
    let result = await ObtenerListaCitas('C');
    if (result != {} && result.resultado == true) {
        listaCitas = result.ListaCitasBD;
        await GetListaPersonas();  
        await GetListaMascota(); 
        ImprimirDatos(); 
    } else {
        imprimirMsjError(result.msj);
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

async function  GetListaMascota() {
    let result = await ObtenerListaMascota();
    if (result != {} && result.resultado == true) {
        listaMascotas = result.ListaMascotaBD;
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    let filtro = inputFiltro.value;
    let tbody = document.getElementById('tablaReportes');
    let vetNombre,clienteNombre,mascotaNombre; 
    tbody.innerHTML = '';

    
    
    for (let i = 0; i < listaCitas.length; i++) {
          
        if(ObtenerEstadoCita(listaCitas[i].Estado).toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaFecha = fila.insertCell();
            let celdaNombreCliente = fila.insertCell();
            let celdaNombreMascota= fila.insertCell();
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
            let fechaCita = new Date(listaCitas[i].FecInicio.replace('Z',''));
            celdaFecha.innerHTML = fechaCita.getDate() + '/' + (fechaCita.getMonth() +1) + '/' + fechaCita.getFullYear();

            for (let j = 0; j < listaPersonas.length; j++){
                if(listaPersonas[j]._id===listaCitas[i]._idCliente){
                    clienteNombre = listaPersonas[j].Nombre;
                    break;
                }
            }
            celdaNombreCliente.innerHTML = clienteNombre;
            for (let k = 0; k < listaMascotas.length; k++){
                if(listaMascotas[k]._id===listaCitas[i]._idMascota){
                    mascotaNombre = listaMascotas[k].Nombre;
                    break;
                }
            }
            celdaNombreMascota.innerHTML = mascotaNombre;
            
            for (let l = 0; l < listaPersonas.length; l++){
                if(listaPersonas[l]._id===listaCitas[i]._idVeterinario){
                    vetNombre = listaPersonas[l].Nombre;
                    break;
                }
            }
            

            celdaHoraInicio.innerHTML = listaCitas[i].HoraInicio;
            celdaHoraFinal.innerHTML = listaCitas[i].HoraFinal;
            
            celdaNombreVet.innerHTML = vetNombre;
            celdaEstado.innerHTML = ObtenerEstadoCita(listaCitas[i].Estado);

        }
    }
}
