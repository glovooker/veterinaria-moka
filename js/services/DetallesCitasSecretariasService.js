'use strict';

let listaCitas = [
    { NumRegistro: 1, Cliente: 'Andrey Villalobos', Mascota: 'Rocky', Fecha: '30/07/2022', Hora: '08:00', Doctor: 'Gabriel Lobo', Estado: 'Cancelada', Motivo: 'Revisión general' },
    { NumRegistro: 2, Cliente: 'Johel Lopez', Mascota: 'Perlita', Fecha: '30/07/2022', Hora: '09:00', Doctor: 'Gabriel Lobo', Estado: 'Terminada', Motivo: 'Desparasitar' },
    { NumRegistro: 3, Cliente: 'Randall Badilla', Mascota: 'Princesa', Fecha: '31/07/2022', Hora: '13:00', Doctor: 'Alvaro Castillo', Estado: 'Activa', Motivo: 'Grooming' },
    { NumRegistro: 4, Cliente: 'Cris Hemsworth', Mascota: 'Killer', Fecha: '3107/2022', Hora: '14:00', Doctor: 'Alvaro Castillo', Estado: 'Activa', Motivo: 'Seguimiento de cirugía' },
];

function ObtenerCitas(){
    return listaCitas;
}

function ObtenerCita(pNumCita) {
    let result = null;
    for (let i = 0; i < listaCitas.length; i++) {
        if (listaCitas[i].NumRegistro == pNumCita) {
            result = listaCitas[i];
            break;
        }
    }  
    return result;
}