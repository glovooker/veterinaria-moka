'use strict'

async function RegistrarFactura(pIdentificacion, pSumaTotal, pFecha, pDetalles,pNumeroFactura,idCita) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarFactura',
        responseType: 'json',
        data: {
            'Identificacion': pIdentificacion,
            'TotalAPagar': pSumaTotal,
            'Fecha': pFecha,
            'NumeroFactura': pNumeroFactura,
            '_idCita': idCita
        }
    }).then(async(res) => {
        result = res.data;
        if(result.resultado == true){
            let resultDetalles =  await RegistrarDetalles(res.data.FacturaDB._id, pDetalles);
            console.log('resultDetalles: ', resultDetalles);
        }
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function  RegistrarDetalles(p_id, pDetalles){
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarDetalles',
        responseType: 'json',
        data: {
            '_id': p_id,
            'Detalles': pDetalles
        }
    }).then((res) =>{
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}


async function ObtenerFacturaBaseDatos(){
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarFacturas',
        responseType: 'json'

    }).then((res)=>{
        result = res.data;
    }).catch((err)=>{
        console.log(err);
    });
    return result;
}



async function ActualizarEstadoFactura(p_id,pEstado) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/ModificarEstado',
        responseType: 'json',
        data: {
            '_id': p_id,
            'Estado' :pEstado 
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}
