// Clever Solutions
"use strict";

btnRegistrar.addEventListener("click", ReservarCita);

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
