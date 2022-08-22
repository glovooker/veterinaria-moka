'use strict';

async function GetExpediente() {
  let result = {};
  await axios({
    method: 'get',
    url: 'http://localhost:3000/api/ListarExpediente',
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

async function EliminarExpediente(p_id) {
  let result = {};
  await axios({
    method: 'delete',
    url: apiUrl + '/EliminarExpediente',
    responseType: 'json',
    data: {
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

async function ActualizarExpediente(
  p_id,
  pNombre,
  pEspecie,
  pEstrellas,
  pObservaciones,
  pFotoPerfil,
  pPadecimientos,
  pCitas,
  pReservaciones
) {
  let result = {};
  await axios({
    method: 'post',
    url: apiUrl + '/ActualizarExpediente',
    responseType: 'json',
    data: {
      '_id': p_id,
      'Nombre': pNombre,
      'Especie': pEspecie,
      'Estrellas': pEstrellas,
      'Observaciones': pObservaciones,
      'FotoPerfil': pFotoPerfil,
      'Padecimientos': pPadecimientos,
      'Citas': pCitas,
      'Reservaciones': pReservaciones,
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

async function RegistrarExpediente(
  pNombre,
  pEspecie,
  pEstrellas,
  pObservaciones,
  pFotoPerfil,
  pPadecimientos,
  pCitas,
  pReservaciones
) {
  let result = {};
  await axios({
    method: 'post',
    url: apiUrl + 'RegistrarExpediente',
    responseType: 'json',
    data: {
      'Nombre': pNombre,
      'Especie': pEspecie,
      'Estrellas': pEstrellas,
      'Observaciones': pObservaciones,
      'FotoPerfil': pFotoPerfil,
      'Padecimientos': pPadecimientos,
      'Citas': pCitas,
      'Reservaciones': pReservaciones,
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
