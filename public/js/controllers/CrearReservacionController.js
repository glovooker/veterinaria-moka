'use strict';
  let PersonaLogueada = GetSesionActiva();
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
 
  let idClteCita;

  let fechaIni = document.getElementById("txtFechaIni");  
  let fechaFin = document.getElementById("txtFechaFin");  
  let selMascotas = document.getElementById("selMascotas");
  let linkVolver = document.getElementById('linkVolver'); 

  btnRegistrar.addEventListener("click", Validaciones);
  linkVolver.addEventListener("click", Volver);

  if (PersonaLogueada.Rol != 3) {
    idClteCita = urlParams.get("_idC"); 
  } else {
    idClteCita = PersonaLogueada._id; 
  }

  imprimirMascotasCliente(idClteCita); 

//////////////////////////////////////////////////////////////////////////
//Llenar select de mascotas
async function imprimirMascotasCliente(pidClteCita) {
    let option; 
    let mascotasCliente = await ObtenerMascotasCliente(pidClteCita);
    for (let i = 0; i < mascotasCliente.length; i++) {
      option = document.createElement("option");
      option.value = mascotasCliente[i]._id;
      option.text = mascotasCliente[i].Nombre;
      selMascotas.appendChild(option);
    }
  }

//////////////////////////////////////////////////////////////////////////
//validaciones de los campos 
function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarFecha() == false) {
    return false;
  } else {
  /*********************************************************************/
    CrearCita(); 
  /*********************************************************************/
  }
}
////////////////////////////////////////////////////////////////////////
function ValidarFecha() {
  let fecHoy =  new Date();
  let fechaCita = new Date(fechaIni.value.replace('-','/'));
  let fechaCitaFin = new Date(fechaFin.value.replace('-','/'));

  if (fechaCita < fecHoy) {
    ImprimirMsjError("La fecha de la cita  debe ser mayor a hoy");
    ResaltarInputInvalido("txtFechaIni");
    ResaltarLabelInvalido("txtFechaIni");
    return false;
  }
  if (fechaCitaFin <= fechaCita) {
    ImprimirMsjError("La fecha de salida debe ser posterior a la de ingreso");
    ResaltarInputInvalido("txtFechaFin");
    ResaltarLabelInvalido("txtFechaFin");
    return false;   
  }
}
///////////////////////////////////////////////////////////////////////////
 async function CrearCita(){
//(pFecInicio, pHoraInicio, pFecFinal, pHoraFinal,pTipo,pObservaciones,
//pMotivoCancela,pEstado,p_idVeterinario,p_idCliente,p_idMascota)  
   let result = await GenerarCita(fechaIni.value, document.getElementById("txtHoraCitaIni").value, fechaFin.value, document.getElementById("txtHoraCitaFin").value, "R", document.getElementById("txtMotivoCita").value, "","A","",idClteCita,selMascotas.value);

   if (result.resultado == true) {
       ImprimirMsjSuccess(result.msj);
       const timeoutId = setTimeout(function(){             
           if (PersonaLogueada.Rol ==3) {  
              window.location.replace("./PaginaInicio.html");
            } else {
              window.location.replace("./CrudReservaciones.html");
            }

            }, 2000);         
      } else { 
           ImprimirMsjError(result.msj); 
      }
  }
  
  function Volver(){         
    if (PersonaLogueada.Rol !=3){    
      linkVolver.href = "./CrudPersonas.html";  
    } else {
      linkVolver.href = "./PaginaInicio.html";
    }
  }