let listaMascotas = [
  {
    NumMascota: 1,
    Nombre: "Rocky",
    TipoMascota: "Perro",
    Informacion: "Raza Pura",
    Accion:
      '<button type="button" id="btnExpediente" class="modificarBtn" onclick="location.href = `./Expediente.html`;"><i class="fa-solid fa-file"></i>  Expediente</button><button type="button" id="btnModificar" class="modificarBtn" onclick="ModificarMascota()"><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="btnEliminar" class="eliminarBtn" onclick="BorrarMascota()"><i class="fa-solid fa-trash"></i> Borrar</button>',
  },
  {
    NumMascota: 2,
    Nombre: "Whiskers",
    TipoMascota: "Gato",
    Informacion: "Posee dificultad para caminar",
    Accion:
      '<button type="button" id="btnExpediente" class="modificarBtn" onclick="location.href = `./Expediente.html`;"><i class="fa-solid fa-file"></i>  Expediente</button><button type="button" id="btnModificar" class="modificarBtn" onclick="ModificarMascota()"><i class="fa-solid fa-pen"></i>  Modificar</button><button type="button" id="btnEliminar" class="eliminarBtn" onclick="BorrarMascota()"><i class="fa-solid fa-trash"></i> Borrar</button>',
  },
];

function obtenerListaMascota() {
  return listaMascotas;
}
