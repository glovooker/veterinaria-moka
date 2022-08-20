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

let CrearTarjeta = () => {
  let numTarjeta = document.getElementById("txtNumTarjeta");
  let expiracion = document.getElementById("txtExpiracion");
  let ccv = document.getElementById("txtCVV");
  let nombreTarjeta = document.getElementById("txtNombreTarjeta");
  let persona = JSON.parse(localStorage.getItem("datosPersonaConsultada"));
  // console.log(persona);
  let Tarjeta = {
    _idC: persona._id,
    NumTarjeta: numTarjeta.value,
    FecExpira: expiracion.value,
    Cvv: ccv.value,
    Nombre: nombreTarjeta.value,
  };
  RegistrarTarjetaDatos("RegistrarTarjeta", Tarjeta);
};
