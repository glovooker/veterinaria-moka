"use strict";

let pNumServicio = 4;
let pNumCliente = 4;
let selMetodoPago = document.getElementById("selMetodoPago");

let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");

star1.addEventListener("click", function selectStar() {
  let selectedStar = document.getElementById("star1");

  changeStar(selectedStar);
});

star2.addEventListener("click", function selectStar() {
  let selectedStar = document.getElementById("star2");

  changeStar(selectedStar);
});

star3.addEventListener("click", function selectStar() {
  let selectedStar = document.getElementById("star3");

  changeStar(selectedStar);
});

star4.addEventListener("click", function selectStar() {
  let selectedStar = document.getElementById("star4");

  changeStar(selectedStar);
});

star5.addEventListener("click", function selectStar() {
  let selectedStar = document.getElementById("star5");

  changeStar(selectedStar);
});

btnAgregarMetodo.addEventListener("click", nuevoMetodoPago);
btnPagar.addEventListener("click", realizarPago);

imprimeServicio(pNumServicio);

function imprimeServicio(pNumServicio) {
  let servicio = ObtenerServicio(pNumServicio);
  if (servicio != null) {
    document.getElementById("outCliente").value = servicio.Cliente;
    document.getElementById("outMascota").value = servicio.Mascota;
    document.getElementById("outTotal").value = servicio.Total;
    imprimirTarjetas(pNumCliente);
  }
}

function imprimirTarjetas(pNumCliente) {
  let option;
  let listaMetodos = ObtenerMetodoPagoCliente(pNumCliente);
  console.log(listaMetodos.length);
  for (let i = 0; i < listaMetodos.length; i++) {
    option = document.createElement("option");
    option.value = listaMetodos[i].NumTarjeta;
    option.text = listaMetodos[i].NumTarjeta;
    selMetodoPago.appendChild(option);
  }
}

function nuevoMetodoPago() {
  location.href = "MetodosPago.html";
}

function realizarPago() {
  if (ValidarCampos() == false) {
    return false;
  } else {
    /***********************************************************************/
    Swal.fire({
      title: "¡Listo!",
      text: "El pago se realizó correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    return true;
  }
}

function changeStar(selectedStar) {
  if (selectedStar.classList.contains("fa-solid")) {
    selectedStar.classList.remove("fa-solid");
    selectedStar.classList.add("fa-regular");
  } else {
    selectedStar.classList.remove("fa-regular");
    selectedStar.classList.add("fa-solid");
  }
}
