// Clever Solutions
"use strict";

btnRegistrar.addEventListener("click", ReservarHabitacion);

function EliminarReservacion() {
  Swal.fire({
    title: "¿Está seguro que desea cancelar la reservación?",
    text: "¡Esta acción no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, cancélala!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "¡Cancelada!",
        "Ha cancelado su reservación exitosamente.",
        "success"
      );
    }
  });
}

function ModificarReservacion() {
  Swal.fire({
    title: "¿Está seguro que desea modificar la reservación?",
    text: "¡Esta acción no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, modifíquela!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "¡Modificada!",
        "Ha modificado su reservación exitosamente.",
        "success"
      );
    }
  });
}

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
    ImprimirMsjError("La fecha debe ser mayor a hoy", txtFechaDeEntrada);
    ResaltarInputInvalido("txtFechaDeEntrada");
    ResaltarLabelInvalido("lblFechaDeEntrada");
    return false;
  }
}
function ValidarFechaDeSalida() {
  let fechaSalida = document.getElementById("txtFechaDeSalida");
  let fechaEntrada = document.getElementById("txtFechaDeEntrada");
  if (new Date(fechaSalida.value) <= new Date(fechaEntrada.value)) {
    ImprimirMsjError(
      "La fecha de salida debe ser mayor a la fecha de entrada",
      txtFechaDeSalida
    );
    ResaltarInputInvalido("txtFechaDeSalida");
    ResaltarLabelInvalido("lblFechaDeSalida");
    return false;
  }
}
