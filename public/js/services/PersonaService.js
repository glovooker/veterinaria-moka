//Clever Solutions
'use strict';

async function RegistrarPersona(pCedula, pNombre, pCorreo, pPassword,pTelefono,pDireccion,pRol,pPerfilFB,pPerfilIG,pPerfilTW,pFotoPerfil) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/RegistrarPersona',
        responseType: 'json',
        data: { 
            'Cedula': pCedula,
            'Nombre': pNombre,
            'Correo': pCorreo,
            'Password': pPassword,
            'Telefono': pTelefono,
            'Direccion': pDireccion,
            'Rol': pRol,
            'PerfilFB': pPerfilFB,
            'PerfilIG': pPerfilIG,
            'PerfilTW': pPerfilTW,
            'FotoPerfil': pFotoPerfil 
        }
    }).then((res) => {
        result = res.data;
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    return result;
}
 
async function ObtenerListaPersonas() {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarPersonas',
        responseType: 'json'
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function ObtenerPersonasRol(pRol) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarPersonasRol',
        responseType: 'json',
        params: {
            'Rol': pRol 
        }        
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function BuscarPersona(p_id, pCedula) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/BuscarPersona',
        responseType: 'json',
        params: {
            '_id': p_id,
            'Cedula': pCedula
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

async function ModificarPersona(p_id, pCedula, pNombre, pCorreo, pPassword,pTelefono,pDireccion,pRol,pPerfilFB,pPerfilIG, pPerfilTW, pFotoPerfil,pEstado) {
    let result = {};
    await axios({
        method: 'post',
        url: apiUrl + '/ModificarPersona',
        responseType: 'json',
        data: {
            '_id': p_id,
            'Cedula': pCedula,
            'Nombre': pNombre,
            'Correo': pCorreo,
            'Password': pPassword,
            'Telefono': pTelefono,
            'Direccion': pDireccion,
            'Rol': pRol,
            'PerfilFB': pPerfilFB,
            'PerfilIG': pPerfilIG,
            'PerfilTW': pPerfilTW,            
            'FotoPerfil': pFotoPerfil,
            'Estado' :pEstado 
        }
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });
    return result;
}