'use strict';

/*Imprimir opciones en el select
function imprimirTarjetas(pNumCliente) {
    let option;
    let listaMetodos = ObtenerMetodoPagoCliente(pNumCliente);
    console.log(listaMetodos.length);
    for (let i = 0; i < listaMetodos.length; i++) {
      option = document.createElement("option");
      option.value = listaMetodos[i].NumTarjeta;
      option.text = listaMetodos[i].NumTarjeta;
      selMetodoPago.appendChild(option);
    }
  }
  */

  let personaConsultada;
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let acc = urlParams.get('acc'); //M = Modificar C=Crear nuevo(CrudPersonas.html)
if (acc == null) {
  acc = 'N'; //Nuevo  (no se llama desde el CRUD)  
} 

btnRegistrar.addEventListener("click", Validaciones);
linkVolver.addEventListener("click", Volver);

desplegarDatosConsultados();

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarPass() == false) {
    return false;
  } else {
  /*********************************************************************/
  if (acc == 'M') {
    ActualizarPersona();
    LimpiarLSPersonaConsultada();
    const timeoutId = setTimeout(function(){
      window.location.replace("./CrudPersonas.html");}, 2000);        
  } else {
    CrearPersona();
  }  
  /*********************************************************************/
  }
}

///////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////
 async function CrearPersona(){
   let result = await RegistrarPersona(document.getElementById("txtidentificacion").value,    
     document.getElementById("txtNombre").value,
     document.getElementById("txtCorreo").value,
     document.getElementById("txtPass").value,      
     document.getElementById("txtTelefono").value,
     document.getElementById("txtDireccion").value,
     3,"","","",""); 

   if (result.resultado == true) {
       ImprimirMsjSuccess(result.msj);
       const timeoutId = setTimeout(function(){             
            if (acc == 'N') {  
              window.location.replace("./InicioDeSesion.html");
            } else {
              window.location.replace("./CrudPersonas.html");
            }

            }, 2000);         
      } else {
        if (result.err.code = 1100) {   
          ImprimirMsjError('La cédula y/o correo indicado ya existen. ¡Favor validar!');
          } else { 
              ImprimirMsjError(result.msj);
        }
      }
  }

  async function ActualizarPersona(){
    let result = await ModificarPersona(personaConsultada._id, 
      document.getElementById("txtidentificacion").value,     
      document.getElementById("txtNombre").value,
      document.getElementById("txtCorreo").value,
      document.getElementById("txtPass").value,      
      document.getElementById("txtTelefono").value,
      document.getElementById("txtDireccion").value,
      3,
      personaConsultada.PerfilFB,
      personaConsultada.PerfilIG,
      personaConsultada.PerfilTW,
      personaConsultada.FotoPerfil,
      personaConsultada.Estado); 
 
    if (result.resultado == true) {
        ImprimirMsjSuccess(result.msj);       
       } else {
           ImprimirMsjError(result.msj);
       }
   }
  
  function desplegarDatosConsultados(){
    if (acc == 'M') {
        personaConsultada = GetPersonaConsultada();
        document.getElementById('txtInicio').innerHTML = 'Actualizar Persona';
        document.getElementById("txtidentificacion").value =  personaConsultada.Cedula;
        document.getElementById("txtNombre").value = personaConsultada.Nombre;
        document.getElementById("txtCorreo").value = personaConsultada.Correo;
        document.getElementById("txtPass").value = personaConsultada.Password; 
        document.getElementById("txtPass2").value = personaConsultada.Password;      
        document.getElementById("txtTelefono").value = personaConsultada.Telefono;
        document.getElementById("txtDireccion").value = personaConsultada.Direccion;
    }
  }

  function Volver(){
    LimpiarLSPersonaConsultada();
    let linkVolver = document.getElementById('linkVolver');     
    if (acc == 'C' || acc == 'M'){    
      linkVolver.href = "./CrudPersonas.html";  
    } else {
      linkVolver.href = "./PaginaInicio.html";
    }
  }