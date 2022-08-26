'use strict';
const apiUrl = 'http://localhost:3000/api';

function ObtenerEstado(pEstado) {
  switch (Number(pEstado)) {
    case 1:
      return 'Activo';
    default:
      return 'Inactivo';
  }
}

function ObtenerRol(pRol) {
  switch (Number(pRol)) {
    case 0:
      return 'Administrador';
    case 1:
      return 'Secretaria';
    case 2:
      return 'Veterinario';
    case 3:
      return 'Cliente';
  }
}

function ImprimirMsjError(msj) {
  Swal.fire({
    title: 'Error!',
    text: msj,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
}

function ImprimirMsjSuccess(msj) {
  Swal.fire({
    title: 'Excelente!',
    text: msj,
    icon: 'success',
    confirmButtonText: 'Ok',
  });
}

function LabelInvalido(plabelID) {
  var obj = document.getElementById(plabelID);
  var orig = obj.style;
  obj.style = 'color:red;';

  setTimeout(function () {
    obj.style = orig;
  }, 4000);
}

function InputInvalido(pinputID) {
  var obj = document.getElementById(pinputID);
  var orig = obj.style;
  obj.style = 'border: 1px solid red;';

  setTimeout(function () {
    obj.style = orig;
  }, 5000);
}

function TxtInvalido(ptextareaID) {
  var obj = document.getElementById(ptextareaID);
  var orig = obj.style;
  obj.style = 'border: 1px solid red;';

  setTimeout(function () {
    obj.style = orig;
  }, 5000);
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      // padTo2Digits(date.getSeconds()),  // 👈️ can also add seconds
    ].join(':')
  );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function ObtenerEstadoCita(pEstado) {
  switch (pEstado) {
    case 'R':
      return 'Registrado';
    case 'A':
      return 'Aprobado';
    case 'C':
      return 'Cancelado';
    case 'F':
      return 'Finalizado';
    case 'P':
      return 'Pagado';
  }
}

function ObtenerTipoCita(pTipo) {
  switch (pTipo) {
    case 'C':
      return 'Cita';
    default:
      return 'Reservación';
  }
}

function ObtenerEstadoFactura(pEstado) {
  switch (Number(pEstado)) {
    case 1:
      return 'Pendiente';
    default:
      return 'Pagada';
  }
}

const formatoNumero = (number) => {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1,';
  return number.toString().replace(exp, rep);
};

//funcion para truncar numeros

function trunc(x, posiciones = 0) {
  var s = x.toString();
  var l = s.length;
  var decimalLength = s.indexOf('.') + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}

ConstruirNavbar();

function ConstruirNavbar() {
  let personaLoggeada = GetSesionActiva();
  console.log(personaLoggeada);
  const navContainer = document.getElementById('navbarContainer');
  const navbar = document.createElement('nav');
  navbar.classList.add('navbar');

  if (personaLoggeada != null) {
    if (personaLoggeada.Rol == 0) {
      navbar.innerHTML = `
      <div class="logo-container">
                <a href="./PaginaInicio.html">
                    <img src="./img/IsologoMoka.png" alt="Logo Moka Vet & Hotel">
                </a>
            </div>
            <div class="navegation-container">
                <a href="./IndexAdmin.html">Inicio</a>
                <a href="./CrudCitas.html">Clínica</a>
                <a href="./CrudReservaciones.html">Hotel</a>
            </div>
            <div class="profile-dropdown">
                <a href="" class="profile-icon">
                    <i class="fa-solid fa-circle-user"></i>
                </a>
                <div class="dropdown-content">
                    <a href="./Cliente.html">Mi Perfil</a>
                    <a href="./Mascotas.html">Mascotas</a>
                    <a href="./CrearCuentaUsuario.html">Registrar Usuario</a>
                    <a href="./CrudPersonas.html">Administrar Usuarios</a>
                    <a href="./CrearCita.html">Citas</a>
                    <a href="./CrearReservacion.html">Reservaciones</a>
                    <a href="./ReporteFacturas.html">Facturación</a>
                    <a href="./ReporteCalificacionDoctor.html">Calificaciones Doctores</a>
                    <a href="./ReporteCalificacionDoctor.html">Calificaciones Mascotas</a>
                    <a id="cerrarSesion">Cerrar Sesión</a>

                </div>
            </div>
      `;

      navContainer.appendChild(navbar);

      const cerrarSesion = document.getElementById('cerrarSesion');
      cerrarSesion.addEventListener('click', CerrarSesionActiva);
    } else if (personaLoggeada.Rol == 1) {
      navbar.innerHTML = `
      <div class="logo-container">
                <a href="./PaginaInicio.html">
                    <img src="./img/IsologoMoka.png" alt="Logo Moka Vet & Hotel">
                </a>
            </div>
            <div class="navegation-container">
                <a href="./PaginaInicio.html">Inicio</a>
                <a href="./ReservarCita.html">Clínica</a>
                <a href="./ReservarHabitacion.html">Hotel</a>
            </div>
            <div class="profile-dropdown">
                <a href="" class="profile-icon">
                    <i class="fa-solid fa-circle-user"></i>
                </a>
                <div class="dropdown-content">
                    <a href="./Cliente.html">Mi Perfil</a>
                    <a href="./Mascotas.html">Mascotas</a>
                    <a href="./UsuariosCreacionListadoModificacionEliminacion.html">Registrar Usuario</a>
                    <a href="./ReporteCita.html">Citas</a>
                    <a href="./ReporteReservacion.html">Reservaciones</a>
                    <a href="">Tarjetas</a>
                    <a id="cerrarSesion">Cerrar Sesión</a>

                </div>
            </div>
      `;

      navContainer.appendChild(navbar);

      const cerrarSesion = document.getElementById('cerrarSesion');
      cerrarSesion.addEventListener('click', CerrarSesionActiva);
    } else if (personaLoggeada.Rol == 2) {
      navbar.innerHTML = `
      <div class="logo-container">
                <a href="./PaginaInicio.html">
                    <img src="./img/IsologoMoka.png" alt="Logo Moka Vet & Hotel">
                </a>
            </div>
            <div class="navegation-container">
                <a href="./PaginaInicio.html">Inicio</a>
                <a href="./ReservarCita.html">Clínica</a>
                <a href="./ReservarHabitacion.html">Hotel</a>
            </div>
            <div class="profile-dropdown">
                <a href="" class="profile-icon">
                    <i class="fa-solid fa-circle-user"></i>
                </a>
                <div class="dropdown-content">
                    <a href="./Cliente.html">Mi Perfil</a>
                    <a href="./Mascotas.html">Mascotas</a>
                    <a id="cerrarSesion">Cerrar Sesión</a>

                </div>
            </div>
      `;

      navContainer.appendChild(navbar);

      const cerrarSesion = document.getElementById('cerrarSesion');
      cerrarSesion.addEventListener('click', CerrarSesionActiva);
    } else if (personaLoggeada.Rol == 3) {
      navbar.innerHTML = `
      <div class="logo-container">
                <a href="./PaginaInicio.html">
                    <img src="./img/IsologoMoka.png" alt="Logo Moka Vet & Hotel">
                </a>
            </div>
            <div class="navegation-container">
                <a href="./PaginaInicio.html">Inicio</a>
                <a href="./ReservarCita.html">Clínica</a>
                <a href="./ReservarHabitacion.html">Hotel</a>
            </div>
            <div class="profile-dropdown">
                <a href="" class="profile-icon">
                    <i class="fa-solid fa-circle-user"></i>
                </a>
                <div class="dropdown-content">
                    <a href="./Cliente.html">Mi Perfil</a>
                    <a href="./Mascotas.html">Mascotas</a>
                    <a href="">Facturas</a>
                    <a href="">Métodos de pago</a>
                    <a href="">Citas</a>
                    <a href="">Reservaciones</a>
                    <a id="cerrarSesion">Cerrar Sesión</a>
                </div>
            </div>
      `;

      navContainer.appendChild(navbar);

      const cerrarSesion = document.getElementById('cerrarSesion');
      cerrarSesion.addEventListener('click', CerrarSesionActiva);
    }
  } else {
    navbar.innerHTML = `
    <div class="logo-container">
                <a href="./PaginaInicio.html">
                    <img src="./img/IsologoMoka.png" alt="Logo Moka Vet & Hotel">
                </a>
            </div>
            <div class="navegation-container">
                <a href="./PaginaInicio.html">Inicio</a>
                <a href="./NuestrosMedicos.html">Nuestros Médicos</a>
                <a href="./SobreNosotros.html">Sobre Nosotros</a>
            </div>
            <div class="profile-dropdown">
                <a href="" class="profile-icon">
                    <i class="fa-solid fa-circle-user"></i>
                </a>
                <div class="dropdown-content">
                    <a href="./InicioDeSesion.html">Iniciar Sesión</a>
                    <a href="./CrearCuentaCliente.html">Registrarme</a>
                </div>
            </div>
    `;

    navContainer.appendChild(navbar);
  }

  // for (let i = 0; i < listaVeterinarios.length; i++) {
  //   let veterinario = listaVeterinarios[i];
  //   console.log(veterinario);
  //   const doctorProfile = document.createElement('div');
  //   doctorProfile.classList.add('doctor-profile');
  //   doctorProfile.setAttribute('id', veterinario._id);
  //   doctorProfile.innerHTML = `
  //       <div class="doctor-image">
  //           <img src="${veterinario.FotoPerfil}" alt="Fotografía ${veterinario.Nombre}">
  //       </div>
  //       <div class="doctor-info">
  //       <h3>${veterinario.Nombre}</h3>
  //       <p><strong>Correo Electrónico: </strong>${veterinario.Correo}</p>
  //       <p><strong>Teléfono: </strong>${veterinario.Telefono}</p>
  //       <div class="socials-container">
  //               <a href="${veterinario.PerfilFB}" target="_blank">
  //                   <i class="fa-brands fa-facebook-f"></i>
  //               </a>
  //               <a href="${veterinario.PerfilIG}" target="_blank">
  //                   <i class="fa-brands fa-instagram"></i>
  //               </a>
  //               <a href="${veterinario.PerfilTW}" target="_blank">
  //                   <i class="fa-brands fa-twitter"></i>
  //               </a>
  //           </div>
  //   `;

  //   container.appendChild(doctorProfile);
  // }
}
