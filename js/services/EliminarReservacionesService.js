let listaReserva = [
  {
    NumReserva: 1,
    Cliente: "Andrey Villalobos",
    Mascota: "Rocky",
    FechaEntra: "30/07/2022",
    HoraEntra: "08:00",
    FechaSale: "02/08/2022",
    HoraSale: "18:00",
    Cuidados: "No come atún",
    Estado: "Activa",
    Accion:
      '<button type="button" id="modificar" class="modificarBtn" onclick="ModificarReservacion()"><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="eliminar" class="eliminarBtn" onclick="EliminarReservacion()"><i class="fa-solid fa-trash"></i> Cancelar</button>',
  },
  {
    NumReserva: 2,
    Cliente: "Johel Lopez",
    Mascota: "Perlita",
    FechaEntra: "30/07/2022",
    HoraEntra: "09:00",
    FechaSale: "31/07/2022",
    HoraSale: "13:00",
    Cuidados: "Ponerle frasada al dormir",
    Estado: "Cancelada",
    Accion:
      '<button type="button" id="modificar" class="modificarBtn" onclick="ModificarReservacion()" disabled><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="eliminar" class="eliminarBtn" onclick="EliminarReservacion()" disabled><i class="fa-solid fa-trash"></i> Cancelar</button>',
  },
  {
    NumReserva: 3,
    Cliente: "Randall Badilla",
    Mascota: "Princesa",
    FechaEntra: "31/07/2022",
    HoraEntra: "13:00",
    FechaSale: "05/08/2022",
    HoraSale: "16:00",
    Cuidados: "Es muy chineada, cuidarla que no se moje",
    Estado: "Pago Pendiente",
    Accion:
      '<button type="button" id="modificar" class="pagarBtn" onclick="location.href = `./PagoServicios.html`;"><i class="fa-solid fa-money-bill"></i> Pagar</button>',
  },
  {
    NumReserva: 4,
    Cliente: "Cris Hemsworth",
    Mascota: "Killer",
    FechaEntra: "3107/2022",
    HoraEntra: "14:00",
    FechaSale: "01/08/2022",
    HoraSale: "17:00",
    Cuidados: "Darle el juguete de llanta",
    Estado: "Terminada",
    Accion:
      '<button type="button" id="modificar" class="modificarBtn" onclick="ModificarReservacion()" disabled><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="eliminar" class="eliminarBtn" onclick="EliminarReservacion()" disabled><i class="fa-solid fa-trash"></i> Cancelar</button>',
  },
];

function obtenerListaReser() {
  return listaReserva;
}
