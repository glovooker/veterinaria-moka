'use strict';

function SetMascotaConsultada(pDatosMascota) {
  localStorage.setItem('datosMascotaConsultada', JSON.stringify(pDatosMascota));
  console.log(pDatosMascota);
}

function LimpiarLSMascotaConsultada() {
  localStorage.removeItem('datosMascotaConsultada');
}

function GetMascotaConsultada() {
  let datosMascotaConsultada = null;
  let localStorageData = localStorage.getItem('datosMascotaConsultada');
  if (
    localStorageData != null &&
    localStorageData != undefined &&
    localStorageData != ''
  ) {
    datosMascotaConsultada = JSON.parse(localStorageData);
  }
  return datosMascotaConsultada;
}

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

async function BuscarMascota(p_id) {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/BuscarMascota',
    responseType: 'json',
    params: {
      '_id': p_id,
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

async function ModificarMascota(p_id,
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
      '_id':p_id,
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
