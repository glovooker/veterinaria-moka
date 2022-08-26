'use strict';

async function BuscarCorreoPorId(pCorreo) {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/BuscarCorreoPorId',
    responseType: 'json',
    params: {
      Correo: pCorreo,
    },
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

const recuperarContrasena = async (data) => {
  console.log(data);
  let url = apiUrl + '/BuscarCorreoPorId';
  await axios({
    url: url,
    method: 'post',
    responseType: 'json',
    data: data,
  })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: '',
        text: '',
      }).then(() => {
        window.location.href = '/InicioDeSesion.html';
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: error,
      });
    });
};
