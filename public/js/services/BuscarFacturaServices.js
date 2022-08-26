'use strict';
async function BuscarFacturaPorId(p_id){
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/BuscarFacturaPorId',
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


async function ObtenerFacturaBaseDatos() {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarFacturas',
        responseType: 'json'
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}


/* async function BuscarPersonaPorCedula(p_identificacion){
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/BuscarPersona',
        responseType: 'json',
        params: { 
            'Cedula': p_identificacion
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
} */




async function BuscarFacturaPoridCita(p_Idcita){
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/BuscarFacturaPor_idCita',
        responseType: 'json',
        params: { 
            '_idCita': p_Idcita
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}