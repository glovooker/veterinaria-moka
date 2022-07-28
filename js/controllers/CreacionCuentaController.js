'use strict'

btnRegistrar.addEventListener('click', Validaciones);

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

