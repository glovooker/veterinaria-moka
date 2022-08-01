// Clever Solutions
"use strict";

let btnRegistrar = document.getElementById("btnRegistrar");

btnRegistrar.addEventListener("click", ReservarCita);

function ModificarCita() {
  Swal.fire({
    title: "¿Está seguro que desea modificar la cita?",
    text: "¡Esta acción no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3D405B",
    cancelButtonColor: "#E07A5F",
    cancelButtonText: "¡Cancelar!",
    confirmButtonText: "¡Sí, modifíquela!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "¡Modificada!",
        "Ha modificado su cita exitosamente.",
        "success"
      );
    }
  });
}

function ReservarCita() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarFecha() == false) {
    return false;
  } else {
    /***********************************************************************/
    GuardarCita(
      document.getElementById("txtTipoMascota").value,
      document.getElementById("txtFechaCita").value,
      document.getElementById("txtHoraCita").value,
      document.getElementById("txtMedico").value,
      document.getElementById("txtMotivoCita").value
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
  let fecha = document.getElementById("txtFechaCita");
  if (new Date(fecha.value) < new Date()) {
    //fecha debe ser mayor a HOY
    ImprimirMsjError("La fecha de la cita debe ser mayor a hoy", txtFechaCita);
    ResaltarInputInvalido("txtFechaCita");
    ResaltarLabelInvalido("lblFechaCita");
    return false;
  }
}

function EliminarCita() {
  Swal.fire({
    title: "¿Está seguro que desea cancelar la cita?",
    text: "¡Esta acción no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, cancélala!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Cancelada!", "Ha cancelado su cita exitosamente.", "success");
    }
  });
}
