'use strict';

let usuarios = [
    { Nombre: 'Alvaro Castillo', Usuario: 'lvroc', Contrasenna: 'moka2022', Rol: 'Veterinario', Telefono:'22611398', Direccion:'Los Lagos, Heredia', Cedula:'1-8888-8888', Email:'lvroc@gmail.com', InformacionAdicional:'Licenciatura en medicina y cirugía veterinaria, experiencia laboral en cirugías y consultas en especies menores, manejo de aplicaciones y herramientas tecnológicas'},
    { Nombre: 'Anabelle Velasquez', Usuario: 'avelasquez', Contrasenna: 'moka2022', Rol: 'Secretaria', Telefono:'86962712', Direccion:'La Jenny, Cartago', Cedula:'1-8888-8888', Email:'avelasquez@gmail.com', InformacionAdicional:'Grado Tecnico en secretariado ejecutivo, amplia experiencia en atención al cliente, herramientas ofimáticas,  aplicaciones web. Excelente manejo de la información y equipo tecnológico.'},
    { Nombre: 'Gabriel Lobo', Usuario: 'galobo', Contrasenna: 'moka2022', Rol: 'Veterinario',Telefono:'86962712', Direccion:'Hatillo, San Jose', Cedula:'1-8888-8888',Email:'galobo@gmail.com', InformacionAdicional: 'Licenciatura en medicina y cirugía veterinaria, familiarizado con herramientas tecnológicas tales como el uso de un equipo de cómputo, internet, manejo de aplicaciones web'},
    { Nombre: 'Jeremy Villegas',Usuario: 'jeville', Contrasenna: 'moka2022', Rol: 'Administrador',Telefono:'86203040', Direccion:'Alajuelita, San Jose', Cedula:'1-8888-8888', Email:'jeville@gmail.com'},
    { Nombre: 'Andrey Villalobos', Usuario: 'anvilla', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'80405060', Mascota: 'Rocky', Direccion:'Parrita, Puntarenas', Cedula:'1-8888-8888', Email:'anvilla@gmail.com', TipoMascota:'Perro', Padecimientos:'cataratas'},
    { Nombre: 'Brandon Villalobos', Usuario: 'bravilla', Contrasenna: 'moka2022', Rol: 'Administrador', Telefono:'80102030', Direccion:'Pavas, San Jose', Cedula:'1-8888-8888', Email:'bravilla@gmail.com'},
    { Nombre: 'Johel Lopez', Usuario: 'jlopez', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'87605040', Mascota:'Perlita', Direccion:'San Francisco, Heredia', Cedula:'1-8888-8888', Email:'jlopez@gmail.com',  TipoMascota:'Canario', Padecimientos:'Estres aguda'},
    { Nombre: 'Randall Badilla', Usuario: 'rbadilla', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'88402090', Mascota:'Princesa', Direccion:'Liberia, Guanacaste', Cedula:'1-8888-8888', Email:'rbadilla@gmail.com',  TipoMascota:'Gato', Padecimientos:'Anemia'},
    { Nombre: 'Cris Hemsworth', Usuario: 'thor', Contrasenna: 'moka2022', Rol: 'Cliente', Telefono:'80108050', Mascota:'Killer',Direccion:'Puerto Viejo, Limon', Cedula:'1-8888-8888', Email:'thor@gmail.com',  TipoMascota:'Tortuga', Padecimientos:'Dermatitis'}    
];


function obtenerDatos(pPerfilUsuario){
    let resultado = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].Usuario===pPerfilUsuario){
            resultado=usuarios[i];
            return resultado;
        }
        
    }
    return resultado;
}

