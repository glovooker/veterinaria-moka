'use strict';

async function RegistrarExpediente(pNombre, pEspecie, pEstrellas, pObservaciones, pFotoPerfil, pPadecimientos, pCitas, pReservaciones){
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl  + 'RegistrarExpediente',
        responseType: 'json',
        data: {
            'Nombre': pNombre,
            'Especie': pEspecie,
            'Estrellas':pEstrellas,
            'Observaciones': pObservaciones,
            'FotoPerfil': pFotoPerfil,
            'Padecimientos': pPadecimientos,
            'Citas': pCitas,
            'Reservaciones': pReservaciones
        }  
    }).then((res) => {
        result = res.data;
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    return result;
}


async function GetExpedientes(){
    let result = {};
    await axios({
        method:'get',
        url: apiUrl + 'ListarExpediente',
        responseType: 'json',
    }).then((res)=>{
        result = res.data;
    }).catch((err)=>{
        console.log(err);
    });
    return result;
}

async function ActualizarExpediente(p_id,pNombre, pEspecie, pEstrellas, pObservaciones, pFotoPerfil, pPadecimientos, pCitas, pReservaciones) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/ActualizarExpediente',
        responseType: 'json',
        data: {
            '_id': p_id,
            'Nombre': pNombre,
            'Especie': pEspecie,
            'Estrellas':pEstrellas,
            'Observaciones': pObservaciones,
            'FotoPerfil': pFotoPerfil,
            'Padecimientos': pPadecimientos,
            'Citas': pCitas,
            'Reservaciones': pReservaciones
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}