'use strict';

let listaReserva = [
    { NumReserva: 1, Cliente: 'Andrey Villalobos', Mascota: 'Rocky', FechaEntra: '30/07/2022', HoraEntra: '08:00', FechaSale: '02/08/2022', HoraSale: '18:00', Cuidados: 'No come atún' },
    { NumReserva: 2, Cliente: 'Johel Lopez', Mascota: 'Perlita', FechaEntra: '30/07/2022', HoraEntra: '09:00', FechaSale: '31/07/2022', HoraSale: '13:00',  Cuidados: 'Ponerle frasada al dormir' },
    { NumReserva: 3, Cliente: 'Randall Badilla', Mascota: 'Princesa', FechaEntra: '31/07/2022', HoraEntra: '13:00', FechaSale: '05/08/2022', HoraSale: '16:00', Cuidados: 'Es muy chineada, cuidarla que no se moje' },
    { NumReserva: 4, Cliente: 'Cris Hemsworth', Mascota: 'Killer', FechaEntra: '3107/2022', HoraEntra: '14:00',  FechaSale: '01/08/2022', HoraSale: '17:00',Cuidados: 'Darle el juguete de llanta' },
];

function ObtenerReservas(){
    return listaReserva;
}

function ObtenerReserva(pNumReserva) {
    let result = null;
    for (let i = 0; i < listaReserva.length; i++) {
        if (listaReserva[i].NumReserva == pNumReserva) {
            result = listaReserva[i];
            break;
        }
    }  
    return result;
}