'use strict';

let PersonaLogueada = GetSesionActiva();

const inputFiltro = document.getElementById('txtFiltro');
//inputFiltro.addEventListener('keyup', ImprimirDatos);

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
        ////////////////////////////////////////////////////////////////////
        let veterinario = await DatosPersona(listaCitas[i]._idVeterinario,null); 
        let cliente = await DatosPersona(listaCitas[i]._idCliente,null);           
        let mascota = await DatosMascota(listaCitas[i]._idMascota);     
        let estadoCita = ObtenerEstadoCita(listaCitas[i].Estado);   
        //FILTROS //////////////////////////////////////////////////////////
        /* if(veterinario.Nombre.toLowerCase().includes(filtro)|| 
        cliente.Nombre.toLowerCase().includes(filtro)|| 
        mascota.Nombre.toLowerCase().includes(filtro)|| 
        estadoCita.toLowerCase().includes(filtro) 
        ){  */
        //////////////////////////////////////////////////////////////////    
        if ((PersonaLogueada.Rol==0||PersonaLogueada.Rol==1)
        ||(PersonaLogueada.Rol==2 && PersonaLogueada._id==listaCitas[i]._idVeterinario)
        ||(PersonaLogueada.Rol==3 && PersonaLogueada._id==listaCitas[i]._idCliente)) {
        //////////////////////////////////////////////////////////////////

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
            let btnAprobar = document.createElement('button');
            btnAprobar.onclick = async function(){
                let confirmacion = false;
                await Swal.fire({
                    title: 'Desea Aprobar la cita ' + mascota.Nombre,
                    showDenyButton: true,
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    icon: 'warning'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });
                if (confirmacion == true) {

                    let result =  await ModificarCita(listaCitas[i]._id,'','A',listaCitas[i].Estrellas); 

                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }

                    await GetListaCitas();
                }
            };
            btnAprobar.type = 'button';
            btnAprobar.innerText = 'A​';
            btnAprobar.title = 'Aprobar Cita';
            btnAprobar.classList.add('DetalleBtn');

            ////////////////////////////////////////////////////
            //Cancelar Cita
            ////////////////////////////////////////////////////
            let btnCancelar = document.createElement('button');
            btnCancelar.onclick = async function(){
                let confirmacion = false;
                await Swal.fire({
                    title: 'Desea Cancelar la cita ' + mascota.Nombre,
                    showDenyButton: true,
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    icon: 'warning'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });
                if (confirmacion == true) {

                    let result =  await ModificarCita(listaCitas[i]._id,'Cancelacion','C',listaCitas[i].Estrellas); 

                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }

                    await GetListaCitas();
                }
            };


            btnCancelar.type = 'button';
            btnCancelar.innerText = 'C​';
            btnCancelar.title = 'Cancelar Cita';
            btnCancelar.classList.add('modificarBtn');

            ////////////////////////////////////////////////////
            //Finalizar Cita
            ////////////////////////////////////////////////////            
           let btnFinalizar = document.createElement('button');

           btnFinalizar.onclick = async function(){
                let confirmacion = false; 

                await Swal.fire({
                    title: 'Desea finalizar la cita ' + mascota.Nombre,
                    showDenyButton: true,
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    icon: 'warning'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });
                if (confirmacion == true) {

                    let result =  await ModificarCita(listaCitas[i]._id,'','F',listaCitas[i].Estrellas); 

                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }

                    window.location.replace("./FinalizarCitaReservacion.html?id="+ listaCitas[i]._id);   
                }
            };

            btnFinalizar.type = 'button';
            btnFinalizar.innerText = 'F'; 
            btnFinalizar.title = 'Finalizar Cita';
            btnFinalizar.classList.add('eliminarBtn');

            ////////////////////////////////////////////////////
            //Pagar Cita
            ////////////////////////////////////////////////////            
            let btnPagar = document.createElement('button');

            btnPagar.onclick = async function(){
                 let confirmacion = false; 
 
                 await Swal.fire({
                     title: 'Desea pagar la cita ' + mascota.Nombre,
                     showDenyButton: true,
                     confirmButtonText: 'Confirmar',
                     denyButtonText: 'Cancelar',
                     icon: 'warning'
                 }).then((res) => {
                     confirmacion = res.isConfirmed;
                 });
                 if (confirmacion == true) {
 
                     let result =  await ModificarCita(listaCitas[i]._id,'','F',listaCitas[i].Estrellas); 
 
                     if (result.resultado == true) {
                         ImprimirMsjSuccess(result.msj);
                     } else {
                         ImprimirMsjError(result.msj);
                     }
 
                     window.location.replace("./ReservacionPagoServicios.html?id="+ listaCitas[i]._id);   
                 }
             };
 
             btnPagar.type = 'button';
             btnPagar.innerText = 'P'; 
             btnPagar.title = 'Pagar Cita';
             btnPagar.classList.add('modificarBtn');            

            ////////////////////////////////////
            //Incluir los botones en Acciones
            ////////////////////////////////////

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnDetalle);

            if (PersonaLogueada.Rol == 0 || PersonaLogueada.Rol == 1){
                if (listaCitas[i].Estado == 'R'){
                    divBtns.appendChild(btnAprobar);
                }
            }

            if (listaCitas[i].Estado == 'R' || listaCitas[i].Estado == 'A'){
                divBtns.appendChild(btnCancelar); 
            }

            if (PersonaLogueada.Rol == 0 || PersonaLogueada.Rol == 2){
                if (listaCitas[i].Estado == 'A'){           
                    divBtns.appendChild(btnFinalizar);
                }
            }    

            if (listaCitas[i].Estado == 'F'){    
                divBtns.appendChild(btnPagar);
            }

            ///////////////////////////////////////////
            //Imorimir Datos de la Cita
            ///////////////////////////////////////////

            celdaFecha.innerHTML = listaCitas[i].FecInicio;
            celdaHora.innerHTML = listaCitas[i].HoraInicio;
            celdaVeterinario.innerHTML = veterinario.Nombre;
            celdaCliente.innerHTML = cliente.Nombre ;   
            celdaMascota.innerHTML = mascota.Nombre; 
            celdaEstado.innerHTML = estadoCita;
            celdaAcciones.appendChild(divBtns);
        } //roles
       //}//filtros
       
    }
}

