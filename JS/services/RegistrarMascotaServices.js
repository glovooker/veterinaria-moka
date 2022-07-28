// Clever Solutions
"use strict";

let ListaRegistroMascota = [];

function ObtenerRegistrosMascotas() {
  return ListaRegistroMascota;
}

function ObtenerRegistroMascota(pNumCuenta) {
  let result = [];
  let j = 0;
  for (let i = 0; i < ListaRegistroMascota.length; i++) {
    if (ListaRegistroMascota[i].NumCuenta == pNumCuenta) {
      result[j] = ListaRegistroMascota[i];
      j += 1;
    }
  }
  return result;
}
function GuardarRegistroMascota(pNombreMascota, pTipoMascota, pInfoAdicional) {
  let nuevoRegistro = {};
  nuevoRegistro.NumCuenta = ListaRegistroMascota.length + 1;
  nuevoRegistro.NombreMascota = pNombreMascota;
  nuevoRegistro.TipoMascota = pTipoMascota;
//   nuevoRegistro.FotoMascota = pFotoMascota;
  nuevoRegistro.InfoAdicional = pInfoAdicional;
  ListaRegistroMascota[ListaRegistroMascota.length] = nuevoRegistro;
}
