'use strict';

const cuerpoTabla = document.querySelector('#tblTarjetas tbody');
let tarjetas = [];

const inicializarListas = async () => {
  let persona = JSON.parse(localStorage.getItem('datosSesionActiva'));
  let _idC = persona._id;
  // console.log(_idC);
  tarjetas = await getDatos(`/ListarTarjetasCliente?_idC=${_idC}`);
  // console.log(tar
  // console.log(tarjetas);
  mostrarTabla();
};

const mostrarTabla = async () => {
  cuerpoTabla.innerHTML = '';

  tarjetas.forEach((tarjeta) => {
    let fila = cuerpoTabla.insertRow();
    let numerot = String(tarjeta.NumTarjeta);
    // fila.insertCell().innerText = tarjeta._idC;
    fila.insertCell().innerText = '************' + numerot.slice(-4);
    fila.insertCell().innerText = tarjeta.FecExpira;
    fila.insertCell().innerText = tarjeta.Nombre;
    let tdAcciones = fila.insertCell();

    //Creación del botón de eliminar
    let btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.type = 'button';
    btnEliminar.classList.add('btn-eliminar');

    //Agregar el botón de editar y eliminar a la celda de acciones
    tdAcciones.appendChild(btnEliminar);
    btnEliminar.addEventListener('click', () => {
      Swal.fire({
        title: '¿Está seguro que desea eliminar la información?',
        text: 'La acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarDatos('/EliminarTarjetas', tarjeta._idC);
          Swal.fire('¡Tarjeta eliminada!', 'La tarjeta fue borrada', 'success');
        }
      });
    });
  });
};
inicializarListas();