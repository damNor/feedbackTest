import {jsonfetch,rawfetch,toFormData,delay} from './common'

export const fetchTimeslots = async ( mRequestid,
                                      mCountrycode,
                                      mClientId,
                                      mLanguage,
                                      branchid,
                                      deptid,
                                      servid,
                                      date,
                                      mrange
                                      ) => 
                            {
                    await delay(100); 
                    return sampleTimeslots;
 
    /* 
    return await jsonfetch(api,{});

    'url'   : mServerhost+'/api_qapp/actionEx.php',
    'c'     : mCountrycode,
    'mid'   : appmtbranchid,
    'dept'  : deptid,
    'serv'  : servid,
    'mdl'   : 'apm',
    'func'  : 'apm_getavailslotbydaterange2',
    'loc'   : deptid,
    'user'  : '',
    'date'  : mDate,
    'range' : mRange 
    */

    return await rawfetch('/api_qapp/actionEx.php',{
        'func'          : 'apm_getavailslotbydaterange2',
        'mdl'           : 'apm',
        'req_uid'       : mRequestid,
        'country_code'  : mCountrycode,
        'client_id'     : mClientId,
        'language_id'   : mLanguage,
        //'branch_id'     : branchid,
        'mid'           : branchid,
        'department_id' : deptid,
        'loc'           : deptid,
        'serv'          : servid,
        'date'          : date,
        'range'         : mrange,
    })


}

const sampleTimeslots = [
    {date:'01-06-2021',time:[
                            {time:'08:00'},{time:'09:00'},{time:'10:00'},{time:'11:00'}
                        ]
                            },
    {date:'02-06-2021',time:[
                            {time:'08:00'},{time:'09:00'},{time:'10:00'},{time:'11:00'}
                        ]
                            },
    {date:'03-06-2021',time:[
                            {time:'08:00'},{time:'09:00'},{time:'10:00'},{time:'11:00'}
                        ]
                            },
    {date:'04-06-2021',time:[
                            {time:'08:00'},{time:'09:00'},{time:'10:00'},{time:'11:00'}
                        ]
                            },
    {date:'05-06-2021',time:[
                            {time:'08:00'},{time:'09:00'},{time:'10:00'},{time:'11:00'}
                        ]
                            },
]
