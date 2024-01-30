(function(){"use strict";var t={8968:function(t,e,i){var s=i(7195),n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"overflow-hidden vh-100 vw-100 d-flex flex-column",attrs:{id:"app"}},[e("div",{staticClass:"p-2 bg-dark-subtle",staticStyle:{"font-size":"30px"}},[t._v("ESPHome Display configurator")]),e("UiEditor",{attrs:{msg:"Welcome to Your Vue.js App"}}),t._m(0)],1)},o=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"p-4"},[t._v("rzeiler @ 2024 | "),e("a",{attrs:{href:"https://esphome.io/components/display/",title:"Display Component"}},[t._v("esphome")])])}],a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex align-items-stretch overflow-hidden",attrs:{id:"uieditor"},on:{click:t.buildCode}},[e("div",{staticClass:"bg-primary-subtle d-flex flex-column"},[e("button",{staticClass:"btn btn-primary m-2",on:{click:t.addLabel}},[e("span",{staticClass:"mdi mdi-format-text"})]),e("button",{staticClass:"btn btn-primary m-2",on:{click:function(e){t.addFont=!0}}},[e("span",{staticClass:"mdi mdi-format-font"})])]),e("div",{staticClass:"bg-body-tertiary d-flex flex-column"},[e("div",{staticClass:"p-4"},[e("h6",{staticClass:"ps-2"},[t._v("Display Size")]),e("div",{staticClass:"input-group mb-3"},[e("span",{staticClass:"input-group-text"},[t._v("Width")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.display.width,expression:"display.width"}],staticClass:"form-control",attrs:{type:"number",placeholder:"128"},domProps:{value:t.display.width},on:{input:function(e){e.target.composing||t.$set(t.display,"width",e.target.value)}}})]),e("div",{staticClass:"input-group mb-3"},[e("span",{staticClass:"input-group-text"},[t._v("Height")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.display.height,expression:"display.height"}],staticClass:"form-control",attrs:{type:"number",placeholder:"64"},domProps:{value:t.display.height},on:{input:function(e){e.target.composing||t.$set(t.display,"height",e.target.value)}}})])]),e("div",{staticClass:"board shadow align-self-center",staticStyle:{scale:"2"}},[e("div",{ref:"display",style:{width:t.display.width+"px",height:t.display.height+"px"},attrs:{id:"display"}},t._l(t.label,(function(i){return e("label",{key:i.id,style:{left:i.left+"px",top:i.top+"px","font-size":i.font.size+"px","font-family":i.font.name}},[t._v(" "+t._s(i.text)+" ")])})),0),e("div",{staticClass:"hole position-absolute top-0 start-0 rounded-circle"}),e("div",{staticClass:"hole position-absolute top-0 end-0 rounded-circle"}),e("div",{staticClass:"hole position-absolute bottom-0 start-0 rounded-circle"}),e("div",{staticClass:"hole position-absolute bottom-0 end-0 rounded-circle"}),e("div",{staticClass:"line position-absolute bottom-0 end-50"})])]),e("div",{staticClass:"d-flex flex-column flex-grow-1"},[e("div",{staticClass:"bg-secondary-subtle flex-grow-1 d-flex flex-column overflow-auto"},[e("div",{staticClass:"p-4 flex-grow-1"},[t._l(t.label,(function(i){return e("div",{key:i.id,staticClass:"input-group mb-3"},[e("span",{staticClass:"input-group-text"},[t._v("Text")]),e("input",{directives:[{name:"model",rawName:"v-model",value:i.text,expression:"item.text"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Hello world","aria-label":"Text","aria-describedby":"Text"},domProps:{value:i.text},on:{input:function(e){e.target.composing||t.$set(i,"text",e.target.value)}}}),e("span",{staticClass:"input-group-text"},[t._v("Top")]),e("input",{directives:[{name:"model",rawName:"v-model",value:i.top,expression:"item.top"}],staticClass:"form-control",attrs:{type:"number",min:"0",max:i.maxHeight},domProps:{value:i.top},on:{input:function(e){e.target.composing||t.$set(i,"top",e.target.value)}}}),e("span",{staticClass:"input-group-text"},[t._v("Left")]),e("input",{directives:[{name:"model",rawName:"v-model",value:i.left,expression:"item.left"}],staticClass:"form-control",attrs:{type:"number",min:"0",max:i.maxWidth},domProps:{value:i.left},on:{input:function(e){e.target.composing||t.$set(i,"left",e.target.value)}}}),e("button",{staticClass:"btn btn-light",staticStyle:{"z-index":"unset"},on:{click:function(e){t.choosFont=i}}},[t._v(" "+t._s(i.font.name)+" ")]),e("button",{staticClass:"btn btn-danger",staticStyle:{"z-index":"unset"},on:{click:function(e){return t.remove(i.id)}}},[e("span",{staticClass:"mdi mdi-trash-can-outline me-1"}),t._v("Remove")])])})),t._l(t.fonts,(function(i){return e("div",{key:i.id,staticClass:"input-group mb-3"},[e("span",{staticClass:"input-group-text"},[t._v(t._s(i.name))]),e("input",{directives:[{name:"model",rawName:"v-model",value:i.size,expression:"font.size"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:i.size},on:{input:function(e){e.target.composing||t.$set(i,"size",e.target.value)}}}),e("button",{staticClass:"btn btn-danger",staticStyle:{"z-index":"unset"},on:{click:function(e){return t.removeFont(i)}}},[e("span",{staticClass:"mdi mdi-trash-can-outline me-1"}),t._v("Remove")])])}))],2)]),e("pre",{staticClass:"p-4 bg-dark text-white m-0",domProps:{innerHTML:t._s(t.code)}}),t.choosFont?e("div",{staticClass:"position-absolute d-flex justify-content-center align-items-center top-0 start-0 vh-100 vw-100 bg-body-secondary",staticStyle:{"--bs-bg-opacity":".5"},on:{click:function(e){t.choosFont=!1}}},[e("div",{staticClass:"list-group"},t._l(t.fonts,(function(i){return e("button",{key:i.id,staticClass:"list-group-item list-group-item-action",attrs:{type:"button"},on:{click:function(e){return t.changeFont(i)}}},[t._v(t._s(i.name))])})),0)]):t._e(),t.addFont?e("div",{staticClass:"position-absolute d-flex justify-content-center align-items-center top-0 start-0 vh-100 vw-100 bg-body-secondary",staticStyle:{"--bs-bg-opacity":".5"}},[e("div",{staticClass:"bg-white shadow p-0 rounded"},[e("button",{staticClass:"btn-close m-1",staticStyle:{float:"right"},attrs:{type:"button","aria-label":"Close"},on:{click:function(e){t.addFont=!1}}}),e("div",{staticClass:"input-group m-4",staticStyle:{width:"700px"}},[e("span",{staticClass:"input-group-text"},[t._v("Google Font")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.fontData.name,expression:"fontData.name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Roboto, Montserrat, Raleway,Open Sans...","aria-label":"Text","aria-describedby":"Text"},domProps:{value:t.fontData.name},on:{input:function(e){e.target.composing||t.$set(t.fontData,"name",e.target.value)}}}),e("span",{staticClass:"input-group-text"},[t._v("Size")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.fontData.size,expression:"fontData.size"}],staticClass:"form-control",attrs:{type:"number",value:"10",min:"0",max:"30"},domProps:{value:t.fontData.size},on:{input:function(e){e.target.composing||t.$set(t.fontData,"size",e.target.value)}}}),e("button",{staticClass:"btn btn-danger",staticStyle:{"z-index":"unset"},on:{click:t.addNewFont}},[e("span",{staticClass:"mdi mdi-check me-1"}),t._v("Add")])])])]):t._e()])])},l=[],r=(i(560),{name:"UiEditor",data:function(){return{label:[],fonts:[],choosFont:null,addFont:!1,fontData:{name:"",size:10},code:"",display:{width:128,height:64}}},mounted(){this.fontData={name:"Open+Sans",size:15},this.addNewFont(),this.addLabel()},methods:{changeFont(t){this.choosFont.font=t,this.choosFont=null},removeFont(t){this.fonts=this.fonts.filter((e=>e!==t))},buildCode(){this.code="# Example configuration entry Font ",this.code+="\nfont:",this.fonts.forEach((t=>{this.code+=`\n  - file: "gfonts://${t.name}"`,this.code+=`\n    id: ${t.id}`,this.code+=`\n    size: ${t.size}`})),this.code+="\n\n# Example configuration entry Display ",this.code+="\ndisplay:",this.code+="\n  - platform: ssd1306_i2c",this.code+="\n    id: olde",this.code+="\n    reset_pin: GPIO1 # D0",this.code+="\n    address: 0x3C",this.code+="\n    lambda: |-",this.label.forEach((t=>{this.code+=`\n      it.printf(${t.left},${t.top}, id(${t.font.id}), "${t.text}");`}))},addNewFont(){this.fonts.push({name:this.fontData.name,size:this.fontData.size,id:"font"+this.fonts.length});let t=this.fonts[this.fonts.length-1],e=document.createElement("link");e.id=t.id,e.rel="stylesheet",e.href=`https://fonts.googleapis.com/css2?family=${t.name}`,document.head.appendChild(e),this.buildCode()},remove(t){this.label=this.label.filter((e=>e.id!==t))},addLabel(){this.label.push({top:0,left:0,text:"Hello World",id:this.label.length,font:this.fonts[0],maxWidth:128,maxHeight:64}),this.buildCode()}}}),c=r,d=i(1001),u=(0,d.Z)(c,a,l,!1,null,"44a7177e",null),p=u.exports,m={name:"App",components:{UiEditor:p}},f=m,h=(0,d.Z)(f,n,o,!1,null,null,null),v=h.exports;s.ZP.config.productionTip=!1,new s.ZP({render:t=>t(v)}).$mount("#app")}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}i.m=t,function(){var t=[];i.O=function(e,s,n,o){if(!s){var a=1/0;for(d=0;d<t.length;d++){s=t[d][0],n=t[d][1],o=t[d][2];for(var l=!0,r=0;r<s.length;r++)(!1&o||a>=o)&&Object.keys(i.O).every((function(t){return i.O[t](s[r])}))?s.splice(r--,1):(l=!1,o<a&&(a=o));if(l){t.splice(d--,1);var c=n();void 0!==c&&(e=c)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[s,n,o]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,o,a=s[0],l=s[1],r=s[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(n in l)i.o(l,n)&&(i.m[n]=l[n]);if(r)var d=r(i)}for(e&&e(s);c<a.length;c++)o=a[c],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(d)},s=self["webpackChunkesphome_display_configurator"]=self["webpackChunkesphome_display_configurator"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(8968)}));s=i.O(s)})();
//# sourceMappingURL=app.e602abd9.js.map