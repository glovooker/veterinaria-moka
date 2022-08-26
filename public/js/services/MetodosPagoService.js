'use strict';

const RegistrarTarjetaDatos = async (pendPoint, data) => {
  let url = `http://localhost:3000/api/${pendPoint}`;

  await axios({
    url: url,
    method: 'post',
    responseType: 'json',
    data: data,
  })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Felicidades',
        text: response.data.msj,
      }).then(() => {
        window.location.href = 'MetodosPagoListado.html';
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

const getDatos = async (endpoint) => {
  let url = `http://localhost:3000/api${endpoint}`;
  // console.log(url);
  let listaDatos = [];
  await axios({
    url: url,
    method: 'get',
    responseType: 'json',
  })
    .then((response) => {
      // console.log(response.data);
      listaDatos = response.data.tarjetaDB;
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: error,
      });
    });
  // console.log(listaDatos);
  return listaDatos;
};

async function ObtenerListaTarjetas() {
  let result = {};
  await axios({
    method: 'get',
    url: apiUrl + '/ListarMascota',
    responseType: 'json',
  })
    .then((res) => {
      result = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}

const eliminarDatos = async (endpoint, _id) => {
  let url = `http://localhost:3000/api/${endpoint}`;
  await axios({
    url: url,
    method: 'delete',
    responseType: 'json',
    data: {
      _id: _id,
    },
  })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: response.data.msj,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        text: error,
      });
    });
};

// const getDatosMetodos = async (endpoint) => {
//   let url = `http://localhost:3000/api${endpoint}`;
//   let listaDatosMetodos = [];
//   await axios({
//     url: url,
//     method: "get",
//     responseType: "json",
//   })
//     .then((response) => {
//       listaDatos = response.data.lista;
//     })
//     .catch((error) => {
//       Swal.fire({
//         icon: "error",
//         text: error,
//       });
//     });

//   return listaDatos;
// };

// async function ObtenerListaTarjetas() {
//   let result = {};
//   await axios({
//     method: "get",
//     url: apiUrl + "/ListarTarjetas",
//     responseType: "json",
//   })
//     .then((res) => {
//       result = res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   return result;
// }

// async function RegistrarTarjeta(pNumTarjeta, pFecExpira, pCvv, pNombre) {
//   let result = {};
//   await axios({
//     method: "post",
//     url: apiUrl + "/RegistrarTarjeta",
//     responseType: "json",
//     data: {
//       'NumTarjeta': pNumTarjeta,
//       'FecExpira': pFecExpira,
//       'Cvv': pCvv,
//       'Nombre': pNombre,
//     }
//     }).then((res) => {
//       result = res.data;
//       console.log(result);
//     }).catch((err) => {
//       console.log(err);
//     });
//   return result;
// }

// let ListaMetodosPago = [
//   {
//     NumCliente: 1,
//     Cliente: "Andrey Villalobos",
//     NumTarjeta: "************8436",
//     Vencimiento: "31/07/2025",
//     CVV: "123",
//     TarjetaHabiente: "Andrey Villalobos",
//   },
//   {
//     NumCliente: 2,
//     Cliente: "Johel Lopez",
//     NumTarjeta: "************3579",
//     Vencimiento: "31/12/2023",
//     CVV: "456",
//     TarjetaHabiente: "Johel Lopez",
//   },
//   {
//     NumCliente: 3,
//     Cliente: "Randall Badilla",
//     NumTarjeta: "************1597",
//     Vencimiento: "31/01/2026",
//     CVV: "789",
//     TarjetaHabiente: "Randall Badilla",
//   },
//   {
//     NumCliente: 4,
//     Cliente: "Cris Hemsworth",
//     NumTarjeta: "************7591",
//     Vencimiento: "30/05/2024",
//     CVV: "987",
//     TarjetaHabiente: "Cris Hemsworth",
//   },
//   {
//     NumCliente: 4,
//     Cliente: "Cris Hemsworth",
//     NumTarjeta: "************3197",
//     Vencimiento: "31/10/2027",
//     CVV: "654",
//     TarjetaHabiente: "Cris Hemsworth",
//   },
// ];

// function ObtenerMetodosPago() {
//   return ListaMetodosPago;
// }

// function ObtenerMetodoPagoCliente(pNumCliente) {
//   let result = [];
//   let j = 0;
//   for (let i = 0; i < ListaMetodosPago.length; i++) {
//     if (ListaMetodosPago[i].NumCliente == pNumCliente) {
//       result[j] = ListaMetodosPago[i];
//       j += 1;
//     }
//   }
//   return result;
// }

// function guardarMetodoPago(
//   pNumCliente,
//   pCliente,
//   pNumTarjeta,
//   pVencimiento,
//   pCVV,
//   pTarjetaHabiente
// ) {
//   let nuevoMetodoPago = {};
//   nuevoMetodoPago.NumCliente = pNumCliente;
//   nuevoMetodoPago.Cliente = pCliente;
//   nuevoMetodoPago.NumTarjeta = pNumTarjeta;
//   nuevoMetodoPago.Vencimiento = pVencimiento;
//   nuevoMetodoPago.CVV = pCVV;
//   nuevoMetodoPago.TarjetaHabiente = pTarjetaHabiente;
//   ListaMetodosPago[ListaMetodosPago.length] = nuevoMetodoPago;
// }
