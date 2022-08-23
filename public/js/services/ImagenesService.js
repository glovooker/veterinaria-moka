'use strict';

let imagen;

let widgetCloudinary = cloudinary.createUploadWidget({
    cloudName: 'dfj9j6yot',
    uploadPreset: 'VeterinariaMoka',
},(err, result)=>{
    if(!err && result && result.event === 'success'){
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    }
});

function AbrirCloudinary(pidInputImg){
    imagen = document.getElementById(pidInputImg);
    widgetCloudinary.open();
}

