'use strict';

let reservaciones = [
    { Cliente: 'Andrey Villalobos', Mascota: 'Rocky', Fecha: '30/07/2022', Hora: '08:00', Doctor: 'Gabriel Lobo', Estado: 'Admin' },
    { Nombre: 'Anabelle', Apellido1: 'Velasquez', Apellido2: '', User: 'avelasquez', Password: '8899!', Rol: 'Client' },
    { Nombre: 'Dereck', Apellido1: 'Carmiol', Apellido2: '', User: 'dcarmiol', Password: '9876', Rol: 'Secretaria' }
];

function RegistrarLibros(psTitulo, psEditorial, pnPrecio){
    let nuevoLibro = [];
    //aca crea el libro
    nuevoLibro.push(psTitulo, psEditorial, pnPrecio);

    //aca guarada el liubro en la lista de Libros
    listaLibros.push(nuevoLibro);
}

function ObtenerListaLibros(){
    return listaLibros;
}