import {mfetch,jsonfetch,rawfetch,toFormData,delay} from './common'
import {sBranches,sTimeslots,sAppointment} from './sample'


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
    return await mfetch(server.host+'/api_qapp/listdepartment',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'language_id'   : language,
        'branch_id'     : branchid
    })
}


//////////////////////////////////////////////////////////////////////////////// services
export const fetchServices = async(server,language,branchid,deptid) => {
    return await mfetch(server.host+'/api_qapp/listservice',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'language_id'   : language,
        'branch_id'     : branchid,
        'department_id' : deptid
    })
}


////////////////////////////////////////////////////////////////////////////////
export const fetchServices2 = async(server,language,branchid,deptid) => {
    return await mfetch(server.host+'/api/api_qapp/listservice.php',{
        'branch_id' : branchid,
        'dept_id'   : deptid,
        'language'  : language
    })
}


//////////////////////////////////////////////////////////////////////////////// getqueue
export const getQueueNumber = async(server,branchid,deptid,servid,customer)=>{
    return await mfetch(server.host+'/api_qapp/getqueueno',{
        ...{
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
        },
        ...customer
    });
}


//////////////////////////////////////////////////////////////////////////////// updatecustomerinfo
export const updateCustInfo = async(server,language,branchid,deptid,servid,customer)=>{
    return await mfetch(server.host+'/api_qapp/updatecustinfo',{
        'client_id'             : server.client,
        'country_code'          : server.country,
        'func'                  : 'updatecustinfo',
        'branch_id'             : branchid,
        'language_id'           : language,
        'customer_id'           : '',
        'phone_no'              : customer.phone,
        'queue_no'              : customer.queue,
        'require_notification'  : 1,
        'mdl'                   : 'que',
        // 'department_id'         : deptid,
        // 'service_id'            : servid,
        // 'customer_name'         : customer.name,
        // 'param_int_1'           : 1,
        // 'param_int_2'           : '',
        // 'param_int_3'           : '',
        // 'param_str_1'           : 'YES',
        // 'param_str_2'           : 'NO',
        // 'param_str_3'           : 'NO',
    })
}


////////////////////////////////////////////////////////////////////////////////
export const fetchTimeslot = async (server,language,branchid,deptid,servid) => {
    //delay(300); return sTimeslots;
    return await mfetch(server.host+'/api/api_qapp/getavailslot.php',{
        language        : language,
        branchid        : branchid,
        deptid         : deptid,
        serviceid       : servid,
        cust_id         : 123456789,
        cust_id_type    : 9
    })

    // return await mfetch(server.host+'/api/api_qapp/actionEx.php',{
    //     'c'     : server.country,
    //     'mid'   : branchid,
    //     'mdl'   : 'apm',
    //     'func'  : 'apm_getavailslotbydaterange2',
    //     'loc'   : deptid,
    //     'dept'  : deptid,
    //     'serv'  : servid,
    //     'user'  : '',
    //     'date'  : '2021-3-3',
    //     'range' : 5
    // })
}

export const bookappointment = async (server,branchid,deptid,servid,date,time,name,custid,phone,email) => {
    // return await mfetch('https://aq.qbe.ee/api/api_qapp/apmt_submit_web.php',{
    //delay(300); return sAppointment;
    return await mfetch(server.host+'/api/api_qapp/apmt_submit_web.php',{
        req_uuid    :'d1f17a86-5c27-43ae-b243-e941eb526c7d',
        branchid    : 78,
        deptid      : deptid,
        services    : servid,
        apmt_date   : date,
        apmt_time   : time,
        cust_name   : name,
        cust_id     : custid,
        cust_id_type: 9,
        phone       : phone,
        email       : email,
        accno       : '',
        language    :'vn',
        type        : 11,
    })
}


//////////////////////////////////////////////////////////////////////////////// queuestatus
export const getQueueStatus = async(server,branchid,deptid,custid,queuenumber,qr)=>{
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
    return await mfetch(server.host+'/api_qapp/getqueuealltrans',{
        'client_id'     : server.client,
        'country_code'  : server.country,
        'branch_id'     : branchid,
        'department_id' : deptid,
        'queue_no'      : queuenumber
    });
}


////////////////////////////////////////////////////////////////////////////////
export const validateV3 = async (secret,token) => {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method:'POST',
        body:toFormData({
            secret      : secret,
            response    : token
        })})
    .then(response =>response.json())
    .then(response =>{
        return response;
    })
    .catch(error=>{return {success:false} }); //error.message
    return response;
}
