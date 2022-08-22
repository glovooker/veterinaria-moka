"use strict";

let personaConsultada = GetPersonaConsultada();
desplegarDatosConsultados();
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let acc = urlParams.get('acc'); //Q = query
if (acc == null) {
  acc = 'D'; //Desplegar  (no se llama desde el CRUD)  
} 
linkVolver.addEventListener("click", Volver);

function desplegarDatosConsultados(){    
        if (personaConsultada != null) {
        document.getElementById("outCedula").value =  personaConsultada.Cedula;
        document.getElementById("outNombre").value = personaConsultada.Nombre;
        document.getElementById("outEmail").value = personaConsultada.Correo;
        document.getElementById("outTelefono").value = personaConsultada.Telefono;
        document.getElementById("outDireccion").value = personaConsultada.Direccion;
        document.getElementById("linkFB").href = personaConsultada.PerfilFB;
        document.getElementById("linkIG").href = personaConsultada.PerfilIG;
        document.getElementById("linkTW").href = personaConsultada.PerfilTW;
    }
  }

  function Volver(){
    LimpiarLSPersonaConsultada();
    let linkVolver = document.getElementById('linkVolver');     
    if (acc == 'Q'){    
      linkVolver.href = "./CrudPersonas.html";  
    } else {
      linkVolver.href = "./PaginaInicio.html";
    }
  }