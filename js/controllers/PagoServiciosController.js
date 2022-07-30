"use strict";

let pNumServicio = 4;
let pNumCliente = 4;
let selMetodoPago = document.getElementById("selMetodoPago");

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

function changeStar(star) {
  selectedStar = document.getElementById(star);

  if (selectedStar.classList.contains("fa-solid")) {
    selectedStar.classList.remove("fa-solid");
    selectedStar.classList.add("fa-regular");
  } else {
    selectedStar.classList.remove("fa-regular");
    selectedStar.classList.add("fa-solid");
  }
}
