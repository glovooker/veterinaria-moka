'use strict';

async function BuscarExpedienteId(p_id) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/BuscarExpedientePorId',
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
};

async function ActualizarExpediente(p_id, pNombre,pDuenno,pUsuario, pEspecie, pEstrellas, pObservaciones, pFoto, pPadecimientos, pCitas, pReservaciones) {
    let result = {};
    await axios({
        method: 'put',
        url: apiUrl + '/ActualizarExpediente',
        responseType: 'json',
        data: {
            '_id': p_id,
            'Nombre': pNombre,
            'Duenno': pDuenno,
            'Usuario': pUsuario,
            'Especie': pEspecie,
            'Estrellas': pEstrellas,
            'Observaciones': pObservaciones,
            'FotoPerfil': pFoto,
            'Padecimientos': pPadecimientos,
            'Citas': pCitas,
            'Reservaciones': pReservaciones
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se puede registrar, ya existe este mismo expediente';
                    console.log('No se pudo registrar 11000');
                    console.log(res.data.err);
                    break;

                default:
                    break;
            }
        }
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
};

async function RegistrarExpediente(pNombre, pDuenno, pUsuario, pEspecie, pEstrellas, pObservaciones, pFoto, pPadecimientos, pCitas, pReservaciones, pNumeroExpediente) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarExpediente',
        responseType: 'json',
        data: {
            'Nombre': pNombre,
            'Duenno': pDuenno,
            'Usuario': pUsuario,
            'Especie': pEspecie,
            'Estrellas': pEstrellas,
            'Observaciones': pObservaciones,
            'FotoPerfil': pFoto,
            'Padecimientos': pPadecimientos,
            'Citas': pCitas,
            'Reservaciones': pReservaciones,
            'NumeroExpediente': pNumeroExpediente,
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    res.data.msj = 'No se puede registrar, ya existe este mismo expediente';
                    console.log('No se pudo registrar 11000');
                    console.log(res.data.err);
                    break;

                default:
                    break;
            }
        }
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}


