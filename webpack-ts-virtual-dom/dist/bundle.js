!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=18)}([function(e,t,n){"use strict";t.__esModule=!0;var r=n(2),o=n(1);function i(e,t,n){var i,a,s,u={};if(void 0!==n?(u=t,o.array(n)?i=n:o.primitive(n)?a=n:n&&n.sel&&(i=[n])):void 0!==t&&(o.array(t)?i=t:o.primitive(t)?a=t:t&&t.sel?i=[t]:u=t),o.array(i))for(s=0;s<i.length;++s)o.primitive(i[s])&&(i[s]=r.vnode(void 0,void 0,void 0,i[s],void 0));return"s"!==e[0]||"v"!==e[1]||"g"!==e[2]||3!==e.length&&"."!==e[3]&&"#"!==e[3]||function e(t,n,r){if(t.ns="http://www.w3.org/2000/svg","foreignObject"!==r&&void 0!==n)for(var o=0;o<n.length;++o){var i=n[o].data;void 0!==i&&e(i,n[o].children,n[o].sel)}}(u,i,e),r.vnode(e,u,i,a,void 0)}t.h=i,t.default=i},function(e,t,n){"use strict";t.__esModule=!0,t.array=Array.isArray,t.primitive=function(e){return"string"==typeof e||"number"==typeof e}},function(e,t,n){"use strict";function r(e,t,n,r,o){return{sel:e,data:t,children:n,text:r,elm:o,key:void 0===t?void 0:t.key}}t.__esModule=!0,t.vnode=r,t.default=r},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),u=null,l=0,f=[],d=n(3);function c(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(g(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(g(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function p(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function v(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),f.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=f.indexOf(e);t>=0&&f.splice(t,1)}function m(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),y(t,e.attrs),v(e,t),t}function y(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var a=l++;n=u||(u=m(t)),r=w.bind(null,n,a,!1),o=w.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",y(t,e.attrs),v(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=d(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),r=function(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return c(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}for(e&&c(p(e,t),t),o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete i[s.id]}}}};var b,x=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n,r=e[1]||"",o=e[3];if(!o)return r;if(t&&"function"==typeof btoa){var i=(n=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),a=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[r].concat(a).concat([i]).join("\n")}return[r].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"#root {\n  color: #f00;\n}\ninput {\n  display: block;\n}\n",""])},function(e,t,n){var r=n(6);"string"==typeof r&&(r=[[e.i,r,""]]);n(4)(r,{hmr:!0,transform:void 0,insertInto:void 0}),r.locals&&(e.exports=r.locals)},function(e,t,n){"use strict";function r(e,t){var n,r=e.data.on,o=e.listener,i=e.elm,a=t&&t.data.on,s=t&&t.elm;if(r!==a){if(r&&o)if(a)for(n in r)a[n]||i.removeEventListener(n,o,!1);else for(n in r)i.removeEventListener(n,o,!1);if(a){var u=t.listener=e.listener||function e(t){!function(e,t){var n=e.type,r=t.data.on;r&&r[n]&&function e(t,n,r){if("function"==typeof t)t.call(n,r,n);else if("object"==typeof t)if("function"==typeof t[0])if(2===t.length)t[0].call(n,t[1],r,n);else{var o=t.slice(1);o.push(r),o.push(n),t[0].apply(n,o)}else for(var i=0;i<t.length;i++)e(t[i])}(r[n],t,e)}(t,e.vnode)};if(u.vnode=t,r)for(n in a)r[n]||s.addEventListener(n,u,!1);else for(n in a)s.addEventListener(n,u,!1)}}}t.__esModule=!0,t.eventListenersModule={create:r,update:r,destroy:r},t.default=t.eventListenersModule},function(e,t,n){"use strict";t.__esModule=!0;var r="undefined"!=typeof window&&window.requestAnimationFrame||setTimeout,o=function(e){r(function(){r(e)})};function i(e,t,n){o(function(){e[t]=n})}function a(e,t){var n,r,o=t.elm,a=e.data.style,s=t.data.style;if((a||s)&&a!==s){a=a||{},s=s||{};var u="delayed"in a;for(r in a)s[r]||("-"===r[0]&&"-"===r[1]?o.style.removeProperty(r):o.style[r]="");for(r in s)if(n=s[r],"delayed"===r&&s.delayed)for(var l in s.delayed)n=s.delayed[l],u&&n===a.delayed[l]||i(o.style,l,n);else"remove"!==r&&n!==a[r]&&("-"===r[0]&&"-"===r[1]?o.style.setProperty(r,n):o.style[r]=n)}}t.styleModule={create:a,update:a,destroy:function(e){var t,n,r=e.elm,o=e.data.style;if(o&&(t=o.destroy))for(n in t)r.style[n]=t[n]},remove:function(e,t){var n=e.data.style;if(n&&n.remove){var r,o=e.elm,i=0,a=n.remove,s=0,u=[];for(r in a)u.push(r),o.style[r]=a[r];for(var l=getComputedStyle(o)["transition-property"].split(", ");i<l.length;++i)-1!==u.indexOf(l[i])&&s++;o.addEventListener("transitionend",function(e){e.target===o&&--s,0===s&&t()})}else t()}},t.default=t.styleModule},function(e,t,n){"use strict";function r(e,t){var n,r,o=t.elm,i=e.data.props,a=t.data.props;if((i||a)&&i!==a){for(n in i=i||{},a=a||{},i)a[n]||delete o[n];for(n in a)r=a[n],i[n]===r||"value"===n&&o[n]===r||(o[n]=r)}}t.__esModule=!0,t.propsModule={create:r,update:r},t.default=t.propsModule},function(e,t,n){"use strict";function r(e,t){var n,r,o=t.elm,i=e.data.class,a=t.data.class;if((i||a)&&i!==a){for(r in i=i||{},a=a||{},i)a[r]||o.classList.remove(r);for(r in a)(n=a[r])!==i[r]&&o.classList[n?"add":"remove"](r)}}t.__esModule=!0,t.classModule={create:r,update:r},t.default=t.classModule},function(e,t,n){"use strict";t.__esModule=!0;var r="http://www.w3.org/1999/xlink",o="http://www.w3.org/XML/1998/namespace",i=58,a=120;function s(e,t){var n,s=t.elm,u=e.data.attrs,l=t.data.attrs;if((u||l)&&u!==l){for(n in u=u||{},l=l||{}){var f=l[n];u[n]!==f&&(!0===f?s.setAttribute(n,""):!1===f?s.removeAttribute(n):n.charCodeAt(0)!==a?s.setAttribute(n,f):n.charCodeAt(3)===i?s.setAttributeNS(o,n,f):n.charCodeAt(5)===i?s.setAttributeNS(r,n,f):s.setAttribute(n,f))}for(n in u)n in l||s.removeAttribute(n)}}t.attributesModule={create:s,update:s},t.default=t.attributesModule},function(e,t,n){"use strict";t.__esModule=!0;var r=n(0);function o(e,t){t.elm=e.elm,e.data.fn=t.data.fn,e.data.args=t.data.args,t.data=e.data,t.children=e.children,t.text=e.text,t.elm=e.elm}function i(e){var t=e.data;o(t.fn.apply(void 0,t.args),e)}function a(e,t){var n,r=e.data,i=t.data,a=r.args,s=i.args;if(r.fn===i.fn&&a.length===s.length){for(n=0;n<s.length;++n)if(a[n]!==s[n])return void o(i.fn.apply(void 0,s),t);o(e,t)}else o(i.fn.apply(void 0,s),t)}t.thunk=function(e,t,n,o){return void 0===o&&(o=n,n=t,t=void 0),r.h(e,{key:t,hook:{init:i,prepatch:a},fn:n,args:o})},t.default=t.thunk},function(e,t,n){"use strict";t.__esModule=!0,t.htmlDomApi={createElement:function(e){return document.createElement(e)},createElementNS:function(e,t){return document.createElementNS(e,t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},getTextContent:function(e){return e.textContent},isElement:function(e){return 1===e.nodeType},isText:function(e){return 3===e.nodeType},isComment:function(e){return 8===e.nodeType}},t.default=t.htmlDomApi},function(e,t,n){"use strict";t.__esModule=!0;var r=n(2),o=n(1),i=n(14);function a(e){return void 0===e}function s(e){return void 0!==e}var u=r.default("",{},[],void 0,void 0);function l(e,t){return e.key===t.key&&e.sel===t.sel}function f(e,t,n){var r,o,i,a={};for(r=t;r<=n;++r)null!=(i=e[r])&&void 0!==(o=i.key)&&(a[o]=r);return a}var d=["create","update","remove","destroy","pre","post"],c=n(0);t.h=c.h;var p=n(13);t.thunk=p.thunk,t.init=function(e,t){var n,c,p={},v=void 0!==t?t:i.default;for(n=0;n<d.length;++n)for(p[d[n]]=[],c=0;c<e.length;++c){var h=e[c][d[n]];void 0!==h&&p[d[n]].push(h)}function m(e,t){return function(){if(0==--t){var n=v.parentNode(e);v.removeChild(n,e)}}}function y(e,t){var n,r=e.data;void 0!==r&&s(n=r.hook)&&s(n=n.init)&&(n(e),r=e.data);var i=e.children,l=e.sel;if("!"===l)a(e.text)&&(e.text=""),e.elm=v.createComment(e.text);else if(void 0!==l){var f=l.indexOf("#"),d=l.indexOf(".",f),c=f>0?f:l.length,h=d>0?d:l.length,m=-1!==f||-1!==d?l.slice(0,Math.min(c,h)):l,g=e.elm=s(r)&&s(n=r.ns)?v.createElementNS(n,m):v.createElement(m);for(c<h&&g.setAttribute("id",l.slice(c+1,h)),d>0&&g.setAttribute("class",l.slice(h+1).replace(/\./g," ")),n=0;n<p.create.length;++n)p.create[n](u,e);if(o.array(i))for(n=0;n<i.length;++n){var b=i[n];null!=b&&v.appendChild(g,y(b,t))}else o.primitive(e.text)&&v.appendChild(g,v.createTextNode(e.text));s(n=e.data.hook)&&(n.create&&n.create(u,e),n.insert&&t.push(e))}else e.elm=v.createTextNode(e.text);return e.elm}function g(e,t,n,r,o,i){for(;r<=o;++r){var a=n[r];null!=a&&v.insertBefore(e,y(a,i),t)}}function b(e){var t,n,r=e.data;if(void 0!==r){for(s(t=r.hook)&&s(t=t.destroy)&&t(e),t=0;t<p.destroy.length;++t)p.destroy[t](e);if(void 0!==e.children)for(n=0;n<e.children.length;++n)null!=(t=e.children[n])&&"string"!=typeof t&&b(t)}}function x(e,t,n,r){for(;n<=r;++n){var o=void 0,i=void 0,a=void 0,u=t[n];if(null!=u)if(s(u.sel)){for(b(u),i=p.remove.length+1,a=m(u.elm,i),o=0;o<p.remove.length;++o)p.remove[o](u,a);s(o=u.data)&&s(o=o.hook)&&s(o=o.remove)?o(u,a):a()}else v.removeChild(e,u.elm)}}function w(e,t,n){var r,o;s(r=t.data)&&s(o=r.hook)&&s(r=o.prepatch)&&r(e,t);var i=t.elm=e.elm,u=e.children,d=t.children;if(e!==t){if(void 0!==t.data){for(r=0;r<p.update.length;++r)p.update[r](e,t);s(r=t.data.hook)&&s(r=r.update)&&r(e,t)}a(t.text)?s(u)&&s(d)?u!==d&&function(e,t,n,r){for(var o,i,s,u=0,d=0,c=t.length-1,p=t[0],h=t[c],m=n.length-1,b=n[0],M=n[m];u<=c&&d<=m;)null==p?p=t[++u]:null==h?h=t[--c]:null==b?b=n[++d]:null==M?M=n[--m]:l(p,b)?(w(p,b,r),p=t[++u],b=n[++d]):l(h,M)?(w(h,M,r),h=t[--c],M=n[--m]):l(p,M)?(w(p,M,r),v.insertBefore(e,p.elm,v.nextSibling(h.elm)),p=t[++u],M=n[--m]):l(h,b)?(w(h,b,r),v.insertBefore(e,h.elm,p.elm),h=t[--c],b=n[++d]):(void 0===o&&(o=f(t,u,c)),a(i=o[b.key])?(v.insertBefore(e,y(b,r),p.elm),b=n[++d]):((s=t[i]).sel!==b.sel?v.insertBefore(e,y(b,r),p.elm):(w(s,b,r),t[i]=void 0,v.insertBefore(e,s.elm,p.elm)),b=n[++d]));(u<=c||d<=m)&&(u>c?g(e,null==n[m+1]?null:n[m+1].elm,n,d,m,r):x(e,t,u,c))}(i,u,d,n):s(d)?(s(e.text)&&v.setTextContent(i,""),g(i,null,d,0,d.length-1,n)):s(u)?x(i,u,0,u.length-1):s(e.text)&&v.setTextContent(i,""):e.text!==t.text&&v.setTextContent(i,t.text),s(o)&&s(r=o.postpatch)&&r(e,t)}}return function(e,t){var n,o,i,a=[];for(n=0;n<p.pre.length;++n)p.pre[n]();for(function(e){return void 0!==e.sel}(e)||(e=function(e){var t=e.id?"#"+e.id:"",n=e.className?"."+e.className.split(" ").join("."):"";return r.default(v.tagName(e).toLowerCase()+t+n,{},[],void 0,e)}(e)),l(e,t)?w(e,t,a):(o=e.elm,i=v.parentNode(o),y(t,a),null!==i&&(v.insertBefore(i,t.elm,v.nextSibling(o)),x(i,[e],0,0))),n=0;n<a.length;++n)a[n].data.hook.insert(a[n]);for(n=0;n<p.post.length;++n)p.post[n]();return t}}},function(e,t,n){"use strict";t.__esModule=!0;var r=n(15),o=n(12),i=n(11),a=n(10),s=n(9),u=n(8),l=n(0),f=r.init([o.attributesModule,i.classModule,a.propsModule,s.styleModule,u.eventListenersModule]);t.snabbdomBundle={patch:f,h:l.h},t.default=t.snabbdomBundle},function(e,t,n){"use strict";t.__esModule=!0;var r=n(16),o=function(){function e(e,t){this.name=e,this.age=t,this.h=r.default.h}return e.prototype.initDom=function(e){this.render(e)},e.prototype.addAge=function(){this.age++,this.render(this.oldVnode)},e.prototype.render=function(e){return r.default.patch(e||this.oldVnode,this.createDomTemplate())},e.prototype.changeName=function(e){this.name=e.currentTarget.value,this.render(this.oldVnode)},e.prototype.createDomTemplate=function(){return this.oldVnode=this.h("div#root",[this.h("div.container","Name: "+this.name+" And Age: "+this.age),this.h("button",{on:{click:[this.addAge.bind(this)]}},"Add"),this.h("input",{on:{input:[this.changeName.bind(this)]}})])},e}();t.default=o},function(e,t,n){"use strict";t.__esModule=!0;var r=n(17);n(7),new r.default("Develpment Case",15).initDom(document.querySelector("#root"))}]);