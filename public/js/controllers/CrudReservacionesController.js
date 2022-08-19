'use strict';

let PersonaLogueada = GetSesionActiva();

const inputFiltro = document.getElementById('txtFiltro');
//inputFiltro.addEventListener('keyup', ImprimirDatos);

let listaCitas = [];
GetListaCitas();

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
        let cliente = await DatosPersona(listaCitas[i]._idCliente,null);           
        let mascota = await DatosMascota(listaCitas[i]._idMascota);     
        let estadoCita = ObtenerEstadoCita(listaCitas[i].Estado);   
        //FILTROS //////////////////////////////////////////////////////////
        /* if(cliente.Nombre.toLowerCase().includes(filtro)|| 
        mascota.Nombre.toLowerCase().includes(filtro)|| 
        estadoCita.toLowerCase().includes(filtro) 
        ){  */
        //////////////////////////////////////////////////////////////////    
        if (listaCitas[i].Tipo == 'R') {
            if ((PersonaLogueada.Rol==0||PersonaLogueada.Rol==1)
            ||(PersonaLogueada.Rol==3 && PersonaLogueada._id==listaCitas[i]._idCliente)) {
            //////////////////////////////////////////////////////////////////

                let fila = tbody.insertRow();
                let celdaFecha = fila.insertCell();
                let celdaHora = fila.insertCell();
                let celdaFechaFin = fila.insertCell();
                let celdaHoraFin = fila.insertCell();    
                let celdaCliente = fila.insertCell();
                let celdaMascota = fila.insertCell();
                let celdaEstado = fila.insertCell(); 
                let celdaAcciones = fila.insertCell();

                ////////////////////////////////////////////////////
                //Detalle de la Reservación
                ////////////////////////////////////////////////////
                let btnDetalle = document.createElement('button');
                btnDetalle.onclick = function(){              
                    const timeoutId = setTimeout(function(){                   
                    window.location.replace("./CrearCita.html?id="+ listaCitas[i]._id);}, 1000);  
                };
                btnDetalle.type = 'button';
                btnDetalle.innerText = '🔍​';
                btnDetalle.title = 'Ver Detalle Reservación';
                btnDetalle.classList.add('DetalleBtn');
                ////////////////////////////////////////////////////
                //Cancelar Reservación
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
                btnCancelar.title = 'Cancelar Reservación';
                btnCancelar.classList.add('modificarBtn');

                ////////////////////////////////////////////////////
                //Finalizar Reservación
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

                        window.location.replace("./FinalizarCitaReservacion.html?_idCita="+ listaCitas[i]._id);   
                    }
                };

                btnFinalizar.type = 'button';
                btnFinalizar.innerText = 'F'; 
                btnFinalizar.title = 'Finalizar Reservación';
                btnFinalizar.classList.add('eliminarBtn');

                ////////////////////////////////////////////////////
                //Pagar Reservación
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
                btnPagar.title = 'Pagar Reservación';
                btnPagar.classList.add('modificarBtn');            

                ////////////////////////////////////
                //Incluir los botones en Acciones
                ////////////////////////////////////

                let divBtns = document.createElement('div');
                divBtns.appendChild(btnDetalle);

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
                //Imorimir Datos de la Reservación
                ///////////////////////////////////////////
                celdaFecha.innerHTML = listaCitas[i].FecInicio;
                celdaHora.innerHTML = listaCitas[i].HoraInicio;
                celdaFechaFin.innerHTML = listaCitas[i].FecFinal;
                celdaHoraFin.innerHTML = listaCitas[i].HoraFinal;   
                celdaCliente.innerHTML = cliente.Nombre ;   
                celdaMascota.innerHTML = mascota.Nombre; 
                celdaEstado.innerHTML = estadoCita;
                celdaAcciones.appendChild(divBtns);
            } //roles
        }//Reservaciones
       //}//filtros
       
    }
}

