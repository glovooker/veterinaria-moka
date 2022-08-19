'use strict';
const apiUrl = 'http://localhost:3000/api';

function ObtenerEstado(pEstado){
    switch (Number(pEstado)) {
        case 1:            
            return 'Activo';    
        default:
            return 'Inactivo';
    }
}

function ObtenerRol(pRol) {
    switch (Number(pRol)) {
        case 0:
            return 'Administrador';
        case 1:
            return 'Secretaria';
        case 2:
            return 'Veterinario';
        case 3:
            return 'Cliente';
    }
}

function ImprimirMsjError(msj) {
    Swal.fire({
        title: 'Error!',
        text: msj,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}
function ImprimirMsjSuccess(msj) {
    Swal.fire({
        title: 'Excelente!',
        text: msj,
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}

function ObtenerEstadoCita(pEstado){
    switch ((pEstado)) {
        case 'R':            
            return 'Registrado';    
        case 'A':            
            return 'Aprobado';   
        case 'C':            
            return 'Cancelado';                 
        case 'F':            
            return 'Finalizado';
        case 'P':            
            return 'Pagado';    
    }
}

function ObtenerTipoCita(pTipo){
    switch (pTipo) {
        case 'C':            
            return 'Cita';    
        default:
            return 'Reservación';
    }
}