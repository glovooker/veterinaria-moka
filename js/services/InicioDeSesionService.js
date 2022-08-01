'use strict';

let usuarios = [
    { Nombre: 'Alvaro Castillo', Usuario: 'lvroc', Contrasenna: 'moka2022', Rol: 'Veterinario', Telefono:'22611398'},
    { Nombre: 'Anabelle Velasquez', Usuario: 'avelasquez', Contrasenna: 'moka2022', Rol: 'Secretaria', Telefono:'86962712'},
    { Nombre: 'Gabriel Lobo', Usuario: 'galobo', Contrasenna: 'moka2022', Rol: 'Veterinario' },
    { Nombre: 'Jeremy Villegas',Usuario: 'jeville', Contrasenna: 'moka2022', Rol: 'Administrador',Telefono:'86203040' },
    { Nombre: 'Andrey Villalobos', Usuario: 'anvilla', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'80405060', Mascota: 'Rocky'},
    { Nombre: 'Brandon Villalobos', Usuario: 'bravilla', Contrasenna: 'moka2022', Rol: 'Administrador', Telefono:'80102030'},
    { Nombre: 'Johel Lopez', Usuario: 'jlopez', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'87605040', Mascota:'Perlita'},
    { Nombre: 'Randall Badilla', Usuario: 'rbadilla', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'88402090', Mascota:'Princesa'},
    { Nombre: 'Cris Hemsworth', Usuario: 'thor', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'80108050', Mascota:'Killer'}    
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