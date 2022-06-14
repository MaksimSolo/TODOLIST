(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{128:function(t,e,n){"use strict";n.r(e);var c,r,a=n(0),i=n.n(a),o=n(26),s=n.n(o),l=(n(97),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,183)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,a=e.getLCP,i=e.getTTFB;n(t),c(t),r(t),a(t),i(t)}))}),u=(n(98),n(13)),d=n(168),j=n(175),f=n(34),b=n(164),O=n(2),p=i.a.memo((function(t){var e=Object(a.useState)(""),n=Object(u.a)(e,2),c=n[0],r=n[1],i=Object(a.useState)(!1),o=Object(u.a)(i,2),s=o[0],l=o[1],p=function(){c.trim()?t.addItem(c.trim()):l(!0),r("")};return Object(O.jsxs)("div",{style:{textAlign:"center"},children:[Object(O.jsx)(d.a,{variant:"outlined",size:"small",label:"enter item title",helperText:s&&"Error! Typing is expected",value:c,onChange:function(t){r(t.currentTarget.value),l(!1)},onKeyPress:function(t){"Enter"===t.key&&p()},error:s}),Object(O.jsx)(j.a,{onClick:p,sx:{color:f.a[500]},children:Object(O.jsx)(b.a,{})})]})})),h=n(173),x=n(174),v=n(180),m=n(181),D=n(176),T=n(177),I=n(179),k=n(182),g=n(46),y=n(14),C=n(15),S=n(29),E=n.n(S),w=n(51),L=n.n(w),A=L.a.create(Object(C.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/todo-lists"},{withCredentials:!0,headers:{"api-key":"e8f5aac1-49b6-4991-ad14-5794e579a911"}})),M=function(){return A.get("")},K=function(t){return A.post("",{title:t})},R=function(t){return A.delete("".concat(t))},_=function(t,e){return A.put("".concat(e),{title:t})},F=[],N=function(t){return{type:"REMOVE_TODOLIST",id:t}},P=function(t){return{type:"ADD-TODOLIST",todolist:t}},H=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}},U=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",id:t,filter:e}},G=function(t){return{type:"SET_TODOLISTS",todolists:t}},V=n(24),W=i.a.memo((function(t){var e=t.title,n=t.changeTitle;console.log("EditableSpan");var c=Object(a.useState)(e),r=Object(u.a)(c,2),i=r[0],o=r[1],s=Object(a.useState)(!1),l=Object(u.a)(s,2),j=l[0],f=l[1],b=function(){n(i),f(!1)};return j?Object(O.jsx)(d.a,{value:i,autoFocus:!0,onBlur:b,onChange:function(t){return o(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&b()}}):Object(O.jsx)("span",{onDoubleClick:function(){return f(!0)},children:e})})),z=n(178),B=n(165),J=n(4),q=L.a.create(Object(C.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/todo-lists"},{withCredentials:!0,headers:{"api-key":"e8f5aac1-49b6-4991-ad14-5794e579a911"}})),Q=function(t){return q.get("".concat(t,"/tasks"))},X=function(t,e){return q.post("".concat(t,"/tasks"),{title:e})},Y=function(t,e){return q.delete("".concat(t,"/tasks/").concat(e))},Z=function(t,e,n){return q.put("".concat(t,"/tasks/").concat(e),n)};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={}));var $={},tt=function(t,e,n){return function(c,r){var a=r().tasks[t].find((function(t){return t.id===e}));if(a){var i=Object(C.a)({deadline:a.deadline,description:a.description,priority:a.priority,startDate:a.startDate,status:a.status,title:a.title},n);Z(t,e,i).then((function(){c(function(t,e,n){return{type:"UPDATE_TASK",taskID:e,todolistID:t,changesForApiModel:n}}(t,e,n))}))}else console.warn("Task not found in state!!??")}},et=n(171),nt=n(170),ct=i.a.memo((function(t){var e=t.todolistID,n=t.taskID;console.log("Task");var r=Object(V.c)((function(t){return t.tasks[e].filter((function(t){return t.id===n}))[0]})),i=Object(V.b)(),o=Object(a.useCallback)((function(t){var r=t.currentTarget.checked?c.Completed:c.New;i(tt(e,n,{status:r}))}),[i,e,n]),s=Object(a.useCallback)((function(t){i(tt(e,n,{title:t}))}),[i,e,n]),l=Object(a.useCallback)((function(){i(function(t,e){return function(n){Y(t,e).then((function(){return n(function(t,e){return{type:"REMOVE-TASK",todolistID:t,id:e}}(t,e))}))}}(e,n))}),[i,e,n]);return Object(O.jsxs)(et.a,{className:r.status===c.Completed?"is-done":"",divider:!0,disableGutters:!0,style:{display:"flex",justifyContent:"space-between",flexDirection:"row",textAlign:"left"},children:[Object(O.jsxs)("div",{style:{fontWeight:"bold"},children:[Object(O.jsx)(nt.a,{size:"small",color:"primary",onChange:o,checked:r.status===c.Completed,style:{marginRight:"15px"}}),r.status===c.Completed?Object(O.jsx)("span",{children:r.title}):Object(O.jsx)(W,{title:r.title,changeTitle:s})]}),Object(O.jsx)(D.a,{onClick:l,children:Object(O.jsx)(B.a,{})})]},n)})),rt=i.a.memo((function(t){console.log("Todolist rendering");var e=Object(V.b)();Object(a.useEffect)((function(){var n;e((n=t.todolistID,function(t){Q(n).then((function(e){return t(function(t,e){return{type:"SET_TASKS",todolistID:t,tasks:e}}(n,e.data.items))}))}))}),[t.todolistID,e]);var n=Object(V.c)((function(e){return e.todolists.filter((function(e){return e.id===t.todolistID}))[0]})),r=Object(V.c)((function(e){return e.tasks[t.todolistID]})),i=Object(a.useMemo)((function(){return function(t,e){switch(t){case"completed":return e.filter((function(t){return t.status===c.Completed}));case"active":return e.filter((function(t){return t.status!==c.Completed}));default:return e}}(n.filter,r).map((function(e){return Object(O.jsx)(ct,{todolistID:t.todolistID,taskID:e.id},e.id)}))}),[t.todolistID,r,n.filter]),o=Object(a.useCallback)((function(n){return e((c=t.todolistID,r=n,function(t){X(c,r).then((function(e){return t({type:"ADD-TASK",task:e.data.data.item})}))}));var c,r}),[e,t.todolistID]),s=Object(a.useCallback)((function(n){e(function(t,e){return function(){var n=Object(g.a)(E.a.mark((function n(c){return E.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,_(t,e);case 3:c(H(e,t)),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),console.log(n.t0);case 9:case"end":return n.stop()}}),n,null,[[0,6]])})));return function(t){return n.apply(this,arguments)}}()}(n,t.todolistID))}),[e,t.todolistID]),l=Object(a.useCallback)((function(){return e(U(t.todolistID,"all"))}),[e,t.todolistID]),u=Object(a.useCallback)((function(){return e(U(t.todolistID,"active"))}),[e,t.todolistID]),d=Object(a.useCallback)((function(){return e(U(t.todolistID,"completed"))}),[e,t.todolistID]);return Object(O.jsxs)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%"},children:[Object(O.jsxs)(T.a,{variant:"h5",align:"center",style:{fontWeight:"bold"},children:[Object(O.jsx)(W,{title:n.title,changeTitle:s}),Object(O.jsx)(D.a,{onClick:function(){return e((n=t.todolistID,function(){var t=Object(g.a)(E.a.mark((function t(e){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,R(n);case 3:e(N(n)),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}()));var n},children:Object(O.jsx)(B.a,{})})]}),Object(O.jsx)(p,{addItem:o}),Object(O.jsx)("ul",{children:i}),Object(O.jsx)("div",{children:Object(O.jsxs)(z.a,{variant:"contained",size:"small",fullWidth:!0,children:[Object(O.jsx)(I.a,{color:"all"===n.filter?"secondary":"primary",onClick:l,children:"All"}),Object(O.jsx)(I.a,{color:"active"===n.filter?"secondary":"primary",onClick:u,children:"Active"}),Object(O.jsx)(I.a,{color:"completed"===n.filter?"secondary":"primary",onClick:d,children:"Completed"})]})})]})})),at=n(167);var it=function(){console.log("App rendering");var t=Object(V.b)();Object(a.useEffect)((function(){t(function(){var t=Object(g.a)(E.a.mark((function t(e){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=e,t.t1=G,t.next=5,M();case 5:t.t2=t.sent.data,t.t3=(0,t.t1)(t.t2),(0,t.t0)(t.t3),t.next=13;break;case 10:t.prev=10,t.t4=t.catch(0),console.log(t.t4);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}())}),[t]);var e=Object(V.c)((function(t){return t.todolists})),n=Object(a.useCallback)((function(e){var n;t((n=e,function(){var t=Object(g.a)(E.a.mark((function t(e){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=e,t.t1=P,t.next=5,K(n);case 5:t.t2=t.sent.data.data.item,t.t3=(0,t.t1)(t.t2),(0,t.t0)(t.t3),t.next=13;break;case 10:t.prev=10,t.t4=t.catch(0),console.log(t.t4);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()))}),[t]),c=Object(a.useMemo)((function(){return e.map((function(t){return Object(O.jsx)(h.a,{item:!0,children:Object(O.jsx)(x.a,{elevation:20,style:{padding:"15px",minWidth:"300px",minHeight:"100px"},children:Object(O.jsx)(rt,{todolistID:t.id},t.id)})},t.id)}))}),[e]);return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(v.a,{position:"static",children:Object(O.jsxs)(m.a,{style:{justifyContent:"space-between"},children:[Object(O.jsx)(D.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(O.jsx)(at.a,{})}),Object(O.jsx)(T.a,{variant:"h6",children:"Todolists"}),Object(O.jsx)(I.a,{color:"inherit",variant:"outlined",children:"Login"})]})}),Object(O.jsxs)(k.a,{fixed:!0,children:[Object(O.jsx)(h.a,{container:!0,justifyContent:"center",style:{padding:"15px"},children:Object(O.jsx)(h.a,{item:!0,children:Object(O.jsx)(p,{addItem:n})})}),Object(O.jsx)(h.a,{container:!0,spacing:5,justifyContent:"center",children:c})]})]})},ot=n(56),st=n(85),lt=Object(ot.b)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE_TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":var n=e.todolist,c=Object(C.a)(Object(C.a)({},n),{},{filter:"all"});return[c].concat(Object(y.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(C.a)(Object(C.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(C.a)(Object(C.a)({},t),{},{filter:e.filter}):t}));case"SET_TODOLISTS":return e.todolists.map((function(t){return Object(C.a)(Object(C.a)({},t),{},{filter:"all"})}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_TASKS":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.todolistID,e.tasks));case"REMOVE-TASK":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.todolistID,t[e.todolistID].filter((function(t){return t.id!==e.id}))));case"ADD-TASK":var n=Object(C.a)({},t),c=Object(C.a)({},t)[e.task.todoListId],r=[e.task].concat(Object(y.a)(c));return n[e.task.todoListId]=r,n;case"UPDATE_TASK":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.todolistID,t[e.todolistID].map((function(t){return t.id===e.taskID?Object(C.a)(Object(C.a)({},t),e.changesForApiModel):t}))));case"ADD-TODOLIST":return Object(C.a)(Object(C.a)({},t),{},Object(J.a)({},e.todolist.id,[]));case"REMOVE_TODOLIST":var a=Object(C.a)({},t);return delete a[e.id],a;case"SET_TODOLISTS":var i=Object(C.a)({},t);return e.todolists.forEach((function(t){i[t.id]=[]})),i;default:return t}}}),ut=Object(ot.c)(lt,Object(ot.a)(st.a));window.store=ut,s.a.render(Object(O.jsx)(V.a,{store:ut,children:Object(O.jsx)(it,{})}),document.getElementById("root")),l()},97:function(t,e,n){},98:function(t,e,n){}},[[128,1,2]]]);
//# sourceMappingURL=main.db21f8b4.chunk.js.map