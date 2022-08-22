'user strict'
async function ObtenerFacturaBaseDatos(){
    let result = {};
    await axios({
        method: 'get',
        url: apiUrl + '/ListarFacturas',
        responseType: 'json'

    }).then((res)=>{
        result = res.data;
    }).catch((err)=>{
        console.log(err);
    });
    return result;
}
