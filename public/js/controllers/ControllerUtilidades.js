async function DatosPersona(p_id, pCedula){
    let result = await BuscarPersona(p_id, pCedula);
    if (result != null && result.resultado == true && result.personaDB != null) { 
       return(result.personaDB); 
    } else {
       return (" ");
    }
  }
 
  async function DatosMascota(pIdMascota){
     let result = await BuscarMascota(pIdMascota);
     if (result != null && result.resultado == true && result.mascotaDB != null) { 
        return(result.mascotaDB); 
     } else {
        return (" ");
     }
   } 