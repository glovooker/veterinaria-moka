'use strict';

async function GenerarCita(pFecInicio, pHoraInicio, pFecFinal, pHoraFinal,pTipo,pObservaciones,pMotivoCancela,pEstado,p_idVeterinario,p_idCliente,p_idMascota) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarCita',
        responseType: 'json',
        data: { 
            'FecInicio': pFecInicio,
            'HoraInicio': pHoraInicio,
            'FecFinal': pFecFinal,
            'HoraFinal': pHoraFinal,
            'Tipo': pTipo,
            'Observaciones': pObservaciones,
            'MotivoCancela': pMotivoCancela,
            'Estado': pEstado,
            '_idVeterinario': p_idVeterinario,
            '_idCliente': p_idCliente,
            '_idMascota': p_idMascota
        }
    }).then((res) => {
        result = res.data;
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function ObtenerListaCitas(pTipo) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarCitas',
        responseType: 'json',
        params: {
            'Tipo': pTipo
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}


async function BuscarCita(p_id) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/BuscarCita',
        responseType: 'json',
        params: {
            '_id': p_id
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
  }

  async function ModificarCita(p_id, pMotivoCancela, pEstado, pEstrellas, pEstrellasVeterinario, pObservacionesVeterinario) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/ModificarCita',
        responseType: 'json',
        data: {
            '_id': p_id,
            'MotivoCancela': pMotivoCancela,
            'Estado': pEstado,
            'Estrellas': pEstrellas,
            'EstrellasVeterinario':pEstrellasVeterinario,
            'ObservacionesVeterinario': pObservacionesVeterinario
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}