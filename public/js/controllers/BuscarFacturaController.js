'use strict'
let queryString, urlParams
let listaDetalles = [];
//Se busca la factura en especifico con el id de la factura, luego en la factura se obtiene el id del cliente(campo identificacion) y con ese id se busca los datos del cliente en buscar persona.
let _id; //id de la factura
let idCita;
let numeroFactura;
let identificacionPersona;
let fechaFactura;
let totalAPagar;
let datosFactura
let datosPersona;
let nombrePersona;
let emailPersona;
let TelefonoPersona;
let cedulaPersona;

/**********/
getParamsURL();

async function getParamsURL() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);
    
    _id = urlParams.get('_idFactura');
    idCita = urlParams.get('_idCita');
    
    // console.log(_id);

    if (_id != null && _id != undefined) {
        await ObtenerFactura();
    }else{
        if(idCita != null && idCita != undefined){
            await ObtenerFacturaPorIdCita();
        }
    }
}

/**********/



async function ObtenerFactura(){
    let result = await BuscarFacturaPorId(_id);

    if(result != {} && result.resultado == true){
        datosFactura =  result.FacturaDB;
        listaDetalles = datosFactura.Detalles;
        numeroFactura = datosFactura.NumeroFactura;
        identificacionPersona = datosFactura.Identificacion;
        fechaFactura = datosFactura.Fecha;
        totalAPagar = datosFactura.TotalAPagar;
        
        await ObtenerPersona();
        console.log(datosFactura);
        ImprimirDatosDetalles();
    }else{
        imprimirMsjError(result.msj);
        return;
    }
}

async function ObtenerFacturaPorIdCita(){
    let result = await BuscarFacturaPoridCita(idCita);

    if(result != {} && result.resultado == true){
        datosFactura =  result.FacturaDB;
        listaDetalles = datosFactura.Detalles;
        numeroFactura = datosFactura.NumeroFactura;
        identificacionPersona = datosFactura.Identificacion;
        fechaFactura = datosFactura.Fecha;
        totalAPagar = datosFactura.TotalAPagar;
        
        await ObtenerPersona();
        console.log(datosFactura);
        ImprimirDatosDetalles();
    }else{
        imprimirMsjError(result.msj);
        return;
    }
}


async function ObtenerPersona(){
    let result = await BuscarPersonaPorId(identificacionPersona);
    if(result != {} && result.resultado == true){
        datosPersona =  result.personaDB;
        nombrePersona = datosPersona.Nombre;
        emailPersona = datosPersona.Correo;
        TelefonoPersona = datosPersona.Telefono;
        cedulaPersona = datosPersona.Cedula;

        console.log(nombrePersona)
       /*  ImprimirDatos(); */
        console.log(datosPersona);
        
    }else{
        imprimirMsjError(result.msj);
        return;
    }
}

function ImprimirDatosDetalles(){
    let fecha;
    let fechaFormateada;
    let tbody = document.getElementById('tlbTable');
    tbody.innerHTML = '';

    for (let i = 0; i < listaDetalles.length; i++) {

    
            let fila = tbody.insertRow();
            let celdaNoArticulo = fila.insertCell();
            let celdaDescripcion = fila.insertCell();
            let celdaCantidad= fila.insertCell();
            let celdaPrecio= fila.insertCell();
            let celdaSubtotal = fila.insertCell();
            celdaNoArticulo.innerHTML = i+1; 
            celdaDescripcion.innerHTML = listaDetalles[i].Descripcion;
            celdaCantidad.innerHTML = listaDetalles[i].Cantidad;
            celdaPrecio.innerHTML = '₡' + listaDetalles[i].PrecioUnitario;
            celdaSubtotal.innerHTML = '₡' +  listaDetalles[i].SubTotal; 
            document.getElementById('outputTotal').innerHTML= '₡' + totalAPagar;
            document.getElementById('outputNumeroFactura').innerHTML= numeroFactura;
            fecha = new Date(fechaFactura.replace('Z',''));
            fechaFormateada = formatDate(fecha);
        
            document.getElementById('outputFecha').innerHTML= fechaFormateada;
            document.getElementById('outputIdentificacion').innerHTML = cedulaPersona;
            document.getElementById('outputNombre').innerHTML =  nombrePersona; 
            document.getElementById('outputEmail').innerHTML = emailPersona;
            document.getElementById('outputTelefono').innerHTML = TelefonoPersona;
    
            
        }
    }


   

   
         
    




    
    