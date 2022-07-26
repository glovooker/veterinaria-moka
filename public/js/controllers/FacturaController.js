'user strict';
let arregloDetallesFacturas = [];
let arregloListaFacturas=[];
let numeroFactura;
let sumaTotal;
let queryString, urlParams
let _id;/* id del cliente */
let idCita;

let inputCantidad = document.getElementById('txtCantidad');
let inputDescripcion = document.getElementById('txtDescripcion');
let inputPrecio = document.getElementById('txtPrecio');
let btnAgregar = document.getElementById('btnAgregar');
let btnGuardar = document.getElementById('btnGuardarFactura')
btnAgregar.addEventListener('click', Agregar);
btnGuardar.addEventListener('click', Guardar);



//descomentar cuando este listo para usar

function getParamsURL() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);
    
    _id = urlParams.get('_id');
    idCita = urlParams.get('_idCita')
    
    console.log(_id);

    if (_id != null && _id != undefined) {
        return _id;
    }
} 








async function Guardar(){
 /*    console.log(arregloDetallesFacturas); */
    if (arregloDetallesFacturas.length===0){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingresa la informacion solicitada para poder facturar!",
          });
          return false
    }
    let fechaActual = new Date();
    let sIdentificacion = getParamsURL(); 
    console.log(sIdentificacion);
    await ObtenerListaFacturas();
    let result = await RegistrarFactura(sIdentificacion,sumaTotal,fechaActual, JSON.stringify(arregloDetallesFacturas),numeroFactura,idCita);
    if (result == null || result == undefined) {
        ImprimirMsjError('Ocurrio un error, intente de nuevo');
    } else if (result.resultado == false) {
        ImprimirMsjError(result.msj);
        console.log(result);
    } else {
        //ImprimirMsjSuccess(result.msj);
        Swal.fire({
            title: 'Excelente!',
            text: result.msj,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(res => {
            location.href = 'CrudCitas.html';
        });
    }
    Limpiar();
}


function Agregar(){
    if (ValidarCampos() == false) {
        return false;
    }
    let detalles = {
        Cantidad : inputCantidad.value,
        Descripcion: inputDescripcion.value,
        PrecioUnitario: inputPrecio.value,
        SubTotal:'0'
    }
    document.getElementById('formularioFacturas').reset();
    arregloDetallesFacturas.push(detalles);
    imprimirDatos();

}

async function ObtenerListaFacturas() {
    let result = await ObtenerFacturaBaseDatos();
    if (result != {} && result.resultado == true) {
        arregloListaFacturas= result.ListaFacturasDB;
        numeroFactura = (arregloListaFacturas.length)+1;
        console.log(arregloListaFacturas);
    } else {
        imprimirMsjError(result.msj);
        return;
    }
}




function imprimirDatos(){
    let tbody = document.getElementById('tbdFactura');
    let precio = 0
    tbody.innerHTML = '';
    sumaTotal=0;
    for(let i = 0; i < arregloDetallesFacturas.length; i++){
        let fila = tbody.insertRow();
       
        //
        let celdaCantidad = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaPrecioUnitario = fila.insertCell();
        let celdaPrecio = fila.insertCell();
        let celdaAcciones = fila.insertCell();
        let btnEliminar = document.createElement('button');
        btnEliminar.onclick = function(){
            arregloDetallesFacturas.splice(i,1)
            imprimirDatos();

        }
        btnEliminar.type = 'button';
        btnEliminar.innerText = '🗑';
        btnEliminar.title = 'Eliminar';
        let divBtn = document.createElement('div');
        divBtn.appendChild(btnEliminar);
        celdaCantidad.innerHTML =arregloDetallesFacturas[i].Cantidad
        celdaDescripcion.innerHTML = arregloDetallesFacturas[i].Descripcion;
        celdaPrecioUnitario.innerHTML = arregloDetallesFacturas[i].PrecioUnitario;
        precio = arregloDetallesFacturas[i].Cantidad * arregloDetallesFacturas[i].PrecioUnitario;
        celdaPrecio.innerHTML = precio;
        arregloDetallesFacturas[i].SubTotal = precio;
        celdaAcciones.appendChild(divBtn);

        sumaTotal = sumaTotal + precio;
    }
        

 
        
        
       
           

    let filaTotales = tbody.insertRow();
    let celdaTotal = filaTotales.insertCell();
    let celdaSuma = filaTotales.insertCell();
    celdaTotal.innerHTML = 'Total a Pagar';
    celdaSuma.innerHTML = sumaTotal;
}


function  Limpiar(){
    document.getElementById('formularioFacturas').reset();
    document.getElementById('tbdFactura').innerHTML = '';
    arregloDetallesFacturas = [];
}