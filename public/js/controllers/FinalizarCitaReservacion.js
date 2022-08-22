'use strict'
let queryString, urlParams
let _id;/* id de la cita o reservacion */
let citasDB, idCliente, idMascota, clienteDB, nombreCliente, mascotaDB, nombreMascota; 
let estrellas = document.getElementById('txtValoracion');
let observaciones = document.getElementById('txtObservaciones');
let btnFinalizar = document.getElementById('btnFinalizar');
btnFinalizar.addEventListener('click', GuardarDatos);


/**********/
getParamsURL();

async function getParamsURL() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);
    
    _id = urlParams.get('_idCita');
    
    // console.log(_id);

    if (_id != null && _id != undefined) {
        await BuscarCitaPorId();
    }
}

/**********/


async function BuscarCitaPorId() {
    let result = await BuscarCita(_id);

    if (result != {} && result.resultado == true) {
        citasDB = result.citaDB;
        idCliente = citasDB._idCliente;
        idMascota = citasDB._idMascota;
        clienteDB = await DatosPersona(idCliente,null);
        nombreCliente = clienteDB.Nombre;
        mascotaDB = await DatosMascota(idMascota);
        nombreMascota = mascotaDB.Nombre;
        imprimirDatosEnPantalla(nombreCliente,nombreMascota)
    }else{
        imprimirMsjError(result.msj);
        return;
    }
}
        
        
function imprimirDatosEnPantalla(cliente,mascota){
    document.getElementById('outCliente').innerHTML = cliente;
    document.getElementById('outMascota').innerHTML = mascota;

}
        
/* (p_id, pMotivoCancela, pEstado, pEstrellas) => orden de modificar cita parametros */ 

async function GuardarDatos(){
    if(ValidarCampos()===false){
        return false;
    }
let result = await ModificarCita(_id,'','F',estrellas.value);
console.log(idCliente)
console.log(estrellas.value);
console.log(observaciones.value);
    
    if(result != null && result.resultado == false){
        imprimirMsjError(result.msj);
        console.log(result);
    }else{
        Swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(res => {
            location.href = 'facturas.html?_id=' + idCliente
        });
    }
}
        
function Limpiar(){
estrellas.value = '';
observaciones.value='';
}      
        





