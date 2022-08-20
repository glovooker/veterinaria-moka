'use strict';

btnMascota1.addEventListener("click", CrearMascota1);

const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);

let listaMascota = [];

GetListaMascota();

async function GetListaMascota() {
    let result = await ObtenerListaMascota();
    if (result != {} && result.resultado == true) {
        listaMascota = result.ListaMascotaBD;
        ImprimirDatos(); 
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    let filtro = inputFiltro.value.toLowerCase();
    var tbody = document.getElementById('tbdMascotas');
    tbody.innerHTML = '';

    for (let i = 0; i < listaMascota.length; i++) { 

        if(listaMascota[i].Nombre.toLowerCase().includes(filtro)
        ){ 
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaEspecie = fila.insertCell();
            let celdaEstrellas = fila.insertCell();
            let celdaObservaciones = fila.insertCell();
            let celdaAcciones = fila.insertCell();
            

            ////////////////////////////////////////////////////
            //VER PERFIL PERSONA
            ////////////////////////////////////////////////////            
            let btnVerMascota = document.createElement('button');
            btnVerMascota.onclick = function(){
                LimpiarLSMascotaConsultada();
                SetMascotaConsultada(listaMascota[i]);                
                const timeoutId = setTimeout(function(){
                window.location.replace("./PerfilMascota.html?acc=Q");
            }, 1000);  
            };
            btnVerMascota.type = 'button';
            btnVerMascota.innerText = '🔍​';
            btnVerMascota.title = 'Ver Perfil Mascota';
            btnVerMascota.classList.add('DetalleBtn');

            ////////////////////////////////////////////////////
            //Crear Cita
            ////////////////////////////////////////////////////
            let btnCrearCita = document.createElement('button');
            btnCrearCita.onclick = function(){
                LimpiarLSMascotaConsultada();
                SetMascotaConsultada(listaMascota[i]);                
                const timeoutId = setTimeout(function(){
                window.location.replace("./CrearCita.html?acc=Q");
            }, 1000);  
            };
            btnCrearCita.type = 'button';
            btnCrearCita.innerText = '📝​';
            btnCrearCita.title = 'Crear Cita';
            btnCrearCita.classList.add('modificarBtn');
            


            ////////////////////////////////////////////////////
            //Crear Cita
            ////////////////////////////////////////////////////            
            let btnCrearReser= document.createElement('button');
            btnCrearReser.onclick = function(){
                LimpiarLSMascotaConsultada();
                SetMascotaConsultada(listaMascota[i]);                
                const timeoutId = setTimeout(function(){
                window.location.replace("./CrearReservacion.html?acc=Q");
            }, 1000);  
            };

           btnCrearReser.type = 'button';
           btnCrearReser.innerText = '🏥'; 
           btnCrearReser.title = 'Crear Reservacion';
           btnCrearReser.classList.add('eliminarBtn');

           let divBtns = document.createElement('div');
           divBtns.appendChild(btnVerMascota);
           divBtns.appendChild(btnCrearCita);            
           divBtns.appendChild(btnCrearReser);

           celdaNombre.innerHTML = listaMascota[i].Nombre;
           celdaEspecie.innerHTML = listaMascota[i].Especie;
           celdaEstrellas.innerHTML = listaMascota[i].Estrellas;    
           celdaObservaciones.innerHTML = listaMascota[i].Observaciones;  
           celdaAcciones.appendChild(divBtns);
        }
    }
}

function CrearMascota1() {
    window.location.replace("./RegistrarMascota.html?acc=C");  
}

