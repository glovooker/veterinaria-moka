"use strict";

btnRegistrar.addEventListener("click", Validaciones);

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarFecha() == false) {
    return false;
  } else {
    /***********************************************************************/
    CrearTarjeta();
    /***********************************************************************/
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
  let fecha = document.getElementById("txtExpiracion");
  if (new Date(fecha.value) < new Date()) {
    //fecha debe ser mayor a HOY
    ImprimirMsjError(
      "Fecha de Expiración debe ser superior a hoy, ¡Favor validar!"
    );
    ResaltarInputInvalido("txtExpiracion");
    ResaltarLabelInvalido("lblExpiracion");
    return false;
  }
}

async function CrearTarjeta() {
  let result = await RegistrarTarjeta(
    document.getElementById("txtNumTarjeta").value,
    document.getElementById("txtExpiracion").value,
    document.getElementById("txtCVV").value,
    document.getElementById("txtNombreTarjeta").value,
    ""
  );

  if (result.resultado == true) {
    ImprimirMsjSuccess(result.msj);
    const timeoutId = setTimeout(function () {
      window.location.replace("./MetodosPagoCreacionListadoEliminacion.html");
    }, 2000);
  } else {
    if ((result.err.code = 1100)) {
      ImprimirMsjError(" ");
    } else {
      ImprimirMsjError(result.msj);
    }
  }
}
