import {mfetch,jsonfetch,rawfetch,toFormData,delay} from './common'
import {sBranches} from './sample'


////////////////////////////////////////////////////////////////////////////////


const useTestData = true;
const delayValue = 100;


//////////////////////////////////////////////////////////////////////////////// config
export const readConfig = async(id,onLoad=()=>{},onSuccess=(res)=>{}) =>{
    try{
        onLoad()
        const response = await fetch('/config/' + id + '/config.json')
        const mconfig  = await response.json()
        onSuccess(mconfig);
    }catch(e){
        onSuccess({})
    }
}


//////////////////////////////////////////////////////////////////////////////// branches
export const fetchBranches = async(server,language) =>{
    // if(useTestData) {delay(delayValue); return sBranches; }
    return await mfetch(server.host+'/api_qapp/listbranch',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'language_id'   : language
    })
}


//////////////////////////////////////////////////////////////////////////////// departments
export const fetchDepartments = async(server,language,branchid) => {
    //if(useTestData) {delay(delayValue); return sBranches; }
    return await mfetch(server.host+'/api_qapp/listdepartment',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'language_id'   : language,
        'branch_id'     : branchid
    })
}


//////////////////////////////////////////////////////////////////////////////// services
export const fetchServices = async(server,language,branchid,deptid) => {
    //if(useTestData) {delay(delayValue); return sBranches; }
    return await mfetch(server.host+'/api_qapp/listservice',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'language_id'   : language,
        'branch_id'     : branchid,
        'department_id' : deptid
    })
}


//////////////////////////////////////////////////////////////////////////////// getqueue
export const getQueueNumber = async(server,branchid,deptid,servid,customer)=>{
    //if(useTestData) {delay(delayValue); return sBranches; }
    return await mfetch(server.host+'/api_qapp/getqueueno',{
        'client_id'       : server.client,
        'country_code'    : server.country,
        'branch_id'       : branchid,
        'department_id'   : deptid,
        'service_id'      : servid,
        'customer_sys_id' : customer.sysid,   // customer unique identifier
        'customer_id'     : customer.id,      // customer id/can be phone or email
        'customer_name'   : customer.name,    // name
        'phone_no'        : customer.phone,   // phone
        'param_int_1'     :'4',
        'param_int_2'     :'0',
        'param_int_3'     :'0',
        'param_str_1'     :'',
        'param_str_2'     :'',
        'param_str_3'     :''
    });
}


//////////////////////////////////////////////////////////////////////////////// queuestatus
export const getQueueStatus = async(server,branchid,deptid,custid,queuenumber,qr)=>{
    //if(useTestData) {delay(delayValue); return sBranches; }
    const api = (qr!==undefined && qr!=='')?'/api_qapp/checkqueuestatusbyqr':
                (queuenumber===undefined || queuenumber==='')? '/api_qapp/checkqueuestatusbycustid' :
                '/api_qapp/checkqueuestatus'
    return await mfetch(server.host + api,{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'branch_id'     : branchid,
        'department_id' : deptid,
        'customer_id'   : custid,
        'queue_no'      : queuenumber,
        'i'             : qr,
    });
}


//////////////////////////////////////////////////////////////////////////////// queuetransaction
export const getQueueTransaction = async(server,branchid,deptid,queuenumber) =>{
    //if(useTestData) {delay(delayValue); return sBranches; }
    return await mfetch(server.host+'/api_qapp/getqueuealltrans',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'branch_id'     : branchid,
        'department_id' : deptid,
        'queue_no'      : queuenumber
    });
}
