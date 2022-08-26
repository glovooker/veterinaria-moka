// Clever Solutions
"use strict";

//let btnRegistrar = document.getElementById("btnRegistrar");
let personaConsultada;
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let acc = urlParams.get('acc'); 
if (acc == null) {
  acc = 'N'; 
} 

btnRegistrar.addEventListener("click", Validaciones);
linkVolver.addEventListener("click", Volver);

desplegarDatosConsultados();

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else {
    /*********************************************************************/
    if (acc == 'M') {
      ActualizarMascota();
      LimpiarLSMascotaConsultada();
      const timeoutId = setTimeout(function () {
        window.location.replace('./CrudMascotas.html');
      }, 2000);
    } else {
      CrearMascota();
    }
    /*********************************************************************/
  }
}


async function ActualizarMascota() {
  let result = await ModificarMascota(
    mascotaConsultada._id,
    document.getElementById('txtNombreMascota').value,
    document.getElementById('txtTipoDeMascota').value,
    document.getElementById('txtInfoAdicional').value,
    3,
    document.getElementById('imgMasc').src,
  );

  if (result.resultado == true) {
    ImprimirMsjSuccess(result.msj);
  } else {
    ImprimirMsjError(result.msj);
  }
}

async function CrearMascota() {
  let result = await RegistrarMascota(
    document.getElementById('txtNombreMascota').value,
    document.getElementById('txtTipoDeMascota').value,
    document.getElementById('txtInfoAdicional').value,
    document.getElementById('imgMasc').src,
    3,
    '',
    '',
    '',
    ''
  );

  if (result.resultado == true) {
    ImprimirMsjSuccess(result.msj);
    const timeoutId = setTimeout(function () {
      if (acc == 'N') {
        window.location.replace('./InicioDeSesion.html');
      } else {
        window.location.replace('./CrudMascotas.html');
      }
    }, 2000);
    } else {
      ImprimirMsjError(result.msj);
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

function desplegarDatosConsultados() {
  if (acc == 'M') {
    mascotaConsultada = GetMascotaConsultada();
    document.getElementById('txtInicio').innerHTML = 'Actualizar Persona';
    document.getElementById('txtNombreMascota').value = mascotaConsultada.Nombre;
    document.getElementById('txtTipoDeMascota').value = mascotaConsultada.Especie;
    document.getElementById('txtInfoAdicional').value = mascotaConsultada.Observaciones;
    document.getElementById('imgMasc').value = mascotaConsultada.FotoMascota;
  }
}

// function Volver(){
//   LimpiarLSMascotaConsultada();
//   let linkVolver = document.getElementById('linkVolver');     
//   if (acc == 'C' || acc == 'M'){    
//     linkVolver.href = "./CrudMascotas.html";  
//   } else {
//     linkVolver.href = "./PaginaInicio.html";
//   }
// }

