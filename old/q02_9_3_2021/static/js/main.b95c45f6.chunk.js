(this["webpackJsonpcustomer-portal"]=this["webpackJsonpcustomer-portal"]||[]).push([[0],{50:function(n,e,t){},66:function(n,e,t){"use strict";t.r(e);var r=t(0),c=t(1),i=t.n(c),a=t(24),o=t.n(a),u=(t(50),t(3)),s=t.n(u),d=t(6),l=t(4),b=t(2),f="setconfig",p="setbranch",j="setdepartment",x="setservice",g="settimeslot",O="setappointment",h="setqueue",v="language",m="customer",w="branch",y="department",k="service",_="timeslot",S=function(n){return{type:f,payload:n}},A=function(n){return{type:p,payload:n}},C=function(n){return{type:j,payload:n}},E=function(n){return{type:x,payload:n}},q=function(n){return{type:v,payload:n}},T=function(n){return{type:w,payload:n}},I=t(15),z=t(13),D=t(14),L=t(8),R=t(11),V=t(12);function U(){var n=Object(R.a)(["\n    margin          : ",";\n    padding         : ",";\n    width           : ",";\n    max-width       : ",";\n    height          : ",";\n    background      : ",";\n    display         : ",";\n    flex            : ",";\n    flex-direction  : ",";\n    flex-shrink     : 0;\n    flex-wrap       : ",";\n    align-items     : ",";\n    justify-content : ",";\n    align-self      : ",";\n    border          : ",";\n    border-radius   : ",";\n    opacity         : ",";\n    overflow        : ",";\n    overflow-x      : ",";\n    overflow-y      : ",";\n    position        : ",";\n    top             : ",";\n    bottom          : ",";\n    left            : ",";\n    right           : ",";\n    color           : ",";\n    cursor          : ",";\n    z-index         : ",";\n    box-sizing      : ",";\n"]);return U=function(){return n},n}var F=Object(V.a)(I.a.div)(U(),(function(n){return n.margin}),(function(n){return n.padding}),(function(n){var e;return null!==(e=n.width)&&void 0!==e?e:n.stretch?"stretch":""}),(function(n){return n.maxwidth}),(function(n){return n.height}),(function(n){return n.background}),(function(n){var e;return null!==(e=n.display)&&void 0!==e?e:"flex"}),(function(n){return n.flex}),(function(n){var e;return null!==(e=n.direction)&&void 0!==e?e:"column"}),(function(n){return n.wrap}),(function(n){var e;return null!==(e=n.align)&&void 0!==e?e:n.center?"center":"flex-start"}),(function(n){var e;return null!==(e=n.justify)&&void 0!==e?e:n.center?"center":"flex-start"}),(function(n){return n.alignself}),(function(n){return n.border}),(function(n){return n.borderradius}),(function(n){return n.opacity}),(function(n){return n.overflow}),(function(n){return n.overflowx}),(function(n){return n.overflowy}),(function(n){var e;return null!==(e=n.position)&&void 0!==e?e:"relative"}),(function(n){return n.top}),(function(n){return n.bottom}),(function(n){return n.left}),(function(n){return n.right}),(function(n){return n.color}),(function(n){return n.cursor}),(function(n){return n.zindex}),(function(n){return n.boxSizing})),P=function(n){return Object(r.jsx)(F,Object(L.a)(Object(L.a)({},n),{},{children:n.children}))};function X(n){return B.apply(this,arguments)}function B(){return(B=Object(d.a)(s.a.mark((function n(e){var t,r,c,i=arguments;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=i.length>1&&void 0!==i[1]?i[1]:{},r=new Headers,n.next=4,fetch(e,{method:"POST",headers:r,body:Y(t)}).then((function(n){return n.text()})).then((function(n){var e,t;return n.startsWith("<!DOCTYPE")?{status:404,error:"Failed to fetch API"}:200===(n=JSON.parse(n)).status?n.data:{status:null!==(e=n.status)&&void 0!==e?e:500,error:null!==(t=n.message)&&void 0!==t?t:"Invalid Response"}})).catch((function(n){return{error:n.message,status:500}}));case 4:return c=n.sent,n.abrupt("return",c);case 6:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function Y(n){var e=new FormData;return Object.keys(n).map((function(t){return e.append(t,n[t])})),e}var Z=t(7);t.p,t.p,t.p,t.p,t.p,t.p;function Q(){var n=Object(R.a)(["\n    background      : ",";\n    margin          : ",";\n    padding         : ",";\n    width           : ",";\n    font-size       : ",";\n    line-height     : ",";\n    font-weight     : ",";\n    flex            : ",";\n    text-align      : ",";\n    align-self      : ",";\n    color           : ",";\n    z-index         : ",";\n"]);return Q=function(){return n},n}var M=V.a.div(Q(),(function(n){return n.background}),(function(n){return n.margin}),(function(n){return n.padding}),(function(n){return n.mwidth}),(function(n){return n.size}),(function(n){return n.size}),(function(n){var e;return(null!==(e=n.weight)&&void 0!==e?e:n.bold)?"bold":""}),(function(n){return n.flex}),(function(n){return n.textalign}),(function(n){return n.alignself}),(function(n){return n.color}),(function(n){return n.zIndex})),H=function(n){var e=Object(b.c)((function(n){return n.config.theme})),t=Object(c.useState)(""),i=Object(l.a)(t,2),a=i[0],o=i[1];return Object(c.useEffect)((function(){void 0!==e&&(n.isPrimary?o(e.primary):o(e.textdefault)),n.mColor&&o(n.mColor)}),[e]),Object(r.jsx)(M,Object(L.a)(Object(L.a)({},n),{},{color:a,children:n.children}))},J=t(25),N=t.n(J);function W(){var n=Object(R.a)(['\n    content : "";\n    display : block;\n    width   : 20px;\n    height  : 20px;\n    margin  : 0px;\n    border-radius   : 50%;\n    border          : 3px solid #fff;\n    border-color    : #fff transparent #fff transparent;\n    animation       : '," 1.2s linear infinite;\n"]);return W=function(){return n},n}function K(){var n=Object(R.a)(["\n    0% { transform : rotate(0deg)}\n    100% { transform : rotate(360deg)}\n"]);return K=function(){return n},n}function G(){var n=Object(R.a)(["\n    margin          : ",";\n    padding         : ",";\n    width           : ",";\n    max-width       : ",";\n    min-height      : 40px;\n    height          : ",";\n    background      : ",";\n    border          : ",";\n    border-radius   : ",";\n    outline         : ",";\n    color           : ",";\n    flex            : ",";\n    flex-shrink     : 0;\n    display         : flex;\n    flex-direction  : ",";\n    align-items     : ",";\n    justify-content : ",";\n    cursor          : pointer;\n\n    &:hover{\n        background  : ","\n    }\n"]);return G=function(){return n},n}var $=V.a.button(G(),(function(n){return n.margin}),(function(n){var e;return null!==(e=n.padding)&&void 0!==e?e:"0px 24px"}),(function(n){return n.width}),(function(n){return n.maxwidth}),(function(n){return n.height}),(function(n){return n.background}),(function(n){var e;return null!==(e=n.border)&&void 0!==e?e:"none"}),(function(n){var e;return null!==(e=n.borderradius)&&void 0!==e?e:"5px"}),(function(n){var e;return null!==(e=n.outline)&&void 0!==e?e:"none"}),(function(n){return n.color}),(function(n){return n.flex}),(function(n){return n.vertical?"column":"row"}),(function(n){var e;return null!==(e=n.align)&&void 0!==e?e:"center"}),(function(n){var e;return null!==(e=n.justify)&&void 0!==e?e:"center"}),(function(n){return function(n,e){3===(n=n.replace(/^#/,"")).length&&(n=n[0]+n[0]+n[1]+n[1]+n[2]+n[2]);var t=n.match(/.{2}/g),r=Object(l.a)(t,3),c=r[0],i=r[1],a=r[2],o=[parseInt(c,16)+e,parseInt(i,16)+e,parseInt(a,16)+e];c=o[0],i=o[1],a=o[2],c=Math.max(Math.min(255,c),0).toString(16),i=Math.max(Math.min(255,i),0).toString(16),a=Math.max(Math.min(255,a),0).toString(16);var u=(c.length<2?"0":"")+c,s=(i.length<2?"0":"")+i,d=(a.length<2?"0":"")+a;return"#".concat(u).concat(s).concat(d)}(n.background,-5)})),nn=Object(V.b)(K()),en=V.a.div(W(),nn),tn=function(n){var e,t,c=Object(b.c)((function(n){return n.config.theme}));return Object(r.jsx)($,Object(L.a)(Object(L.a)({},n),{},{background:(null!==(e=n.background)&&void 0!==e?e:void 0===c)?"#ebebeb":n.isPrimary?c.btnprimary:n.isSecondary?c.btnsecondary:"#ebebeb",color:(null!==(t=n.color)&&void 0!==t?t:void 0===c)?"":n.isPrimary?c.btnprimarytext:n.isSecondary?c.btnsecondarytext:"",onClick:n.onClick,children:n.mloading?Object(r.jsx)(en,{}):n.label}))},rn=function(){var n;return Object(r.jsx)(P,(n={flex:1,background:"white"},Object(Z.a)(n,"background","white"),Object(Z.a)(n,"padding","16px"),Object(Z.a)(n,"center","true"),Object(Z.a)(n,"children","Invalid ID"),n))},cn=function(){var n=Object(d.a)(s.a.mark((function n(e){var t,r,c,i,a=arguments;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=a.length>1&&void 0!==a[1]?a[1]:function(){},r=a.length>2&&void 0!==a[2]?a[2]:function(n){},n.prev=2,t(),n.next=6,fetch("/config/"+e+"/config.json");case 6:return c=n.sent,n.next=9,c.json();case 9:i=n.sent,r(i),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(2),r({});case 16:case"end":return n.stop()}}),n,null,[[2,13]])})));return function(e){return n.apply(this,arguments)}}(),an=function(){var n=Object(d.a)(s.a.mark((function n(e,t){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,X(e.host+"/api_qapp/listbranch",{client_id:e.client,country_code:e.country,language_id:t});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}(),on=function(){var n=Object(d.a)(s.a.mark((function n(e,t,r){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,X(e.host+"/api_qapp/listdepartment",{client_id:e.client,country_code:e.country,language_id:t,branch_id:r});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(e,t,r){return n.apply(this,arguments)}}(),un=function(){var n=Object(d.a)(s.a.mark((function n(e,t,r,c){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,X(e.host+"/api_qapp/listservice",{client_id:e.client,country_code:e.country,language_id:t,branch_id:r,department_id:c});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(e,t,r,c){return n.apply(this,arguments)}}(),sn=function(){var n=Object(d.a)(s.a.mark((function n(e,t,r,c,i){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,X(e.host+"/api_qapp/getqueueno",{client_id:e.client,country_code:e.country,branch_id:t,department_id:r,service_id:c,customer_sys_id:i.sysid,customer_id:i.id,customer_name:i.name,phone_no:i.phone,param_int_1:"4",param_int_2:"0",param_int_3:"0",param_str_1:"",param_str_2:"",param_str_3:""});case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})));return function(e,t,r,c,i){return n.apply(this,arguments)}}(),dn=function(){var n=Object(d.a)(s.a.mark((function n(e,t,r,c,i,a){var o;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return o=void 0!==a&&""!==a?"/api_qapp/checkqueuestatusbyqr":void 0===i||""===i?"/api_qapp/checkqueuestatusbycustid":"/api_qapp/checkqueuestatus",n.next=3,X(e.host+o,{client_id:e.client,country_code:e.country,branch_id:t,department_id:r,customer_id:c,queue_no:i,i:a});case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(e,t,r,c,i,a){return n.apply(this,arguments)}}();function ln(){var n=Object(R.a)(["\n    margin          : ",';\n    content         : "";\n    display         : block;\n    width           : ',";\n    height          : ",";\n    border-radius   : 50%;\n    border          : "," solid ",";\n    border-color    : "," transparent "," transparent;\n    animation       : "," 1.2s linear infinite;\n"]);return ln=function(){return n},n}function bn(){var n=Object(R.a)(["\n    0% { transform : rotate(0deg)}\n    100% { transform : rotate(360deg)}\n"]);return bn=function(){return n},n}var fn=Object(V.b)(bn()),pn=V.a.div(ln(),(function(n){return n.margin}),(function(n){return n.size}),(function(n){return n.size}),(function(n){return n.thickness}),(function(n){return n.color}),(function(n){return n.color}),(function(n){return n.color}),fn),jn=function(n){var e=n.margin,t=n.color,c=void 0===t?"#ccc":t,i=n.size,a=void 0===i?"20px":i,o=n.thickness,u=void 0===o?"3px":o;Object(b.c)((function(n){return n.config}));return Object(r.jsx)(pn,{margin:e,color:c,size:a,thickness:u})};function xn(){var n=Object(R.a)(["\n    font-weight : ",";\n    padding     : ",";\n    cursor      : pointer;\n    border      : ",";\n\n"]);return xn=function(){return n},n}function gn(){var n=Object(R.a)(["\n    position    : absolute;\n    padding     : 0px 0px;\n    align-self  : ",";\n    background  : white;\n    border      : 1px solid rgba(0,0,0,0.2);\n    border-radius: 5px;\n\n"]);return gn=function(){return n},n}function On(){var n=Object(R.a)(["\n    margin      : ",";\n    padding     : ",";\n    align-self  : ",";\n    position    : relative;\n    outline     : none;\n    display     : flex;\n    flex-direction: column;\n    z-index     : 99;\n"]);return On=function(){return n},n}var hn=Object(V.a)(I.a.div)(On(),(function(n){return n.margin}),(function(n){return n.padding}),(function(n){return n.alignself})),vn=Object(V.a)(I.a.div)(gn(),(function(n){return n.alignself})),mn=Object(V.a)(I.a.div)(xn(),(function(n){return n.weight}),(function(n){var e;return null!==(e=n.padding)&&void 0!==e?e:"8px 16px"}),(function(n){return n.border})),wn=function(n){var e=Object(b.b)(),t=Object(b.c)((function(n){return n.config.languageSelection})),i=Object(b.c)((function(n){return n.select.language})),a=Object(c.useState)(!1),o=Object(l.a)(a,2),u=o[0],s=o[1],d=Object(I.b)({config:{friction:100,mass:1,tension:3e3},opacity:u?1:0,display:u?"block":"none"});return Object(r.jsxs)(hn,Object(L.a)(Object(L.a)({},n),{},{tabIndex:"0",onBlur:function(){return s(!1)},children:[Object(r.jsx)(mn,{border:"1px solid transparent",onClick:function(){return s(!u)},children:i?i.label:""}),Object(r.jsx)(vn,{style:d,children:void 0===t?"":t.map((function(n,t){return Object(r.jsx)(mn,{onClick:function(){s(!u),e(q(n))},children:n.label},n.id)}))})]}))},yn=function(){var n=Object(z.g)(),e=Object(b.b)(),t=Object(c.useState)(!0),i=Object(l.a)(t,2),a=(i[0],i[1],Object(z.i)().id),o=Object(b.c)((function(n){return n.config})),u=(Object(b.c)((function(n){return n.config.theme})),Object(c.useState)("")),f=Object(l.a)(u,2),p=f[0],j=(f[1],Object(c.useState)(!1)),x=Object(l.a)(j,2),g=x[0],O=x[1],h=Object(c.useState)(!1),v=Object(l.a)(h,2),m=v[0],w=v[1],y=Object(c.useState)(!1),k=Object(l.a)(y,2),_=k[0],E=k[1],I=Object(b.c)((function(n){return n.select.language?n.select.language.id:0})),D=Object(b.c)((function(n){return n.config.languages}));Object(c.useEffect)((function(){0==Object.keys(o)?function(){var n=Object(d.a)(s.a.mark((function n(){var t,r;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,O(!0),n.next=4,fetch("/config/"+a+"/config.json");case 4:return t=n.sent,O(!1),n.next=8,t.json();case 8:r=n.sent,w(!0),e(S(r)),e(q(r.languageSelection[0])),console.log(r),n.next=19;break;case 15:n.prev=15,n.t0=n.catch(0),O(!1),console.log(n.t0);case 19:case"end":return n.stop()}}),n,null,[[0,15]])})));return function(){return n.apply(this,arguments)}}()():w(!0)}),[p,a]);var L=function(){var t=Object(d.a)(s.a.mark((function t(){var r,c,i;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return E(!0),t.next=3,an(o.server,I);case 3:if(r=t.sent,E(!1),!r.error){t.next=8;break}t.next=20;break;case 8:if(1!==r.length){t.next=18;break}return E(!0),c=r[0],t.next=13,on(o.server,I,c.mid);case 13:i=t.sent,E(!1),r.error||(e(T(c)),e(C(i)),n.push("/"+a+"/d")),t.next=20;break;case 18:e(A(r)),n.push("/"+a+"/b");case 20:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return g?Object(r.jsx)("div",{children:"Loading..."}):m?Object(r.jsxs)(P,{flex:1,align:"center",children:[Object(r.jsx)(wn,{alignself:"flex-end",margin:"8px"}),Object(r.jsx)(P,{flex:1}),Object(r.jsx)("img",{src:Yn+a+"/images/logo.png",style:{width:200}}),Object(r.jsx)(H,{margin:"16px",children:D?D.welcome[I]:""}),Object(r.jsx)(tn,{isPrimary:!0,width:"300px",label:"GET QUEUE",margin:"0 0 8px 0",onClick:L,mloading:_}),Object(r.jsx)(tn,{isPrimary:!0,width:"300px",label:"ACTIVE QUEUE",margin:"0 0 8px 0"}),Object(r.jsx)(tn,{isPrimary:!0,width:"300px",label:"ACTIVE APPOINTMENT"}),Object(r.jsx)(P,{flex:1}),Object(r.jsx)("div",{style:{position:"fixed",bottom:0,right:0,fontSize:8,margin:6},children:Bn})]}):Object(r.jsx)(rn,{})},kn=function(){var n=Object(z.g)(),e=Object(b.b)(),t=Object(z.i)().id,i=Object(b.c)((function(n){return n.config})),a=(Object(b.c)((function(n){return n.config.theme})),Object(b.c)((function(n){return n.select.language?n.select.language.id:0})),Object(b.c)((function(n){return n.config.languages})),Object(b.c)((function(n){return n.data.branches}))),o=Object(c.useState)({}),u=Object(l.a)(o,2),f=u[0],p=u[1],j=Object(c.useState)(!1),x=Object(l.a)(j,2),g=x[0],O=x[1];Object(c.useEffect)((function(){0!==Object.keys(i).length&&void 0!==a||n.push("/"+t+"/")}),[i,a]);var h=function(){var r=Object(d.a)(s.a.mark((function r(c){var i;return s.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return p(c),O(!0),r.next=4,on();case 4:i=r.sent,O(!1),i.error||(e(T(c)),e(C(i)),n.push("/"+t+"/d"));case 7:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),v=function(n){var e=n.branch;return Object(r.jsx)(P,{border:"1px solid rgba(0,0,0,0.2)",borderradius:"5px",margin:"4px 0",width:"300px",background:e.mid===f.mid?"ghostwhite":"white",cursor:"pointer",align:"center",onClick:function(){return h(e)},children:Object(r.jsx)(H,{padding:"16px",children:e.name})})};return Object(r.jsxs)(P,{flex:1,align:"center",children:[Object(r.jsx)(H,{margin:"16px 0 8px",children:"Branches"}),void 0===a?"":a.map((function(n,e){return Object(r.jsx)(v,{branch:n},e)})),g&&Object(r.jsx)(jn,{margin:"8px"}),Object(r.jsx)(P,{flex:1})]})},_n=function(){var n=Object(z.g)(),e=Object(b.b)(),t=Object(z.i)().id,i=Object(b.c)((function(n){return n.config})),a=(Object(b.c)((function(n){return n.config.theme})),Object(b.c)((function(n){return n.select.language?n.select.language.id:0}))),o=(Object(b.c)((function(n){return n.config.languages})),Object(b.c)((function(n){return n.data.departments}))),u=Object(b.c)((function(n){return n.select.branch})),f=Object(c.useState)({}),p=Object(l.a)(f,2),j=p[0],x=p[1],g=Object(c.useState)(!1),O=Object(l.a)(g,2),h=O[0],v=O[1];Object(c.useEffect)((function(){0!==Object.keys(i).length&&void 0!==o||n.push("/"+t+"/")}),[i,o]);var m=function(){var r=Object(d.a)(s.a.mark((function r(c){var o;return s.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return x(c),v(!0),r.next=4,un(i.server,a,u.mid,c.dept_id);case 4:o=r.sent,v(!1),o.error||(e({type:y,payload:c}),e(E(o[0].dept_service_data)),n.push("/"+t+"/s"));case 7:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),w=function(n){var e=n.department;return Object(r.jsxs)(P,{border:"1px solid rgba(0,0,0,0.2)",borderradius:"5px",padding:"16px",margin:"4px 0",width:"350px",background:e.dept_id===j.dept_id?"ghostwhite":"",cursor:"pointer",align:"flex-start",direction:"row",onClick:function(){return m(e)},children:[Object(r.jsx)("div",{style:{width:40,height:40,background:"lightblue",borderRadius:"50%"}}),Object(r.jsxs)(P,{margin:"0 0 0 16px",children:[Object(r.jsx)(H,{weight:"bold",children:e.dept_name}),Object(r.jsx)(H,{size:"12px",mColor:"rgba(0,0,0,0.5)",margin:"4px 0 2px",children:"Address: - "})]})]})};return Object(r.jsxs)(P,{flex:1,align:"center",overflowx:"auto",children:[Object(r.jsx)(H,{margin:"16px 0 8px",children:"Select Branch"}),void 0===o?"":o.map((function(n,e){return Object(r.jsx)(w,{department:n},e)})),Object(r.jsx)(P,{height:"40px"}),h&&Object(r.jsx)(jn,{margin:"8px"})]})},Sn=function(){var n=Object(z.g)(),e=Object(b.b)(),t=Object(z.i)().id,i=Object(b.c)((function(n){return n.config})),a=(Object(b.c)((function(n){return n.config.theme})),Object(b.c)((function(n){return n.select.language?n.select.language.id:0})),Object(b.c)((function(n){return n.config.languages})),Object(b.c)((function(n){return n.data.services}))),o=Object(c.useState)({}),u=Object(l.a)(o,2),f=u[0],p=u[1],j=Object(c.useState)(!1),x=Object(l.a)(j,2),g=x[0];x[1];Object(c.useEffect)((function(){0!==Object.keys(i).length&&void 0!==a||n.push("/"+t+"/")}),[i,a]);var O=function(){var r=Object(d.a)(s.a.mark((function r(c){return s.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:console.log("click c"),p(c),e({type:k,payload:c}),n.push("/"+t+"/f");case 4:case"end":return r.stop()}}),r)})));return function(n){return r.apply(this,arguments)}}(),h=function(n){var e=n.service;return Object(r.jsxs)(P,{border:"1px solid rgba(0,0,0,0.2)",borderradius:"5px",padding:"16px",margin:"4px 0",width:"350px",background:e.serv_id===f.serv_id?"ghostwhite":"",children:[Object(r.jsx)(H,{weight:"bold",children:e.serv_name}),Object(r.jsxs)(H,{size:"12px",margin:"2px 0 0 0",mColor:"rgba(0,0,0,0.5)",children:["In Queue: 0 ","\xa0\xa0"," Serving: -"]}),Object(r.jsxs)("div",{style:{display:"flex",alignSelf:"stretch"},children:[Object(r.jsx)(P,{border:"1px solid rgba(0,0,0,0.5)",borderradius:"4px",padding:"6px 16px",margin:"16px 16px 0 0",cursor:"pointer",onClick:function(){return O(e)},children:Object(r.jsx)(H,{size:"12px",children:"GET QUEUE"})}),Object(r.jsx)(P,{border:"1px solid rgba(0,0,0,0.5)",borderradius:"4px",padding:"6px 16px",margin:"16px 16px 0 0",display:"none",children:Object(r.jsx)(H,{size:"12px",children:"BOOK APPOINTMENT"})})]})]})};return Object(r.jsxs)(P,{flex:1,align:"center",children:[Object(r.jsx)(H,{margin:"16px 0 8px",children:"Services"}),void 0===a?"":a.map((function(n,e){return Object(r.jsx)(h,{service:n},e)})),g?Object(r.jsx)(jn,{}):""]})},An=function(){var n=Object(z.g)(),e=Object(b.b)(),t=Object(z.i)().id,i=Object(b.c)((function(n){return n.config})),a=(Object(b.c)((function(n){return n.select.language?n.select.language.id:0})),Object(b.c)((function(n){return n.config.languages})),Object(b.c)((function(n){return n.data.timeslots}))),o=Object(c.useState)(void 0),u=Object(l.a)(o,2),s=u[0],d=u[1],f=Object(c.useState)({}),p=Object(l.a)(f,2),j=p[0],x=p[1],g=Object(c.useState)(!1),O=Object(l.a)(g,2);O[0],O[1];Object(c.useEffect)((function(){0===Object.keys(i).length||void 0===a?n.push("/"+t+"/"):a.length>0&&d(a[0])}),[i,a]),Object(c.useEffect)((function(){void 0!==s&&x(s.time[0])}),[s]);var h=function(n){var e=n.date;return Object(r.jsx)(P,{border:"1px solid rgba(0,0,0,0.2)",borderradius:"5px",padding:"8px 16px",margin:"6px",width:"100px",align:"center",background:void 0===s?"":s.date===e.date?"whitesmoke":"",onClick:function(){return function(n){return d(n)}(e)},children:Object(r.jsx)(H,{children:e.date})})},v=function(n){var e=n.time;return Object(r.jsx)(P,{border:"1px solid rgba(0,0,0,0.2)",borderradius:"5px",padding:"8px 16px",margin:"6px",width:"100px",align:"center",background:j.time===e.time?"whitesmoke":"",onClick:function(){return function(n){return x(n)}(e)},children:e.time})};return Object(r.jsxs)(P,{flex:1,padding:"16px",align:"center",children:[Object(r.jsx)(H,{margin:"8px 0",children:"Timeslots"}),Object(r.jsx)(H,{padding:"8px 6px 0",mwidth:"450px",textalign:"left",children:"Date"}),Object(r.jsx)(P,{direction:"row",width:"450px",wrap:"wrap",children:void 0===a?"":a.map((function(n,e){return Object(r.jsx)(h,{date:n},e)}))}),Object(r.jsx)(H,{padding:"8px 6px 0",mwidth:"450px",textalign:"left",children:"Time"}),Object(r.jsx)(P,{direction:"row",width:"450px",wrap:"wrap",children:void 0===s?"":s.time.map((function(n,e){return Object(r.jsx)(v,{time:n},e)}))}),Object(r.jsx)(tn,{isPrimary:!0,width:"220px",label:"NEXT",margin:"16px 0",onClick:function(){var r;e((r={date:s.date,time:j.time},{type:_,payload:r})),n.push("/"+t+"/forms")}})]})};t(40);function Cn(){var n=Object(R.a)(["\n    border  : 1px solid rgba(0,0,0,0.2);\n    width   : 100%;\n    padding : 8px 16px;\n"]);return Cn=function(){return n},n}function En(){var n=Object(R.a)(["\n    margin          : ",";\n    padding         : ",";\n    width           : ",";\n    max-width       : ",";\n    height          : ",";\n    background      : ",";\n    display         : flex;\n    flex            : ",";\n    flex-direction  : ",";\n    flex-shrink     : 0;\n    flex-wrap       : ",";\n    align-items     : ",";\n    justify-content : ",";\n    align-self      : ",";\n    border          : ",";\n    border-radius   : ",";\n    opacity         : ",";\n    overflow        : ",";\n    overflow-x      : ",";\n    overflow-y      : ",";\n    position        : ",";\n    top             : ",";\n    color           : ",";\n    cursor          : ",";\n"]);return En=function(){return n},n}var qn=Object(V.a)(I.a.div)(En(),(function(n){return n.margin}),(function(n){return n.padding}),(function(n){var e;return null!==(e=n.width)&&void 0!==e?e:n.stretch?"stretch":""}),(function(n){return n.maxwidth}),(function(n){return n.height}),(function(n){return n.background}),(function(n){return n.flex}),(function(n){var e;return null!==(e=n.direction)&&void 0!==e?e:"column"}),(function(n){return n.wrap}),(function(n){var e;return null!==(e=n.align)&&void 0!==e?e:n.center?"center":"flex-start"}),(function(n){var e;return null!==(e=n.justify)&&void 0!==e?e:n.center?"center":"flex-start"}),(function(n){return n.alignself}),(function(n){return n.border}),(function(n){return n.borderradius}),(function(n){return n.opacity}),(function(n){return n.overflow}),(function(n){return n.overflowx}),(function(n){return n.overflowy}),(function(n){return n.position}),(function(n){return n.top}),(function(n){return n.color}),(function(n){return n.cursor})),Tn=V.a.input(Cn()),In=function(n){var e=n.type,t=void 0===e?"text":e,c=n.label,i=n.value,a=n.onChange,o=n.margin;return Object(r.jsxs)(qn,{margin:o,width:"300px",children:[Object(r.jsx)("div",{children:c}),Object(r.jsx)(Tn,{type:t,onChange:function(n){return a(n.target.value)},value:i})]})},zn=function(){var n=Object(z.g)(),e=(Object(b.b)(),Object(z.i)().id),t=Object(b.c)((function(n){return n.config})),i=(Object(b.c)((function(n){return n.select.language?n.select.language.id:0})),Object(b.c)((function(n){return n.config.languages})),Object(b.c)((function(n){return n.select.branch}))),a=Object(b.c)((function(n){return n.select.department})),o=Object(b.c)((function(n){return n.select.service})),u=Object(b.c)((function(n){return n.config.forms})),f=Object(c.useState)(!1),p=Object(l.a)(f,2),j=(p[0],p[1],Object(c.useState)([])),x=Object(l.a)(j,2),g=x[0],O=x[1];Object(c.useEffect)((function(){0!==Object.keys(t).length&&void 0!==o||n.push("/"+e+"/")}),[t,o]),Object(c.useEffect)((function(){void 0!==u&&O(u)}),[u]);var h=function(){var r=Object(d.a)(s.a.mark((function r(){var c,u;return s.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return console.log("click"),console.log(g),c={sysid:"",id:g.find((function(n){return"email"===n.keyword})).value,name:g.find((function(n){return"name"===n.keyword})).value,phone:""},console.log(c),r.next=6,sn(t.server,i.mid,a.dept_id,o.serv_id,c);case 6:(u=r.sent).error||(console.log(u),localStorage.setItem("queue",JSON.stringify(u)),n.push("/"+e+"/q/"+u.qr_info));case 8:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return Object(r.jsxs)(P,{flex:1,padding:"16px",align:"center",children:[Object(r.jsx)(H,{margin:"8px 0",children:"Forms"}),g.map((function(n,e){return Object(r.jsx)(In,{type:n.type,label:n.label,value:n.val,margin:"8px 16px",onChange:function(e){O(g.map((function(t){return t.id===n.id?Object(L.a)(Object(L.a)({},t),{value:e}):t})))}},e)})),Object(r.jsx)(tn,{isPrimary:!0,width:"220px",label:"SUBMIT",onClick:h})]})},Dn=t(33),Ln=t.n(Dn),Rn=t(29),Vn=t.n(Rn);function Un(){var n=Object(R.a)(["\n            background      : white;\n            width           : 48%;\n            padding         : 12px 16px;\n            margin          : 0 0 16px;\n            display         : flex;\n            align-items     : center;\n            border-radius   : 4px;\n            box-shadow      : 0px 3px 3px 0px rgba(156,156,156,0.7);\n            cursor          : pointer;\n        "]);return Un=function(){return n},n}function Fn(){var n=Object(R.a)(["\n        width       :100%;\n        height      :1px;\n        background  :rgba(0,0,0,0.1);\n    "]);return Fn=function(){return n},n}function Pn(){var n=Object(R.a)(["\n        width           : 350px;\n        background      : white;\n        padding         : 16px;\n        border-radius   : 4px;\n        box-shadow      : 0px 3px 3px 0px rgba(156,156,156,0.7);\n    "]);return Pn=function(){return n},n}var Xn=function(){Object(z.g)();var n,e,t,i,a,o=Object(b.b)(),u=Object(z.i)(),f=u.id,p=u.qr,j=Object(b.c)((function(n){return n.config})),x=Object(b.c)((function(n){return n.select.language?n.select.language.id:0})),g=Object(b.c)((function(n){return n.config.languages})),O=Object(c.useState)(!1),h=Object(l.a)(O,2),v=h[0],m=h[1],w=Object(c.useState)("load"),y=Object(l.a)(w,2),k=y[0],_=y[1],A=Object(c.useState)(!1),C=Object(l.a)(A,2),E=C[0],T=C[1],I=Object(c.useState)({}),D=Object(l.a)(I,2),L=D[0],R=D[1],U=Object(c.useState)(""),F=Object(l.a)(U,2),X=F[0],B=F[1],Y=Object(c.useState)(0),Z=Object(l.a)(Y,2),Q=(Z[0],Z[1],Object(c.useState)()),M=Object(l.a)(Q,2),J=M[0],W=M[1],K=Object(c.useState)(""),G=Object(l.a)(K,2),$=G[0],nn=G[1],en=V.a.div(Pn()),tn=V.a.div(Fn());Object(c.useEffect)((function(){return 0==Object.keys(j)?cn(f,(function(){return m(!0)}),function(){var n=Object(d.a)(s.a.mark((function n(e){return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(console.log(e),m(!1),0!=Object.keys(e)){n.next=4;break}return n.abrupt("return");case 4:T(!0),o(S(e)),o(q(e.languageSelection[0]));case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()):T(!0),function(){return clearInterval(undefined)}}),[j]),Object(c.useEffect)(Object(d.a)(s.a.mark((function n(){var e,t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(void 0!==p){n.next=2;break}return n.abrupt("return");case 2:if(0!=Object.keys(j)){n.next=4;break}return n.abrupt("return");case 4:return console.log("getqbyqr => "+p),_("load"),n.next=8,dn(j.server,"","","","",p);case 8:if(e=n.sent,console.log(e),!e.error){n.next=14;break}_("failed"),n.next=22;break;case 14:if(_("success"),R(e),B(e.wa_url),an(e),2!==e.status){n.next=20;break}return n.abrupt("return");case 20:t=setInterval((function(){return an(e)}),1e4),W(t);case 22:return n.abrupt("return",(function(){return clearInterval(t)}));case 23:case"end":return n.stop()}}),n)}))),[j,p]),Object(c.useEffect)((function(){return function(){return clearInterval(J)}}),[]);var an=function(){var n=Object(d.a)(s.a.mark((function n(e){var t;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!=Object.keys(j)){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,dn(j.server,e.mid,e.dept_id,e.cust_id,e.queue_number);case 4:t=n.sent,e.error||(console.log(t),R(t),nn(0===t.status?g.q_waiting[x]:1===t.status?t.wstt_name+" "+g.q_calling[x]:2===t.status?g.q_done[x]:""));case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),on=function(n){var e=n.icon,t=n.label,c=n.onClick,i=void 0===c?function(){}:c,a=V.a.div(Un());return Object(r.jsxs)(a,{onClick:i,children:[Object(r.jsx)("img",{src:e,style:{width:37,height:37,margin:"0 16px 0 0"}}),Object(r.jsx)(H,{size:"13px",mColor:"#9E9E9E",textalign:"left",children:t})]})},un=function(n){var e=n.label,t=n.value,c=n.children;return Object(r.jsxs)(P,{align:"center",flex:1,children:[Object(r.jsx)(H,{size:"12px",mColor:"#4AC1E0",children:e}),Object(r.jsxs)(H,{size:"18px",margin:"8px 0 0",children:[t,c]})]})};return v?Object(r.jsx)("div",{children:"Loading..."}):E?Object(r.jsx)(P,{flex:1,background:"white",children:"load"===k?Object(r.jsx)("div",{children:"Loading..."}):"failed"===k?Object(r.jsx)("div",{children:"Invalid QR Code"}):"success"===k?Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)(P,{flex:1,width:"100%",align:"center",background:"whitesmoke",children:[Object(r.jsx)(H,{margin:"32px",children:$}),Object(r.jsxs)(en,{children:[Object(r.jsx)("img",{src:Yn+f+"/images/logo.png",style:{width:200,margin:16}}),Object(r.jsx)(H,{weight:"bold",mColor:"#474747",children:null!==(n=L.serv_name)&&void 0!==n?n:""}),Object(r.jsx)(H,{weight:"bold",mColor:"#474747",size:"70px",children:null!==(e=L.queue_number)&&void 0!==e?e:""}),Object(r.jsx)(P,{padding:"16px",align:"center",children:Object(r.jsx)(N.a,{width:"134px",value:null!==p&&void 0!==p?p:"",size:134})}),Object(r.jsx)(tn,{}),Object(r.jsx)(P,{direction:"row",padding:"16px 0 0",children:2!==L.status?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(un,{label:"Serving Now",value:null!==(t=L.serv_current_serving)&&void 0!==t?t:""}),Object(r.jsx)(un,{label:"Position",value:null!==(i=L.wait_position)&&void 0!==i?i:"-"}),Object(r.jsxs)(un,{label:"Est call time",children:[" ",Object(r.jsx)(Ln.a,{date:Vn()().add(L.serv_est_wait_time/60,"m"),format:"hh:mm a"})]})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(un,{label:"Attended By",value:null!==(a=L.wait_position)&&void 0!==a?a:"-"}),Object(r.jsxs)(un,{label:"Call Time",children:["     ",Object(r.jsx)(Ln.a,{date:L.time_msec_call,format:"hh:mm a"})]})]})})]}),Object(r.jsx)(P,{width:"350px",direction:"row",wrap:"wrap",justify:"center",padding:"32px 0",children:""!==X&&j.features&&j.features.whatsapp&&Object(r.jsx)(on,{icon:"data:image/png;base64,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",label:"Whatsapp Chat",onClick:function(){return window.open(X,"_blank")}})}),Object(r.jsx)(P,{flex:1}),Object(r.jsx)(P,{background:"red",width:"100%",height:"5px"})]})}):""}):Object(r.jsx)(rn,{})},Bn="v1.0",Yn="config/",Zn=function(){Object(b.b)();var n=Object(c.useState)(!0),e=Object(l.a)(n,2),t=(e[0],e[1],function(){var n=Object(z.i)().id;return Object(r.jsx)(z.a,{to:"/"+n})}),i=function(){var n=Object(z.h)(),e=(Object(b.c)((function(n){return n.config.theme})),Object(c.useState)(!1)),i=Object(l.a)(e,2),a=i[0],o=i[1],u=Object(I.c)(n,(function(n){return n.pathname}),{from:{opacity:0,transform:a?"translateX(10%)":"translateX(0%)"},enter:{opacity:1,transform:"translateX(0%)"},leave:{opacity:0,transform:"translateX(-50%)"}});return Object(c.useEffect)((function(){o(!0)}),[]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(P,{width:"100%",height:"100%"}),u.map((function(n){var e=n.item,c=n.props,i=n.key;return Object(r.jsx)(P,{style:c,position:"fixed",width:"100%",height:"100%",align:"stretch",children:Object(r.jsxs)(z.d,{location:e,children:[Object(r.jsx)(z.b,{path:"/",exact:!0,component:rn}),Object(r.jsx)(z.b,{path:"/:id",exact:!0,component:yn}),Object(r.jsx)(z.b,{path:"/:id/b",exact:!0,component:kn}),Object(r.jsx)(z.b,{path:"/:id/d",exact:!0,component:_n}),Object(r.jsx)(z.b,{path:"/:id/s",exact:!0,component:Sn}),Object(r.jsx)(z.b,{path:"/:id/t",exact:!0,component:An}),Object(r.jsx)(z.b,{path:"/:id/f",exact:!0,component:zn}),Object(r.jsx)(z.b,{path:"/:id/q",exact:!0,component:Xn}),Object(r.jsx)(z.b,{path:"/:id/q/:qr",exact:!0,component:Xn}),Object(r.jsx)(z.b,{path:"/:id/:unknown",exact:!0,component:t}),Object(r.jsx)(z.a,{to:"/"})]})},i)}))]})};return Object(r.jsx)(D.a,{children:Object(r.jsx)(i,{})})},Qn=function(){return Object(r.jsx)(Zn,{})},Mn=t(22),Hn=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;switch(e.type){case f:return Object(L.a)(Object(L.a)({},n),e.payload);default:return n}},Jn=t(26),Nn=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return Object(Jn.a)(n,(function(n){switch(e.type){case v:n.language=e.payload;break;case m:n.customer_type=e.payload;break;case w:n.branch=e.payload;break;case y:n.department=e.payload;break;case k:n.service=e.payload;break;case _:n.timeslot=e.payload;break;default:return n}}))},Wn=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return Object(Jn.a)(n,(function(n){switch(e.type){case p:n.branches=e.payload;break;case j:n.departments=e.payload;break;case x:n.services=e.payload;break;case g:n.timeslots=e.payload;break;case O:n.appointment=e.payload;break;case h:n.queue=e.payload;break;default:return n}}))},Kn=Object(Mn.b)({config:Hn,select:Nn,data:Wn}),Gn=function(){var n=Object(Mn.c)(Kn,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());return Object(r.jsx)(b.a,{store:n,children:Object(r.jsx)(Qn,{})})};o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(Gn,{})}),document.getElementById("root"))}},[[66,1,2]]]);