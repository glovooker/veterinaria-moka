'use strict';


let listaCitas = [];

GetListaCitas();

async function GetListaCitas() {
    let result = await ObtenerListaCitas('C');
    if (result != {} && result.resultado == true) {
        listaCitas = result.ListaCitasBD;       
        ImprimirDatos(); 
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}