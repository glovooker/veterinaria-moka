'use strict';

btnRegistrar.addEventListener('click', Validaciones);

let correo = document.querySelector('#txtEmail');

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else {
    /***********************************************************************/
    recuperarContrasena(correo);
    /***********************************************************************/
    Swal.fire({
      title: 'Success!',
      text: 'Todos los campos requeridos han sido ingresados',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    return true;
  }
}
