(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[65],{"6VBw":function(e,n,t){"use strict";var a=t("ODXe"),r=t("rePB"),o=t("Ff2n"),c=t("q1tI"),i=t.n(c),l=t("TSYQ"),s=t.n(l),u=t("VTBJ"),m=t("U8pU"),d=t("HXN9"),p=t("Kwbf"),y=t("Gu+u");function f(e,n){Object(p["a"])(e,"[@ant-design/icons] ".concat(n))}function b(e){return"object"===Object(m["a"])(e)&&"string"===typeof e.name&&"string"===typeof e.theme&&("object"===Object(m["a"])(e.icon)||"function"===typeof e.icon)}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce((function(n,t){var a=e[t];switch(t){case"class":n.className=a,delete n.class;break;default:n[t]=a}return n}),{})}function v(e,n,t){return t?i.a.createElement(e.tag,Object(u["a"])(Object(u["a"])({key:n},g(e.attrs)),t),(e.children||[]).map((function(t,a){return v(t,"".concat(n,"-").concat(e.tag,"-").concat(a))}))):i.a.createElement(e.tag,Object(u["a"])({key:n},g(e.attrs)),(e.children||[]).map((function(t,a){return v(t,"".concat(n,"-").concat(e.tag,"-").concat(a))})))}function h(e){return Object(d["generate"])(e)[0]}function C(e){return e?Array.isArray(e)?e:[e]:[]}var w="\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n",O=!1,k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w;Object(c["useEffect"])((function(){O||(Object(y["insertCss"])(e,{prepend:!0}),O=!0)}),[])},j={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function E(e){var n=e.primaryColor,t=e.secondaryColor;j.primaryColor=n,j.secondaryColor=t||h(n),j.calculated=!!t}function x(){return Object(u["a"])({},j)}var N=function(e){var n=e.icon,t=e.className,a=e.onClick,r=e.style,c=e.primaryColor,i=e.secondaryColor,l=Object(o["a"])(e,["icon","className","onClick","style","primaryColor","secondaryColor"]),s=j;if(c&&(s={primaryColor:c,secondaryColor:i||h(c)}),k(),f(b(n),"icon should be icon definiton, but got ".concat(n)),!b(n))return null;var m=n;return m&&"function"===typeof m.icon&&(m=Object(u["a"])(Object(u["a"])({},m),{},{icon:m.icon(s.primaryColor,s.secondaryColor)})),v(m.icon,"svg-".concat(m.name),Object(u["a"])({className:t,onClick:a,style:r,"data-icon":m.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},l))};N.displayName="IconReact",N.getTwoToneColors=x,N.setTwoToneColors=E;var T=N;function I(e){var n=C(e),t=Object(a["a"])(n,2),r=t[0],o=t[1];return T.setTwoToneColors({primaryColor:r,secondaryColor:o})}function S(){var e=T.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor}I("#1890ff");var z=c["forwardRef"]((function(e,n){var t=e.className,i=e.icon,l=e.spin,u=e.rotate,m=e.tabIndex,d=e.onClick,p=e.twoToneColor,y=Object(o["a"])(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),f=s()("anticon",Object(r["a"])({},"anticon-".concat(i.name),Boolean(i.name)),t),b=s()({"anticon-spin":!!l||"loading"===i.name}),g=m;void 0===g&&d&&(g=-1);var v=u?{msTransform:"rotate(".concat(u,"deg)"),transform:"rotate(".concat(u,"deg)")}:void 0,h=C(p),w=Object(a["a"])(h,2),O=w[0],k=w[1];return c["createElement"]("span",Object.assign({role:"img","aria-label":i.name},y,{ref:n,tabIndex:g,onClick:d,className:f}),c["createElement"](T,{className:b,icon:i,primaryColor:O,secondaryColor:k,style:v}))}));z.displayName="AntdIcon",z.getTwoToneColor=S,z.setTwoToneColor=I;n["a"]=z},Llbl:function(e,n,t){"use strict";var a=t("q1tI"),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"up-circle",theme:"outlined"},o=r,c=t("6VBw"),i=function(e,n){return a["createElement"](c["a"],Object.assign({},e,{ref:n,icon:o}))};i.displayName="UpCircleOutlined";n["a"]=a["forwardRef"](i)},oGXw:function(e,n,t){"use strict";t.r(n);t("qNb/");var a=t("PArb"),r=(t("Y2jk"),t("zeV3")),o=(t("Jmwx"),t("BMrR")),c=(t("rO+z"),t("kPKH")),i=(t("L/Qf"),t("2/Rp")),l=t("WmNS"),s=t.n(l),u=(t("8/o9"),t("tsqr")),m=t("9og8"),d=t("k1fw"),p=t("tJVT"),y=t("q1tI"),f=t.n(y),b={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M676.4 528.95L293.2 829.97c-14.25 11.2-35.2 1.1-35.2-16.95V210.97c0-18.05 20.95-28.14 35.2-16.94l383.2 301.02a21.53 21.53 0 010 33.9M694 864h64a8 8 0 008-8V168a8 8 0 00-8-8h-64a8 8 0 00-8 8v688a8 8 0 008 8"}}]},name:"step-forward",theme:"outlined"},g=b,v=t("6VBw"),h=function(e,n){return y["createElement"](v["a"],Object.assign({},e,{ref:n,icon:g}))};h.displayName="StepForwardOutlined";var C=y["forwardRef"](h),w=t("Llbl"),O=t("+QRC"),k=t.n(O),j=t("/7QA"),E=(t("EpIQ"),t("bx4M")),x=t("ovOe"),N=t.n(x),T=e=>{var n=e.actions,t=e.json,l=Object(y["useState"])(!1),s=Object(p["a"])(l,2),u=s[0],m=s[1];return f.a.createElement(f.a.Fragment,null,f.a.createElement(a["a"],{dashed:!0}),f.a.createElement(o["a"],null,f.a.createElement(c["a"],{span:24},f.a.createElement(o["a"],{justify:"space-between"},f.a.createElement(c["a"],null,f.a.createElement(i["a"],{disabled:!t,onClick:()=>{m(!u)}},u?"\u9690\u85cf":"\u663e\u793a"," JSON")),f.a.createElement(c["a"],null,f.a.createElement(r["b"],null,n.map(e=>f.a.createElement(i["a"],{key:e.text,type:e.type,onClick:e.onClick},e.text)))))),u?f.a.createElement(c["a"],{span:24},f.a.createElement(E["a"],null,f.a.createElement(N.a,{name:"Sketch JSON",src:t||{}}))):null))},I=T,S=e=>e.replace(/\b(\w)(\w*)/g,(function(e,n,t){return n.toUpperCase()+t.toLowerCase()})),z=e=>{var n=e.content,t=e.component,a=e.size,r=e.type,o=e.contentIndex,c=e.componentIndex,i=e.sizeIndex,l=e.typeIndex,s=e.suffix,u=e.symbolName;if(u)return u;var m=o+"."+S(n),d=c+"."+S(t),p=i+"."+S(a),y=l+"."+S(r);return"".concat(m,"/").concat(d,"/").concat(p,"/").concat(y).concat(s||"")},B=()=>{var e=Object(y["useState"])(),n=Object(p["a"])(e,2),t=n[0],l=n[1],b="LEFT_TO_RIGHT",g=[{type:"default"},{type:"primary"},{type:"disabled"},{type:"dashed"},{type:"ghost"},{type:"default",icon:f.a.createElement(C,null)},{type:"primary",icon:f.a.createElement(w["a"],null)},{type:"text"},{type:"link"},{type:"primary",danger:!0},{type:"default",danger:!0},{type:"dashed",danger:!0},{type:"text",danger:!0}],v=[g.map(e=>Object(d["a"])(Object(d["a"])({},e),{},{size:"default"})),g.map(e=>Object(d["a"])(Object(d["a"])({},e),{},{size:"small"})),g.map(e=>Object(d["a"])(Object(d["a"])({},e),{},{size:"large"}))],h=function(){var e=Object(m["a"])(s.a.mark((function e(n){var t,a,r,o,c;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:e.prev=0,t=document.getElementsByClassName("button"),a=[],r=Array.from(t),o=0;case 5:if(!(o<r.length)){e.next=13;break}return e.next=8,n(r[o]);case 8:c=e.sent,a.push(c);case 10:o++,e.next=5;break;case 13:console.log("-------\u8f6c\u6362\u7ed3\u675f--------"),console.log(a),k()(JSON.stringify(a)),u["b"].success("\u8f6c\u6362\u6210\u529f\ud83c\udf89\u5df2\u590d\u5236\u5230\u526a\u5207\u677f"),l(a),e.next=24;break;case 20:e.prev=20,e.t0=e["catch"](0),u["b"].error("\u89e3\u6790\u5931\u8d25,\u914d\u7f6e\u9879\u53ef\u80fd\u5b58\u5728\u9519\u8bef!"),console.error(e.t0);case 24:case"end":return e.stop()}}),e,null,[[0,20]])})));return function(n){return e.apply(this,arguments)}}(),O=[{text:"\u8f6c\u6362\u4e3a Group",type:"default",onClick:()=>{h(function(){var e=Object(m["a"])(s.a.mark((function e(n){return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(j["nodeToGroup"])(n);case 2:return e.abrupt("return",e.sent.toSketchJSON());case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}},{text:"\u8f6c\u6362\u4e3a Symbol",type:"primary",onClick:()=>{h(function(){var e=Object(m["a"])(s.a.mark((function e(n){var t,a;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.getAttribute("layout"),e.next=3,Object(j["nodeToSketchSymbol"])(n,{symbolLayout:t||void 0,handleSymbol:e=>{e.name=n.getAttribute("symbol-name")||"symbol";var t=e=>{var n;e.layers&&e.layers.forEach(t),(null===e||void 0===e||null===(n=e.name)||void 0===n?void 0:n.includes("ant-btn"))&&(e.name="\u80cc\u666f")};e.layers.forEach(t)}});case 3:return a=e.sent,e.abrupt("return",a.toSketchJSON());case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}],E=["\u9ed8\u8ba4","\u5c0f","\u5927"];return f.a.createElement("div",null,f.a.createElement(o["a"],null,v.map((e,n)=>f.a.createElement(y["Fragment"],{key:n},f.a.createElement(c["a"],{key:n},f.a.createElement(r["b"],{align:"start"},f.a.createElement("div",{style:{width:32}},E[n]),f.a.createElement(o["a"],{gutter:[8,12]},e.map((e,t)=>{var a=e.type,r=e.size,o=e.danger,l=e.icon;return f.a.createElement(c["a"],{key:t},f.a.createElement(i["a"],{className:"button",icon:l,"symbol-name":z({type:a,size:r,typeIndex:t+1,sizeIndex:n+1,component:"button",componentIndex:1,content:"general",contentIndex:1,suffix:o?"-Danger":void 0}),layout:b,type:a,danger:o,disabled:"disabled"===a,size:r},"\u6587\u672c"))})))),n===v.length-1?null:f.a.createElement(a["a"],{dashed:!0})))),f.a.createElement(I,{json:t,actions:O}))};n["default"]=B}}]);