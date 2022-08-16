'use strict';

async function ObtenerListaCitas() {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarCitas',
        responseType: 'json'
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

  async function ModificarCita(p_id, pMotivoCancela, pEstado, pEstrellas) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/ModificarCita',
        responseType: 'json',
        data: {
            '_id': p_id,
            'MotivoCancela': pMotivoCancela,
            'Estado': pEstado,
            'Estrellas': pEstrellas
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}