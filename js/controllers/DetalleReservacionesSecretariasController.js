'use strict';

let pNumReserva = 3;

imprimeDetalleReserva(pNumReserva);

function imprimeDetalleReserva(pNumReserva){
    let Reserva = ObtenerReserva(pNumReserva);
    if (Reserva != null)   { 
        document.getElementById('outCliente').value = Reserva.Cliente;
        document.getElementById('outMascota').value = Reserva.Mascota;
        document.getElementById('outFechaEntra').value = Reserva.FechaEntra;
        document.getElementById('outHoraEntra').value = Reserva.HoraEntra;
        document.getElementById('outFechaSale').value = Reserva.FechaSale;
        document.getElementById('outHoraSale').value = Reserva.HoraSale;        
        document.getElementById('outCuidados').value = Reserva.Cuidados;
        
    } 
}