/*!
 * Polyfills the querySelector and querySelectorAll methods.
 * @see https://gist.github.com/Fusselwurm/4673695
 * @see {@link https://github.com/cobbdb/polyfill-queryselector/blob/master/querySelector.js}
 * IE8 needs that
 */
(function(){var style;var select=function(selector,maxCount){var all=document.all,l=all.length,i,resultSet=[];style.addRule(selector,"foo:bar");for(i=0;i<l;i+=1){if(all[i].currentStyle.foo==="bar"){resultSet.push(all[i]);if(resultSet.length>maxCount){break;}}}style.removeRule(0);return resultSet;};if(document.querySelectorAll||document.querySelector){return;}style=document.createStyleSheet();document.querySelectorAll=document.body.querySelectorAll=function(selector){return select(selector,Infinity);};document.querySelector=document.body.querySelector=function(selector){return select(selector,1)[0]||null;};}());
/*!
 * Implementation of standard Array methods (introduced in ECMAScript 5th
 * edition) and shorthand generics (JavaScript 1.8.5)
 *
 * Copyright (c) 2013 Alex K @plusdude
 * @see {@link http://opensource.org/licenses/MIT}
 * @see {@link https://github.com/plusdude/array-generics/blob/master/array.generics.js}
 * IE9 needs that
 */
/* jshint bitwise: false */
(function(global,infinity,undefined){"use strict";var Array=global.Array;var Object=global.Object;var Math=global.Math;var Number=global.Number;function toInteger(value){var number;number=Number(value);return(number!==number?0:0===number||infinity===number||-infinity===number?number:(0<number||-1)*Math.floor(Math.abs(number)));}function slice(begin,end){var result,elements,length,index,count;elements=Object(this);length=elements.length>>>0;if(undefined!==begin){begin=toInteger(begin);index=0>begin?Math.max(length+begin,0):Math.min(begin,length);}else{index=0;}if(undefined!==end){end=toInteger(end);length=0>end?Math.max(length+end,0):Math.min(end,length);}result=new Array(length-index);for(count=0;index<length;++index,++count){if(index in elements){result[count]=elements[index];}}return result;}function indexOf(target,begin){var elements,length,index;elements=Object(this);length=elements.length>>>0;if(undefined!==begin){begin=toInteger(begin);index=0>begin?Math.max(length+begin,0):Math.min(begin,length);}else{index=0;}for(;index<length;++index){if(index in elements&&target===elements[index]){return index;}}return-1;}function lastIndexOf(target,begin){var elements,length,index;elements=Object(this);length=elements.length>>>0;if(undefined!==begin){begin=toInteger(begin);index=0>begin?length-Math.abs(begin):Math.min(begin,length-1);}else{index=length-1;}for(;-1<index;--index){if(index in elements&&target===elements[index]){return index;}}return-1;}function forEach(callback,scope){var elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements){callback.call(scope,elements[index],index,elements);}}}function every(callback,scope){var elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements&&!callback.call(scope,elements[index],index,elements)){return false;}}return true;}function some(callback,scope){var elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements&&callback.call(scope,elements[index],index,elements)){return true;}}return false;}function filter(callback,scope){var result=[],elements,length,index,count;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=count=0;index<length;++index){if(index in elements&&callback.call(scope,elements[index],index,elements)){result[count++]=elements[index];}}return result;}function map(callback,scope){var result=[],elements,length,index;elements=Object(this);requireFunction(callback);length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements){result[index]=callback.call(scope,elements[index],index,elements);}}return result;}function reduce(callback,value){var elements,isset,length,index;elements=Object(this);requireFunction(callback);isset=undefined!==value;length=elements.length>>>0;for(index=0;index<length;++index){if(index in elements){if(isset){value=callback(value,elements[index],index,elements);}else{value=elements[index];isset=true;}}}requireValue(isset);return value;}function reduceRight(callback,value){var elements,isset,index;elements=Object(this);requireFunction(callback);isset=undefined!==value;index=(elements.length>>>0)-1;for(;-1<index;--index){if(index in elements){if(isset){value=callback(value,elements[index],index,elements);}else{value=elements[index];isset=true;}}}requireValue(isset);return value;}function isArray(value){return"[object Array]"===Object.prototype.toString.call(value);}function requireFunction(value){if("[object Function]"!==Object.prototype.toString.call(value)){throw new Error(value+" is not a function");}}function requireValue(isset){if(!isset){throw new Error("reduce of empty array with no initial value");}}function supportsStandard(key){var support=true;if(Array.prototype[key]){try{Array.prototype[key].call(undefined,/test/,null);support=false;}catch(e){}}else{support=false;}return support;}function supportsGeneric(key){var support=true;if(Array[key]){try{Array[key](undefined,/test/,null);support=false;}catch(e){}}else{support=false;}return support;}function extendArray(key){if(!supportsGeneric(key)){Array[key]=createGeneric(key);}}function createGeneric(key){return function(elements){var list;if(undefined===elements||null===elements){throw new Error("Array.prototype."+key+" called on "+elements);}list=Array.prototype.slice.call(arguments,1);return Array.prototype[key].apply(elements,list);};}var ES5={"indexOf":indexOf,"lastIndexOf":lastIndexOf,"forEach":forEach,"every":every,"some":some,"filter":filter,"map":map,"reduce":reduce,"reduceRight":reduceRight};for(var key in ES5){if(ES5.hasOwnProperty(key)){if(!supportsStandard(key)){Array.prototype[key]=ES5[key];}extendArray(key);}}Array.isArray=Array.isArray||isArray;["concat","join","slice","pop","push","reverse","shift","sort","splice","unshift"].forEach(extendArray);if(document){try{Array.slice(document.childNodes);}catch(e){Array.prototype.slice=slice;}}}(typeof self!=='undefined'?self:this,1/0));
/* jshint bitwise: true */
/*!
 * Lightweight ES6 Promise polyfill for the browser and node. A+ Compliant
 * @see {@link https://github.com/taylorhakes/promise-polyfill/blob/master/promise.js}
 * IE11 needs that
 */
(function(root){"use strict";var setTimeoutFunc=setTimeout;function noop(){}function bind(fn,thisArg){return function(){fn.apply(thisArg,arguments);};}function Promise(fn){if(typeof this!=='object')throw new TypeError('Promises must be constructed via new');if(typeof fn!=='function')throw new TypeError('not a function');this._state=0;this._handled=false;this._value=undefined;this._deferreds=[];doResolve(fn,this);}function handle(self,deferred){while(self._state===3){self=self._value;}if(self._state===0){self._deferreds.push(deferred);return;}self._handled=true;Promise._immediateFn(function(){var cb=self._state===1?deferred.onFulfilled:deferred.onRejected;if(cb===null){(self._state===1?resolve:reject)(deferred.promise,self._value);return;}var ret;try{ret=cb(self._value);}catch(e){reject(deferred.promise,e);return;}resolve(deferred.promise,ret);});}function resolve(self,newValue){try{if(newValue===self)throw new TypeError('A promise cannot be resolved with itself.');if(newValue&&(typeof newValue==='object'||typeof newValue==='function')){var then=newValue.then;if(newValue instanceof Promise){self._state=3;self._value=newValue;finale(self);return;}else if(typeof then==='function'){doResolve(bind(then,newValue),self);return;}}self._state=1;self._value=newValue;finale(self);}catch(e){reject(self,e);}}function reject(self,newValue){self._state=2;self._value=newValue;finale(self);}function finale(self){if(self._state===2&&self._deferreds.length===0){Promise._immediateFn(function(){if(!self._handled){Promise._unhandledRejectionFn(self._value);}});}for(var i=0,len=self._deferreds.length;i<len;i++){handle(self,self._deferreds[i]);}self._deferreds=null;}function Handler(onFulfilled,onRejected,promise){this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;this.onRejected=typeof onRejected==='function'?onRejected:null;this.promise=promise;}function doResolve(fn,self){var done=false;try{fn(function(value){if(done)return;done=true;resolve(self,value);},function(reason){if(done)return;done=true;reject(self,reason);});}catch(ex){if(done)return;done=true;reject(self,ex);}}Promise.prototype['catch']=function(onRejected){return this.then(null,onRejected);};Promise.prototype.then=function(onFulfilled,onRejected){var prom=new(this.constructor)(noop);handle(this,new Handler(onFulfilled,onRejected,prom));return prom;};Promise.all=function(arr){var args=Array.prototype.slice.call(arr);return new Promise(function(resolve,reject){if(args.length===0)return resolve([]);var remaining=args.length;function res(i,val){try{if(val&&(typeof val==='object'||typeof val==='function')){var then=val.then;if(typeof then==='function'){then.call(val,function(val){res(i,val);},reject);return;}}args[i]=val;if(--remaining===0){resolve(args);}}catch(ex){reject(ex);}}for(var i=0;i<args.length;i++){res(i,args[i]);}});};Promise.resolve=function(value){if(value&&typeof value==='object'&&value.constructor===Promise){return value;}return new Promise(function(resolve){resolve(value);});};Promise.reject=function(value){return new Promise(function(resolve,reject){reject(value);});};Promise.race=function(values){return new Promise(function(resolve,reject){for(var i=0,len=values.length;i<len;i++){values[i].then(resolve,reject);}});};Promise._immediateFn=(typeof setImmediate==='function'&&function(fn){setImmediate(fn);})||function(fn){setTimeoutFunc(fn,0);};Promise._unhandledRejectionFn=function _unhandledRejectionFn(err){if(typeof console!=='undefined'&&console){console.warn('Possible Unhandled Promise Rejection:',err);}};Promise._setImmediateFn=function _setImmediateFn(fn){Promise._immediateFn=fn;};Promise._setUnhandledRejectionFn=function _setUnhandledRejectionFn(fn){Promise._unhandledRejectionFn=fn;};if(typeof module!=='undefined'&&module.exports){module.exports=Promise;}else if(!root.Promise){root.Promise=Promise;}})(typeof self!=='undefined'?self:this);
/*!
 * A window.fetch JavaScript polyfill
 * @see {@link https://github.com/github/fetch/blob/master/fetch.js}
 * IE11/Edge13 needs that
 */
(function(self){'use strict';if(self.fetch){return;}var support={searchParams:'URLSearchParams'in self,iterable:'Symbol'in self&&'iterator'in Symbol,blob:'FileReader'in self&&'Blob'in self&&(function(){try{Blob();return true;}catch(e){return false;}})(),formData:'FormData'in self,arrayBuffer:'ArrayBuffer'in self};function normalizeName(name){if(typeof name!=='string'){name=String(name);}if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){throw new TypeError('Invalid character in header field name');}return name.toLowerCase();}function normalizeValue(value){if(typeof value!=='string'){value=String(value);}return value;}function iteratorFor(items){var iterator={next:function(){var value=items.shift();return{done:value===undefined,value:value};}};if(support.iterable){iterator[Symbol.iterator]=function(){return iterator;};}return iterator;}function Headers(headers){this.map={};if(headers instanceof Headers){headers.forEach(function(value,name){this.append(name,value);},this);}else if(headers){Object.getOwnPropertyNames(headers).forEach(function(name){this.append(name,headers[name]);},this);}}Headers.prototype.append=function(name,value){name=normalizeName(name);value=normalizeValue(value);var list=this.map[name];if(!list){list=[];this.map[name]=list;}list.push(value);};Headers.prototype['delete']=function(name){delete this.map[normalizeName(name)];};Headers.prototype.get=function(name){var values=this.map[normalizeName(name)];return values?values[0]:null;};Headers.prototype.getAll=function(name){return this.map[normalizeName(name)]||[];};Headers.prototype.has=function(name){return this.map.hasOwnProperty(normalizeName(name));};Headers.prototype.set=function(name,value){this.map[normalizeName(name)]=[normalizeValue(value)];};Headers.prototype.forEach=function(callback,thisArg){Object.getOwnPropertyNames(this.map).forEach(function(name){this.map[name].forEach(function(value){callback.call(thisArg,value,name,this);},this);},this);};Headers.prototype.keys=function(){var items=[];this.forEach(function(value,name){items.push(name);});return iteratorFor(items);};Headers.prototype.values=function(){var items=[];this.forEach(function(value){items.push(value);});return iteratorFor(items);};Headers.prototype.entries=function(){var items=[];this.forEach(function(value,name){items.push([name,value]);});return iteratorFor(items);};if(support.iterable){Headers.prototype[Symbol.iterator]=Headers.prototype.entries;}function consumed(body){if(body.bodyUsed){return Promise.reject(new TypeError('Already read'));}body.bodyUsed=true;}function fileReaderReady(reader){return new Promise(function(resolve,reject){reader.onload=function(){resolve(reader.result);};reader.onerror=function(){reject(reader.error);};});}function readBlobAsArrayBuffer(blob){var reader=new FileReader();reader.readAsArrayBuffer(blob);return fileReaderReady(reader);}function readBlobAsText(blob){var reader=new FileReader();reader.readAsText(blob);return fileReaderReady(reader);}function Body(){this.bodyUsed=false;this._initBody=function(body){this._bodyInit=body;if(typeof body==='string'){this._bodyText=body;}else if(support.blob&&Blob.prototype.isPrototypeOf(body)){this._bodyBlob=body;}else if(support.formData&&FormData.prototype.isPrototypeOf(body)){this._bodyFormData=body;}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){this._bodyText=body.toString();}else if(!body){this._bodyText='';}else if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){}else{throw new Error('unsupported BodyInit type');}if(!this.headers.get('content-type')){if(typeof body==='string'){this.headers.set('content-type','text/plain;charset=UTF-8');}else if(this._bodyBlob&&this._bodyBlob.type){this.headers.set('content-type',this._bodyBlob.type);}else if(support.searchParams&&URLSearchParams.prototype.isPrototypeOf(body)){this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8');}}};if(support.blob){this.blob=function(){var rejected=consumed(this);if(rejected){return rejected;}if(this._bodyBlob){return Promise.resolve(this._bodyBlob);}else if(this._bodyFormData){throw new Error('could not read FormData body as blob');}else{return Promise.resolve(new Blob([this._bodyText]));}};this.arrayBuffer=function(){return this.blob().then(readBlobAsArrayBuffer);};this.text=function(){var rejected=consumed(this);if(rejected){return rejected;}if(this._bodyBlob){return readBlobAsText(this._bodyBlob);}else if(this._bodyFormData){throw new Error('could not read FormData body as text');}else{return Promise.resolve(this._bodyText);}};}else{this.text=function(){var rejected=consumed(this);return rejected?rejected:Promise.resolve(this._bodyText);};}if(support.formData){this.formData=function(){return this.text().then(decode);};}this.json=function(){return this.text().then(JSON.parse);};return this;}var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];function normalizeMethod(method){var upcased=method.toUpperCase();return(methods.indexOf(upcased)>-1)?upcased:method;}function Request(input,options){options=options||{};var body=options.body;if(Request.prototype.isPrototypeOf(input)){if(input.bodyUsed){throw new TypeError('Already read');}this.url=input.url;this.credentials=input.credentials;if(!options.headers){this.headers=new Headers(input.headers);}this.method=input.method;this.mode=input.mode;if(!body){body=input._bodyInit;input.bodyUsed=true;}}else{this.url=input;}this.credentials=options.credentials||this.credentials||'omit';if(options.headers||!this.headers){this.headers=new Headers(options.headers);}this.method=normalizeMethod(options.method||this.method||'GET');this.mode=options.mode||this.mode||null;this.referrer=null;if((this.method==='GET'||this.method==='HEAD')&&body){throw new TypeError('Body not allowed for GET or HEAD requests');}this._initBody(body);}Request.prototype.clone=function(){return new Request(this);};function decode(body){var form=new FormData();body.trim().split('&').forEach(function(bytes){if(bytes){var split=bytes.split('=');var name=split.shift().replace(/\+/g,' ');var value=split.join('=').replace(/\+/g,' ');form.append(decodeURIComponent(name),decodeURIComponent(value));}});return form;}function headers(xhr){var head=new Headers();var pairs=(xhr.getAllResponseHeaders()||'').trim().split('\n');pairs.forEach(function(header){var split=header.trim().split(':');var key=split.shift().trim();var value=split.join(':').trim();head.append(key,value);});return head;}Body.call(Request.prototype);function Response(bodyInit,options){if(!options){options={};}this.type='default';this.status=options.status;this.ok=this.status>=200&&this.status<300;this.statusText=options.statusText;this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);this.url=options.url||'';this._initBody(bodyInit);}Body.call(Response.prototype);Response.prototype.clone=function(){return new Response(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new Headers(this.headers),url:this.url});};Response.error=function(){var response=new Response(null,{status:0,statusText:''});response.type='error';return response;};var redirectStatuses=[301,302,303,307,308];Response.redirect=function(url,status){if(redirectStatuses.indexOf(status)===-1){throw new RangeError('Invalid status code');}return new Response(null,{status:status,headers:{location:url}});};self.Headers=Headers;self.Request=Request;self.Response=Response;self.fetch=function(input,init){return new Promise(function(resolve,reject){var request;if(Request.prototype.isPrototypeOf(input)&&!init){request=input;}else{request=new Request(input,init);}var xhr=new XMLHttpRequest();function responseURL(){if('responseURL'in xhr){return xhr.responseURL;}if(/^X-Request-URL:/mi.test(xhr.getAllResponseHeaders())){return xhr.getResponseHeader('X-Request-URL');}return;}xhr.onload=function(){var options={status:xhr.status,statusText:xhr.statusText,headers:headers(xhr),url:responseURL()};var body='response'in xhr?xhr.response:xhr.responseText;resolve(new Response(body,options));};xhr.onerror=function(){reject(new TypeError('Network request failed'));};xhr.ontimeout=function(){reject(new TypeError('Network request failed'));};xhr.open(request.method,request.url,true);if(request.credentials==='include'){xhr.withCredentials=true;}if('responseType'in xhr&&support.blob){xhr.responseType='blob';}request.headers.forEach(function(value,name){xhr.setRequestHeader(name,value);});xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);});};self.fetch.polyfill=true;})(typeof self!=='undefined'?self:this);
/*!
 * EventListener Polyfill for IE
 * @see {@link https://github.com/jonathantneal/EventListener/blob/master/EventListener.js}
 * IE8 needs that
 */
if(this.Element&&Element.prototype.attachEvent&&!Element.prototype.addEventListener){(function(){function addToPrototype(name,method){Window.prototype[name]=HTMLDocument.prototype[name]=Element.prototype[name]=method;}addToPrototype("addEventListener",function(type,listener){var target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];if(!typeListeners.length){target.attachEvent("on"+type,typeListeners.event=function(event){var documentElement=target.document&&target.document.documentElement||target.documentElement||{scrollLeft:0,scrollTop:0};event.currentTarget=target;event.pageX=event.clientX+documentElement.scrollLeft;event.pageY=event.clientY+documentElement.scrollTop;event.preventDefault=function(){event.returnValue=false;};event.relatedTarget=event.fromElement||null;event.stopImmediatePropagation=function(){immediatePropagation=false;event.cancelBubble=true;};event.stopPropagation=function(){event.cancelBubble=true;};event.target=event.srcElement||target;event.timeStamp=+new Date();var plainEvt={};for(var i in event){if(event.hasOwnProperty(i)){plainEvt[i]=event[i];}}for(var j=0,typeListenersCache=[].concat(typeListeners),typeListenerCache,immediatePropagation=true;immediatePropagation&&(typeListenerCache=typeListenersCache[j]);++j){for(var ii=0,typeListener;!!(typeListener=typeListeners[ii]);++ii){if(typeListener==typeListenerCache){typeListener.call(target,plainEvt);break;}}}});}typeListeners.push(listener);});addToPrototype("removeEventListener",function(type,listener){var target=this,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];for(var i=typeListeners.length-1,typeListener;!!(typeListener=typeListeners[i]);--i){if(typeListener==listener){typeListeners.splice(i,1);break;}}if(!typeListeners.length&&typeListeners.event){target.detachEvent("on"+type,typeListeners.event);}});addToPrototype("dispatchEvent",function(eventObject){var target=this,type=eventObject.type,listeners=target.addEventListener.listeners=target.addEventListener.listeners||{},typeListeners=listeners[type]=listeners[type]||[];try{return target.fireEvent("on"+type,eventObject);}catch(error){if(typeListeners.event){typeListeners.event(eventObject);}return;}});Object.defineProperty(Window.prototype,"CustomEvent",{get:function(){var self=this;return function CustomEvent(type,eventInitDict){var event=self.document.createEventObject(),key;event.type=type;for(key in eventInitDict){if(key=='cancelable'){event.returnValue=!eventInitDict.cancelable;}else if(key=='bubbles'){event.cancelBubble=!eventInitDict.bubbles;}else if(key=='detail'){event.detail=eventInitDict.detail;}}return event;};}});function ready(event){if(ready.interval&&document.body){ready.interval=clearInterval(ready.interval);document.dispatchEvent(new CustomEvent("DOMContentLoaded"));}}ready.interval=setInterval(ready,1);window.addEventListener("load",ready);})();}if(!this.CustomEvent||typeof this.CustomEvent==="object"){(function(){this.CustomEvent=function CustomEvent(type,eventInitDict){var event;eventInitDict=eventInitDict||{bubbles:false,cancelable:false,detail:undefined};try{event=document.createEvent('CustomEvent');event.initCustomEvent(type,eventInitDict.bubbles,eventInitDict.cancelable,eventInitDict.detail);}catch(error){event=document.createEvent('Event');event.initEvent(type,eventInitDict.bubbles,eventInitDict.cancelable);event.detail=eventInitDict.detail;}return event;};})();}
/*!
 * @see {@link https://github.com/webcomponents/template/blob/master/template.js}
 * IE11 needs that, and Edge13 needs that in head
 * @see {@link https://github.com/Polymer/polymer-bundler/issues/347}
 */
/*!
 * @see {@link https://github.com/jeffcarp/template-polyfill/blob/master/index.js}
 * IE11 needs that, and Edge13 needs that in head
 * @see {@link https://github.com/Polymer/polymer-bundler/issues/347}
 */
/*!
 * Financial-Times/polyfill-service/polyfills/Event/hashchange/polyfill.js
 * @see {@link https://github.com/Financial-Times/polyfill-service/blob/master/polyfills/Event/hashchange/polyfill.js}
 * Chrome4 needs that
 */
(function(global){var hash=global.location.hash;function poll(){if(hash!==global.location.hash){hash=global.location.hash;global.dispatchEvent(new Event('hashchange'));}setTimeout(poll,500);}global.onhashchange=function(){};poll();}((typeof self!=='undefined'?self:this)));
/*!
 * importNode() polyfill for IE8
 * @see {@link https://gist.github.com/dchambers/0abcec9eaf529f993b9d}
 */
//(function(){'use strict';if(!window.DocumentFragment&&window.HTMLDocument){window.DocumentFragment=HTMLDocument;}if(!document.ELEMENT_NODE){document.ELEMENT_NODE=1;document.ATTRIBUTE_NODE=2;document.TEXT_NODE=3;document.CDATA_SECTION_NODE=4;document.ENTITY_REFERENCE_NODE=5;document.ENTITY_NODE=6;document.PROCESSING_INSTRUCTION_NODE=7;document.COMMENT_NODE=8;document.DOCUMENT_NODE=9;document.DOCUMENT_TYPE_NODE=10;document.DOCUMENT_FRAGMENT_NODE=11;document.NOTATION_NODE=12;}if(!document.createElementNS){document.createElementNS=function(namespaceURI,qualifiedName){return document.createElement(qualifiedName);};}if(!document.importNode){document.importNode=function(node,deep){var a,i,il;switch(node.nodeType){case document.ELEMENT_NODE:var newNode=document.createElementNS(node.namespaceURI,node.nodeName);if(node.attributes&&node.attributes.length>0){for(i=0,il=node.attributes.length;i<il;i++){a=node.attributes[i];try{newNode.setAttributeNS(a.namespaceURI,a.nodeName,node.getAttribute(a.nodeName));}catch(err){}}}if(deep&&node.childNodes&&node.childNodes.length>0){for(i=0,il=node.childNodes.length;i<il;i++){newNode.appendChild(document.importNode(node.childNodes[i],deep));}}return newNode;case document.TEXT_NODE:case document.CDATA_SECTION_NODE:return document.createTextNode(node.nodeValue);case document.COMMENT_NODE:return document.createComment(node.nodeValue);case document.DOCUMENT_FRAGMENT_NODE:docFragment=document.createDocumentFragment();for(i=0,il=node.childNodes.length;i<il;++i){docFragment.appendChild(document.importNode(node.childNodes[i],deep));}return docFragment;}};}}());
/*!
 * modified classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 * @see {@link https://github.com/eligrey/classList.js/pull/57}
 * @see {@link https://github.com/beck/classlist-polyfill/commit/1.1.20150312}
 * will work in IE11 jsfiddle.net/englishextra/hru3Lt77/
 * wont work in IE11 jsfiddle.net/englishextra/fhsjpsdt/
 * compiler.appspot.com/code/jsccfd159eea1dcee81ce663f071f4a30ad/default.js
 * developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 * See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 * passes jshint
 */
if("document"in self){if(!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))){(function(view){"use strict";if(!('Element'in view))return;var classListProp="classList",protoProp="prototype",elemCtrProto=view.Element[protoProp],objCtr=Object,strTrim=String[protoProp].trim||function(){return this.replace(/^\s+|\s+$/g,"");},arrIndexOf=Array[protoProp].indexOf||function(item){var i=0,len=this.length;for(;i<len;i++){if(i in this&&this[i]===item){return i;}}return-1;},DOMEx=function(type,message){this.name=type;this.code=DOMException[type];this.message=message;},checkTokenAndGetIndex=function(classList,token){if(token===""){throw new DOMEx("SYNTAX_ERR","An invalid or illegal string was specified");}if(/\s/.test(token)){throw new DOMEx("INVALID_CHARACTER_ERR","String contains an invalid character");}return arrIndexOf.call(classList,token);},ClassList=function(elem){var trimmedClasses=strTrim.call(elem.getAttribute("class")||""),classes=trimmedClasses?trimmedClasses.split(/\s+/):[],i=0,len=classes.length;for(;i<len;i++){this.push(classes[i]);}this._updateClassName=function(){elem.setAttribute("class",this.toString());};},classListProto=ClassList[protoProp]=[],classListGetter=function(){return new ClassList(this);};DOMEx[protoProp]=Error[protoProp];classListProto.item=function(i){return this[i]||null;};classListProto.contains=function(token){token+="";return checkTokenAndGetIndex(this,token)!==-1;};classListProto.add=function(){var tokens=arguments,i=0,l=tokens.length,token,updated=false;do{token=tokens[i]+"";if(checkTokenAndGetIndex(this,token)===-1){this.push(token);updated=true;}}while(++i<l);if(updated){this._updateClassName();}};classListProto.remove=function(){var tokens=arguments,i=0,l=tokens.length,token,updated=false,index;do{token=tokens[i]+"";index=checkTokenAndGetIndex(this,token);while(index!==-1){this.splice(index,1);updated=true;index=checkTokenAndGetIndex(this,token);}}while(++i<l);if(updated){this._updateClassName();}};classListProto.toggle=function(token,force){token+="";var result=this.contains(token),method=result?force!==true&&"remove":force!==false&&"add";if(method){this[method](token);}if(force===true||force===false){return force;}else{return!result;}};classListProto.toString=function(){return this.join(" ");};if(objCtr.defineProperty){var classListPropDesc={get:classListGetter,enumerable:true,configurable:true};try{objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc);}catch(ex){if(ex.number === undefined || ex.number === -0x7FF5EC54){classListPropDesc.enumerable=false;objCtr.defineProperty(elemCtrProto,classListProp,classListPropDesc);}}}else if(objCtr[protoProp].__defineGetter__){elemCtrProto.__defineGetter__(classListProp,classListGetter);}}(self));}(function(){"use strict";var testElement=document.createElement("_");testElement.classList.add("c1","c2");if(!testElement.classList.contains("c2")){var createMethod=function(method){var original=DOMTokenList.prototype[method];DOMTokenList.prototype[method]=function(token){var i,len=arguments.length;for(i=0;i<len;i++){token=arguments[i];original.call(this,token);}};};createMethod('add');createMethod('remove');}testElement.classList.toggle("c3",false);if(testElement.classList.contains("c3")){var _toggle=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(token,force){var _contains=!this.contains(token),_force=!force;if(1 in arguments&&_contains===_force){return force;}else{return _toggle.call(this,token);}};}testElement=null;}());}
/*!
 * modified dataset.js
 * @see {@link https://github.com/remy/polyfills/blob/master/dataset.js}
 * passes jshint
 */
(function(){var forEach=[].forEach,regex=/^data-(.+)/,dashChar=/\-([a-z])/ig,el=document.createElement("div"),mutationSupported=false,match;function detectMutation(){mutationSupported=true;this.removeEventListener("DOMAttrModified",detectMutation,false);} function toCamelCase(s){return s.replace(dashChar,function(m,l){return l.toUpperCase();});} function updateDataset(){var dataset={};forEach.call(this.attributes,function(attr){match=attr.name.match(regex)||"";if(match){dataset[toCamelCase(match[1])]=attr.value;}});return dataset;} if("undefined"!==el.dataset){return;} el.addEventListener("DOMAttrModified",detectMutation,false);el.setAttribute("foo","bar");function defineElementGetter(obj,prop,getter){if(Object.defineProperty){Object.defineProperty(obj,prop,{get:getter});}else{obj.__defineGetter__(prop,getter);}} defineElementGetter(Element.prototype,"dataset",mutationSupported?function(){if(!this._datasetCache){this._datasetCache=updateDataset.call(this);} return this._datasetCache;}:updateDataset);document.addEventListener("DOMAttrModified",function(event){delete event.target._datasetCache;},false);})();
/*!
 * modified matchMedia() polyfill - Test a CSS media type/query in JS.
 * @see {@link https://github.com/paulirish/matchMedia.js}
 * Authors & copyright (c) 2012:
 * Scott Jehl, Paul Irish, Nicholas Zakas, David Knight.
 * Dual MIT/BSD license
 * fixed Expected an assignment or function call and instead saw an expression.
 * @see {@link https://github.com/paulirish/matchMedia.js/blob/master/matchMedia.js}
 * passes jshint
 */
if(!window.matchMedia){window.matchMedia=function(){"use strict";var styleMedia=(window.styleMedia||window.media);if(!styleMedia){var style=document.createElement('style'),script=document.getElementsByTagName('script')[0],info=null;style.type='text/css';style.id='matchmediajs-test';script.parentNode.insertBefore(style,script);info=('getComputedStyle'in window)&&window.getComputedStyle(style,null)||style.currentStyle;styleMedia={matchMedium:function(media){var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }';if(style.styleSheet){style.styleSheet.cssText=text;}else{style.textContent=text;}return info.width==='1px';}};}return function(media){return{matches:styleMedia.matchMedium(media||'all'),media:media||'all'};};}();}
/*!
 * modified paulirish.com/2011/requestanimationframe-for-smart-animating/
 * my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Moller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 * @see {@link https://gist.github.com/paulirish/1579671}
 * passes jshint
 */
(function(){for(var e=0,b=["ms","moz","webkit","o"],a=0;a<b.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[b[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[b[a]+"CancelAnimationFrame"]||window[b[a]+"CancelRequestAnimationFrame"];}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(a,b){var c=(new Date()).getTime(),d=Math.max(0,16-(c-e)),f=window.setTimeout(function(){a(c+d);},d);e=c+d;return f;};}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(a){clearTimeout(a);};}})();
/*!
 * Polyfill for Function.prototype.bind
 * @see {@link https://gist.github.com/Daniel-Hug/5682738}
 * @see {@link https://gist.github.com/englishextra/db0f22a60e59de86c19f174938c09529}
 */
if(!Function.prototype.bind){Function.prototype.bind=(function(){}).bind||function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}function c(){}var a=[].slice,f=a.call(arguments,1),e=this,d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};}
/*!
 * textContent Polyfill for IE8
 * @see {@link https://developer.mozilla.org/en/docs/Web/API/Node/textContent}
 */
if (Object.defineProperty
	 && Object.getOwnPropertyDescriptor
	 && Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
	 && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
	(function () {
		var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
		Object.defineProperty(Element.prototype, "textContent", {
			get: function () {
				return innerText.get.call(this);
			},
			set: function (s) {
				return innerText.set.call(this, s);
			}
		});
	})();
}
