'use strict';

async function GetExpediente() {
    let result = {};
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/ListarExpediente',
        responseType: 'json'
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err)
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
            '_id': p_id
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err)
    });
    return result;

}