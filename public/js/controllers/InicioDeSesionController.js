btnIngresar.addEventListener('click', Validaciones);

function Validaciones() {
  if (ValidarCampos() == false) {
    return false;
  } else {
    /*********************************************************************/
    IniciarSesion();
    /*********************************************************************/
  }
}

async function IniciarSesion() {
  let result = await AutenticarPersona(
    document.getElementById('txtCorreo').value,
    document.getElementById('txtContrasenna').value
  );
  if (result != null && result.resultado == true && result.personaDB != null) {
    Redireccionar(result.personaDB);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: result.msj,
    });
  }
}

function Redireccionar(pPersonaDB) {
  if (pPersonaDB.Rol == 0) {
    location.href = 'PaginaInicio.html';
  }
  if (pPersonaDB.Rol == 1) {
    location.href = 'PaginaInicio.html';
  }
  if (pPersonaDB.Rol == 2) {
    location.href = 'PaginaInicio.html';
  }
  if (pPersonaDB.Rol == 3) {
    location.href = 'PaginaInicio.html';
  }
}

function CerrarSesion() {
  CerrarSesionActiva();
  location.href = 'PaginaInicio.html';
}
