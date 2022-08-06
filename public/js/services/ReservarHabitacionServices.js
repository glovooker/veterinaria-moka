// Clever Solutions
"use strict";

let ListaReservarHabitacion = [];

function ObtenerReservaciones() {
  return ListaReservarHabitacion;
}

function ObtenerCita(pNumCuenta) {
  let result = [];
  let j = 0;
  for (let i = 0; i < ListaReservarHabitacion.length; i++) {
    if (ListaReservarHabitacion[i].NumCuenta == pNumCuenta) {
      result[j] = ListaReservarHabitacion[i];
      j += 1;
    }
  }
  return result;
}
function GuardarReservacionHabitacion(pMascota,pFechaDeEntrada, pHoraDeEntrada, pFechaDeSalida, pHoraDeSalida, pCuidadosExtras) {
  let nuevaReservacion = {};
  nuevaReservacion.NumCuenta = ListaReservarHabitacion.length + 1;
  nuevaReservacion.Mascota = pMascota;
  nuevaReservacion.FechaDeEntrada = pFechaDeEntrada;
  nuevaReservacion.HoraDeEntrada = pHoraDeEntrada;
  nuevaReservacion.FechaDeSalida = pFechaDeSalida;
  nuevaReservacion.HoraDeSalida = pHoraDeSalida;
  nuevaReservacion.CuidadosExtras = pCuidadosExtras;
  ListaReservarHabitacion[ListaReservarHabitacion.length] = nuevaReservacion;
}
