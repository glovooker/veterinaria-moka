// Clever Solutions
"use strict";

let ListaCitas = [];

function ObtenerCitas() {
  return ListaCitas;
}

function ObtenerCita(pNumCuenta) {
  let result = [];
  let j = 0;
  for (let i = 0; i < ListaCitas.length; i++) {
    if (ListaCitas[i].NumCuenta == pNumCuenta) {
      result[j] = ListaCitas[i];
      j += 1;
    }
  }
  return result;
}
function GuardarCita(pMascota, pFechaCita, pHoraCita, pMedico, pMotivoCita) {
  let nuevaCita = {};
  nuevaCita.NumCuenta = ListaCitas.length + 1;
  nuevaCita.Mascota = pMascota;
  nuevaCita.FechaCita = pFechaCita;
  nuevaCita.HoraCita = pHoraCita;
  nuevaCita.Medico = pMedico;
  nuevaCita.MotivoCita = pMotivoCita;
  ListaCitas[ListaCitas.length] = nuevaCita;
}
