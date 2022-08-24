// Clever Solutions
"use strict";

let btnRegistrar = document.getElementById("btnRegistrar");

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let acc = urlParams.get('acc'); 
if (acc == null) {
  acc = 'N'; 
} 

btnRegistrar.addEventListener("click", ReservarCita);
linkVolver.addEventListener("click", Volver);

function ModificarMascota() {
  Swal.fire({
    title: "¿Está seguro que desea modificar su mascota?",
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
        "Ha modificado su mascota exitosamente.",
        "success"
      );
    }
  });
}

function ReservarCita() {
  if (ValidarCampos() == false) {
    return false;
  } else {
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
  let fecha = document.getElementById("txtFechaCita");
  if (new Date(fecha.value) < new Date()) {
    //fecha debe ser mayor a HOY
    ImprimirMsjError("La fecha de la cita debe ser mayor a hoy", txtFechaCita);
    ResaltarInputInvalido("txtFechaCita");
    ResaltarLabelInvalido("lblFechaCita");
    return false;
  }
}

function BorrarMascota() {
  Swal.fire({
    title: "¿Está seguro que desea borrar la mascota?",
    text: "¡Esta acción no se puede revertir!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, bórrala!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("¡Borrada!", "Ha borrado su mascota exitosamente.", "success");
    }
  });
}

function Volver(){
  LimpiarLSMascotaConsultada();
  let linkVolver = document.getElementById('linkVolver');     
  if (acc == 'C' || acc == 'M'){    
    linkVolver.href = "./CrudMascotas.html";  
  } else {
    linkVolver.href = "./PaginaInicio.html";
  }
}
