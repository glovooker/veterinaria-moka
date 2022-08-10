"use strict";

let personaConsultada = GetPersonaConsultada();

desplegarDatosConsultados();

function desplegarDatosConsultados(){    
        if (personaConsultada != null) {
        document.getElementById("txtidentificacion").value =  personaConsultada.Cedula;
        document.getElementById("txtNombre").value = personaConsultada.Nombre;
        document.getElementById("txtCorreo").value = personaConsultada.Correo;
        document.getElementById("txtPass").value = personaConsultada.Password; 
        document.getElementById("txtPass2").value = personaConsultada.Password;      
        document.getElementById("txtTelefono").value = personaConsultada.Telefono;
        document.getElementById("txtDireccion").value = personaConsultada.Direccion;
    }
  }