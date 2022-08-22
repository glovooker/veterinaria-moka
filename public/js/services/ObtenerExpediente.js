'use strict';

async function ObtenerExpediente() {
    let result = {};
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api',
        responseType: 'json'
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });

    return result;
}
