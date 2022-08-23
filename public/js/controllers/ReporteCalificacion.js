'use strict';
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', GetListaMascota);


let listaCitas = [];
let listaReservacion = [];
let listaPersonas=[];
/* let listaMascotas=[]; */

/****llamada de funcion***/
GetListaMascota()
/******************/




/* btnfiltroFecha.addEventListener('click', FiltrarPorFechas); */
/* btnLimpiar.addEventListener('click',Limpiar) */

/* async function FiltrarPorFechas(){
    if (ValidarCampos()===false){
        return false
    }else{
        if(ValidarFecha()===false){
            return false
        }
    }
    let listaMascotas=[]
    let result = await ObtenerListaMascota();
    
    if (result != {} && result.resultado == true) {
        listaMascotas = result.ListaMascotaBD;
    }
    let lista = listaCitas.filter(n => n.FecInicio >= inputFechaInicio.value && n.FecInicio <= inputFechaHasta.value);
     console.log(lista)
    ImprimirDatos(lista);
  
    } */









/*************************************/
async function  GetListaMascota() {
    let result = await ObtenerListaMascota();
    if (result != {} && result.resultado == true) {
        let listaMascotas = result.ListaMascotaBD;
        console.log(listaMascotas);
        await GetListaPersonas();  
        await GetListaCitas(); 
        await GetListaReservacion();
        ImprimirDatos(listaMascotas); 
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function GetListaCitas() {
    let result = await ObtenerListaCitas('C');
    if (result != {} && result.resultado == true) {
        listaCitas = result.ListaCitasBD;
        console.log(listaCitas);
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function GetListaReservacion() {
    let result = await ObtenerListaCitas('R');
    if (result != {} && result.resultado == true) {
        listaReservacion = result.ListaCitasBD;
        console.log(listaReservacion);
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function GetListaPersonas() {
    let result = await ObtenerListaPersonas();
    if (result != {} && result.resultado == true) {
        listaPersonas = result.ListaPersonasBD;
        console.log(listaPersonas)
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}



async function ImprimirDatos(listaMascotas) {
    let filtro = inputFiltro.value;
    let tbody = document.getElementById('tablaReportes');
    let clienteNombre; 
    let sumaEstrellas = 0;
    let contador = 0;
    tbody.innerHTML = '';
    
    
    for (let i = 0; i < listaMascotas.length; i++) {
          
        if(listaMascotas[i].Nombre.toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNombreMascota= fila.insertCell();
            let celdaNombreCliente = fila.insertCell();
            let celdaValoracion = fila.insertCell();
           /*  let celdaAcciones = fila.insertCell(); */
            
            

            /* let btnVer = document.createElement('button');
            btnVer.onclick = function(){
                location.href = 'VistaFactura.html?_id=' + arregloListaFacturas[i]._id
            };
            btnVer.type = 'button';
            btnVer.innerText = '🔍';
            btnVer.title = 'VER FACTURA';
            let divBtns = document.createElement('div');
            divBtns.appendChild(btnVer); */
            /* let fechaCita = new Date(listaCitas[i].FecInicio.replace('-','/'));
            celdaFecha.innerHTML = fechaCita.getDate() + '/' + (fechaCita.getMonth() +1) + '/' + fechaCita.getFullYear();
            */

            celdaNombreMascota.innerHTML = listaMascotas[i].Nombre;
            for (let j = 0; j < listaPersonas.length; j++){
                if(listaPersonas[j]._id===listaMascotas[i].IdPersona){
                    clienteNombre = listaPersonas[j].Nombre;
                }
            }
            celdaNombreCliente.innerHTML = clienteNombre;

            for (let k = 0; k < listaCitas.length; k++){
                if(listaCitas[k]._idMascota===listaMascotas[i]._id){
                    sumaEstrellas = sumaEstrellas + listaCitas[k].Estrellas
                    contador= contador+1

                }
            }
            for (let x = 0; x < listaReservacion.length; x++){
                if(listaReservacion[x]._idMascota===listaMascotas[i]._id){
                    sumaEstrellas = sumaEstrellas + listaReservacion[x].Estrellas
                    contador= contador+1
                }
            }
            if (sumaEstrellas!=0){
                let promedio = sumaEstrellas/contador
                celdaValoracion.innerHTML = trunc(promedio,2);
            }else{
                celdaValoracion.innerHTML = 0
            }
            sumaEstrellas = 0;
            contador = 0;

          
            

            
            
            /* celdaNombreVet.innerHTML = vetNombre; */
            
            

        }
    }
   
}
    
    
function trunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }
