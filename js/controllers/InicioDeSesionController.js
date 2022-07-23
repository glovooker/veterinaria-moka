let inputUsuario = document.getElementById('txtUsuario');
let inputContrasenna = document.getElementById('txtContrasenna');
btnIngresar.addEventListener('click', IniciarSesion);



function IniciarSesion() {
    let usuario = inputUsuario.value;
    let contrasenna = inputContrasenna.value;

    if (ValidarCampos() == false){
        return false;
    }

    let resultado = AutenticarUsuario(usuario,contrasenna);

    if (resultado != null) {
        RedireccionarUsuario(resultado);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario y Contraseña incorrectos!'
        });
    }
}



function RedireccionarUsuario(pUsuario){
    // aca se va a dirigir cada uno de los usuarios a sus paginas correspondientes
   /*  let rol = pUsuario.Rol;
    if (rol == 'Cliente') {
        location.href = 'IndexCliente.html';
    }
    if (rol == 'Secretaria') {
        location.href = 'IndexSecretaria.html';
    }
    if (rol == 'Administrador') {
        location.href = 'IndexAdmin.html';
    } */

    // este sweet alert es solo para indicar que todo el proceso se realizo bien

    Swal.fire({
        title:'Success!',
        text: 'Todos los campos requeridos han sido ingresados',
        icon: 'success',
        confirmButtonText: 'Ok'
    });


}












