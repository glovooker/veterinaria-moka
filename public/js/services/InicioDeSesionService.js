'use strict';

async function AutenticarPersona(pEmail, pPassword) {
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/AutenticarPersona',
        responseType: 'json',
        params: {
            'Email': pEmail,
            'Password': pPassword
        }
    }).then((res) => {
        result = res.data;
        if (result != null && result.resultado == true && result.personaDB != null) {
            SetSesionActiva(result.personaDB);
        }
    }).catch((err) => {
        console.log(err);
    });
    return result;
}

function SetSesionActiva(pDatosPerfil){
    localStorage.setItem('datosSesionActiva', JSON.stringify(pDatosPerfil));
    console.log(pDatosPerfil);
}