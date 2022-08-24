'use strict';
const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ObtenerVeterinarios);

let listaCitas = [];
/* let listaPersonas=[]; */
/* let listaMascotas=[]; */

/****llamada de funcion***/
ObtenerVeterinarios();
 

/******************/


async function ObtenerVeterinarios(){
    let listaVeterinarios = await GetPersonasRol(2);
    console.log(listaVeterinarios)
    await GetListaCitas();
    ImprimirDatos(listaVeterinarios);
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





async function ImprimirDatos(listaVets) {
    let filtro = inputFiltro.value;
    let tbody = document.getElementById('tablaReportes');
    let sumaEstrellas = 0;
    let contador = 0;
    tbody.innerHTML = '';
    
    
    for (let i = 0; i < listaVets.length; i++) {
          
        if(listaVets[i].Nombre.toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            let celdaNombreVeterinario = fila.insertCell();
            let celdaValoracion = fila.insertCell();
            
            
            celdaNombreVeterinario.innerHTML = listaVets[i].Nombre;

            for (let j = 0; j < listaCitas.length; j++){
                if(listaCitas[j]._idVeterinario===listaVets[i]._id){
                    sumaEstrellas = sumaEstrellas + listaCitas[j].EstrellasVeterinario
                    contador= contador+1

                }
            }
            if (sumaEstrellas!=0){
                let promedio = sumaEstrellas/contador
                celdaValoracion.innerHTML = promedio.toFixed(2);
            }else{
                celdaValoracion.innerHTML = 0
            }
            sumaEstrellas = 0;
            contador = 0;
            
            

        }
    }
   
}
    
    
