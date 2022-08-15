'use strict';

const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);

let listaCitas = [];

GetListaCitas();

async function DatosPersona(p_id, pCedula){
   let result = await BuscarPersona(p_id, pCedula);
   if (result != null && result.resultado == true && result.personaDB != null) { 
      return(result.personaDB); 
   } else {
      return (" ");
   }
 }

 async function DatosMascota(pIdMascota){
    let result = await BuscarMascota(pIdMascota);
    if (result != null && result.resultado == true && result.mascotaDB != null) { 
       return(result.mascotaDB); 
    } else {
       return (" ");
    }
  } 

async function GetListaCitas() {
    let result = await ObtenerListaCitas();
    if (result != {} && result.resultado == true) {
        listaCitas = result.ListaCitasBD;
        ImprimirDatos(); 
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    let filtro = inputFiltro.value.toLowerCase();
    var tbody = document.getElementById('tbdCitas');
    tbody.innerHTML = '';

    for (let i = 0; i < listaCitas.length; i++) { 
/*
        if(listaCitas[i].Nombre.toLowerCase().includes(filtro)|| 
        ObtenerRol(listaCitas[i].Rol).toLowerCase().includes(filtro) || 
        ObtenerEstado(listaCitas[i].Estado).toLowerCase().includes(filtro)
        ){ */
            let fila = tbody.insertRow();
            let celdaFecha = fila.insertCell();
            let celdaHora = fila.insertCell();
            let celdaVeterinario = fila.insertCell();
            let celdaCliente = fila.insertCell();
            let celdaMascota = fila.insertCell();
            let celdaEstado = fila.insertCell(); 
            let celdaAcciones = fila.insertCell();

            ////////////////////////////////////////////////////
            //Detalle de la Cita
            ////////////////////////////////////////////////////
            let btnDetalle = document.createElement('button');
            btnDetalle.onclick = function(){              
                const timeoutId = setTimeout(function(){                   
                window.location.replace("./CrearCita.html?id="+ listaCitas[i]._id);}, 1000);  
            };
            btnDetalle.type = 'button';
            btnDetalle.innerText = '🔍​';
            btnDetalle.title = 'Ver Detalle Cita';
            btnDetalle.classList.add('DetalleBtn');

            ////////////////////////////////////////////////////
            //Aprobar Cita
            ////////////////////////////////////////////////////            
            let btnPerfil = document.createElement('button');
            btnPerfil.onclick = function(){
                LimpiarLSCitaConsultada();
                SetCitaConsultada(listaCitas[i]);                
                const timeoutId = setTimeout(function(){
                window.location.replace("./PerfilCita.html");}, 1000);  
            };
            btnPerfil.type = 'button';
            btnPerfil.innerText = 'A​';
            btnPerfil.title = 'Aprobar Cita';
            btnPerfil.classList.add('DetalleBtn');

            ////////////////////////////////////////////////////
            //MODIFICAR PERSONA
            ////////////////////////////////////////////////////
            let btnEdit = document.createElement('button');
            btnEdit.onclick = function(){
                LimpiarLSCitaConsultada();
                SetCitaConsultada(listaCitas[i]);
                const timeoutId = setTimeout(function(){
                // desplegar los datos de la cita consultada para que puedan ser modificados
                window.location.replace("./CrearCuentaCliente.html");}, 1000);                  
                
            };
            btnEdit.type = 'button';
            btnEdit.innerText = 'C​';
            btnEdit.title = 'Cancelar Cita';
            btnEdit.classList.add('modificarBtn');

            ////////////////////////////////////////////////////
            //BORRADO LOGICO DE LA PERSONA
            ////////////////////////////////////////////////////            
           let btnInactivar = document.createElement('button');
            btnInactivar.onclick = async function(){
                let confirmacion = false;
                let msj = 'Desea inactivar el registro de ' + listaCitas[i].Nombre;
                if  (listaCitas[i].Estado == 0){
                    msj = 'Desea activar el registro de ' + listaCitas[i].Nombre;
                }

                await Swal.fire({
                    title: msj,
                    showDenyButton: true,
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    icon: 'warning'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });
                if (confirmacion == true) {                    
                    let vEstado = 0;
                    if  (listaCitas[i].Estado == 0){
                        vEstado = 1;
                    }

                    let result =  await ModificarCita(listaCitas[i]._id, listaCitas[i].Cedula, listaCitas[i].Nombre, listaCitas[i].Correo, listaCitas[i].Password, listaCitas[i].Telefono, listaCitas[i].Direccion, listaCitas[i].PerfilFB, listaCitas[i].PerfilIG, listaCitas[i].PerfilTW, listaCitas[i].FotoPerfil, vEstado); 

                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }

                    await GetListaCitas();
                }
            };

            btnInactivar.type = 'button';
            btnInactivar.innerText = 'F'; 
            btnInactivar.title = 'Finalizar Cita';
            btnInactivar.classList.add('eliminarBtn');

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnDetalle);
            divBtns.appendChild(btnPerfil);
            divBtns.appendChild(btnEdit);            
            divBtns.appendChild(btnInactivar);

            ///////////////////////////////////////////
            //Imorimir Datos de la Cita
            ///////////////////////////////////////////

            celdaFecha.innerHTML = listaCitas[i].FecInicio;
            celdaHora.innerHTML = listaCitas[i].HoraInicio;

            let veterinario = await DatosPersona(listaCitas[i]._idVeterinario, null);
            celdaVeterinario.innerHTML = veterinario.Nombre;

            let cliente = await DatosPersona(listaCitas[i]._idCliente, null);
            celdaCliente.innerHTML = cliente.Nombre ;   
            
            let mascota = await DatosMascota(listaCitas[i]._idMascota);
            celdaMascota.innerHTML = mascota.Nombre; 

            celdaEstado.innerHTML = ObtenerEstadoCita(listaCitas[i].Estado);
            celdaAcciones.appendChild(divBtns);
       // }
    }
}

