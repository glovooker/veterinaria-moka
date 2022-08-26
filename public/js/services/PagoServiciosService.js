'use strict';

function GetMascotaConsultada() {
    let datosMascotaConsultada = null;
    let localStorageData = localStorage.getItem('datosMascotaConsultada');
    if (
      localStorageData != null &&
      localStorageData != undefined &&
      localStorageData != ''
    ) {
      datosMascotaConsultada = JSON.parse(localStorageData);
    }
    return datosMascotaConsultada;
  }