// Clever Solutions
"use strict";

btnAgregar.addEventListener("click", RegistrarMascota);

function RegistrarMascota() {
  if (ValidarCampos() == false) {
    return false;
  } else {
    /***********************************************************************/
    GuardarRegistroMascota(
      document.getElementById("txtNombreMascota").value,
      document.getElementById("txtTipoDeMascota").value,
    //   document.getElementById("btnSubirImg").value,
      document.getElementById("txtInfoAdicional").value,
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
