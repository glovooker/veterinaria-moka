'use strict'
let queryString, urlParams
let _id;/* id de la cita o reservacion */
let citasDB, idCliente, idMascota, clienteDB, nombreCliente, mascotaDB, nombreMascota; 
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
        


function GuardarDatos(){
    estrellas = document.getElementById('txtValoracion');
    observaciones = document.getElementById('txtObservaciones');
    result = await ModificarCita(_id,'Cancelacion','C',estrellas.value); 
    
    if(result != null && result.resultado == false){
        imprimirMsjError(result.msj);
        console.log(result);
    }else{
        Swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
}
        
        
        





