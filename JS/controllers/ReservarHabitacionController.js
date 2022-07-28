// Clever Solutions
"use strict";

btnRegistrar.addEventListener("click", ReservarHabitacion);

function ReservarHabitacion() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarFecha() == false) {
    return false;
  } else if (ValidarFechaDeSalida() == false) {
    return false;
  } else {
    /***********************************************************************/
    GuardarReservacionHabitacion(
      document.getElementById("txtMascota").value,
      document.getElementById("txtFechaDeEntrada").value,
      document.getElementById("txtHoraDeEntrada").value,
      document.getElementById("txtFechaDeSalida").value,
      document.getElementById("txtHoraDeSalida").value,
      document.getElementById("txtCuidadosExtras").value
    );
    Swal.fire({
      title: "Success!",
      text: "Todos los campos requeridos han sido ingresados",
      icon: "success",
      confirmButtonText: "Ok",
    });

    return true;
  }
}

function ValidarFecha() {
  let fecha = document.getElementById("txtFechaDeEntrada");
  if (new Date(fecha.value) < new Date()) {
    //fecha debe ser mayor a HOY
    ImprimirMsjError(
      "La fecha de la cita debe ser mayor a hoy", txtFechaDeEntrada
    );
    ResaltarInputInvalido("txtFechaDeEntrada");
    ResaltarLabelInvalido("lblFechaDeEntrada");
    return false;
  }
}
function ValidarFechaDeSalida() {
  let fecha = document.getElementById("txtFechaDeSalida");
  if (new Date(fecha.value) <= new Date()) {
    //fecha debe ser mayor a HOY
    ImprimirMsjError(
      "La fecha de la cita debe ser mayor a la de la entrada al hotel", txtFechaDeSalida
    );
    ResaltarInputInvalido("txtFechaDeSalida");
    ResaltarLabelInvalido("lblFechaDeSalida");
    return false;
  }
}
