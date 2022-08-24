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











/*************************************/
async function  GetListaMascota() {
    let result = await ObtenerListaMascota();
    if (result != {} && result.resultado == true) {
        let listaMascotas = result.ListaMascotaBD;
       /*  console.log(listaMascotas); */
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
      /*   console.log(listaCitas); */
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function GetListaReservacion() {
    let result = await ObtenerListaCitas('R');
    if (result != {} && result.resultado == true) {
        listaReservacion = result.ListaCitasBD;
        /* console.log(listaReservacion); */
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function GetListaPersonas() {
    let result = await ObtenerListaPersonas();
    if (result != {} && result.resultado == true) {
        listaPersonas = result.ListaPersonasBD;
      /*   console.log(listaPersonas) */
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
        for (let j = 0; j < listaPersonas.length; j++){
            if(listaPersonas[j]._id===listaMascotas[i].IdPersona){
                clienteNombre = listaPersonas[j].Nombre;
            }
        }
          
        if(listaMascotas[i].Nombre.toLowerCase().includes(filtro)
        || clienteNombre.toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNombreMascota= fila.insertCell();
            let celdaNombreCliente = fila.insertCell();
            let celdaValoracion = fila.insertCell();
           

            celdaNombreMascota.innerHTML = listaMascotas[i].Nombre;
            
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

          
            

            
            
            
            
            

        }
    }
   
}
    
    
