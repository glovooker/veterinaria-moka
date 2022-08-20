'use strict';

function SetMascotaConsultada(pDatosMascota){
    localStorage.setItem('datosMascotaConsultada', JSON.stringify(pDatosMascota));
    console.log(pDatosMascota);
}

function LimpiarLSMascotaConsultada(){
    localStorage.removeItem('datosMascotaConsultada');
}

function GetMascotaConsultada() {
    let datosMascotaConsultada = null;
    let localStorageData = localStorage.getItem('datosMascotaConsultada');
    if (localStorageData != null && localStorageData != undefined && localStorageData != '') {
        datosMascotaConsultada = JSON.parse(localStorageData);
    }
    return datosMascotaConsultada;
}