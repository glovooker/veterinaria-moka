'use strict';

const inputFiltro = document.getElementById('txtFiltro');
inputFiltro.addEventListener('keyup', ImprimirDatos);

let listaPersonas = [];

GetListaPersonas();

async function GetListaPersonas() {
    let result = await ObtenerListaPersonas();
    if (result != {} && result.resultado == true) {
        listaPersonas = result.ListaPersonasBD;
        ImprimirDatos(); 
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    let filtro = inputFiltro.value;
    var tbody = document.getElementById('tbdPersonas');
    tbody.innerHTML = '';

    for (let i = 0; i < listaPersonas.length; i++) {
        if( listaPersonas[i].Nombre.toLowerCase().includes(filtro) || 
            ObtenerRol(listaPersonas[i].Rol).toLowerCase.includes(filtro) || 
            ObtenerEstado(listaPersonas[i].Estado).toLowerCase().includes(filtro)
        ){
            let fila = tbody.insertRow();
            let celdaCedula = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaTelefono = fila.insertCell();
            let celdaRol = fila.insertCell();
            let celdaEstado = fila.insertCell(); 
            let celdaAcciones = fila.insertCell();

            ////////////////////////////////////////////////////
            //VER PERFIL PERSONA
            ////////////////////////////////////////////////////            
            let btnPerfil = document.createElement('button');
            btnPerfil.onclick = function(){
                LimpiarLSPersonaConsultada();
                SetPersonaConsultada(listaPersonas[i]);                
                const timeoutId = setTimeout(function(){
                window.location.replace("./PerfilPersona.html");}, 1000);  
            };
            btnPerfil.type = 'button';
            btnPerfil.innerText = '🔍​';
            btnPerfil.title = 'Ver Perfil';
            btnPerfil.classList.add('DetalleBtn');

            ////////////////////////////////////////////////////
            //MODIFICAR PERSONA
            ////////////////////////////////////////////////////
            let btnEdit = document.createElement('button');
            btnEdit.onclick = function(){
                LimpiarLSPersonaConsultada();
                SetPersonaConsultada(listaPersonas[i]);
                const timeoutId = setTimeout(function(){
                // desplegar los datos de la persona consultada para que puedan ser modificados
                window.location.replace("./CrearCuentaCliente.html");}, 1000);                  
                
            };
            btnEdit.type = 'button';
            btnEdit.innerText = '✏️​';
            btnEdit.title = 'Editar';
            btnEdit.classList.add('modificarBtn');

            ////////////////////////////////////////////////////
            //BORRADO LOGICO DE LA PERSONA
            ////////////////////////////////////////////////////            
           let btnInactivar = document.createElement('button');
            btnInactivar.onclick = async function(){
                let confirmacion = false;
                let msj = 'Desea inactivar el registro de ' + listaPersonas[i].Nombre;
                if  (listaPersonas[i].Estado == 0){
                    msj = 'Desea activar el registro de ' + listaPersonas[i].Nombre;
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
                    if  (listaPersonas[i].Estado == 0){
                        vEstado = 1;
                    }

                    let result =  await ModificarPersona(listaPersonas[i]._id, listaPersonas[i].Cedula, listaPersonas[i].Nombre, listaPersonas[i].Correo, listaPersonas[i].Password, listaPersonas[i].Telefono, listaPersonas[i].Direccion, listaPersonas[i].PerfilFB, listaPersonas[i].PerfilIG, listaPersonas[i].PerfilTW, listaPersonas[i].FotoPerfil, vEstado); 

                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }

                    await GetListaPersonas();
                }
            };

            btnInactivar.type = 'button';
            btnInactivar.innerText = '💡'; 
            btnInactivar.title = 'Activar/Desactivar';
            btnInactivar.classList.add('eliminarBtn');

            let divBtns = document.createElement('div');
            divBtns.appendChild(btnPerfil);
            divBtns.appendChild(btnEdit);            
            divBtns.appendChild(btnInactivar);

            celdaCedula.innerHTML = listaPersonas[i].Cedula;
            celdaNombre.innerHTML = listaPersonas[i].Nombre;
            celdaCorreo.innerHTML = listaPersonas[i].Correo;
            celdaTelefono.innerHTML = listaPersonas[i].Telefono;    
            celdaRol.innerHTML = ObtenerRol(listaPersonas[i].Rol); 
            celdaEstado.innerHTML = ObtenerEstado(listaPersonas[i].Estado);
            celdaAcciones.appendChild(divBtns);
        }
    }
}