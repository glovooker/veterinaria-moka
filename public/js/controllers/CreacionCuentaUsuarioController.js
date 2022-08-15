"use strict";

btnRegistrar.addEventListener("click", Validaciones);

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarPass() == false) {
    return false;
  } else {
  /*********************************************************************/
     CrearPersona();  
  /*********************************************************************/  
  }
}

function ValidarPass() {
  /*Valida que password y confirmacion sean iguales */
  let pass1 = document.getElementById("txtPass");
  let pass2 = document.getElementById("txtPass2");

  if (pass1.value != pass2.value) {
    ImprimirMsjError(
      "Contraseña y confirmación deben ser iguales, ¡Favor validar!"
    );
    ResaltarInputInvalido("txtPass");
    ResaltarLabelInvalido("lblPass");
    ResaltarInputInvalido("txtPass2");
    ResaltarLabelInvalido("lblPass2");
    return false;
  }
}

 async function CrearPersona(){
   let result = await RegistrarPersona(document.getElementById("txtidentificacion").value,    
     document.getElementById("txtNombre").value,
     document.getElementById("txtCorreo").value,
     document.getElementById("txtPass").value,      
     document.getElementById("txtTelefono").value,
     document.getElementById("txtDireccion").value,
     document.getElementById("selRol").value,
     document.getElementById("txtFacebook").value,
     document.getElementById("txtInstagram").value,
     document.getElementById("txtTwitter").value,
     ""); 

   if (result.resultado == true) {
       ImprimirMsjSuccess(result.msj);
       const timeoutId = setTimeout(function(){
             window.location.replace("./InicioDeSesion.html");}, 2000);         
      } else {
        if (result.err.code = 1100) {   
          ImprimirMsjError('La cédula y/o correo indicado ya existen. ¡Favor validar!');
          } else { 
              ImprimirMsjError(result.msj);
        }
      }
  }