

////////////////////////////////////////////////////////////////////////////////
export async function mfetch(url,data={}){
    const headers = new Headers();
    //headers.append('Authorization', 'Basic ' + Buffer.from('srv_esb'+":"+'123456a@').toString('base64'));
    //console.log("authorization : "+ Buffer.from('srv_esb'+":"+'123456a@').toString('base64') );
    const response = await fetch(url, { method:'POST', headers: headers, body:toFormData(data)})
    .then(response =>response.text())
    .then(response =>{
        if(response.startsWith('<!DOCTYPE')) return {status:404,error:'Failed to fetch API'}
        response = JSON.parse(response);
        if (response.status === 200) return response.data;
        return ({
            status :response.status??500,
            error  :response.message ?? "Invalid Response"
        })
    })
    .catch(error=>{return {error:error.message,status:500} }); //error.message
    return response;
}


////////////////////////////////////////////////////////////////////////////////
export async function jsonfetch(url,data={}){
    const headers = new Headers();
    const response = await fetch(url, { method:'POST', headers: headers, body:toFormData(data)})
    .then(response =>response.text())
    .then(response =>{
        if(response.startsWith('<!DOCTYPE')) return {status:404,error:'Failed to fetch API'}
        return JSON.parse(response);
    })
    .catch(error=>{return {error:error.message,status:500} }); //error.message
    return response;
}


////////////////////////////////////////////////////////////////////////////////
export async function rawfetch(url,data={}){
    const response = await fetch(url, { method:'POST', body:toFormData(data)})
    .then(response =>response.text())
    .then(response =>{ return response })
    .catch(error=>{return error.message });
    return response;
}


////////////////////////////////////////////////////////////////////////////////
export function toFormData(obj){
    let formData = new FormData();
    Object.keys(obj).map(key=>formData.append(key,obj[key]));
    return formData;
}


////////////////////////////////////////////////////////////////////////////////
export const delay = ms => new Promise(res => setTimeout(res, ms));
