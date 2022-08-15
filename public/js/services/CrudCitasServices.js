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