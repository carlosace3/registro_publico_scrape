"use strict";(()=>{var Me=Object.create;var N=Object.defineProperty;var Se=Object.getOwnPropertyDescriptor;var Pe=Object.getOwnPropertyNames;var _e=Object.getPrototypeOf,Ae=Object.prototype.hasOwnProperty;var Ee=(e,t,n)=>t in e?N(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var $=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ue=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Pe(t))!Ae.call(e,s)&&s!==n&&N(e,s,{get:()=>t[s],enumerable:!(a=Se(t,s))||a.enumerable});return e};var z=(e,t,n)=>(n=e!=null?Me(_e(e)):{},Ue(t||!e||!e.__esModule?N(n,"default",{value:e,enumerable:!0}):n,e));var b=(e,t,n)=>(Ee(e,typeof t!="symbol"?t+"":t,n),n);var oe=$((Tt,B)=>{"use strict";var k=typeof Reflect=="object"?Reflect:null,Q=k&&typeof k.apply=="function"?k.apply:function(t,n,a){return Function.prototype.apply.call(t,n,a)},P;k&&typeof k.ownKeys=="function"?P=k.ownKeys:Object.getOwnPropertySymbols?P=function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:P=function(t){return Object.getOwnPropertyNames(t)};function Oe(e){console&&console.warn&&console.warn(e)}var X=Number.isNaN||function(t){return t!==t};function c(){c.init.call(this)}B.exports=c;B.exports.once=Be;c.EventEmitter=c;c.prototype._events=void 0;c.prototype._eventsCount=0;c.prototype._maxListeners=void 0;var J=10;function _(e){if(typeof e!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return J},set:function(e){if(typeof e!="number"||e<0||X(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");J=e}});c.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};c.prototype.setMaxListeners=function(t){if(typeof t!="number"||t<0||X(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this};function Z(e){return e._maxListeners===void 0?c.defaultMaxListeners:e._maxListeners}c.prototype.getMaxListeners=function(){return Z(this)};c.prototype.emit=function(t){for(var n=[],a=1;a<arguments.length;a++)n.push(arguments[a]);var s=t==="error",o=this._events;if(o!==void 0)s=s&&o.error===void 0;else if(!s)return!1;if(s){var r;if(n.length>0&&(r=n[0]),r instanceof Error)throw r;var i=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw i.context=r,i}var u=o[t];if(u===void 0)return!1;if(typeof u=="function")Q(u,this,n);else for(var l=u.length,d=ae(u,l),a=0;a<l;++a)Q(d[a],this,n);return!0};function Y(e,t,n,a){var s,o,r;if(_(n),o=e._events,o===void 0?(o=e._events=Object.create(null),e._eventsCount=0):(o.newListener!==void 0&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),r=o[t]),r===void 0)r=o[t]=n,++e._eventsCount;else if(typeof r=="function"?r=o[t]=a?[n,r]:[r,n]:a?r.unshift(n):r.push(n),s=Z(e),s>0&&r.length>s&&!r.warned){r.warned=!0;var i=new Error("Possible EventEmitter memory leak detected. "+r.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");i.name="MaxListenersExceededWarning",i.emitter=e,i.type=t,i.count=r.length,Oe(i)}return e}c.prototype.addListener=function(t,n){return Y(this,t,n,!1)};c.prototype.on=c.prototype.addListener;c.prototype.prependListener=function(t,n){return Y(this,t,n,!0)};function De(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function ee(e,t,n){var a={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},s=De.bind(a);return s.listener=n,a.wrapFn=s,s}c.prototype.once=function(t,n){return _(n),this.on(t,ee(this,t,n)),this};c.prototype.prependOnceListener=function(t,n){return _(n),this.prependListener(t,ee(this,t,n)),this};c.prototype.removeListener=function(t,n){var a,s,o,r,i;if(_(n),s=this._events,s===void 0)return this;if(a=s[t],a===void 0)return this;if(a===n||a.listener===n)--this._eventsCount===0?this._events=Object.create(null):(delete s[t],s.removeListener&&this.emit("removeListener",t,a.listener||n));else if(typeof a!="function"){for(o=-1,r=a.length-1;r>=0;r--)if(a[r]===n||a[r].listener===n){i=a[r].listener,o=r;break}if(o<0)return this;o===0?a.shift():Fe(a,o),a.length===1&&(s[t]=a[0]),s.removeListener!==void 0&&this.emit("removeListener",t,i||n)}return this};c.prototype.off=c.prototype.removeListener;c.prototype.removeAllListeners=function(t){var n,a,s;if(a=this._events,a===void 0)return this;if(a.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):a[t]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete a[t]),this;if(arguments.length===0){var o=Object.keys(a),r;for(s=0;s<o.length;++s)r=o[s],r!=="removeListener"&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(n=a[t],typeof n=="function")this.removeListener(t,n);else if(n!==void 0)for(s=n.length-1;s>=0;s--)this.removeListener(t,n[s]);return this};function te(e,t,n){var a=e._events;if(a===void 0)return[];var s=a[t];return s===void 0?[]:typeof s=="function"?n?[s.listener||s]:[s]:n?Ne(s):ae(s,s.length)}c.prototype.listeners=function(t){return te(this,t,!0)};c.prototype.rawListeners=function(t){return te(this,t,!1)};c.listenerCount=function(e,t){return typeof e.listenerCount=="function"?e.listenerCount(t):ne.call(e,t)};c.prototype.listenerCount=ne;function ne(e){var t=this._events;if(t!==void 0){var n=t[e];if(typeof n=="function")return 1;if(n!==void 0)return n.length}return 0}c.prototype.eventNames=function(){return this._eventsCount>0?P(this._events):[]};function ae(e,t){for(var n=new Array(t),a=0;a<t;++a)n[a]=e[a];return n}function Fe(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function Ne(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function Be(e,t){return new Promise(function(n,a){function s(r){e.removeListener(t,o),a(r)}function o(){typeof e.removeListener=="function"&&e.removeListener("error",s),n([].slice.call(arguments))}se(e,t,o,{once:!0}),t!=="error"&&Ke(e,s,{once:!0})})}function Ke(e,t,n){typeof e.on=="function"&&se(e,"error",t,n)}function se(e,t,n,a){if(typeof e.on=="function")a.once?e.once(t,n):e.on(t,n);else if(typeof e.addEventListener=="function")e.addEventListener(t,function s(o){a.once&&e.removeEventListener(t,s),n(o)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e)}});var le=$((Rt,f)=>{f.exports.boot=function(e){return e};f.exports.ssrMiddleware=function(e){return e};f.exports.configure=function(e){return e};f.exports.preFetch=function(e){return e};f.exports.route=function(e){return e};f.exports.store=function(e){return e};f.exports.bexBackground=function(e){return e};f.exports.bexContent=function(e){return e};f.exports.bexDom=function(e){return e};f.exports.ssrProductionExport=function(e){return e};f.exports.ssrCreate=function(e){return e};f.exports.ssrListen=function(e){return e};f.exports.ssrClose=function(e){return e};f.exports.ssrServeStaticContent=function(e){return e};f.exports.ssrRenderPreloadTag=function(e){return e}});var ce=z(oe());var K,A=0,p=new Array(256);for(let e=0;e<256;e++)p[e]=(e+256).toString(16).substring(1);var je=(()=>{let e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{let n=new Uint8Array(t);return e.getRandomValues(n),n}}return t=>{let n=[];for(let a=t;a>0;a--)n.push(Math.floor(Math.random()*256));return n}})(),re=4096;function ie(){(K===void 0||A+16>re)&&(A=0,K=je(re));let e=Array.prototype.slice.call(K,A,A+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,p[e[0]]+p[e[1]]+p[e[2]]+p[e[3]]+"-"+p[e[4]]+p[e[5]]+"-"+p[e[6]]+p[e[7]]+"-"+p[e[8]]+p[e[9]]+"-"+p[e[10]]+p[e[11]]+p[e[12]]+p[e[13]]+p[e[14]]+p[e[15]]}var qe={undefined:()=>0,boolean:()=>4,number:()=>8,string:e=>2*e.length,object:e=>e?Object.keys(e).reduce((t,n)=>j(n)+j(e[n])+t,0):0},j=e=>qe[typeof e](e),R=class extends ce.EventEmitter{constructor(t){super(),this.setMaxListeners(1/0),this.wall=t,t.listen(n=>{Array.isArray(n)?n.forEach(a=>this._emit(a)):this._emit(n)}),this._sendingQueue=[],this._sending=!1,this._maxMessageSize=32*1024*1024}send(t,n){return this._send([{event:t,payload:n}])}getEvents(){return this._events}on(t,n){return super.on(t,a=>{n({...a,respond:s=>this.send(a.eventResponseKey,s)})})}_emit(t){typeof t=="string"?this.emit(t):this.emit(t.event,t.payload)}_send(t){return this._sendingQueue.push(t),this._nextSend()}_nextSend(){if(!this._sendingQueue.length||this._sending)return Promise.resolve();this._sending=!0;let t=this._sendingQueue.shift(),n=t[0],a=`${n.event}.${ie()}`,s=a+".result";return new Promise((o,r)=>{let i=[],u=l=>{if(l!==void 0&&l._chunkSplit){let d=l._chunkSplit;i=[...i,...l.data],d.lastChunk&&(this.off(s,u),o(i))}else this.off(s,u),o(l)};this.on(s,u);try{let l=t.map(d=>({...d,payload:{data:d.payload,eventResponseKey:s}}));this.wall.send(l)}catch(l){let d="Message length exceeded maximum allowed length.";if(l.message===d&&Array.isArray(n.payload)){let x=j(n);if(x>this._maxMessageSize){let T=Math.ceil(x/this._maxMessageSize),y=Math.ceil(n.payload.length/T),D=n.payload;for(let M=0;M<T;M++){let F=Math.min(D.length,y);this.wall.send([{event:n.event,payload:{_chunkSplit:{count:T,lastChunk:M===T-1},data:D.splice(0,F)}}])}}}}this._sending=!1,setTimeout(()=>this._nextSend(),16)})}};var ve=z(le());var He=chrome.runtime.getURL("assets/config.js"),pe,E=(pe=globalThis.browser)!=null?pe:globalThis.chrome;async function We(){let e=await E.storage.local.get("defaultConfig");if(e.defaultConfig)return e.defaultConfig;let t={},n=["DelayTime","RepeatTimes","port"],a=["enabledFor","useCapsolver","manualSolving","useProxy"],s=/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,i=(await(await fetch(He)).text()).replace(s,""),u=i.slice(i.indexOf("{")+1,i.lastIndexOf("}")),l=JSON.stringify(u).replaceAll('\\"',"'").replaceAll("\\n","").replaceAll('"',"").replaceAll(" ",""),d=l.indexOf("blackUrlList"),x=l.slice(d),T=x.indexOf("],"),y=x.slice(0,T+1);l.replace(y,"").split(",").forEach(Ie=>{let[S,V]=Ie.split(":");if(S&&V){let v=V.replaceAll("'","").replaceAll('"',"");for(let C=0;C<n.length;C++)S.endsWith(n[C])&&(v=Number(v));for(let C=0;C<a.length;C++)S.startsWith(a[C])&&(v=v==="true");t[S]=v}}),y=y.replaceAll("'","").replaceAll('"',"");let F=y.indexOf(":["),Le=y.slice(F+2,y.length-1);return t.blackUrlList=Le.split(","),E.storage.local.set({defaultConfig:t}),t}var L={manualSolving:!1,apiKey:"",appId:"",enabledForImageToText:!0,enabledForRecaptchaV3:!0,enabledForHCaptcha:!1,enabledForGeetestV4:!1,recaptchaV3MinScore:.5,enabledForRecaptcha:!0,enabledForDataDome:!1,enabledForAwsCaptcha:!0,useProxy:!1,proxyType:"http",hostOrIp:"",port:"",proxyLogin:"",proxyPassword:"",enabledForBlacklistControl:!1,blackUrlList:[],isInBlackList:!1,reCaptchaMode:"click",reCaptchaDelayTime:0,reCaptchaCollapse:!1,reCaptchaRepeatTimes:10,reCaptcha3Mode:"token",reCaptcha3DelayTime:0,reCaptcha3Collapse:!1,reCaptcha3RepeatTimes:10,reCaptcha3TaskType:"ReCaptchaV3TaskProxyLess",hCaptchaMode:"click",hCaptchaDelayTime:0,hCaptchaCollapse:!1,hCaptchaRepeatTimes:10,funCaptchaMode:"click",funCaptchaDelayTime:0,funCaptchaCollapse:!1,funCaptchaRepeatTimes:10,geetestMode:"click",geetestCollapse:!1,geetestDelayTime:0,geetestRepeatTimes:10,textCaptchaMode:"click",textCaptchaCollapse:!1,textCaptchaDelayTime:0,textCaptchaRepeatTimes:10,enabledForCloudflare:!1,cloudflareMode:"click",cloudflareCollapse:!1,cloudflareDelayTime:0,cloudflareRepeatTimes:10,datadomeMode:"click",datadomeCollapse:!1,datadomeDelayTime:0,datadomeRepeatTimes:10,awsCaptchaMode:"click",awsCollapse:!1,awsDelayTime:0,awsRepeatTimes:10,useCapsolver:!0,isInit:!1,solvedCallback:"captchaSolvedCallback",textCaptchaSourceAttribute:"capsolver-image-to-text-source",textCaptchaResultAttribute:"capsolver-image-to-text-result",textCaptchaModule:"common"},ue={proxyType:["socks5","http","https","socks4"],mode:["click","token"]};async function fe(){let e=await We(),t=Object.keys(e);for(let n of t)if(!(n==="proxyType"&&!ue[n].includes(e[n]))){{if(n.endsWith("Mode")&&!ue.mode.includes(e[n]))continue;if(n==="port"){if(typeof e.port!="number")continue;L.port=e.port}}Reflect.has(L,n)&&typeof L[n]==typeof e[n]&&(L[n]=e[n])}return L}var Ge=fe(),g={default:Ge,async get(e){return(await this.getAll())[e]},async getAll(){let e=await fe(),t=await E.storage.local.get("config");return g.joinConfig(e,t.config)},async set(e){let t=await g.getAll(),n=g.joinConfig(t,e);return E.storage.local.set({config:n})},joinConfig(e,t){let n={};if(e)for(let a in e)n[a]=e[a];if(t)for(let a in t)n[a]=t[a];return n}};function de(e){e.on("config",async({respond:t})=>{let n=await g.getAll();t(n).then()})}function he(e){e.on("log",({data:t,respond:n})=>{n()})}var Ve="https://www.google-analytics.com/mp/collect",$e="https://www.google-analytics.com/debug/mp/collect",ze="G-4M0CNKY3DG",Qe="5f5uGZ8yS9er8l9xMXdDBA";var q=class{constructor(t=!1){b(this,"debug",!1);this.debug=t}async getOrCreateClientId(){let{clientId:t}=await chrome.storage.local.get("clientId");return t||(t=self.crypto.randomUUID(),await chrome.storage.local.set({clientId:t})),t}async getOrCreateSessionId(){let{sessionData:t}=await chrome.storage.session.get("sessionData"),n=Date.now();return t&&t.timestamp&&((n-t.timestamp)/6e4>30?t=null:(t.timestamp=n,await chrome.storage.session.set({sessionData:t}))),t||(t={session_id:n.toString(),timestamp:n.toString()},await chrome.storage.session.set({sessionData:t})),t.session_id}async fireEvent(t,n={}){if(!n.session_id){let a=await this.getOrCreateSessionId();n.session_id=a}n.engagement_time_msec||(n.engagement_time_msec=100);try{let a=await fetch(`${this.debug?$e:Ve}?measurement_id=${ze}&api_secret=${Qe}`,{method:"POST",body:JSON.stringify({client_id:await this.getOrCreateClientId(),events:[{name:t,params:n}]})});if(!this.debug)return}catch(a){console.error("Google Analytics request failed with an exception",a)}}},H=new q;var U=class{constructor(t){b(this,"baseURL");this.baseURL=t}async post(t,n,a){let s=await fetch(this.getURL(t),{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"},...a});return{status:s.status,statusText:s.statusText,data:await s.json(),headers:s.headers}}getURL(t){return this.baseURL+t}};var h=class{constructor(t){b(this,"options",{apiKey:"",service:"https://api.capsolver.com",defaultTimeout:120,pollingInterval:5,recaptchaTimeout:600});b(this,"http");for(let n in this.options)this.options[n]=t[n]===void 0?this.options[n]:t[n];this.http=new U(this.options.service)}static async API(t){let n=await g.getAll();if(!(t!=null&&t.apiKey)&&!(n!=null&&n.apiKey))throw new Error("Capsover: No API Kye set up yet!");return new h({apiKey:n.apiKey,...t})}async getProxyParams(t){let n=await g.getAll();return{proxyType:n.proxyType,proxyAddress:n.hostOrIp,proxyPort:n.port,proxyLogin:n.proxyLogin,proxyPassword:n.proxyPassword,type:t.type.replace("ProxyLess","")}}async getBalance(){var n,a,s;let t=await this.http.post("/getBalance",{clientKey:this.options.apiKey});if(t.status!==200||((n=t.data)==null?void 0:n.errorCode)||((a=t.data)==null?void 0:a.errorId))throw new Error(((s=t.data)==null?void 0:s.errorDescription)||"createTask fail\uFF01");return t.data}async createTaskResult(t,n){n||(n={timeout:this.options.defaultTimeout,pollingInterval:this.options.pollingInterval});let a=await g.getAll();if(a.appId&&(t.appId=a.appId),a.useProxy){let l=await this.getProxyParams(t.task);Object.assign(t.task,l)}let s=await this.createTask(t),{taskId:o}=s,r=this.getTime(),i=n.timeout===void 0?this.options.defaultTimeout:n.timeout,u=n.pollingInterval===void 0?this.options.pollingInterval:n.pollingInterval;for(;!(this.getTime()-r>i);){await new Promise(d=>setTimeout(d,u*1e3));let l=await this.getTaskSolution({taskId:o});if(l.status==="ready")return l}throw new Error("Timeout "+i+" seconds reached")}async createTask(t){var r,i,u,l;let n=(r=globalThis.browser)!=null?r:globalThis.chrome,a=await n.storage.local.get("platform"),s=await n.storage.local.get("version"),o=await this.http.post("/createTask",{clientKey:this.options.apiKey,source:a.platform,version:s.version,...t});if(o.status!==200||((i=o.data)==null?void 0:i.errorCode)||((u=o.data)==null?void 0:u.errorId))throw new Error(((l=o.data)==null?void 0:l.errorCode)||"createTask fail\uFF01");if(!o.data.taskId)throw new Error("taskIs is empty!");return o.data}async getTaskSolution({taskId:t}){var a,s,o;let n=await this.http.post("/getTaskResult",{clientKey:this.options.apiKey,taskId:t});if(n.status!==200||((a=n.data)==null?void 0:a.errorCode)||((s=n.data)==null?void 0:s.errorId))throw new Error(((o=n.data)==null?void 0:o.errorCode)||"getTaskResult fail\uFF01");return n.data}async createRecognitionTask(t){var i,u,l,d;let n=await g.getAll(),a=(i=globalThis.browser)!=null?i:globalThis.chrome,s=await a.storage.local.get("platform"),o=await a.storage.local.get("version");n.appId&&(t.appId=n.appId);let r=await this.http.post("/createTask",{clientKey:this.options.apiKey,source:s.platform,version:o.version,...t});if(r.status!==200||((u=r.data)==null?void 0:u.errorCode)||((l=r.data)==null?void 0:l.errorId)!==0)throw new Error(((d=r.data)==null?void 0:d.errorCode)||"createTask fail\uFF01");if(!r.data.taskId)throw new Error("taskIs is empty!");return r.data}getTime(){return parseInt(String(Date.now()/1e3))}};function Je(e){chrome.contextMenus.update("capsolver-mark-image",{enabled:e})}function Xe(e){chrome.contextMenus.update("capsolver-mark-result",{enabled:e})}function O(e,t){var a;let n=(a=globalThis.browser)!=null?a:globalThis.chrome;return new Promise(s=>{n.tabs.query({active:!0,currentWindow:!0}).then(o=>{if(globalThis!=null&&globalThis.browser)browser.tabs.sendMessage(e,{command:t}).then(r=>{s(r)});else{let r=o.find(u=>u.id===e);(r==null?void 0:r.url)||s(!1),chrome.tabs.sendMessage(e,{command:t},u=>{s(u)})}})})}async function Ze(e){return await O(e,"image2Text:canMarkImage")}async function Ye(e){return await O(e,"image2Text:canMarkInput")}async function ge(e){O(e,"image2Text:markedImage")}async function me(e){O(e,"image2Text:markedResult")}async function I(e){let t=await Ze(e),n=await Ye(e);Je(t),Xe(n)}var we="",w={};function Te(e,t,n){let{action:a}=e;return g.getAll().then(s=>{switch(a){case"solver":s[`${e.captchaType}Mode`]==="click"?at(e).then(o=>{n({response:o})}):tt(e,s).then(o=>{n({response:o})});break;case"execute":Ce({command:"execute"});break;case"solved":Ce({response:{action:"solved",callback:s.solvedCallback}});break;case"updateMenu":I(t.tab.id);break;case"getWebsiteUrl":we=e.websiteUrl;break;case"setWebsiteMetadata":w=e.metadata;break;case"ga":et(e.key);break;case"solveTurnstile":nt(e,s).then(o=>{n({response:o})});break}}),a==="solver"||a==="ga"||a==="solveTurnstile"}async function et(e){let t=await H.getOrCreateSessionId();H.fireEvent(e,{session_id:t})}var be,ye=(be=globalThis.browser)!=null?be:globalThis.chrome;async function Ce(e){let t=await ye.tabs.query({currentWindow:!0,active:!0});for(let n of t)ye.tabs.sendMessage(n.id,e)}async function tt(e,t){let{captchaType:n,widgetId:a,params:s,action:o}=e,r={action:o,request:{captchaType:n,widgetId:a}};if(!s)return r.error="params is error!",r;try{r.response=await ke(n,s,t)}catch(i){r.error=String(i)}return r}async function nt(e,t){let n={action:"solveTurnstile",request:{captchaType:"cloudflare",widgetId:"0"}};try{n.response=await ke("cloudflare",{sitekey:e.sitekey,websiteURL:e.websiteURL},t)}catch(a){n.error=String(a)}return n}async function at(e){let{captchaType:t,params:n,action:a}=e,s={action:a,request:{captchaType:t}};if(!n)return s.error="params is error!",s;n.hasOwnProperty("index")&&(s.index=n.index),n.hasOwnProperty("id")&&(s.id=n.id);try{s.response=await st(t,n)}catch(o){s.error=String(o)}return s}async function ke(e,t,n){let a={code:"",status:"processing"};switch(e){case"hCaptcha":{let s=await ot(t);a.code=s.solution.gRecaptchaResponse,a.status=s.status;break}case"reCaptcha":{let s=await rt(t);a.code=s.solution.gRecaptchaResponse,a.status=s.status;break}case"funCaptcha":{let s=await ct(t);a.code=s.solution.token,a.status=s.status;break}case"reCaptcha3":{let s=await it(t);a.code=s.solution.gRecaptchaResponse,a.status=s.status;break}case"cloudflare":{let s=await lt(t);a.code=s.solution.token,a.status=s.status;break}default:throw new Error("do not support captchaType: "+e)}return a}async function st(e,t){t.url=we;let n={status:"processing"};switch(e){case"funCaptcha":{let a=await ut(t);n.status=a.status,n.solution=a.solution;break}case"hCaptcha":{let a=await pt(t);n.status=a.status,n.solution=a.solution;break}case"reCaptcha":{let a=await ft(t);n.status=a.status,n.solution=a.solution;break}case"textCaptcha":{let a=await dt(t);n.status=a.status,n.solution=a.solution;break}case"awsCaptcha":{let a=await ht(t);n.status=a.status,n.solution=a.solution;break}default:throw new Error("do not support captchaType: "+e)}return n}async function ot(e){return await(await h.API()).createTaskResult({task:{type:"HCaptchaTaskProxyLess",websiteURL:e.websiteURL,websiteKey:e.sitekey}})}async function rt(e){var a;let t=await h.API();((a=e.websiteURL)==null?void 0:a.indexOf("tbi.com.iq"))!==-1&&(e.websiteURL="https://apps.tbi.com.iq/dollar/register.aspx");let n={type:"ReCaptchaV2TaskProxyLess",websiteURL:e.websiteURL,websiteKey:e.sitekey,invisible:e.invisible,enterprisePayload:{s:e.s},metadata:{pageURL:w.pageURL,title:w.title}};return e.action&&(n.pageAction=e.action),await t.createTaskResult({task:n})}async function it(e){var a;let t=await h.API(),n=await g.getAll();return((a=e.websiteURL)==null?void 0:a.indexOf("tbi.com.iq"))!==-1&&(e.websiteURL="https://apps.tbi.com.iq/dollar/register.aspx"),await t.createTaskResult({task:{type:n.reCaptcha3TaskType,websiteURL:e.websiteURL,websiteKey:e.sitekey,pageAction:e.action,enterprisePayload:{s:e.s},metadata:{pageURL:w.pageURL,title:w.title}}})}async function ct(e){return await(await h.API()).createTaskResult({task:{type:"FunCaptchaTaskProxyLess",websiteURL:e.websiteURL,websitePublicKey:e.websitePublicKey}})}async function lt(e){return await(await h.API()).createTaskResult({task:{type:"AntiTurnstileTaskProxyLess",websiteURL:e.websiteURL,websiteKey:e.sitekey}})}async function ut(e){return await(await h.API()).createRecognitionTask({task:{type:"FunCaptchaClassification",images:[e.image],question:e.question,websiteURL:e.url}})}async function pt(e){return await(await h.API()).createRecognitionTask({task:{type:"HCaptchaClassification",queries:e.queries,question:e.question,websiteURL:e.url}})}async function ft(e){var a;let t=await h.API();((a=e.url)==null?void 0:a.indexOf("tbi.com.iq"))!==-1&&(e.url="https://apps.tbi.com.iq/dollar/register.aspx");let n={type:"ReCaptchaV2Classification",image:e.image,question:e.question,websiteURL:e.url,metadata:{pageURL:w.pageURL,title:w.title}};return await t.createRecognitionTask({task:n})}async function dt(e){let t=await h.API(),n=await g.getAll();return await t.createRecognitionTask({task:{type:"ImageToTextTask",body:e.body,websiteURL:e.url,module:n.textCaptchaModule}})}async function ht(e){return await(await h.API()).createRecognitionTask({task:{type:"AwsWafClassification",images:e.question==="aws:toycarcity:carcity"?[e.image]:e.image,question:e.question,websiteURL:e.url}})}var xe,G=(xe=globalThis.browser)!=null?xe:globalThis.chrome,W="";async function gt(){let e=chrome.runtime.getURL("manifest.json");return(await(await fetch(e)).json()).version}chrome.runtime.onConnect.addListener(async()=>{W||(W=await gt()),G.storage.local.set({version:W})});chrome.runtime.onMessage.addListener(Te);function mt(){chrome.contextMenus.removeAll(()=>{chrome.contextMenus.create({title:"capsolver mark image as captcha",contexts:["all"],id:"capsolver-mark-image",enabled:!0}),chrome.contextMenus.create({title:"select an input for the captcha result",contexts:["editable"],id:"capsolver-mark-result",enabled:!1})})}G.tabs.onActivated.addListener(({tabId:e})=>{I(e)});G.tabs.onUpdated.addListener((e,t)=>{t.status==="complete"&&I(e)});chrome.contextMenus.onClicked.addListener((e,t)=>{switch(e.menuItemId){case"capsolver-mark-image":ge(t.id);break;case"capsolver-mark-result":me(t.id);break}});function yt(e){return new Promise(t=>setTimeout(t,e))}chrome.webRequest.onBeforeRequest.addListener(async e=>{e.url.includes("https://challenges.cloudflare.com/turnstile/")&&e.url.includes("/api.js")&&await yt(1e3)},{urls:["<all_urls>"]});mt();var Re=(0,ve.bexBackground)(e=>{he(e),de(e)});var m={},Ct=e=>{let t=e.sender.tab,n;if(e.name.indexOf(":")>-1){let s=e.name.split(":");n=s[1],e.name=s[0]}t!==void 0&&(n=t.id);let a=m[n];return a||(a=m[n]={}),a[e.name]={port:e,connected:!0,listening:!1},a[e.name]};chrome.runtime.onConnect.addListener(e=>{let t=Ct(e);t.port.onDisconnect.addListener(()=>{t.connected=!1});let n=new R({listen(a){for(let s in m){let o=m[s];o.app&&!o.app.listening&&(o.app.listening=!0,o.app.port.onMessage.addListener(a)),o.contentScript&&!o.contentScript.listening&&(o.contentScript.port.onMessage.addListener(a),o.contentScript.listening=!0)}},send(a){for(let s in m){let o=m[s];o.app&&o.app.connected&&o.app.port.postMessage(a),o.contentScript&&o.contentScript.connected&&o.contentScript.port.postMessage(a)}}});Re(n,m);for(let a in m){let s=m[a];s.app&&s.contentScript&&bt(s.app,s.contentScript)}});function bt(e,t){e.port.onMessage.addListener(n=>{t.connected&&t.port.postMessage(n)}),t.port.onMessage.addListener(n=>{e.connected&&e.port.postMessage(n)})}})();
