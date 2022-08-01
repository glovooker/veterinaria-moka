let reportesCitas = [
    {Cliente: 'Andrey Villalobos', Mascota: 'Rocky', Ranking: '4', Fechas: '30/07/2022', Hora: '08:00', Doctor: 'Gabriel Lobo'},
    {Cliente: 'Johel Lopez', Mascota: 'Perlita', Ranking: '5', Fechas: '30/07/2022', Hora: '09:00', Doctor: 'Gabriel Lobo'},
    {Cliente: 'Randall Badilla', Mascota: 'Princesa', Ranking: '1', Fechas: '31/07/2022', Hora: '13:00', Doctor: 'Alvaro Castillo'},
    {Cliente: 'Cris Hemsworth', Mascota: 'Killer',Ranking: '3', Fechas: '31/07/2022', Hora: '14:00', Doctor: 'Alvaro Castillo'},
];

let reportesFinanc = [
    {factura: '1', Dinero: 17000, Fechas: '30/07/2022' },
    {factura: '2', Dinero: 15000, Fechas: '31/07/2022' },
    {factura: '3', Dinero: 13000, Fechas: '30/07/2022' },
    {factura: '4', Dinero: 17000, Fechas: '30/07/2022' },
    {factura: '5', Dinero: 14000, Fechas: '30/07/2022' },
    {factura: '6', Dinero: 12000, Fechas: '31/07/2022' },
    {factura: '7', Dinero: 10000, Fechas: '30/07/2022' },
    {factura: '8', Dinero: 11000, Fechas: '30/07/2022' },
]

let dineroLista = [17000, 15000, 13000, 17000, 14000, 12000, 10000, 11000]
let resumen = [''];

let listaDoctores = [
    {Doctor: 'Gabriel Lobo', Calificacion: '5'},
    {Doctor: 'Alvaro Castillo', Calificacion: '5'},
    {Doctor: 'Rogel Rodrígues', Calificacion: '3'},
    {Doctor: 'Sofía Villanueva', Calificacion: '4'},
];

function obtenerDoctores(){
    return listaDoctores;
}


function obtenerDineroTotal(){
    return dineroLista;
}

function ObtenerCitas(){
    return reportesCitas;
}

function obtenerFinanc(){
    return reportesFinanc;
}