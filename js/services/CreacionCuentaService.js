//Clever Solutions
'use strict';

let ListaCuentas = [];

function ObtenerCuentas(){
    return ListaCuentas;
}

function ObtenerCuenta(pNumCuenta) {
    let result = [];
    let j = 0;
    for (let i = 0; i < ListaCuentas.length; i++) {
        if (ListaCuentas[i].NumCuenta == pNumCuenta) {
            result[j]=(ListaCuentas[i]);
            j+=1;
        }
    }  
    return result;
}

function guardarCuenta(pNombre, pUsuario, pCorreo,pRol,pEstado,pPassword,pCedula,pTelefono,pDireccion){
    let nuevaCuenta = {} 
    nuevaCuenta.NumCuenta = ListaCuentas.length + 1;
    nuevaCuenta.Nombre = pNombre;
    nuevaCuenta.Usuario = pUsuario;
    nuevaCuenta.Correo = pCorreo;
    nuevaCuenta.Rol = pRol;
    nuevaCuenta.Estado = pEstado;    
    nuevaCuenta.Password = pPassword;
    nuevaCuenta.Cedula = pCedula;
    nuevaCuenta.Telefono = pTelefono;
    nuevaCuenta.Direccion = pDireccion;
    ListaCuentas[ListaCuentas.length] = nuevaCuenta;
 }