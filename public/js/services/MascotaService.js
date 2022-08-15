//Clever Solutions
'use strict';

async function RegistrarMascota(
  pNombre,
  pEspecie,
  pEstrellas,
  pObservaciones,
  pFotoMascota,
  pIdPersona
) {
  let result = {};
  await axios({
    method: 'post',
    url: apiUrl + '/RegistrarMascota',
    responseType: 'json',
    data: {
      'Nombre': pNombre,
      'Especie': pEspecie,
      'Estrellas': pEstrellas,
      'Observaciones': pObservaciones,
      'FotoMascota': pFotoMascota,
      'IdPersona': pIdPersona,
    },
  })
    .then((res) => {
      result = res.data;
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function ObtenerListaMascota() {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/ListarMascota',
    responseType: 'json',
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function BuscarMascota(pIdPersona, pNombre) {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/BuscarMascota',
    responseType: 'json',
    params: {
      'IdPersona': pIdPersona,
      'Nombre': pNombre,
    },
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function ModificarMascota(
  pNombre,
  pEspecie,
  pEstrellas,
  pObservaciones,
  pFotoMascota,
  pIdPersona
) {
  let result = {};
  await axios({
    method: 'post',
    url: apiUrl + '/ModificarMascota',
    responseType: 'json',
    data: {
      'Nombre': pNombre,
      'Especie': pEspecie,
      'Estrellas': pEstrellas,
      'Observaciones': pObservaciones,
      'FotoMascota': pFotoMascota,
      'IdPersona': pIdPersona,
    },
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function BuscarIdPersona(pIdPersona) {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/BuscarIdPersona',
    responseType: 'json',
    params: {
      'IdPersona': pIdPersona,
    },
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function BuscarMascotasPersona(pIdPersona) {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/BuscarMascotasPersona',
    responseType: 'json',
    params: {
      'IdPersona': pIdPersona,
    },
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}
