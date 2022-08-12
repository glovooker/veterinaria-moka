"use strict";

let personaConsultada = GetPersonaConsultada();

desplegarDatosConsultados();

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