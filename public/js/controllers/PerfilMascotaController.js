'user strict';

let mascotaConsultada = GetMascotaConsultada();
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let acc = urlParams.get('acc'); //Q = query
if (acc == null) {
  acc = 'D'; //Desplegar  (no se llama desde el CRUD)
}
linkVolver.addEventListener('click', Volver);

async function desplegarDatosConsultados() {
  let owner = await DatosPersona(mascotaConsultada.IdPersona);

  if (mascotaConsultada != null) {
    document.getElementById('outNombre').value = mascotaConsultada.Nombre;
    document.getElementById('txtTipoMascota').value = mascotaConsultada.Especie;
    document.getElementById('txtDueñoMascota').value = owner.Nombre;
    document.getElementById('txtPadecimientos').value =
      mascotaConsultada.Observaciones;
  }
}

function Volver() {
  LimpiarLSMascotaConsultada();
  let linkVolver = document.getElementById('linkVolver');
  if (acc == 'Q') {
    linkVolver.href = './CrudMascotas.html';
  } else {
    linkVolver.href = './PaginaInicio.html';
  }
}

desplegarDatosConsultados();
