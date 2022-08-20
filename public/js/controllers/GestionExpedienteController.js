'use strict';

let botonRegistrar = document.getElementById('btnRegistrar');
let inputNombre = document.getElementById('txtNombre');
let inputDuenno = document.getElementById('txtDuenno');
let inputUsuario = document.getElementById('txtUsuario');
let inputEspecie = document.getElementById('txtEspecie');
let inputEstrellas = document.getElementById('numEstrellas');
let inputObservaciones = document.getElementById('txtObservaciones');
let inputPadecimientos = document.getElementById('txtPadecimientos');
let inputCitas = document.getElementById('txtCitas');
let inputReservaciones = document.getElementById('txtReservaciones');
let input_id = document.getElementById('txt_id');
/*let fotoMascota = document.getElementById('imgPet');*/

botonRegistrar.addEventListener('click', RegistrarDataExp);

let queryString, urlParams, _id;

IdentifyAction();

async function IdentifyAction() {
    queryString = window.location.search;

    urlParams = new URLSearchParams(queryString);

    _id = urlParams.get('_id');
    if (_id != null && _id != undefined && _id == 'create') {
        CargarInfo(null, 'btnRegistro');
    } else {
        let expediente = await BuscarExpedienteId(_id);
        if (expediente != null && expediente.resultado == true) {
            CargarInfo(expediente.expedienteDB, 'btnActualizar')
        } else {
            imprimirError('Error')
        }
    }
}

function CargarInfo(pExpediente, pBoton) {
    if (pBoton == 'btnRegistro') {
        document.getElementById('titleExpediente').innerHTML = 'Registrar expediente';
        document.getElementById('btnRegistrar').value = 'Registrar'
    } else {
        document.getElementById('titleExpediente').innerHTML = 'Actualizar expediente';
        document.getElementById('btnRegistrar').value = 'Actualizar'

        inputNombre.value = pExpediente.Nombre;
        inputDuenno.value = pExpediente.Duenno; 
        inputUsuario.value = pExpediente.Usuario;
        inputEspecie.value = pExpediente.Especie;
        inputEstrellas.value = pExpediente.Estrellas;
        inputObservaciones.value = pExpediente.Observaciones;
        inputPadecimientos.value = pExpediente.Padecimientos;
        inputCitas.value = pExpediente.Citas;
        inputReservaciones.value = pExpediente.Reservaciones;
        input_id.value = pExpediente._id;
        
        

    }
}

async function RegistrarDataExp() {
    let sNombre = inputNombre.value;
    let sDuenno = inputDuenno.value;
    let sUser = inputUsuario.value;
    let sEspecie = inputEspecie.value;
    let nEstrellas = inputEstrellas.value;
    let sObservaciones = inputObservaciones.value;
    let sPadecimientos = inputPadecimientos.value;
    let nCitas = inputCitas.value;
    let nReservaciones = inputReservaciones.value;
    let sFoto = ''; /*fotoMascota.src*/
    let s_id = input_id.value

    if (Validar(sNombre, sDuenno, sUser, sEspecie, nEstrellas, sObservaciones, sPadecimientos, nCitas, nReservaciones) == false) {
        return;
    }

    let result = null;
    if (s_id != null && s_id != '' && s_id != undefined) {
        result = await ActualizarExpediente(s_id, sNombre, sDuenno, sUser, sEspecie, nEstrellas, sObservaciones,sFoto, sPadecimientos, nCitas, nReservaciones);
    } else {
        result = await RegistrarExpediente(sNombre, sDuenno, sUser, sEspecie, nEstrellas, sObservaciones, sFoto, sPadecimientos, nCitas, nReservaciones);
    }

    if(result == null || result == undefined){
        imprimirError('Ha ocurrido un error')
    }else if (result.resultado == false) {
        imprimirError(result.msj);
        console.log(result)
    } else {
        Swal.fire({
            title: 'Excelente!',
            text: 'Registro Exitoso',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((res) => {
            location.href = 'ExpedienteListado.html'
        });
    }
    
}

function Validar(pNombre, sDuenno, sUser, pEspecie, pEstrellas, pObservaciones, pPadecimientos, pCitas, pReservaciones) {
    if (pNombre == '' || pNombre == null || pNombre == undefined) {
        LabelInvalido('lblNombre');
        InputInvalido('txtNombre');
        imprimirError('Por favor ingrese un nombre');
        return false;
    }
    if (sDuenno == '' || sDuenno == null || sDuenno == undefined) {
        LabelInvalido('lblDuenno');
        InputInvalido('txtDuenno');
        imprimirError('Por favor indique el dueño');
        return false;
    }
    if (sUser == '' || sUser == null || sUser == undefined) {
        LabelInvalido('lbl');
        InputInvalido('txtUsuario');
        imprimirError('Por favor indique el usuario del dueño');
        return false;
    }
    if (pEspecie == '' || pEspecie == null || pEspecie == undefined) {
        LabelInvalido('lblEspecie');
        InputInvalido('txtEspecie');
        imprimirError('Por favor ingrese una especie');
        return false;
    }
    if (pEstrellas == '' || pEstrellas == null || pEstrellas == undefined || pEstrellas > 5 || pEstrellas < 0 ) {
        LabelInvalido('lblEstrellas');
        InputInvalido('numEstrellas');
        imprimirError('Por favor indique una cantidad de estrellas válida');
        return false;
    }
    if (pObservaciones == '' || pObservaciones == null || pObservaciones == undefined) {
        LabelInvalido('lblObservaciones');
        InputInvalido('txtObservaciones');
        imprimirError('Si hay observaciones por favor ingrese alguna, de lo contrario ingrese = N/A');
        return false;
    }

    if (pPadecimientos == '' || pPadecimientos == null || pPadecimientos == undefined) {
        LabelInvalido('lblPadecimientos');
        InputInvalido('txtPadecimientos');
        imprimirError('Si hay padecimientos por favor ingrese alguno, de lo contrario ingrese = N/A');
        return false;
    }
    if (pCitas == '' || pCitas == null || pCitas == undefined) {
        LabelInvalido('lblCitas');
        InputInvalido('txtCitas');
        imprimirError('Por favor indique una cantidad de citas');
        return false;
    }
    if (pReservaciones == '' || pReservaciones == null || pReservaciones == undefined) {
        LabelInvalido('lblReservaciones');
        InputInvalido('txtReservaciones');
        imprimirError('Por favor indique una cantidad de reservaciones');
        return false;
    }
}