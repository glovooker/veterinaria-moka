'use strict'
let listaDetalles = [];
let _id = '62faa696becd74dc2c882cf7' //dato quemado, el el flujo de este script se va a buscar con id de factura luego buscar la persona con la cedula que aparezca en la factura
let id_factura;
let identificacionPersona;
let fechaFactura;
let totalAPagar;
let datosFactura
let datosPersona;
let nombrePersona;
let emailPersona;
let telefonoPersona;
ObtenerFactura();


async function ObtenerFactura(){
    let result = await BuscarFacturaPorId(_id);

    if(result != {} && result.resultado == true){
        datosFactura =  result.FacturaDB;
        listaDetalles = datosFactura.Detalles;
        id_factura = datosFactura._id;
        identificacionPersona = datosFactura.Identificacion;
        fechaFactura = datosFactura.Fecha;
        totalAPagar = datosFactura.TotalAPagar;
        
        await ObtenerPersona();
        console.log(datosFactura);
        ImprimirDatosDetalles();
    }else{
        ImprimirMsjError(result.msj);
        return;
    }
}


async function ObtenerPersona(){
    let result = await BuscarPersonaPorCedula(identificacionPersona);
    if(result != {} && result.resultado == true){
        datosPersona =  result.personaDB;
        nombrePersona = datosPersona.Nombre;
        emailPersona = datosPersona.Correo;
        telefonoPersona = datosPersona.Telefono

        console.log(nombrePersona)
       /*  ImprimirDatos(); */
        console.log(datosPersona);
        
    }else{
        imprimirMsjError(result.msj);
        return;
    }
}












function ImprimirDatosDetalles(){
    let fechaFormateada, fecha;
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
            celdaSubtotal.innerHTML = '₡' + listaDetalles[i].SubTotal; 
            document.getElementById('outputTotal').innerHTML= '₡' + totalAPagar;
            document.getElementById('outputNumeroFactura').innerHTML= id_factura;
            fecha = new Date(fechaFactura);
            fechaFormateada = formatDate(fecha);
            document.getElementById('outputFecha').innerHTML= fechaFormateada;
            document.getElementById('outputIdentificacion').innerHTML = identificacionPersona;
            document.getElementById('outputNombre').innerHTML =  nombrePersona; 
            document.getElementById('outputEmail').innerHTML = emailPersona;
            document.getElementById('outputTelefono').innerHTML = telefonoPersona;
    
            
        }
    }


   
   
         
    








            
// LISTAR FACTURAS


/* ObtenerListaFacturas();






async function ObtenerListaFacturas() {
    let result = await ObtenerFacturaBaseDatos();
    if (result != {} && result.resultado == true) {
        arregloFacturas= result.ListaFacturasDB;
        console.log(arregloFacturas);
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}
 */

      /*   document.getElementById('outputNumeroFactura').innerHTML = id_factura.toUpperCase();
            document.getElementById('outputFecha').innerHTML = fechaFactura;
            document.getElementById('outputTotal').innerHTML = '₡'+ totalAPagar;
            document.getElementById('outputIdentificacion').innerHTML = identificacionPersona; 
            document.getElementById('outputNombre').innerHTML = personaNombre;  */