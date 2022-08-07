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
        console.log(listaPersonas);
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}

async function ImprimirDatos() {
    var tbody = document.getElementById('tbdPersonas');
    tbody.innerHTML = '';

    let filtro = inputFiltro.value;

    for (let i = 0; i < listaPersonas.length; i++) {
        if( listaPersonas[i].Nombre.toLowerCase().includes(filtro) ||
            listaPersonas[i].Cedula.toLowerCase().includes(filtro) ||
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

            let btnEdit = document.createElement('button');
            btnEdit.onclick = function(){
            };

            btnEdit.type = 'button';
            btnEdit.innerText = '✏️​';
            btnEdit.title = 'Editar';
            btnEdit.classList.add('modificarBtn');

            
            let btnPerfil = document.createElement('button');
            btnPerfil.onclick = function(){
                const timeoutId = setTimeout(function(){
                window.location.replace("./PerfilUsuario.html");}, 1000);  
            };
            btnPerfil.type = 'button';
            btnPerfil.innerText = '🔍​';
            btnPerfil.title = 'Ver Perfil';
            btnPerfil.classList.add('DetalleBtn');


           /* let btnInactivar = document.createElement('button');
            btnInactivar.onclick = async function(){
                let confirmacion = false;
                await Swal.fire({
                    title: 'Desea inactivar el registro de ' + listaPersonas[i].Nombre,
                    showDenyButton: true,
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    icon: 'warning'
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });
                if (confirmacion == true) {
                    let result =  await DesactivarPersona(listaPersonas[i]._id);
                    if (result.resultado == true) {
                        ImprimirMsjSuccess(result.msj);
                    } else {
                        ImprimirMsjError(result.msj);
                    }
                    await GetListaPersonas();
                }
            };
            btnInactivar.type = 'button';
            btnInactivar.innerText = 'Off';
            btnInactivar.title = 'INACTIVAR';
            btnInactivar.classList.add('btnTabla');*/


            let divBtns = document.createElement('div');
            divBtns.appendChild(btnEdit);
            divBtns.appendChild(btnPerfil);
           // divBtns.appendChild(btnInactivar);

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