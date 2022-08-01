'use strict';

let pNumCita = 2;

imprimeDetalleCita(pNumCita);

function imprimeDetalleCita(pNumCita){
    let cita = ObtenerCita(pNumCita);
    if (cita != null)   { 
        document.getElementById('outCliente').value = cita.Cliente;
        document.getElementById('outMascota').value = cita.Mascota;
        // document.getElementById('selDoctor').value = cita.Cliente;
        document.getElementById('outFecha').value = cita.Fecha;
        document.getElementById('outHora').value = cita.Hora;
        document.getElementById('outMotivo').value = cita.Motivo;
        
    } 
}