'use strict';

let personaConsultada;
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let acc = urlParams.get('acc'); //M = Modificar C=Crear nuevo(CrudPersonas.html)
if (acc == null) {
  acc = 'N'; //Nuevo  (no se llama desde el CRUD)
}

btnRegistrar.addEventListener('click', Validaciones);

desplegarDatosConsultados();

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else if (ValidarPass() == false) {
    return false;
  } else {
    /*********************************************************************/
    if (acc == 'M') {
      ActualizarPersona();
      LimpiarLSPersonaConsultada();
      const timeoutId = setTimeout(function () {
        window.location.replace('./CrudPersonas.html');
      }, 2000);
    } else {
      CrearPersona();
    }
    /*********************************************************************/
  }
}

///////////////////////////////////////////////////////////////////////////
function ValidarPass() {
  /*Valida que password y confirmacion sean iguales */
  let pass1 = document.getElementById('txtPass');
  let pass2 = document.getElementById('txtPass2');

  if (pass1.value != pass2.value) {
    ImprimirMsjError(
      'Contraseña y confirmación deben ser iguales, ¡Favor validar!'
    );
    ResaltarInputInvalido('txtPass');
    ResaltarLabelInvalido('lblPass');
    ResaltarInputInvalido('txtPass2');
    ResaltarLabelInvalido('lblPass2');
    return false;
  }
}

///////////////////////////////////////////////////////////////////////////
async function CrearPersona() {
  let result = await RegistrarPersona(
    document.getElementById('txtidentificacion').value,
    document.getElementById('txtNombre').value,
    document.getElementById('txtCorreo').value,
    document.getElementById('txtPass').value,
    document.getElementById('txtTelefono').value,
    document.getElementById('txtDireccion').value,
    document.getElementById('selRol').value,
    document.getElementById('txtFacebook').value,
    document.getElementById('txtInstagram').value,
    document.getElementById('txtTwitter').value,
    document.getElementById('ImgCliente').src
  );

  if (result.resultado == true) {
    ImprimirMsjSuccess(result.msj);
    const timeoutId = setTimeout(function () {
      if (acc == 'N') {
        window.location.replace('./InicioDeSesion.html');
      } else {
        window.location.replace('./CrudPersonas.html');
      }
    }, 2000);
  } else {
    if ((result.err.code = 1100)) {
      ImprimirMsjError(
        'La cédula y/o correo indicado ya existen. ¡Favor validar!'
      );
    } else {
      ImprimirMsjError(result.msj);
    }
  }
}

async function ActualizarPersona() {
  let result = await ModificarPersona(
    personaConsultada._id,
    document.getElementById('txtidentificacion').value,
    document.getElementById('txtNombre').value,
    document.getElementById('txtCorreo').value,
    document.getElementById('txtPass').value,
    document.getElementById('txtTelefono').value,
    document.getElementById('txtDireccion').value,
    document.getElementById('selRol').value,
    document.getElementById('txtFacebook').value,
    document.getElementById('txtInstagram').value,
    document.getElementById('txtTwitter').value,
    document.getElementById('ImgCliente').src,
    personaConsultada.Estado
  );

  if (result.resultado == true) {
    ImprimirMsjSuccess(result.msj);
  } else {
    ImprimirMsjError(result.msj);
  }
}

function desplegarDatosConsultados() {
  if (acc == 'M') {
    personaConsultada = GetPersonaConsultada();
    document.getElementById('txtInicio').innerHTML = 'Actualizar Persona';
    document.getElementById('txtidentificacion').value =
      personaConsultada.Cedula;
    document.getElementById('txtNombre').value = personaConsultada.Nombre;
    document.getElementById('txtCorreo').value = personaConsultada.Correo;
    document.getElementById('txtPass').value = personaConsultada.Password;
    document.getElementById('txtPass2').value = personaConsultada.Password;
    document.getElementById('txtTelefono').value = personaConsultada.Telefono;
    document.getElementById('txtDireccion').value = personaConsultada.Direccion;
    document.getElementById('selRol').value = personaConsultada.Rol;
    document.getElementById('txtFacebook').value = personaConsultada.PerfilFB;
    document.getElementById('txtInstagram').value = personaConsultada.PerfilIG;
    document.getElementById('txtTwitter').value = personaConsultada.PerfilTW;
    document.getElementById('ImgCliente').value = personaConsultada.FotoPerfil;
  }
}
