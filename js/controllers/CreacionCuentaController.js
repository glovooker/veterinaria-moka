'use strict'

btnRegistrar.addEventListener('click', Validaciones);

function Validaciones(){
    if (ValidarCampos() == false){
        return false;
    } else if (ValidarPass() == false){
        return false; 
    } else {
        /*********************************************************************/
        guardarCuenta(document.getElementById('txtNombre').value,document.getElementById('txtUsuario').value,document.getElementById('txtCorreo').value,document.getElementById('selRol').value,document.getElementById('selEstado').value, document.getElementById('txtPass').value,document.getElementById('txtidentificacion').value, document.getElementById('txtTelefono').value, document.getElementById('txtDireccion').value);
        Swal.fire({
            title:'Success!',
            text: 'Todos los campos requeridos han sido ingresados',
            icon: 'success',
            confirmButtonText: 'Ok'
        });  
        
        return true;
    }
}

function ValidarPass() {
    /*Valida que password y confirmacion sean iguales */
    let pass1 = document.getElementById('txtPass');
    let pass2 = document.getElementById('txtPass2');

    if (pass1.value != pass2.value ) {
        ImprimirMsjError('Contraseña y confirmación deben ser iguales, ¡Favor validar!'); 
        ResaltarInputInvalido('txtPass');
        ResaltarLabelInvalido('lblPass');                   
        ResaltarInputInvalido('txtPass2');
        ResaltarLabelInvalido('lblPass2');
        return false;
    }    
 }

