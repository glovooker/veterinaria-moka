'user strict'

let nombre = document.getElementById('outNombre');
let tipoMascota = document.getElementById('txtTipoMascota');
let padecimientos = document.getElementById('txtPadecimientos');
let duennoMascota = document.getElementById('txtDuennoMascota')
let perfilCliente = 'thor';/* aca colocamos el nombre del usuario cliente que queramos obtener los datos*/

ImprimirInformacion();

function ImprimirInformacion(){
    let DatosCliente = obtenerDatos(perfilCliente);
    console.log(DatosCliente)

    if (DatosCliente!=null){
        nombre.value = DatosCliente.Mascota;
        tipoMascota.value = DatosCliente.TipoMascota;
        padecimientos.value = DatosCliente.Padecimientos;
        duennoMascota.value = DatosCliente.Nombre;
    }
}

