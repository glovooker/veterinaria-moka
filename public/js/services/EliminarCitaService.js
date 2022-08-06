let listaCitas = [
  {
    NumCita: 1,
    Cliente: "Andrey Villalobos",
    Mascota: "Rocky",
    Fecha: "05/08/2022",
    Hora: "08:00",
    Doctor: "Gabriel Lobo",
    Estado: "Confirmada",
    Motivo: "Revisión general",
    Accion:
      '<button type="button" id="btnModificar" class="modificarBtn" onclick="ModificarCita()"><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="btnEliminar" class="eliminarBtn" onclick="EliminarCita()"><i class="fa-solid fa-trash"></i> Cancelar</button>',
  },
  {
    NumCita: 2,
    Cliente: "Johel Lopez",
    Mascota: "Perlita",
    Fecha: "03/08/2022",
    Hora: "09:00",
    Doctor: "Gabriel Lobo",
    Estado: "Cancelada",
    Motivo: "Desparasitar",
    Accion:
      '<button type="button" id="btnModificar" class="modificarBtn" onclick="ModificarCita()" disabled><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="btnEliminar" class="eliminarBtn" onclick="EliminarCita()" disabled><i class="fa-solid fa-trash"></i> Cancelar</button>',
  },
  {
    NumCita: 3,
    Cliente: "Randall Badilla",
    Mascota: "Princesa",
    Fecha: "31/07/2022",
    Hora: "13:00",
    Doctor: "Alvaro Castillo",
    Estado: "Pago Pendiente",
    Motivo: "Grooming",
    Accion:
      '<button type="button" id="btnEliminar" class="pagarBtn" onclick="location.href = `./PagoServicios.html`;"><i class="fa-solid fa-money-bill"></i> Pagar</button>',
  },
  {
    NumCita: 4,
    Cliente: "Cris Hemsworth",
    Mascota: "Killer",
    Fecha: "31/07/2022",
    Hora: "12:00",
    Doctor: "Alvaro Castillo",
    Estado: "Terminada",
    Motivo: "Seguimiento de cirugía",
    Accion:
      '<button type="button" id="btnModificar" class="modificarBtn" onclick="ModificarCita()" disabled><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="btnEliminar" class="eliminarBtn" onclick="EliminarCita()" disabled><i class="fa-solid fa-trash"></i> Cancelar</button>',
  },
];

function obtenerListaCita() {
  return listaCitas;
}
