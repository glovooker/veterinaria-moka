'use strict'

btnGuardarCambios.addEventListener('click', Validaciones);

function Validaciones(){
    if (ValidarCampos() == false){
        return false;
    } else if (ValidarPass() == false){
        return false; 
    } else {
        /***********************************************************************/
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
    let pass1 = document.getElementById('txtNewPass');
    let pass2 = document.getElementById('txtNewPass2');

    if (pass1.value != pass2.value ) {
        ImprimirMsjError('Contraseña y confirmación deben ser iguales, ¡Favor validar!'); 
        ResaltarInputInvalido('txtNewPass');
        ResaltarLabelInvalido('lblNewPass');                   
        ResaltarInputInvalido('txtPass2');
        ResaltarLabelInvalido('lblNewPass2');
        return false;
    }  

          
 }

 function ValidarPass() {
    /*Valida que password y confirmacion sean iguales */
    let pass2 = document.getElementById('txtNewPass2');


 if (pass2.value == '' || pass2.value == null || pass2.value == undefined) {
    ImprimirMsjError('Estimado confirmar contraseña es requerida');
    ResaltarInputInvalido('txtNewPass2');
    ResaltarLabelInvalido('lblNewPass2');
    return false;
    }


}

function ValidarPass() {
    /*Valida de correo y confirmacion sean iguales */
    let email1 = document.getElementById('txtEmail');
    let email2 = document.getElementById('txtNewEmail');

    if (email1.value != email2.value ) {
        ImprimirMsjError('Correo nuevo y confirmación deben ser iguales, ¡Favor validar!'); 
        ResaltarInputInvalido('txtEmail');
        ResaltarLabelInvalido('lblEmail');                   
        ResaltarInputInvalido('txtNewEmail');
        ResaltarLabelInvalido('lblNewEmail');
        return false;
    }  

          
 }



