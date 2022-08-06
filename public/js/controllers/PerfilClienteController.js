'user strict'

let nombre = document.getElementById('outNombre');
let telefono = document.getElementById('outNumero');
let direccion = document.getElementById('outDireccion');
let cedula = document.getElementById('outNumeroCedula');
let email = document.getElementById('outEmail');
let usuario = document.getElementById('outUsuario');
let perfilUsuario = 'jeville';/* aca colocamos el nombre del usuario que queramos buscar*/

ImprimirInformacion();

function ImprimirInformacion(){
    let DatosCliente = obtenerDatos(perfilUsuario);
    console.log(DatosCliente)

    if (DatosCliente!=null){
        nombre.value = DatosCliente.Nombre;
        telefono.value = DatosCliente.Telefono;
        direccion.value = DatosCliente.Direccion;
        cedula.value = DatosCliente.Cedula;
        email.value = DatosCliente.Email
        usuario.value = DatosCliente.Usuario

    }
}








