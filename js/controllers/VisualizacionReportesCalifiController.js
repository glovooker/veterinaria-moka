let fecha = document.getElementById('dateFilter');
var suma = 0;

document.getElementById('bttn').addEventListener('submit',limpiar);

function limpiar(){
    formulario.reset();
}

const tablaReportes = document.querySelector('#tablaReportes tbody');

imprimirCalifi();

function imprimirCalifi(){ 
    tablaReportes.innerHTML = '';
    let listaDoc = obtenerDoctores();
    for (let i = 0; i < listaDoc.length; i++) {
        let fila = tablaReportes.insertRow();
        fila.insertCell().innerHTML = listaDoc[i].Doctor; 
        fila.insertCell().innerHTML = listaDoc[i].Calificacion;
    }
 };
