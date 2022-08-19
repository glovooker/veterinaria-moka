'use strict';
  let PersonaLogueada = GetSesionActiva();
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let idCita = urlParams.get("_idCita"); 
  let idClteCita;

  let fechaIni = document.getElementById("txtFechaIni");   
  let selMascotas = document.getElementById("selMascotas");
  let selDoctor = document.getElementById("selDoctor");
  let linkVolver = document.getElementById('linkVolver'); 

  btnRegistrar.addEventListener("click", Validaciones);
  linkVolver.addEventListener("click", Volver);

  if (PersonaLogueada.Rol != 3) {
    idClteCita = urlParams.get("_idC"); 
  } else {
    idClteCita = PersonaLogueada._id; 
  }

  imprimirMascotasCliente(idClteCita);
  imprimirDoctores();

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
//Llenar select de doctores
async function imprimirDoctores() {
    let option;
    let listaDoc = await GetPersonasRol(2);
    for (let i = 0; i < listaDoc.length; i++) {
      option = document.createElement("option");
      option.value = listaDoc[i]._id;
      option.text = listaDoc[i].Nombre;
      selDoctor.appendChild(option);
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

  if (fechaCita < fecHoy) { 
    ImprimirMsjError("La fecha de la reservación debe ser mayor a hoy ");
    ResaltarInputInvalido("txtFechaIni");
    ResaltarLabelInvalido("txtFechaIni");
    return false;
  }
}
///////////////////////////////////////////////////////////////////////////
 async function CrearCita(){
   let estadoCita;
   if (PersonaLogueada.Rol ==3) {
      estadoCita = 'R';
   }else{
      estadoCita = 'A';
   }

   let result = await GenerarCita(fechaIni.value,
   document.getElementById("txtHoraCitaIni").value,"","","C", document.getElementById("txtMotivoCita").value,"",estadoCita,selDoctor.value,idClteCita,selMascotas.value);

   if (result.resultado == true) {
       ImprimirMsjSuccess(result.msj);
       const timeoutId = setTimeout(function(){             
           if (PersonaLogueada.Rol ==3) {  
              window.location.replace("./PaginaInicio.html");
            } else {
              window.location.replace("./CrudCitas.html");
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