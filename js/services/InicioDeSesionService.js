'use strict';

let usuarios = [
    { Nombre: 'Alvaro', Apellido1: 'Castillo', Apellido2: 'Gonzalez', Usuario: 'lvroc', Contrasenna: 'moka2022', Rol: 'Veterinario' },
    { Nombre: 'Anabelle', Apellido1: 'Velasquez', Apellido2: '', Usuario: 'avelasquez', Contrasenna: 'moka2022', Rol: 'Secretaria' },
    { Nombre: 'Gabriel', Apellido1: 'Lobo', Apellido2: 'Ulloa', Usuario: 'galobo', Contrasenna: 'moka2022', Rol: 'Veterinario' },
    { Nombre: 'Jeremy', Apellido1: 'Villegas', Apellido2: 'Rodriguez', Usuario: 'jeville', Contrasenna: 'moka2022', Rol: 'Administrador' },
    { Nombre: 'Andrey', Apellido1: 'Villalobos', Apellido2: 'Gomez', Usuario: 'anvilla', Contrasenna: 'moka2022', Rol: 'Cliente' },
    { Nombre: 'Brandon', Apellido1: 'Villalobos', Apellido2: 'Rojas', Usuario: 'bravilla', Contrasenna: 'moka2022', Rol: 'Administrador' },
    { Nombre: 'Johel', Apellido1: 'Lopez', Apellido2: 'Velasquez', Usuario: 'jlopez', Contrasenna: 'moka2022', Rol: 'Cliente' },
    { Nombre: 'Randall', Apellido1: 'Badilla', Apellido2: 'Solano', Usuario: 'rbadilla', Contrasenna: 'moka2022', Rol: 'Cliente' },
    { Nombre: 'Cris', Apellido1: 'Hemsworth', Apellido2: '', Usuario: 'thor', Contrasenna: 'moka2022', Rol: 'Cliente' }    
];

function AutenticarUsuario(pUsuario, pContrasenna) {
    let resultado = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].Contrasenna == pContrasenna && usuarios[i].Usuario == pUsuario) {
            resultado = usuarios[i];
            break;
        }
    }
    return resultado;
}