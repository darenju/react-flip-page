!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactFlipPage=e(require("react")):t.ReactFlipPage=e(t.react)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(e){try{return c.call(null,t,0)}catch(e){return c.call(this,t,0)}}}function o(t){if(f===clearTimeout)return clearTimeout(t);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){v&&d&&(v=!1,d.length?h=d.concat(h):g=-1,h.length&&s())}function s(){if(!v){var t=i(a);v=!0;for(var e=h.length;e;){for(d=h,h=[];++g<e;)d&&d[g].run();g=-1,e=h.length}d=null,v=!1,o(t)}}function u(t,e){this.fun=t,this.array=e}function l(){}var c,f,p=t.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(t){f=r}}();var d,h=[],v=!1,g=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new u(t,e)),1!==h.length||v||i(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.prependListener=l,p.prependOnceListener=l,p.listeners=function(t){return[]},p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(t,e,n){"use strict";function r(t){return function(){return t}}var i=function(){};i.thatReturns=r,i.thatReturnsFalse=r(!1),i.thatReturnsTrue=r(!0),i.thatReturnsNull=r(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(t){return t},t.exports=i},function(t,e,n){"use strict";(function(e){function n(t,e,n,i,o,a,s,u){if(r(e),!t){var l;if(void 0===e)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,i,o,a,s,u],f=0;l=new Error(e.replace(/%s/g,function(){return c[f++]})),l.name="Invariant Violation"}throw l.framesToPop=1,l}}var r=function(t){};"production"!==e.env.NODE_ENV&&(r=function(t){if(void 0===t)throw new Error("invariant requires an error message argument")}),t.exports=n}).call(e,n(0))},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";(function(e){var r=n(1),i=r;"production"!==e.env.NODE_ENV&&function(){var t=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var i=0,o="Warning: "+t.replace(/%s/g,function(){return n[i++]});"undefined"!=typeof console&&console.error(o);try{throw new Error(o)}catch(t){}};i=function(e,n){if(void 0===n)throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if(0!==n.indexOf("Failed Composite propType: ")&&!e){for(var r=arguments.length,i=Array(r>2?r-2:0),o=2;o<r;o++)i[o-2]=arguments[o];t.apply(void 0,[n].concat(i))}}}(),t.exports=i}).call(e,n(0))},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(6),l=r(u),c=n(7),f=r(c);n(11);var p=n(17),d=r(p),h=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return Object.assign.apply(Object,[{}].concat(e))},v=function(t){function e(t){i(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.state={page:0,startY:-1,diffY:0,timestamp:0,angle:0,rotate:0,direction:"",lastDirection:"",secondHalfStyle:{},firstHalfStyle:{},hintVisible:!1},n.startMoving=n.startMoving.bind(n),n.moveGesture=n.moveGesture.bind(n),n.stopMoving=n.stopMoving.bind(n),n.reset=n.reset.bind(n),n.mouseLeave=n.mouseLeave.bind(n),n.incrementPage=n.incrementPage.bind(n),n.decrementPage=n.decrementPage.bind(n),n.hasNextPage=n.hasNextPage.bind(n),n.hasPreviousPage=n.hasPreviousPage.bind(n),n.transition="transform "+n.props.animationDuration/1e3+"s ease-in-out",n}return a(e,t),s(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props,n=e.showHint,r=e.showTouchHint;n&&(this.hintTimeout=setTimeout(function(){return t.showHint()},r?1800:1e3)),r&&(this.touchHintTimeout=setTimeout(function(){return t.showTouchHint()},1e3))}},{key:"componentWillUnmount",value:function(){clearTimeout(this.hintTimeout),clearTimeout(this.hintHideTimeout),clearTimeout(this.touchHintTimeout),clearTimeout(this.touchHintHideTimeout)}},{key:"getHeight",value:function(){return this.props.height+"px"}},{key:"getHalfHeight",value:function(){return this.props.height/2+"px"}},{key:"getWidth",value:function(){return this.props.width+"px"}},{key:"getHalfWidth",value:function(){return this.props.width/2+"px"}},{key:"isLastPage",value:function(){return this.state.page+1===u.Children.count(this.props.children)}},{key:"isFirstPage",value:function(){return 0===this.state.page}},{key:"showHint",value:function(){var t=this,e=this.props,n=e.orientation,r=e.perspective,i=this.transition;this.setState({secondHalfStyle:{transition:i}},function(){t.setState({secondHalfStyle:{transition:i,transform:"vertical"===n?"perspective("+r+") rotateX(30deg)":"perspective("+r+") rotateY(-30deg)"}}),t.hintHideTimeout=setTimeout(function(){return t.setState({secondHalfStyle:{transition:i}})},1e3)})}},{key:"showTouchHint",value:function(){var t=this;this.setState({hintVisible:!0},function(){t.touchHintHideTimeout=setTimeout(function(){return t.setState({hintVisible:!1})},4e3)})}},{key:"incrementPage",value:function(){var t=u.Children.count(this.props.children),e=this.state.page;this.setState({page:(e+1)%t})}},{key:"decrementPage",value:function(){var t=u.Children.count(this.props.children),e=this.state.page,n=void 0;n=this.isFirstPage()?t-1:e-1,this.setState({page:n})}},{key:"hasNextPage",value:function(){var t=this.props.loopForever;return!this.isLastPage()||t}},{key:"hasPreviousPage",value:function(){var t=this.props.loopForever;return!this.isFirstPage()||t}},{key:"startMoving",value:function(t){t.preventDefault();var e=t.pageX||t.touches[0].pageX,n=t.pageY||t.touches[0].pageY;this.setState({startX:e,startY:n})}},{key:"moveGesture",value:function(t){t.preventDefault();var e=t.pageX||t.touches[0].pageX,n=t.pageY||t.touches[0].pageY,r=this.props,i=r.orientation,o=r.treshold,a=r.maxAngle,s=r.perspective,u=this.state,l=u.startX,c=u.startY,f=u.diffX,p=u.diffY,d=u.direction,h=u.lastDirection;if(-1!==c){var v=n-c,g=e-l,y="up"===d||"down"===d?v:g,m=y/250*180,b=!1;"up"===d||"left"===d?b=!this.hasNextPage():"down"!==d&&"right"!==d||(b=!this.hasPreviousPage());var w=Math.min(Math.abs(m),b?a:180),x="";""===d&&(Math.abs(g)>o||Math.abs(v)>o)&&(v<0&&"vertical"===i?x="up":v>0&&"vertical"===i?x="down":g<0&&"horizontal"===i?x="left":g>0&&"horizontal"===i&&(x="right"),this.setState({direction:x}));var E=h;p>v?E="up":p<v?E="down":f>g?E="right":f<g&&(E="left"),this.setState({angle:m,rotate:w,timestamp:Date.now(),diffY:v,diffX:g,lastDirection:E}),v<0&&"up"===this.state.direction?this.setState({angle:m,secondHalfStyle:{transform:"perspective("+s+") rotateX("+w+"deg)"}}):v>0&&"down"===this.state.direction?this.setState({angle:m,firstHalfStyle:{transform:"perspective("+s+") rotateX(-"+w+"deg)",zIndex:2}}):g<0&&"left"===this.state.direction?this.setState({angle:m,secondHalfStyle:{transform:"perspective("+s+") rotateY(-"+w+"deg)"}}):g>0&&"right"===this.state.direction&&this.setState({angle:m,firstHalfStyle:{transform:"perspective("+s+") rotateY("+w+"deg)",zIndex:2}})}}},{key:"gotoNextPage",value:function(){var t=this;if(this.hasNextPage()){var e=this.props,n=e.perspective,r=e.orientation,i=e.onPageChange,o=e.animationDuration,a=this.state.page,s=this.transition,u="perspective("+n+") ";u+="vertical"===r?"rotateX(180deg)":"rotateY(-180deg)",this.setState({firstHalfStyle:{transition:s,transform:"",zIndex:"auto"},secondHalfStyle:{transition:s,transform:u}},function(){setTimeout(function(){t.incrementPage(),t.setState({secondHalfStyle:{}},function(){i(a)})},o)})}}},{key:"gotoPreviousPage",value:function(){var t=this;if(this.hasPreviousPage()){var e=this.props,n=e.perspective,r=e.orientation,i=e.onPageChange,o=e.animationDuration,a=this.state.page,s=this.transition,u="perspective("+n+") ";u+="vertical"===r?"rotateX(-180deg)":"rotateY(180deg)",this.setState({firstHalfStyle:{transition:s,transform:u,zIndex:2},secondHalfStyle:{transition:s,transform:""}},function(){setTimeout(function(){t.decrementPage(),t.setState({firstHalfStyle:{}},function(){i(a)})},o)})}}},{key:"stopMoving",value:function(){var t=this.state,e=t.timestamp,n=t.angle,r=t.direction,i=t.lastDirection,o=Date.now()-e,a=this.hasNextPage()&&(n<=-90||o<=20&&"up"===r&&"up"===i||o<=20&&"right"===r&&"right"===i),s=this.hasPreviousPage()&&(n>=90||o<=20&&"down"===r&&"down"===i||o<=20&&"left"===r&&"left"===i);this.reset(),a&&this.gotoNextPage(),s&&this.gotoPreviousPage()}},{key:"beforeItem",value:function(){var t=u.Children.count(this.props.children),e=this.props,n=e.children,r=e.firstComponent,i=e.loopForever;return this.isFirstPage()?i?n[t-1]:r:n[this.state.page-1]}},{key:"afterItem",value:function(){var t=this.props,e=t.children,n=t.lastComponent,r=t.loopForever;return this.isLastPage()?r?e[0]:n:e[this.state.page+1]}},{key:"mouseLeave",value:function(){this.props.flipOnLeave?this.stopMoving():this.reset()}},{key:"reset",value:function(){var t=this.transition;this.setState({startY:-1,startX:-1,angle:0,rotate:0,direction:"",lastDirection:"",secondHalfStyle:{transition:t},firstHalfStyle:{transition:t}})}},{key:"renderPage",value:function(t,e){var n=this.getHeight(),r=this.getHalfHeight(),i=this.getWidth(),o=this.getHalfWidth(),a={height:n},s=(0,u.cloneElement)(t,{style:Object.assign({},t.props.style,a)}),c=this.state,f=c.page,p=c.direction,v=c.rotate,g=this.props,y=g.orientation,m=g.uncutPages,b=g.maskOpacity,w=g.pageBackground,x=g.animationDuration,E=(0,d.default)(f,e,p,v,m,i,o,n,r,y,b,w,x),C=E.container,T=E.part,P=E.visiblePart,k=E.firstHalf,S=E.secondHalf,O=E.face,H=E.back,L=E.before,j=E.after,N=E.cut,R=E.pull,M=E.gradient,I=E.gradientSecondHalfBack,_=E.gradientFirstHalfBack,D=E.gradientSecondHalf,A=E.gradientFirstHalf,F=E.mask,U=E.zIndex,Y=this.beforeItem(),z=this.afterItem(),B=Y&&(0,u.cloneElement)(Y,{style:Object.assign({},Y.props.style,a)}),V=z&&(0,u.cloneElement)(z,{style:Object.assign({},z.props.style,a)});return l.default.createElement("div",{role:"presentation",key:e,onMouseDown:this.startMoving,onTouchStart:this.startMoving,onMouseMove:this.moveGesture,onTouchMove:this.moveGesture,onMouseUp:this.stopMoving,onTouchEnd:this.stopMoving,onMouseLeave:this.mouseLeave,style:C},l.default.createElement("div",{style:h(T,L,N)},B,l.default.createElement("div",{style:F})),l.default.createElement("div",{style:h(T,N,j)},l.default.createElement("div",{style:R},V),l.default.createElement("div",{style:F})),l.default.createElement("div",{style:h(T,P,k,this.state.firstHalfStyle)},l.default.createElement("div",{style:O},l.default.createElement("div",{style:h(N,U)},s),l.default.createElement("div",{style:h(M,A)})),l.default.createElement("div",{style:h(O,H)},l.default.createElement("div",{style:N},l.default.createElement("div",{style:R},B)),l.default.createElement("div",{style:h(M,_)}))),l.default.createElement("div",{style:h(T,P,S,this.state.secondHalfStyle)},l.default.createElement("div",{style:O},l.default.createElement("div",{style:h(N,U)},l.default.createElement("div",{style:R},s)),l.default.createElement("div",{style:h(M,D)})),l.default.createElement("div",{style:h(O,H)},l.default.createElement("div",{style:h(T,j,N)},V),l.default.createElement("div",{style:h(M,I)}))))}},{key:"render",value:function(){var t=this,e=this.props,n=e.style,r=e.children,i=e.className,o=e.orientation,a=e.showTouchHint,s=h(n,{height:this.getHeight(),position:"relative",width:this.getWidth()});return l.default.createElement("div",{style:s,className:i},u.Children.map(r,function(e,n){return t.renderPage(e,n)}),a&&l.default.createElement("div",{className:"rfp-hint rfp-hint--"+o}))}}]),e}(u.Component);v.defaultProps={children:[],orientation:"vertical",animationDuration:200,treshold:10,maxAngle:45,maskOpacity:.4,perspective:"130em",pageBackground:"#fff",firstComponent:null,lastComponent:null,showHint:!1,showTouchHint:!1,uncutPages:!1,style:{},height:480,width:320,onPageChange:function(){},className:"",flipOnLeave:!1,loopForever:!1},v.propTypes={children:f.default.Children,orientation:function(t,e,n){return/(vertical|horizontal)/.test(t[e])?"":new Error("Invalid prop `"+e+"` supplied to  `"+n+"`. Expected `horizontal` or `vertical`. Validation failed.")},animationDuration:f.default.number,treshold:f.default.number,maxAngle:f.default.number,maskOpacity:f.default.number,perspective:f.default.string,pageBackground:f.default.string,firstComponent:f.default.element,flipOnLeave:f.default.bool,lastComponent:f.default.element,showHint:f.default.bool,showTouchHint:f.default.bool,uncutPages:f.default.bool,style:f.default.shape,height:f.default.number,width:f.default.number,onPageChange:f.default.func,className:f.default.string,loopForever:f.default.bool},e.default=v},function(e,n){e.exports=t},function(t,e,n){(function(e){if("production"!==e.env.NODE_ENV){var r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,i=function(t){return"object"==typeof t&&null!==t&&t.$$typeof===r};t.exports=n(8)(i,!0)}else t.exports=n(10)()}).call(e,n(0))},function(t,e,n){"use strict";(function(e){var r=n(1),i=n(2),o=n(4),a=n(3),s=n(9);t.exports=function(t,n){function u(t){var e=t&&(P&&t[P]||t[k]);if("function"==typeof e)return e}function l(t,e){return t===e?0!==t||1/t==1/e:t!==t&&e!==e}function c(t){this.message=t,this.stack=""}function f(t){function r(r,l,f,p,d,h,v){if(p=p||S,h=h||f,v!==a)if(n)i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if("production"!==e.env.NODE_ENV&&"undefined"!=typeof console){var g=p+":"+f;!s[g]&&u<3&&(o(!1,"You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.",h,p),s[g]=!0,u++)}return null==l[f]?r?new c(null===l[f]?"The "+d+" `"+h+"` is marked as required in `"+p+"`, but its value is `null`.":"The "+d+" `"+h+"` is marked as required in `"+p+"`, but its value is `undefined`."):null:t(l,f,p,d,h)}if("production"!==e.env.NODE_ENV)var s={},u=0;var l=r.bind(null,!1);return l.isRequired=r.bind(null,!0),l}function p(t){function e(e,n,r,i,o,a){var s=e[n];if(x(s)!==t)return new c("Invalid "+i+" `"+o+"` of type `"+E(s)+"` supplied to `"+r+"`, expected `"+t+"`.");return null}return f(e)}function d(t){function e(e,n,r,i,o){if("function"!=typeof t)return new c("Property `"+o+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var s=e[n];if(!Array.isArray(s)){return new c("Invalid "+i+" `"+o+"` of type `"+x(s)+"` supplied to `"+r+"`, expected an array.")}for(var u=0;u<s.length;u++){var l=t(s,u,r,i,o+"["+u+"]",a);if(l instanceof Error)return l}return null}return f(e)}function h(t){function e(e,n,r,i,o){if(!(e[n]instanceof t)){var a=t.name||S;return new c("Invalid "+i+" `"+o+"` of type `"+T(e[n])+"` supplied to `"+r+"`, expected instance of `"+a+"`.")}return null}return f(e)}function v(t){function n(e,n,r,i,o){for(var a=e[n],s=0;s<t.length;s++)if(l(a,t[s]))return null;return new c("Invalid "+i+" `"+o+"` of value `"+a+"` supplied to `"+r+"`, expected one of "+JSON.stringify(t)+".")}return Array.isArray(t)?f(n):("production"!==e.env.NODE_ENV&&o(!1,"Invalid argument supplied to oneOf, expected an instance of array."),r.thatReturnsNull)}function g(t){function e(e,n,r,i,o){if("function"!=typeof t)return new c("Property `"+o+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var s=e[n],u=x(s);if("object"!==u)return new c("Invalid "+i+" `"+o+"` of type `"+u+"` supplied to `"+r+"`, expected an object.");for(var l in s)if(s.hasOwnProperty(l)){var f=t(s,l,r,i,o+"."+l,a);if(f instanceof Error)return f}return null}return f(e)}function y(t){function n(e,n,r,i,o){for(var s=0;s<t.length;s++){if(null==(0,t[s])(e,n,r,i,o,a))return null}return new c("Invalid "+i+" `"+o+"` supplied to `"+r+"`.")}if(!Array.isArray(t))return"production"!==e.env.NODE_ENV&&o(!1,"Invalid argument supplied to oneOfType, expected an instance of array."),r.thatReturnsNull;for(var i=0;i<t.length;i++){var s=t[i];if("function"!=typeof s)return o(!1,"Invalid argument supplid to oneOfType. Expected an array of check functions, but received %s at index %s.",C(s),i),r.thatReturnsNull}return f(n)}function m(t){function e(e,n,r,i,o){var s=e[n],u=x(s);if("object"!==u)return new c("Invalid "+i+" `"+o+"` of type `"+u+"` supplied to `"+r+"`, expected `object`.");for(var l in t){var f=t[l];if(f){var p=f(s,l,r,i,o+"."+l,a);if(p)return p}}return null}return f(e)}function b(e){switch(typeof e){case"number":case"string":case"undefined":return!0;case"boolean":return!e;case"object":if(Array.isArray(e))return e.every(b);if(null===e||t(e))return!0;var n=u(e);if(!n)return!1;var r,i=n.call(e);if(n!==e.entries){for(;!(r=i.next()).done;)if(!b(r.value))return!1}else for(;!(r=i.next()).done;){var o=r.value;if(o&&!b(o[1]))return!1}return!0;default:return!1}}function w(t,e){return"symbol"===t||("Symbol"===e["@@toStringTag"]||"function"==typeof Symbol&&e instanceof Symbol)}function x(t){var e=typeof t;return Array.isArray(t)?"array":t instanceof RegExp?"object":w(e,t)?"symbol":e}function E(t){if(void 0===t||null===t)return""+t;var e=x(t);if("object"===e){if(t instanceof Date)return"date";if(t instanceof RegExp)return"regexp"}return e}function C(t){var e=E(t);switch(e){case"array":case"object":return"an "+e;case"boolean":case"date":case"regexp":return"a "+e;default:return e}}function T(t){return t.constructor&&t.constructor.name?t.constructor.name:S}var P="function"==typeof Symbol&&Symbol.iterator,k="@@iterator",S="<<anonymous>>",O={array:p("array"),bool:p("boolean"),func:p("function"),number:p("number"),object:p("object"),string:p("string"),symbol:p("symbol"),any:function(){return f(r.thatReturnsNull)}(),arrayOf:d,element:function(){function e(e,n,r,i,o){var a=e[n];if(!t(a)){return new c("Invalid "+i+" `"+o+"` of type `"+x(a)+"` supplied to `"+r+"`, expected a single ReactElement.")}return null}return f(e)}(),instanceOf:h,node:function(){function t(t,e,n,r,i){return b(t[e])?null:new c("Invalid "+r+" `"+i+"` supplied to `"+n+"`, expected a ReactNode.")}return f(t)}(),objectOf:g,oneOf:v,oneOfType:y,shape:m};return c.prototype=Error.prototype,O.checkPropTypes=s,O.PropTypes=O,O}}).call(e,n(0))},function(t,e,n){"use strict";(function(e){function r(t,n,r,u,l){if("production"!==e.env.NODE_ENV)for(var c in t)if(t.hasOwnProperty(c)){var f;try{i("function"==typeof t[c],"%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.",u||"React class",r,c),f=t[c](n,c,u,r,null,a)}catch(t){f=t}if(o(!f||f instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",u||"React class",r,c,typeof f),f instanceof Error&&!(f.message in s)){s[f.message]=!0;var p=l?l():"";o(!1,"Failed %s type: %s%s",r,f.message,null!=p?p:"")}}}if("production"!==e.env.NODE_ENV)var i=n(2),o=n(4),a=n(3),s={};t.exports=r}).call(e,n(0))},function(t,e,n){"use strict";var r=n(1),i=n(2),o=n(3);t.exports=function(){function t(t,e,n,r,a,s){s!==o&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e};return n.checkPropTypes=r,n.PropTypes=n,n}},function(t,e,n){var r=n(12);"string"==typeof r&&(r=[[t.i,r,""]]);var i={};i.transform=void 0;n(15)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.rfp-hint{animation:2s ease-in-out rfp-hint-vertical 2;background-color:hsla(0,0%,100%,.5);border-radius:15px;box-sizing:border-box;height:30px;opacity:0;pointer-events:none;position:absolute;width:30px}.rfp-hint--vertical{animation-name:rfp-hint-vertical;bottom:20%;left:50%;margin-left:-15px}.rfp-hint--horizontal{animation-name:rfp-hint-horizontal;margin-top:-15px;right:20%;top:50%}.rfp-hint:before{border-radius:15px;border:3px double hsla(0,0%,100%,.5);box-sizing:border-box;content:"";height:28px;position:absolute;width:28px}.rfp-hint--vertical:before{left:50%;margin-left:-14px;top:1px}.rfp-hint--horizontal:before{left:1px;top:1px}.rfp-hint:after{content:url('+n(14)+");position:absolute;top:11px;left:6px}@keyframes rfp-hint-vertical{0%{opacity:0;height:30px}20%,40%{opacity:1;height:30px}60%,80%{opacity:1;height:60%}to{opacity:0;height:60%}}@keyframes rfp-hint-horizontal{0%{opacity:0;width:30px}20%,40%{opacity:1;width:30px}60%,80%{opacity:1;width:60%}to{opacity:0;width:60%}}",""])},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e){t.exports="\"data:image/svg+xml,%3Csvg width='24px' height='29px' viewBox='0 0 24 29' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3Etouch%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='touch'%3E %3Cpath d='M12.1244203,7.32866727 C12.7498203,6.55580421 13.1244203,5.57164839 13.1244203,4.5 C13.1244203,2.0147185 11.1097018,0 8.6244203,0 C6.1391388,0 4.12442034,2.0147185 4.12442034,4.5 C4.12442034,5.57164839 4.49902039,6.55580421 5.1244203,7.32866727 L5.1244203,4.49129639 C5.1244203,2.56125662 6.6914237,1 8.6244203,1 C10.5534837,1 12.1244203,2.56310664 12.1244203,4.49129639 L12.1244203,7.32866727 L12.1244203,7.32866727 L12.1244203,7.32866727 Z' id='one-finger-tap-path' fill='%23000000'%3E%3C/path%3E %3Cpath d='M23.1244203,20.5 C23.1244203,25.1944206 19.3188409,29 14.6244203,29.0000003 C11.5115051,29.0000003 8.2262274,27.5474856 5.9652407,23.4282229 C2.70175208,17.4825159 -1.47172681,13.5832077 0.51553361,11.5959473 C1.9371827,10.1742982 4.16926196,11.5381668 6.1244203,13.3667868 L6.1244203,13.3667868 L6.1244203,4.50840855 C6.1244203,3.11541748 7.2437085,2 8.6244203,2 C10.0147583,2 11.1244203,3.12305276 11.1244203,4.50840855 L11.1244203,9.4983653 C11.5422506,9.1853054 12.0616174,9 12.6244203,9 C13.7069384,9 14.6193054,9.6774672 14.9702378,10.6281239 C15.4110134,10.2379894 15.9901312,10 16.6244203,10 C18.0147583,10 19.1244203,11.1182256 19.1244203,12.4976267 L19.1244203,12.5110883 C19.5422506,12.1985158 20.0616174,12.014191 20.6244203,12.014191 C22.0147583,12.014191 23.1244203,13.1335355 23.1244203,14.5143168 L23.1244203,20.5 L23.1244203,20.5 Z' id='one-finger-tap-path' fill='%23000000'%3E%3C/path%3E %3Cpath d='M14.6231595,27.9999999 C18.7659915,28 22.1244203,24.4147752 22.1244203,20.5 C22.1244203,20.5 22.1244203,22.8132437 22.1244203,20.5 L22.1244203,16.7491622 L22.1244203,14.5016756 C22.1244203,13.6723231 21.4586231,13 20.6244203,13 C19.7959932,13 19.1244203,13.6711894 19.1244203,14.5016756 L19.1244203,15 L18.1244203,15 L18.1244203,12.5064385 C18.1244203,11.6744555 17.4586231,11 16.6244203,11 C15.7959932,11 15.1244203,11.6715406 15.1244203,12.5064385 L15.1244203,14 L14.1244203,14 L14.1244203,11.5064385 C14.1244203,10.6744555 13.4586231,10 12.6244203,10 C11.7959932,10 11.1244203,10.6715406 11.1244203,11.5064385 L11.1244203,15 L10.1244203,15 L10.1244203,4.50524116 C10.1244203,3.67391942 9.4586231,3 8.6244203,3 C7.7959932,3 7.1244203,3.66712976 7.1244203,4.50524116 L7.1244203,15.7999878 C5.0660207,13.599567 2.35605012,11.1791206 1.24545305,12.2957153 C0.15828327,13.3887562 2.95978233,16.4007216 6.8717958,22.9830936 C8.6344162,25.9488875 10.8647052,27.9995418 14.6231595,27.9999999 L14.6231595,27.9999999 Z' id='one-finger-tap-path' fill='%23FFFFFF'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=h[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(c(r.parts[o],e))}else{for(var a=[],o=0;o<r.parts.length;o++)a.push(c(r.parts[o],e));h[r.id]={id:r.id,refs:1,parts:a}}}}function i(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=e.base?o[0]+e.base:o[0],s=o[1],u=o[2],l=o[3],c={css:s,media:u,sourceMap:l};r[a]?r[a].parts.push(c):n.push(r[a]={id:a,parts:[c]})}return n}function o(t,e){var n=g(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=b[b.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),b.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=b.indexOf(t);e>=0&&b.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),o(t,e),e}function u(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),o(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function c(t,e){var n,r,i,o;if(e.transform&&t.css){if(!(o=e.transform(t.css)))return function(){};t.css=o}if(e.singleton){var l=m++;n=y||(y=s(e)),r=f.bind(null,n,l,!1),i=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(e),r=d.bind(null,n,e),i=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),r=p.bind(null,n),i=function(){a(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}function f(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=x(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function p(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=w(r)),i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var h={},v=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),g=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),y=null,m=0,b=[],w=n(16);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=v()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=i(t,e);return r(n,e),function(t){for(var o=[],a=0;a<n.length;a++){var s=n[a],u=h[s.id];u.refs--,o.push(u)}if(t){r(i(t,e),e)}for(var a=0;a<o.length;a++){var u=o[a];if(0===u.refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete h[u.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return t;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r="0 -100px 100px -100px rgba(0,0,0,0.25) inset",i="-100px 0 100px -100px rgba(0,0,0,0.25) inset",o="0 100px 100px -100px rgba(0,0,0,0.25) inset",a="100px 0 100px -100px rgba(0,0,0,0.25) inset";e.default=function(t,e,n,s,u,l,c,f,p,d,h,v,g){return{container:{display:t===e?"block":"none",height:f,overflow:!1===u?"hidden":"",position:"relative",width:l},part:{height:"vertical"===d?p:f,left:0,position:"absolute",width:"vertical"===d?l:c},visiblePart:{transformStyle:"preserve-3d"},firstHalf:{top:0,left:0,transformOrigin:"vertical"===d?"bottom center":"right center"},secondHalf:{left:"vertical"===d?0:c,bottom:0,right:0,transformOrigin:"vertical"===d?"top center":"left center"},face:{backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",height:"vertical"===d?p:f,left:0,position:"absolute",top:0,overflow:"hidden",transformStyle:"preserve-3d",width:"vertical"===d?l:c},back:{transform:"vertical"===d?"rotateX(180deg)":"rotateY(180deg)"},before:{top:0,left:0},after:{top:"vertical"===d?p:0,left:"vertical"===d?0:c,width:"horizontal"===d?c:l},cut:{background:v,height:"vertical"===d?p:f,overflow:"hidden",position:"absolute",left:0,top:0,width:l},pull:{marginTop:"vertical"===d?"-"+p:0,marginLeft:"vertical"===d?0:"-"+c,width:l},gradient:{position:"absolute",left:0,right:0,bottom:0,top:0,transition:"box-shadow "+g/1e3+"s ease-in-out"},gradientSecondHalf:{boxShadow:function(){return"up"===n?o:"right"===n?a:""}()},gradientFirstHalf:{boxShadow:function(){return"down"===n?r:"left"===n?i:""}()},gradientSecondHalfBack:{boxShadow:function(){return"up"===n?r:"left"===n?i:""}()},gradientFirstHalfBack:{boxShadow:function(){return"down"===n?o:"right"===n?a:""}()},mask:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"#000",opacity:""!==n?Math.max(h-Math.abs(s)/90*h,0):0},zIndex:{zIndex:2}}}}])});