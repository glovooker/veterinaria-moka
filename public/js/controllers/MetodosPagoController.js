'use strict';

let pNumCliente = 4;
let pCliente = 'Cris Hemsworth';

btnRegistrar.addEventListener('click', Validaciones);

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarFecha() == false) {
    return false;
  } else {
    /***********************************************************************/
    guardarMetodoPago(
      pNumCliente,
      pCliente,
      document.getElementById('txtNumTarjeta').value,
      document.getElementById('txtExpiracion').value,
      document.getElementById('txtCVV').value,
      document.getElementById('txtNombreTarjeta').value
    );
    Swal.fire({
      title: 'Success!',
      text: 'Todos los campos requeridos han sido ingresados',
      icon: 'success',
      confirmButtonText: 'Ok',
    });

    return true;
  }
}

function ValidarFecha() {
  let fecha = document.getElementById('txtExpiracion');
  if (new Date(fecha.value) < new Date()) {
    //fecha debe ser mayor a HOY
    ImprimirMsjError(
      'Fecha de Expiración debe ser superior a hoy, ¡Favor validar!'
    );
    ResaltarInputInvalido('txtExpiracion');
    ResaltarLabelInvalido('lblExpiracion');
    return false;
  }
}
