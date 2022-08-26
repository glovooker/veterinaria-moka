GetListaVeterinarios();

async function GetListaVeterinarios() {
  let result = await ObtenerPersonasRol(2);
  if (result != {} && result.resultado == true) {
    let listaVeterinarios = result.personaDB;
    ImprimirVeterinarios(listaVeterinarios);
  } else {
    return;
  }
}

async function ImprimirVeterinarios(listaVeterinarios) {
  let container = document.getElementById('doctorsContainer');
  for (let i = 0; i < listaVeterinarios.length; i++) {
    let veterinario = listaVeterinarios[i];
    console.log(veterinario);
    const doctorProfile = document.createElement('div');
    doctorProfile.classList.add('doctor-profile');
    doctorProfile.setAttribute('id', veterinario._id);
    doctorProfile.innerHTML = `
        <div class="doctor-image">
            <img src="${veterinario.FotoPerfil}" alt="Fotografía ${veterinario.Nombre}">
        </div>
        <div class="doctor-info">
        <h3>${veterinario.Nombre}</h3>
        <p><strong>Correo Electrónico: </strong>${veterinario.Correo}</p>
        <p><strong>Teléfono: </strong>${veterinario.Telefono}</p>
        <div class="socials-container">
                <a href="${veterinario.PerfilFB}" target="_blank">
                    <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="${veterinario.PerfilIG}" target="_blank">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="${veterinario.PerfilTW}" target="_blank">
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>
    `;

    container.appendChild(doctorProfile);
  }
}
