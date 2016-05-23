webpackJsonp([1,0],[function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var l=o(2),n=r(l),c=o(16),s=r(c);new n["default"]({el:"body",components:{App:s["default"]}})},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function l(e){try{return"="===e[0]}catch(t){return!1}}function n(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",o=e[0].toUpperCase(),r=e.substring(1),l=1*r-1,n=t.indexOf(o);return{row:l,col:n}}function c(e,t,o){var r=n(t),l=n(o);if(r.row>l.row){var c=r.row;r.row=l.row,l=c}if(r.col>l.col){var s=r.col;r.col=l.col,l=s}for(var a=[],u=r.row;u<=l.row;u++)for(var i=r.col;i<=l.col;i++)a.push(e.cells[u][i]);return a}function s(e,t){var o=/=([^\(]+)\(([^\)]+)\)/gi,r=o.exec(t);try{var l=r[1].toUpperCase(),n=r[2],s=n.split(":"),u=c(e,s[0],s[1]);if("SUM"===l){for(var i=0,f=0;f<u.length;f++){var d=u[f];i+=1*a(e,d.row,d.col)}return i}if("MAX"===l){for(var p=Number.NEGATIVE_INFINITY,v=0;v<u.length;v++){var h=u[v],x=1*a(e,h.row,h.col);x>p&&(p=x)}return p}if("MIN"===l){for(var _=Number.POSITIVE_INFINITY,w=0;w<u.length;w++){var m=u[w],b=1*a(e,m.row,m.col);_>b&&(_=b)}return _}return"UNDEF"}catch(g){return"err"}}function a(e,t,o){var r=e.cells[t][o].content,n=l(r);return n?s(e,r):e.cells[t][o].content}function u(e){var t=e.row+"_"+e.col,o="/cells/"+t;h.database().ref(o).set(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.isFormula=l,t.getValue=a,t.save=u;var i=o(9),f=r(i),d=o(11),p=r(d),v={apiKey:"AIzaSyCV75QBr8hleUZ2rQ-uOx1NyE8q2Rn1uXo",authDomain:"cf-excel.firebaseapp.com",databaseURL:"https://cf-excel.firebaseio.com",storageBucket:""},h=f["default"].initializeApp(v),x={cells:[]};h.database().ref("/cells").once("value",function(e){try{var t=e.val();for(var o in t){var r=t[o];(r.row>=x.cells.length||!x.cells[r.row])&&x.cells.$set(r.row,[]),x.cells[r.row].$set(r.col,r)}console.log("completed")}catch(l){console.error(l),console.error(r)}}),h.database().ref("/cells").on("child_changed",function(e,t){var o=e.val();o.content||(o.content=""),console.log("Before assign:",(new Date).getTime()),p["default"].assign(x.cells[o.row][o.col],o),console.log("After assign:",(new Date).getTime())}),t["default"]=x},,function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var l=o(18),n=r(l),c=o(1),s=r(c);t["default"]={data:function(){return{data:s["default"]}},components:{Worksheet:n["default"]}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(12),l=o(1);t["default"]={props:["cell","worksheet"],data:function(){return{focus:!1}},computed:{cellStyle:function(){return{textAlign:isNaN(this.value)?"left":"right",fontWeight:(0,l.isFormula)(this.cell.content)?"bold":"normal",color:(0,l.isFormula)(this.cell.content)?"#000":"auto"}},value:function(){return(0,l.getValue)(this.worksheet,this.cell.row,this.cell.col)}},methods:{onFocus:function(){this.focus=!0},onBlur:function(){this.focus=!1,(0,l.save)(this.cell)}},directives:{focus:r.focus}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var l=o(17),n=r(l);t["default"]={components:{Cell:n["default"]},props:["data"],data:function(){return this.data},created:function(){},computed:{},methods:{getColName:function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ";return t[e]},getRowName:function(e){return e+1}}}},function(e,t){},function(e,t){},function(e,t){},,,,,function(e,t){e.exports="<div id=app> <h1>CF Excel</h1> <p>This is a test excel-like app. Supported formulas:</p> <ul> <li>= SUM(B5:C6)</li> <li>= MIN(B5:C6)</li> <li>= MAX(B5:C6)</li> </ul> <worksheet :data=data></worksheet> </div>"},function(e,t){e.exports='<div v-on:click=onFocus v-bind:style=[cellStyle] class=text _v-5e3aac2f="">{{ value }}</div> <input v-focus=focus v-on:blur=onBlur v-show=focus v-el=input type=text v-model=cell.content _v-5e3aac2f="">'},function(e,t){e.exports='<div class=hello _v-7f89271e=""> <h1 _v-7f89271e="">{{ name }}</h1> </div> <table _v-7f89271e=""> <thead _v-7f89271e=""> <tr _v-7f89271e=""> <th class=col-label _v-7f89271e=""> </th> <th class=col-label v-for="(index, col) in cells[0]" _v-7f89271e=""> {{ getColName(index) }} </th> </tr> </thead> <tbody _v-7f89271e=""> <tr v-for="(index, row) in cells" _v-7f89271e=""> <td class=row-label _v-7f89271e="">{{ getRowName(index) }}</td> <td v-for="cell in row" _v-7f89271e=""> <cell :worksheet=data :cell=cell _v-7f89271e=""></cell> </td> </tr> </tbody> </table>'},function(e,t,o){var r,l;o(6),r=o(3),l=o(13),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),l&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=l)},function(e,t,o){var r,l;o(7),r=o(4),l=o(14),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),l&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=l)},function(e,t,o){var r,l;o(8),r=o(5),l=o(15),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports["default"]),l&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=l)}]);
//# sourceMappingURL=app.00f9ab690ab4d9f9c5cf.js.map