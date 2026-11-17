var cd=Object.defineProperty;var hd=(i,t,e)=>t in i?cd(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Bt=(i,t,e)=>hd(i,typeof t!="symbol"?t+"":t,e);var yc="1.3.27";function bc(i,t,e){return Math.max(i,Math.min(t,e))}function ud(i,t,e){return(1-e)*i+e*t}function dd(i,t,e,n){return ud(i,t,1-Math.exp(-e*n))}function fd(i,t){return(i%t+t)%t}var pd=class{constructor(){Bt(this,"isRunning",!1);Bt(this,"value",0);Bt(this,"from",0);Bt(this,"to",0);Bt(this,"currentTime",0);Bt(this,"lerp");Bt(this,"duration");Bt(this,"easing");Bt(this,"onUpdate")}advance(i){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=i;let e=bc(0,this.currentTime/this.duration,1);t=e>=1;let n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=dd(this.value,this.to,this.lerp*60,i),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(i,t,{lerp:e,duration:n,easing:s,onStart:r,onUpdate:o}){this.from=this.value=i,this.to=t,this.lerp=e,this.duration=n,this.easing=s,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=o}};function md(i,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,i.apply(this,n)},t)}}var gd=class{constructor(i,t,{autoResize:e=!0,debounce:n=250}={}){Bt(this,"width",0);Bt(this,"height",0);Bt(this,"scrollHeight",0);Bt(this,"scrollWidth",0);Bt(this,"debouncedResize");Bt(this,"wrapperResizeObserver");Bt(this,"contentResizeObserver");Bt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Bt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Bt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=i,this.content=t,e&&(this.debouncedResize=md(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Ec=class{constructor(){Bt(this,"events",{})}emit(i,...t){let e=this.events[i]||[];for(let n=0,s=e.length;n<s;n++)e[n]?.(...t)}on(i,t){return this.events[i]?this.events[i].push(t):this.events[i]=[t],()=>{this.events[i]=this.events[i]?.filter(e=>t!==e)}}off(i,t){this.events[i]=this.events[i]?.filter(e=>t!==e)}destroy(){this.events={}}},_d=100/6,ai={passive:!1};function Mc(i,t){return i===1?_d:i===2?t:1}var xd=class{constructor(i,t={wheelMultiplier:1,touchMultiplier:1}){Bt(this,"touchStart",{x:0,y:0});Bt(this,"lastDelta",{x:0,y:0});Bt(this,"window",{width:0,height:0});Bt(this,"emitter",new Ec);Bt(this,"onTouchStart",i=>{let{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:i})});Bt(this,"onTouchMove",i=>{let{clientX:t,clientY:e}=i.targetTouches?i.targetTouches[0]:i,n=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:s},this.emitter.emit("scroll",{deltaX:n,deltaY:s,event:i})});Bt(this,"onTouchEnd",i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})});Bt(this,"onWheel",i=>{let{deltaX:t,deltaY:e,deltaMode:n}=i,s=Mc(n,this.window.width),r=Mc(n,this.window.height);t*=s,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:i})});Bt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=i,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ai),this.element.addEventListener("touchstart",this.onTouchStart,ai),this.element.addEventListener("touchmove",this.onTouchMove,ai),this.element.addEventListener("touchend",this.onTouchEnd,ai)}on(i,t){return this.emitter.on(i,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,ai),this.element.removeEventListener("touchstart",this.onTouchStart,ai),this.element.removeEventListener("touchmove",this.onTouchMove,ai),this.element.removeEventListener("touchend",this.onTouchEnd,ai)}},Sc=i=>Math.min(1,1.001-2**(-10*i)),wc=class{constructor({wrapper:i=window,content:t=document.documentElement,eventsTarget:e=i,smoothWheel:n=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:c,lerp:l=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:m=1,autoResize:x=!0,prevent:g,virtualScroll:p,overscroll:v=!0,autoRaf:E=!1,anchors:y=!1,autoToggle:T=!1,allowNestedScroll:w=!1,__experimental__naiveDimensions:_=!1,naiveDimensions:b=_,stopInertiaOnNavigate:U=!1,respectReducedMotion:I=!0}={}){Bt(this,"_isScrolling",!1);Bt(this,"_isStopped",!1);Bt(this,"_isLocked",!1);Bt(this,"_preventNextNativeScrollEvent",!1);Bt(this,"_resetVelocityTimeout",null);Bt(this,"_rafId",null);Bt(this,"_isDraggingSelection",!1);Bt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Bt(this,"isTouching");Bt(this,"isIos");Bt(this,"time",0);Bt(this,"userData",{});Bt(this,"lastVelocity",0);Bt(this,"velocity",0);Bt(this,"direction",0);Bt(this,"options");Bt(this,"targetScroll");Bt(this,"animatedScroll");Bt(this,"animate",new pd);Bt(this,"emitter",new Ec);Bt(this,"dimensions");Bt(this,"virtualScroll");Bt(this,"onScrollEnd",i=>{i instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&i.stopPropagation()});Bt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Bt(this,"onTransitionEnd",i=>{i.propertyName?.includes("overflow")&&i.target===this.rootElement&&this.checkOverflow()});Bt(this,"onClick",i=>{let t=i.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){let n=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(n){let s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(n.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Bt(this,"onPointerDown",i=>{i.button===1&&this.reset()});Bt(this,"onVirtualScroll",i=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(i)===!1)return;let{deltaX:t,deltaY:e,event:n}=i;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;let s=n.type.includes("touch"),r=n.type.includes("wheel");if(s&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";let o=t===0&&e===0;if(this.options.syncTouch&&s&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(c.find(m=>m instanceof HTMLElement&&(typeof l=="function"&&l?.(m)||m.hasAttribute?.("data-lenis-prevent")||u==="vertical"&&m.hasAttribute?.("data-lenis-prevent-vertical")||u==="horizontal"&&m.hasAttribute?.("data-lenis-prevent-horizontal")||s&&m.hasAttribute?.("data-lenis-prevent-touch")||r&&m.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(m,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();let h=s&&this.options.syncTouch,f=s&&n.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Bt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let i=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-i,this.direction=Math.sign(this.animatedScroll-i),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Bt(this,"raf",i=>{let t=i-(this.time||i);this.time=i,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=yc,window.lenis||(window.lenis={}),window.lenis.version=yc,d==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!i||i===document.documentElement)&&(i=window),typeof a=="number"&&typeof c!="function"?c=Sc:typeof c=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:i,content:t,eventsTarget:e,smoothWheel:n,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:c,lerp:l,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:m,autoResize:x,prevent:g,virtualScroll:p,overscroll:v,autoRaf:E,anchors:y,autoToggle:T,allowNestedScroll:w,naiveDimensions:b,stopInertiaOnNavigate:U,respectReducedMotion:I},this.dimensions=new gd(i,t,{autoResize:x}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new xd(e,{touchMultiplier:f,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(i,t){return this.emitter.on(i,t)}off(i,t){return this.emitter.off(i,t)}get overflow(){let i=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[i]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(i){this.isHorizontal?this.options.wrapper.scrollTo({left:i,behavior:"instant"}):this.options.wrapper.scrollTo({top:i,behavior:"instant"})}isTouchOnSelectionHandle(i){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let e=i.targetTouches[0]??i.changedTouches[0];if(!e)return!1;let n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;let s=n[0],r=n[n.length-1],o=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=o,c=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||c}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(i,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:o=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:c,onComplete:l,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(s?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=i,f=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let m=null;if(typeof h=="string"?(m=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),m||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof Element&&(m=h),m){if(this.options.wrapper!==window){let y=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?y.left:y.top}let x=m.getBoundingClientRect(),g=getComputedStyle(m),p=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),v=getComputedStyle(this.rootElement),E=this.isHorizontal?Number.parseFloat(v.scrollPaddingLeft):Number.parseFloat(v.scrollPaddingTop);h=(this.isHorizontal?x.left:x.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(E)?0:E)}}if(typeof h=="number"){if(h+=f,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;let m=h-this.animatedScroll;m>this.limit/2?h-=this.limit:m<-this.limit/2&&(h+=this.limit)}}else h=bc(0,h,this.limit);if(h===this.targetScroll){c?.(this),l?.(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof o=="number"&&typeof a!="function"?a=Sc:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,h,{duration:o,easing:a,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",c?.(this)},onUpdate:(m,x)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),s&&(this.targetScroll=m),x||this.emit(),x&&(this.reset(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(i,{deltaX:t,deltaY:e}){let n=Date.now();i._lenis||(i._lenis={});let s=i._lenis,r,o,a,c,l,u,d,h,f,m;if(n-(s.time??0)>2e3){s.time=Date.now();let w=window.getComputedStyle(i);if(s.computedStyle=w,r=["auto","overlay","scroll"].includes(w.overflowX),o=["auto","overlay","scroll"].includes(w.overflowY),l=["auto"].includes(w.overscrollBehaviorX),u=["auto"].includes(w.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=o,!(r||o))return!1;d=i.scrollWidth,h=i.scrollHeight,f=i.clientWidth,m=i.clientHeight,a=d>f,c=h>m,s.isScrollableX=a,s.isScrollableY=c,s.scrollWidth=d,s.scrollHeight=h,s.clientWidth=f,s.clientHeight=m,s.hasOverscrollBehaviorX=l,s.hasOverscrollBehaviorY=u}else a=s.isScrollableX,c=s.isScrollableY,r=s.hasOverflowX,o=s.hasOverflowY,d=s.scrollWidth,h=s.scrollHeight,f=s.clientWidth,m=s.clientHeight,l=s.hasOverscrollBehaviorX,u=s.hasOverscrollBehaviorY;if(!(r&&a||o&&c))return!1;let x=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical",g,p,v,E,y,T;if(x==="horizontal")g=Math.round(i.scrollLeft),p=d-f,v=t,E=r,y=a,T=l;else if(x==="vertical")g=Math.round(i.scrollTop),p=h-m,v=e,E=o,y=c,T=u;else return!1;return!T&&(g>=p||g<=0)?!0:(v>0?g<p:g>0)&&E&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let i=this.options.wrapper;return this.isHorizontal?i.scrollX??i.scrollLeft:i.scrollY??i.scrollTop}get scroll(){return this.options.infinite?fd(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(i){this._isScrolling!==i&&(this._isScrolling=i,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(i){this._isStopped!==i&&(this._isStopped=i,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(i){this._isLocked!==i&&(this._isLocked=i,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let i="lenis";return this.options.autoToggle&&(i+=" lenis-autoToggle"),this.isStopped&&(i+=" lenis-stopped"),this.isLocked&&(i+=" lenis-locked"),this.isScrolling&&(i+=" lenis-scrolling"),this.isScrolling==="smooth"&&(i+=" lenis-smooth"),i}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(i=>{this.rootElement.classList.add(i)})}cleanUpClassName(){for(let i of Array.from(this.rootElement.classList))(i==="lenis"||i.startsWith("lenis-"))&&this.rootElement.classList.remove(i)}};var Tc=i=>.5-.5*Math.cos(Math.PI*i),Fe={value:.3,delta:0,hold:0,holding:!1,label:"tarik",t:0,update(i,t){this.t+=i;let e=this.t%10,n=t?.35:e<4?Tc(e/4):1-Tc((e-4)/6),s=this.holding?1:0;this.hold+=(s-this.hold)*(1-Math.exp(-i*(this.holding?1.5:2.4)));let r=n+(1.3-n)*this.hold;this.delta=r-this.value,this.value=r,this.label=this.holding?"tahan":t?"napas":e<4?"tarik":"hembus"}};var oh=0,ml=1,ah=2;var hr=1,lh=2,vs=3,Mi=0,Ye=1,$e=2,Ui=0,ys=1,Fi=2,gl=3,_l=4,ch=5;var Oi=100,hh=101,uh=102,dh=103,fh=104,ph=200,mh=201,gh=202,_h=203,xl=204,vl=205,xh=206,vh=207,yh=208,Mh=209,Sh=210,bh=211,Eh=212,wh=213,Th=214,io=0,so=1,ro=2,cs=3,oo=4,ao=5,lo=6,co=7,Ho=0,Ah=1,Rh=2,kn=0,yl=1,Ml=2,Sl=3,bl=4,El=5,wl=6,Bi=7;var Tl=300,zi=301,Ms=302,Go=303,Vo=304,pi=1e3,Un=1001,ho=1002,ze=1003,Ch=1004;var ur=1005;var rn=1006,Wo=1007;var ii=1008;var an=1009,Al=1010,Rl=1011,Ss=1012,Xo=1013,In=1014,bn=1015,Pn=1016,qo=1017,Yo=1018,ki=1020,Cl=35902,Il=35899,Pl=1021,Ll=1022,Ln=1023,Kn=1026,si=1027,$o=1028,Zo=1029,Si=1030,Jo=1031;var Ko=1033,dr=33776,fr=33777,pr=33778,mr=33779,Qo=35840,jo=35841,ta=35842,ea=35843,na=36196,ia=37492,sa=37496,ra=37488,oa=37489,gr=37490,aa=37491,la=37808,ca=37809,ha=37810,ua=37811,da=37812,fa=37813,pa=37814,ma=37815,ga=37816,_a=37817,xa=37818,va=37819,ya=37820,Ma=37821,Sa=36492,ba=36494,Ea=36495,wa=36283,Ta=36284,_r=36285,Aa=36286;var Gs=2300,uo=2301,eo=2302,rl=2303,ol=2400,al=2401,ll=2402;var Ih=3200;var xr=0,Ph=1,ri="",Te="srgb",Vs="srgb-linear",Ws="linear",ge="srgb";var no=7680;var Lh=519,Nh=512,Dh=513,Uh=514,Nl=515,Fh=516,Oh=517,Dl=518,Ul=519,Bh=35044,vr=35048;var Fl="300 es",_n=2e3,hs=2001;function vd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function yd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zh(){let i=Xs("canvas");return i.style.display="block",i}var Ac={},us=null;function Ol(...i){let t="THREE."+i.shift();us?us("log",t,...i):console.log(t,...i)}function kh(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Xt(...i){i=kh(i);let t="THREE."+i.shift();if(us)us("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Yt(...i){i=kh(i);let t="THREE."+i.shift();if(us)us("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Ni(...i){let t=i.join(" ");t in Ac||(Ac[t]=!0,Xt(...i))}function Hh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Gh={[io]:io,[ro]:lo,[oo]:oo,[cs]:ao,[so]:so,[lo]:ro,[co]:co,[ao]:cs},Fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rc=1234567,Bs=Math.PI/180,ds=180/Math.PI;function bs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[i&255]+Qe[i>>8&255]+Qe[i>>16&255]+Qe[i>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function Bl(i,t){return(i%t+t)%t}function Md(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Sd(i,t,e){return i!==t?(e-i)/(t-i):0}function zs(i,t,e){return(1-e)*i+e*t}function bd(i,t,e,n){return zs(i,t,1-Math.exp(-e*n))}function Ed(i,t=1){return t-Math.abs(Bl(i,t*2)-t)}function wd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Td(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ad(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Rd(i,t){return i+Math.random()*(t-i)}function Cd(i){return i*(.5-Math.random())}function Id(i){i!==void 0&&(Rc=i);let t=Rc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Pd(i){return i*Bs}function Ld(i){return i*ds}function Nd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Dd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function zl(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ud(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),h=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*u,a*l);break;default:Xt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function kl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Vh(i,t){if(t.constructor===Float32Array)return i;let e=kl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Wh(i,t){if(t.constructor===Float32Array)return i;let e=kl(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var Ra={DEG2RAD:Bs,RAD2DEG:ds,generateUUID:bs,clamp:ee,euclideanModulo:Bl,mapLinear:Md,inverseLerp:Sd,lerp:zs,damp:bd,pingpong:Ed,smoothstep:wd,smootherstep:Td,randInt:Ad,randFloat:Rd,randFloatSpread:Cd,seededRandom:Id,degToRad:Pd,radToDeg:Ld,isPowerOfTwo:Nd,ceilPowerOfTwo:Dd,floorPowerOfTwo:zl,setQuaternionFromProperEuler:Ud,normalize:Wh,denormalize:Vh},ql=class ql{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ql.prototype.isVector2=!0;var At=ql,Xe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],h=r[o+0],f=r[o+1],m=r[o+2],x=r[o+3];if(d!==x||c!==h||l!==f||u!==m){let g=c*h+l*f+u*m+d*x;g<0&&(h=-h,f=-f,m=-m,x=-x,g=-g);let p=1-a;if(g<.9995){let v=Math.acos(g),E=Math.sin(v);p=Math.sin(p*v)/E,a=Math.sin(a*v)/E,c=c*p+h*a,l=l*p+f*a,u=u*p+m*a,d=d*p+x*a}else{c=c*p+h*a,l=l*p+f*a,u=u*p+m*a,d=d*p+x*a;let v=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=v,l*=v,u*=v,d*=v}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],h=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+u*d+c*f-l*h,t[e+1]=c*m+u*h+l*d-a*f,t[e+2]=l*m+u*f+a*h-c*d,t[e+3]=u*m-a*d-c*h-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),h=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d+h*f*m;break;case"YZX":this._x=h*u*d+l*f*m,this._y=l*f*d+h*u*m,this._z=l*u*m-h*f*d,this._w=l*u*d-h*f*m;break;case"XZY":this._x=h*u*d-l*f*m,this._y=l*f*d-h*u*m,this._z=l*u*m+h*f*d,this._w=l*u*d+h*f*m;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],d=e[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Yl=class Yl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fa.copy(this).projectOnVector(t),this.sub(Fa)}reflect(t){return this.sub(Fa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yl.prototype.isVector3=!0;var D=Yl,Fa=new D,Cc=new Xe,$l=class $l{constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],m=n[8],x=s[0],g=s[3],p=s[6],v=s[1],E=s[4],y=s[7],T=s[2],w=s[5],_=s[8];return r[0]=o*x+a*v+c*T,r[3]=o*g+a*E+c*w,r[6]=o*p+a*y+c*_,r[1]=l*x+u*v+d*T,r[4]=l*g+u*E+d*w,r[7]=l*p+u*y+d*_,r[2]=h*x+f*v+m*T,r[5]=h*g+f*E+m*w,r[8]=h*p+f*y+m*_,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=u*o-a*l,h=a*c-u*r,f=l*r-o*c,m=e*d+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return t[0]=d*x,t[1]=(s*l-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=h*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Oa.makeScale(t,e)),this}rotate(t){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Oa.makeRotation(-t)),this}translate(t,e){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Oa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};$l.prototype.isMatrix3=!0;var Zt=$l,Oa=new Zt,Ic=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pc=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fd(){let i={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ge&&(s.r=Jn(s.r),s.g=Jn(s.g),s.b=Jn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ge&&(s.r=ls(s.r),s.g=ls(s.g),s.b=ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?Ws:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vs]:{primaries:t,whitePoint:n,transfer:Ws,toXYZ:Ic,fromXYZ:Pc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Te},outputColorSpaceConfig:{drawingBufferColorSpace:Te}},[Te]:{primaries:t,whitePoint:n,transfer:ge,toXYZ:Ic,fromXYZ:Pc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Te}}}),i}var oe=Fd();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var $i,fo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{$i===void 0&&($i=Xs("canvas")),$i.width=t.width,$i.height=t.height;let s=$i.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=$i}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Xs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Jn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Jn(e[n]/255)*255):e[n]=Jn(e[n]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Od=0,fs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=bs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ba(s[o].image)):r.push(Ba(s[o]))}else r=Ba(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ba(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?fo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var Bd=0,za=new D,on=class i extends Fn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Un,s=Un,r=rn,o=ii,a=Ln,c=an,l=i.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=bs(),this.name="",this.source=new fs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(za).x}get height(){return this.source.getSize(za).y}get depth(){return this.source.getSize(za).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case pi:t.x=t.x-Math.floor(t.x);break;case Un:t.x=t.x<0?0:1;break;case ho:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case pi:t.y=t.y-Math.floor(t.y);break;case Un:t.y=t.y<0?0:1;break;case ho:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Tl;on.DEFAULT_ANISOTROPY=1;var Zl=class Zl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(l+1)/2,y=(f+1)/2,T=(p+1)/2,w=(u+h)/4,_=(d+x)/4,b=(m+g)/4;return E>y&&E>T?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=_/n):y>T?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=w/s,r=b/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=_/r,s=b/r),this.set(n,s,r,e),this}let v=Math.sqrt((g-m)*(g-m)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(d-x)/v,this.z=(h-u)/v,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Zl.prototype.isVector4=!0;var be=Zl,po=class extends Fn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new on({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new fs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends po{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},qs=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var mo=class extends on{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ze,this.minFilter=ze,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ko=class ko{constructor(t,e,n,s,r,o,a,c,l,u,d,h,f,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,d,h,f,m,x,g)}set(t,e,n,s,r,o,a,c,l,u,d,h,f,m,x,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ko().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=o*u,f=o*d,m=a*u,x=a*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=f+m*l,e[5]=h-x*l,e[9]=-a*c,e[2]=x-h*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let h=c*u,f=c*d,m=l*u,x=l*d;e[0]=h+x*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=x+h*a,e[10]=o*c}else if(t.order==="ZXY"){let h=c*u,f=c*d,m=l*u,x=l*d;e[0]=h-x*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=x-h*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let h=o*u,f=o*d,m=a*u,x=a*d;e[0]=c*u,e[4]=m*l-f,e[8]=h*l+x,e[1]=c*d,e[5]=x*l+h,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let h=o*c,f=o*l,m=a*c,x=a*l;e[0]=c*u,e[4]=x-h*d,e[8]=m*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=f*d+m,e[10]=h-x*d}else if(t.order==="XZY"){let h=o*c,f=o*l,m=a*c,x=a*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=h*d+x,e[5]=o*u,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*u,e[10]=x*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zd,t,kd)}lookAt(t,e,n){let s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),li.crossVectors(n,ln),li.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),li.crossVectors(n,ln)),li.normalize(),Lr.crossVectors(ln,li),s[0]=li.x,s[4]=Lr.x,s[8]=ln.x,s[1]=li.y,s[5]=Lr.y,s[9]=ln.y,s[2]=li.z,s[6]=Lr.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],v=n[3],E=n[7],y=n[11],T=n[15],w=s[0],_=s[4],b=s[8],U=s[12],I=s[1],z=s[5],k=s[9],J=s[13],N=s[2],H=s[6],G=s[10],X=s[14],rt=s[3],$=s[7],et=s[11],nt=s[15];return r[0]=o*w+a*I+c*N+l*rt,r[4]=o*_+a*z+c*H+l*$,r[8]=o*b+a*k+c*G+l*et,r[12]=o*U+a*J+c*X+l*nt,r[1]=u*w+d*I+h*N+f*rt,r[5]=u*_+d*z+h*H+f*$,r[9]=u*b+d*k+h*G+f*et,r[13]=u*U+d*J+h*X+f*nt,r[2]=m*w+x*I+g*N+p*rt,r[6]=m*_+x*z+g*H+p*$,r[10]=m*b+x*k+g*G+p*et,r[14]=m*U+x*J+g*X+p*nt,r[3]=v*w+E*I+y*N+T*rt,r[7]=v*_+E*z+y*H+T*$,r[11]=v*b+E*k+y*G+T*et,r[15]=v*U+E*J+y*X+T*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],f=t[14],m=t[3],x=t[7],g=t[11],p=t[15],v=c*f-l*h,E=a*f-l*d,y=a*h-c*d,T=o*f-l*u,w=o*h-c*u,_=o*d-a*u;return e*(x*v-g*E+p*y)-n*(m*v-g*T+p*w)+s*(m*E-x*T+p*_)-r*(m*y-x*w+g*_)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],u=t[10];return e*(o*u-a*l)-n*(r*u-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],f=t[11],m=t[12],x=t[13],g=t[14],p=t[15],v=e*a-n*o,E=e*c-s*o,y=e*l-r*o,T=n*c-s*a,w=n*l-r*a,_=s*l-r*c,b=u*x-d*m,U=u*g-h*m,I=u*p-f*m,z=d*g-h*x,k=d*p-f*x,J=h*p-f*g,N=v*J-E*k+y*z+T*I-w*U+_*b;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/N;return t[0]=(a*J-c*k+l*z)*H,t[1]=(s*k-n*J-r*z)*H,t[2]=(x*_-g*w+p*T)*H,t[3]=(h*w-d*_-f*T)*H,t[4]=(c*I-o*J-l*U)*H,t[5]=(e*J-s*I+r*U)*H,t[6]=(g*y-m*_-p*E)*H,t[7]=(u*_-h*y+f*E)*H,t[8]=(o*k-a*I+l*b)*H,t[9]=(n*I-e*k-r*b)*H,t[10]=(m*w-x*y+p*v)*H,t[11]=(d*y-u*w-f*v)*H,t[12]=(a*U-o*z-c*b)*H,t[13]=(e*z-n*U+s*b)*H,t[14]=(x*E-m*T-g*v)*H,t[15]=(u*T-d*E+h*v)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,d=a+a,h=r*l,f=r*u,m=r*d,x=o*u,g=o*d,p=a*d,v=c*l,E=c*u,y=c*d,T=n.x,w=n.y,_=n.z;return s[0]=(1-(x+p))*T,s[1]=(f+y)*T,s[2]=(m-E)*T,s[3]=0,s[4]=(f-y)*w,s[5]=(1-(h+p))*w,s[6]=(g+v)*w,s[7]=0,s[8]=(m+E)*_,s[9]=(g-v)*_,s[10]=(1-(h+x))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=Zi.set(s[0],s[1],s[2]).length(),a=Zi.set(s[4],s[5],s[6]).length(),c=Zi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),An.copy(this);let l=1/o,u=1/a,d=1/c;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=u,An.elements[5]*=u,An.elements[6]*=u,An.elements[8]*=d,An.elements[9]*=d,An.elements[10]*=d,e.setFromRotationMatrix(An),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=_n,c=!1){let l=this.elements,u=2*r/(e-t),d=2*r/(n-s),h=(e+t)/(e-t),f=(n+s)/(n-s),m,x;if(c)m=r/(o-r),x=o*r/(o-r);else if(a===_n)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===hs)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=_n,c=!1){let l=this.elements,u=2/(e-t),d=2/(n-s),h=-(e+t)/(e-t),f=-(n+s)/(n-s),m,x;if(c)m=1/(o-r),x=o/(o-r);else if(a===_n)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===hs)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ko.prototype.isMatrix4=!0;var ce=ko,Zi=new D,An=new ce,zd=new D(0,0,0),kd=new D(1,1,1),li=new D,Lr=new D,ln=new D,Lc=new ce,Nc=new Xe,xn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Lc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nc.setFromEuler(this),this.setFromQuaternion(Nc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};xn.DEFAULT_ORDER="XYZ";var ps=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hd=0,Dc=new D,Ji=new Xe,Xn=new ce,Nr=new D,Ls=new D,Gd=new D,Vd=new Xe,Uc=new D(1,0,0),Fc=new D(0,1,0),Oc=new D(0,0,1),Bc={type:"added"},Wd={type:"removed"},Ki={type:"childadded",child:null},ka={type:"childremoved",child:null},ke=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new D,e=new xn,n=new Xe,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Zt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ps,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.premultiply(Ji),this}rotateX(t){return this.rotateOnAxis(Uc,t)}rotateY(t){return this.rotateOnAxis(Fc,t)}rotateZ(t){return this.rotateOnAxis(Oc,t)}translateOnAxis(t,e){return Dc.copy(t).applyQuaternion(this.quaternion),this.position.add(Dc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uc,t)}translateY(t){return this.translateOnAxis(Fc,t)}translateZ(t){return this.translateOnAxis(Oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Nr.copy(t):Nr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Ls,Nr,this.up):Xn.lookAt(Nr,Ls,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),Ji.setFromRotationMatrix(Xn),this.quaternion.premultiply(Ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Yt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):Yt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wd),ka.child=t,this.dispatchEvent(ka),ka.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,t,Gd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,Vd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ke.DEFAULT_UP=new D(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ae=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xd={type:"move"},ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let g=e.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&h>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xd)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Xh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function Ha(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Te){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=Bl(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ha(o,r,t+1/3),this.g=Ha(o,r,t),this.b=Ha(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=Te){function n(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Te){let n=Xh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Te){return oe.workingToColorSpace(je.copy(this),t),Math.round(ee(je.r*255,0,255))*65536+Math.round(ee(je.g*255,0,255))*256+Math.round(ee(je.b*255,0,255))}getHexString(t=Te){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(je.copy(this),e);let n=je.r,s=je.g,r=je.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(je.copy(this),e),t.r=je.r,t.g=je.g,t.b=je.b,t}getStyle(t=Te){oe.workingToColorSpace(je.copy(this),t);let e=je.r,n=je.g,s=je.b;return t!==Te?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(Dr);let n=zs(ci.h,Dr.h,e),s=zs(ci.s,Dr.s,e),r=zs(ci.l,Dr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},je=new wt;wt.NAMES=Xh;var Qn=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Rn=new D,qn=new D,Ga=new D,Yn=new D,Qi=new D,ji=new D,zc=new D,Va=new D,Wa=new D,Xa=new D,qa=new be,Ya=new be,$a=new be,fi=class i{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Rn.subVectors(t,e),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Rn.subVectors(s,e),qn.subVectors(n,e),Ga.subVectors(t,e);let o=Rn.dot(Rn),a=Rn.dot(qn),c=Rn.dot(Ga),l=qn.dot(qn),u=qn.dot(Ga),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,m=(o*u-a*c)*h;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Yn.x),c.addScaledVector(o,Yn.y),c.addScaledVector(a,Yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return qa.setScalar(0),Ya.setScalar(0),$a.setScalar(0),qa.fromBufferAttribute(t,e),Ya.fromBufferAttribute(t,n),$a.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(qa,r.x),o.addScaledVector(Ya,r.y),o.addScaledVector($a,r.z),o}static isFrontFacing(t,e,n,s){return Rn.subVectors(n,e),qn.subVectors(t,e),Rn.cross(qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Rn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Qi.subVectors(s,n),ji.subVectors(r,n),Va.subVectors(t,n);let c=Qi.dot(Va),l=ji.dot(Va);if(c<=0&&l<=0)return e.copy(n);Wa.subVectors(t,s);let u=Qi.dot(Wa),d=ji.dot(Wa);if(u>=0&&d<=u)return e.copy(s);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0&&c-u>0)return o=c/(c-u),e.copy(n).addScaledVector(Qi,o);Xa.subVectors(t,r);let f=Qi.dot(Xa),m=ji.dot(Xa);if(m>=0&&f<=m)return e.copy(r);let x=f*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(ji,a);let g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return zc.subVectors(r,s),a=(d-u)/(d-u+(f-m)),e.copy(s).addScaledVector(zc,a);let p=1/(g+x+h);return o=x*p,a=h*p,e.copy(n).addScaledVector(Qi,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},On=class{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Cn):Cn.fromBufferAttribute(r,o),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)),Ur.applyMatrix4(t.matrixWorld),this.union(Ur)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),Fr.subVectors(this.max,Ns),ts.subVectors(t.a,Ns),es.subVectors(t.b,Ns),ns.subVectors(t.c,Ns),hi.subVectors(es,ts),ui.subVectors(ns,es),Ci.subVectors(ts,ns);let e=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-Ci.z,Ci.y,hi.z,0,-hi.x,ui.z,0,-ui.x,Ci.z,0,-Ci.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-Ci.y,Ci.x,0];return!Za(e,ts,es,ns,Fr)||(e=[1,0,0,0,1,0,0,0,1],!Za(e,ts,es,ns,Fr))?!1:(Or.crossVectors(hi,ui),e=[Or.x,Or.y,Or.z],Za(e,ts,es,ns,Fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},$n=[new D,new D,new D,new D,new D,new D,new D,new D],Cn=new D,Ur=new On,ts=new D,es=new D,ns=new D,hi=new D,ui=new D,Ci=new D,Ns=new D,Fr=new D,Or=new D,Ii=new D;function Za(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ii.fromArray(i,r);let a=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),c=t.dot(Ii),l=e.dot(Ii),u=n.dot(Ii);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Ie=new D,Br=new At,qd=0,Se=class extends Fn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bh,this.updateRanges=[],this.gpuType=bn,this.version=0,this._normalizationScale=t!==void 0?kl(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Br.fromBufferAttribute(this,e),Br.applyMatrix3(t),this.setXY(e,Br.x,Br.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Vh(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Wh(t,this.array)}};var Ys=class extends Se{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var $s=class extends Se{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends Se{constructor(t,e,n){super(new Float32Array(t),e,n)}},Yd=new On,Ds=new D,Ja=new D,jn=class{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Yd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);let e=Ds.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ds,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ja.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(Ja)),this.expandByPoint(Ds.copy(t.center).sub(Ja))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},$d=0,gn=new ce,Ka=new ke,is=new D,cn=new On,Us=new On,Oe=new D,Re=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=bs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vd(t)?$s:Ys)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return Ka.lookAt(t),Ka.updateMatrix(),this.applyMatrix4(Ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(cn.min,Us.min),cn.expandByPoint(Oe),Oe.addVectors(cn.max,Us.max),cn.expandByPoint(Oe)):(cn.expandByPoint(Us.min),cn.expandByPoint(Us.max))}cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Oe));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Oe.fromBufferAttribute(a,l),c&&(is.fromBufferAttribute(t,l),Oe.add(is)),s=Math.max(s,n.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Se(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[],l=new Uint8Array(n.count);for(let U=0;U<n.count;U++)a[U]=new D,c[U]=new D;let u=new D,d=new D,h=new D,f=new At,m=new At,x=new At,g=new D,p=new D;function v(U,I,z){l[U]=l[I]=l[z]=1,u.fromBufferAttribute(n,U),d.fromBufferAttribute(n,I),h.fromBufferAttribute(n,z),f.fromBufferAttribute(r,U),m.fromBufferAttribute(r,I),x.fromBufferAttribute(r,z),d.sub(u),h.sub(u),m.sub(f),x.sub(f);let k=1/(m.x*x.y-x.x*m.y);isFinite(k)&&(g.copy(d).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(k),p.copy(h).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(k),a[U].add(g),a[I].add(g),a[z].add(g),c[U].add(p),c[I].add(p),c[z].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let U=0,I=E.length;U<I;++U){let z=E[U],k=z.start,J=z.count;for(let N=k,H=k+J;N<H;N+=3)v(t.getX(N+0),t.getX(N+1),t.getX(N+2))}let y=new D,T=new D,w=new D,_=new D;function b(U){w.fromBufferAttribute(s,U),_.copy(w);let I=a[U];y.copy(I),y.sub(w.multiplyScalar(w.dot(I))).normalize(),T.crossVectors(_,I);let k=T.dot(c[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,k)}for(let U=0,I=n.count;U<I;++U)l[U]&&b(U);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Se(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,u=new D,d=new D;if(t)for(let h=0,f=t.count;h<f;h+=3){let m=t.getX(h+0),x=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let p=0;p<u;p++)h[m++]=l[f++]}return new Se(h,u,d)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=t(h,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],d=r[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Qa=new D,Zd=new D,Jd=new Zt,hn=class{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Qa.subVectors(n,e).cross(Zd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Qa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Jd.getNormalMatrix(t),s=this.coplanarPoint(Qa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Kd=0,Bn=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=bs(),this.name="",this.type="Material",this.blending=ys,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xl,this.blendDst=vl,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wt(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=no,this.stencilZFail=no,this.stencilZPass=no,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new hn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new At().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new At().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Zn=new D,ja=new D,zr=new D,kr=new D,gs=class{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ja.copy(t).add(e).multiplyScalar(.5),zr.copy(e).sub(t).normalize(),kr.copy(this.origin).sub(ja);let r=t.distanceTo(e)*.5,o=-this.direction.dot(zr),a=kr.dot(this.direction),c=-kr.dot(zr),l=kr.lengthSq(),u=Math.abs(1-o*o),d,h,f,m;if(u>0)if(d=o*c-a,h=o*a-c,m=r*u,d>=0)if(h>=-m)if(h<=m){let x=1/u;d*=x,h*=x,f=d*(d+o*h+2*a)+h*(o*d+h+2*c)+l}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-m?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l):h<=m?(d=0,h=Math.min(Math.max(-r,-c),r),f=h*(h+2*c)+l):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+h*(h+2*c)+l);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ja).addScaledVector(zr,h),f}intersectSphere(t,e){if(t.radius<0)return null;Zn.subVectors(t.center,this.origin);let n=Zn.dot(this.direction),s=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,u=a.z,d=t.x-o.x,h=t.y-o.y,f=t.z-o.z,m=e.x-o.x,x=e.y-o.y,g=e.z-o.z,p=n.x-o.x,v=n.y-o.y,E=n.z-o.z,y=Math.abs(c),T=Math.abs(l),w=Math.abs(u),_,b,U,I,z,k,J,N,H,G,X,rt;if(y>=T&&y>=w?(U=c,k=d,H=m,rt=p,c>=0?(_=l,b=u,I=h,z=f,J=x,N=g,G=v,X=E):(_=u,b=l,I=f,z=h,J=g,N=x,G=E,X=v)):T>=w?(U=l,k=h,H=x,rt=v,l>=0?(_=u,b=c,I=f,z=d,J=g,N=m,G=E,X=p):(_=c,b=u,I=d,z=f,J=m,N=g,G=p,X=E)):(U=u,k=f,H=g,rt=E,u>=0?(_=c,b=l,I=d,z=h,J=m,N=x,G=p,X=v):(_=l,b=c,I=h,z=d,J=x,N=m,G=v,X=p)),U===0)return null;let $=_/U,et=b/U,nt=1/U,mt=I-$*k,It=z-et*k,j=J-$*H,ct=N-et*H,vt=G-$*rt,Et=X-et*rt,ft=vt*ct-Et*j,Ut=mt*Et-It*vt,me=j*It-ct*mt;if(s){if(ft<0||Ut<0||me<0)return null}else if((ft<0||Ut<0||me<0)&&(ft>0||Ut>0||me>0))return null;let zt=ft+Ut+me;if(zt===0)return null;let yt=nt*(ft*k+Ut*H+me*rt);return(zt>0?yt<0:yt>0)?null:this.at(yt/zt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vn=class extends Bn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},kc=new ce,Pi=new gs,Hr=new jn,Hc=new D,Gr=new D,Vr=new D,Wr=new D,tl=new D,Xr=new D,Gc=new D,qr=new D,Ht=class extends ke{constructor(t=new Re,e=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Xr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],d=r[c];u!==0&&(tl.fromBufferAttribute(d,t),o?Xr.addScaledVector(tl,u):Xr.addScaledVector(tl.sub(e),u))}e.add(Xr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(Hr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Hr,Hc)===null||Pi.origin.distanceToSquared(Hc)>(t.far-t.near)**2))&&(kc.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(kc),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=h.length;m<x;m++){let g=h[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),E=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,T=E;y<T;y+=3){let w=a.getX(y),_=a.getX(y+1),b=a.getX(y+2);s=Yr(this,p,t,n,l,u,d,w,_,b),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let v=a.getX(g),E=a.getX(g+1),y=a.getX(g+2);s=Yr(this,o,t,n,l,u,d,v,E,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=h.length;m<x;m++){let g=h[m],p=o[g.materialIndex],v=Math.max(g.start,f.start),E=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=v,T=E;y<T;y+=3){let w=y,_=y+1,b=y+2;s=Yr(this,p,t,n,l,u,d,w,_,b),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let v=g,E=g+1,y=g+2;s=Yr(this,o,t,n,l,u,d,v,E,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Qd(i,t,e,n,s,r,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Mi,a),c===null)return null;qr.copy(a),qr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(qr);return l<e.near||l>e.far?null:{distance:l,point:qr.clone(),object:i}}function Yr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Gr),i.getVertexPosition(c,Vr),i.getVertexPosition(l,Wr);let u=Qd(i,t,e,n,Gr,Vr,Wr,Gc);if(u){let d=new D;fi.getBarycoord(Gc,Gr,Vr,Wr,d),s&&(u.uv=fi.getInterpolatedAttribute(s,a,c,l,d,new At)),r&&(u.uv1=fi.getInterpolatedAttribute(r,a,c,l,d,new At)),o&&(u.normal=fi.getInterpolatedAttribute(o,a,c,l,d,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new D,materialIndex:0};fi.getNormal(Gr,Vr,Wr,h.normal),u.face=h,u.barycoord=d}return u}var Zs=class extends on{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ze,u=ze,d,h){super(null,o,a,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _s=class extends Se{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ss=new ce,Vc=new ce,$r=[],Wc=new On,jd=new ce,Fs=new Ht,Os=new jn,ti=class extends Ht{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new _s(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new On),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ss),Wc.copy(t.boundingBox).applyMatrix4(ss),this.boundingBox.union(Wc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ss),Os.copy(t.boundingSphere).applyMatrix4(ss),this.boundingSphere.union(Os)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Os.copy(this.boundingSphere),Os.applyMatrix4(n),t.ray.intersectsSphere(Os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ss),Vc.multiplyMatrices(n,ss),Fs.matrixWorld=Vc,Fs.raycast(t,$r);for(let o=0,a=$r.length;o<a;o++){let c=$r[o];c.instanceId=r,c.object=this,e.push(c)}$r.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new _s(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Zs(new Float32Array(s*this.count),s,this.count,$o,bn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Li=new jn,tf=new At(.5,.5),Zr=new D,mi=class{constructor(t=new hn,e=new hn,n=new hn,s=new hn,r=new hn,o=new hn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_n,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],x=r[9],g=r[10],p=r[11],v=r[12],E=r[13],y=r[14],T=r[15];if(s[0].setComponents(l-o,f-u,p-m,T-v).normalize(),s[1].setComponents(l+o,f+u,p+m,T+v).normalize(),s[2].setComponents(l+a,f+d,p+x,T+E).normalize(),s[3].setComponents(l-a,f-d,p-x,T-E).normalize(),n)s[4].setComponents(c,h,g,y).normalize(),s[5].setComponents(l-c,f-h,p-g,T-y).normalize();else if(s[4].setComponents(l-c,f-h,p-g,T-y).normalize(),e===_n)s[5].setComponents(l+c,f+h,p+g,T+y).normalize();else if(e===hs)s[5].setComponents(c,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){Li.center.set(0,0,0);let e=tf.distanceTo(t.center);return Li.radius=.7071067811865476+e,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Zr.x=s.normal.x>0?t.max.x:t.min.x,Zr.y=s.normal.y>0?t.max.y:t.min.y,Zr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xc=new ce,go=class i{constructor(){this.coordinateSystem=_n,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Xc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new mi),n[s].setFromProjectionMatrix(Xc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new mi),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var _o=class extends Bn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},qc=new ce,cl=new gs,Jr=new jn,Kr=new D,Js=class extends ke{constructor(t=new Re,e=new _o){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,t.ray.intersectsSphere(Jr)===!1)return;qc.copy(s).invert(),cl.copy(t.ray).applyMatrix4(qc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=h,x=f;m<x;m++){let g=l.getX(m);Kr.fromBufferAttribute(d,g),Yc(Kr,g,c,s,t,e,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let m=h,x=f;m<x;m++)Kr.fromBufferAttribute(d,m),Yc(Kr,m,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Yc(i,t,e,n,s,r,o){let a=cl.distanceSqToPoint(i);if(a<e){let c=new D;cl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ks=class extends on{constructor(t=[],e=zi,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},yn=class extends on{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ei=class extends on{constructor(t,e,n=In,s,r,o,a=ze,c=ze,l,u=Kn,d=1){if(u!==Kn&&u!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:d};super(h,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new fs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Qs=class extends ei{constructor(t,e=In,n=zi,s,r,o=ze,a=ze,c,l=Kn){let u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,e,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},js=class extends on{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},dn=class i extends Re{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(d,2));function m(x,g,p,v,E,y,T,w,_,b,U){let I=y/_,z=T/b,k=y/2,J=T/2,N=w/2,H=_+1,G=b+1,X=0,rt=0,$=new D;for(let et=0;et<G;et++){let nt=et*z-J;for(let mt=0;mt<H;mt++){let It=mt*I-k;$[x]=It*v,$[g]=nt*E,$[p]=N,l.push($.x,$.y,$.z),$[x]=0,$[g]=0,$[p]=w>0?1:-1,u.push($.x,$.y,$.z),d.push(mt/_),d.push(1-et/b),X+=1}}for(let et=0;et<b;et++)for(let nt=0;nt<_;nt++){let mt=h+nt+H*et,It=h+nt+H*(et+1),j=h+(nt+1)+H*(et+1),ct=h+(nt+1)+H*et;c.push(mt,It,ct),c.push(It,j,ct),rt+=6}a.addGroup(f,rt,U),f+=rt,h+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var zn=class i extends Re{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],m=0,x=[],g=n/2,p=0;v(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(f,2));function v(){let y=new D,T=new D,w=0,_=(e-t)/n;for(let b=0;b<=r;b++){let U=[],I=b/r,z=I*(e-t)+t;for(let k=0;k<=s;k++){let J=k/s,N=J*c+a,H=Math.sin(N),G=Math.cos(N);T.x=z*H,T.y=-I*n+g,T.z=z*G,d.push(T.x,T.y,T.z),y.set(H,_,G).normalize(),h.push(y.x,y.y,y.z),f.push(J,1-I),U.push(m++)}x.push(U)}for(let b=0;b<s;b++)for(let U=0;U<r;U++){let I=x[U][b],z=x[U+1][b],k=x[U+1][b+1],J=x[U][b+1];(t>0||U!==0)&&(u.push(I,z,J),w+=3),(e>0||U!==r-1)&&(u.push(z,k,J),w+=3)}l.addGroup(p,w,0),p+=w}function E(y){let T=m,w=new At,_=new D,b=0,U=y===!0?t:e,I=y===!0?1:-1;for(let k=1;k<=s;k++)d.push(0,g*I,0),h.push(0,I,0),f.push(.5,.5),m++;let z=m;for(let k=0;k<=s;k++){let N=k/s*c+a,H=Math.cos(N),G=Math.sin(N);_.x=U*G,_.y=g*I,_.z=U*H,d.push(_.x,_.y,_.z),h.push(0,I,0),w.x=H*.5+.5,w.y=G*.5*I+.5,f.push(w.x,w.y),m++}for(let k=0;k<s;k++){let J=T+k,N=z+k;y===!0?u.push(N,N+1,J):u.push(N+1,N,J),b+=3}l.addGroup(p,b,y===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var xo=class i extends Re{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let E=new D,y=new D,T=new D;for(let w=0;w<e.length;w+=3)f(e[w+0],E),f(e[w+1],y),f(e[w+2],T),c(E,y,T,v)}function c(v,E,y,T){let w=T+1,_=[];for(let b=0;b<=w;b++){_[b]=[];let U=v.clone().lerp(y,b/w),I=E.clone().lerp(y,b/w),z=w-b;for(let k=0;k<=z;k++)k===0&&b===w?_[b][k]=U:_[b][k]=U.clone().lerp(I,k/z)}for(let b=0;b<w;b++)for(let U=0;U<2*(w-b)-1;U++){let I=Math.floor(U/2);U%2===0?(h(_[b][I+1]),h(_[b+1][I]),h(_[b][I])):(h(_[b][I+1]),h(_[b+1][I+1]),h(_[b+1][I]))}}function l(v){let E=new D;for(let y=0;y<r.length;y+=3)E.x=r[y+0],E.y=r[y+1],E.z=r[y+2],E.normalize().multiplyScalar(v),r[y+0]=E.x,r[y+1]=E.y,r[y+2]=E.z}function u(){let v=new D;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];let y=g(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;o.push(y,1-T)}m(),d()}function d(){for(let v=0;v<o.length;v+=6){let E=o[v+0],y=o[v+2],T=o[v+4],w=Math.max(E,y,T),_=Math.min(E,y,T);w>.9&&_<.1&&(E<.2&&(o[v+0]+=1),y<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function f(v,E){let y=v*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function m(){let v=new D,E=new D,y=new D,T=new D,w=new At,_=new At,b=new At;for(let U=0,I=0;U<r.length;U+=9,I+=6){v.set(r[U+0],r[U+1],r[U+2]),E.set(r[U+3],r[U+4],r[U+5]),y.set(r[U+6],r[U+7],r[U+8]),w.set(o[I+0],o[I+1]),_.set(o[I+2],o[I+3]),b.set(o[I+4],o[I+5]),T.copy(v).add(E).add(y).divideScalar(3);let z=g(T);x(w,I+0,v,z),x(_,I+2,E,z),x(b,I+4,y,z)}}function x(v,E,y,T){T<0&&v.x===1&&(o[E]=v.x-1),y.x===0&&y.z===0&&(o[E]=T/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var Mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let u=n[s],h=n[s+1]-u,f=(o-u)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new At:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new D,s=[],r=[],o=[],a=new D,c=new ce;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(ee(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ee(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},tr=class extends Mn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new At){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*u-f*d+this.aX,l=h*d+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},vo=class extends tr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Hl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,d){let h=(o-r)/l-(a-r)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+d)+(c-a)/d;h*=u,f*=u,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var $c=new D,Zc=new D,el=new Hl,nl=new Hl,il=new Hl,qe=class extends Mn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Zc.subVectors(s[0],s[1]).add(s[0]),l=Zc);let d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:($c.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=$c),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),el.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,m,x,g),nl.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,m,x,g),il.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(el.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),nl.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),il.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(el.calc(c),nl.calc(c),il.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Jc(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function ef(i,t){let e=1-i;return e*e*t}function nf(i,t){return 2*(1-i)*i*t}function sf(i,t){return i*i*t}function ks(i,t,e,n){return ef(i,t)+nf(i,e)+sf(i,n)}function rf(i,t){let e=1-i;return e*e*e*t}function of(i,t){let e=1-i;return 3*e*e*i*t}function af(i,t){return 3*(1-i)*i*i*t}function lf(i,t){return i*i*i*t}function Hs(i,t,e,n,s){return rf(i,t)+of(i,e)+af(i,n)+lf(i,s)}var yo=class extends Mn{constructor(t=new At,e=new At,n=new At,s=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new At){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,s.x,r.x,o.x,a.x),Hs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Mo=class extends Mn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Hs(t,s.x,r.x,o.x,a.x),Hs(t,s.y,r.y,o.y,a.y),Hs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},So=class extends Mn{constructor(t=new At,e=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new At){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new At){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},bo=class extends Mn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Eo=class extends Mn{constructor(t=new At,e=new At,n=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new At){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},er=class extends Mn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y),ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},wo=class extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new At){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Jc(a,c.x,l.x,u.x,d.x),Jc(a,c.y,l.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new At().fromArray(s))}return this}},cf=Object.freeze({__proto__:null,ArcCurve:vo,CatmullRomCurve3:qe,CubicBezierCurve:yo,CubicBezierCurve3:Mo,EllipseCurve:tr,LineCurve:So,LineCurve3:bo,QuadraticBezierCurve:Eo,QuadraticBezierCurve3:er,SplineCurve:wo});var gi=class i extends xo{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var fn=class i extends Re{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=t/a,h=e/c,f=[],m=[],x=[],g=[];for(let p=0;p<u;p++){let v=p*h-o;for(let E=0;E<l;E++){let y=E*d-r;m.push(y,-v,0),x.push(0,0,1),g.push(E/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let E=v+l*p,y=v+l*(p+1),T=v+1+l*(p+1),w=v+1+l*p;f.push(E,y,w),f.push(y,T,w)}this.setIndex(f),this.setAttribute("position",new pe(m,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},nr=class i extends Re{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],u=[],d=t,h=(e-t)/s,f=new D,m=new At;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}d+=h}for(let x=0;x<s;x++){let g=x*(n+1);for(let p=0;p<n;p++){let v=p+g,E=v,y=v+n+1,T=v+n+2,w=v+1;a.push(E,y,w),a.push(y,T,w)}}this.setIndex(a),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(l,3)),this.setAttribute("uv",new pe(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Sn=class i extends Re{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new D,h=new D,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let v=[],E=p/n,y=o+E*a,T=t*Math.cos(y),w=Math.sqrt(t*t-T*T),_=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let b=0;b<=e;b++){let U=b/e,I=s+U*r;d.x=-w*Math.cos(I),d.y=T,d.z=w*Math.sin(I),m.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),g.push(U+_,1-E),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){let E=u[p][v+1],y=u[p][v],T=u[p+1][v],w=u[p+1][v+1];(p!==0||o>0)&&f.push(E,y,w),(p!==n-1||c<Math.PI)&&f.push(y,T,w)}this.setIndex(f),this.setAttribute("position",new pe(m,3)),this.setAttribute("normal",new pe(x,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var _i=class i extends Re{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],u=[],d=[],h=new D,f=new D,m=new D;for(let x=0;x<=n;x++){let g=o+x/n*a;for(let p=0;p<=s;p++){let v=p/s*r;f.x=(t+e*Math.cos(g))*Math.cos(v),f.y=(t+e*Math.cos(g))*Math.sin(v),f.z=e*Math.sin(g),l.push(f.x,f.y,f.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),m.subVectors(f,h).normalize(),u.push(m.x,m.y,m.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=s;g++){let p=(s+1)*x+g-1,v=(s+1)*(x-1)+g-1,E=(s+1)*(x-1)+g,y=(s+1)*x+g;c.push(p,v,y),c.push(v,E,y)}this.setIndex(c),this.setAttribute("position",new pe(l,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var tn=class i extends Re{constructor(t=new er(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new D,c=new D,l=new At,u=new D,d=[],h=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(f,2));function x(){for(let E=0;E<e;E++)g(E);g(r===!1?e:0),v(),p()}function g(E){u=t.getPointAt(E/e,u);let y=o.normals[E],T=o.binormals[E];for(let w=0;w<=s;w++){let _=w/s*Math.PI*2,b=Math.sin(_),U=-Math.cos(_);c.x=U*y.x+b*T.x,c.y=U*y.y+b*T.y,c.z=U*y.z+b*T.z,c.normalize(),h.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let E=1;E<=e;E++)for(let y=1;y<=s;y++){let T=(s+1)*(E-1)+(y-1),w=(s+1)*E+(y-1),_=(s+1)*E+y,b=(s+1)*(E-1)+y;m.push(T,w,b),m.push(w,_,b)}}function v(){for(let E=0;E<=e;E++)for(let y=0;y<=s;y++)l.x=E/e,l.y=y/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new cf[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Hi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Kc(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Kc(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function en(i){let t={};for(let e=0;e<i.length;e++){let n=Hi(i[e]);for(let s in n)t[s]=n[s]}return t}function Kc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function hf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Gl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var qh={clone:Hi,merge:en},uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,df=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pn=class extends Bn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uf,this.fragmentShader=df,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new wt().setHex(s.value);break;case"v2":this.uniforms[n].value=new At().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new be().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ce().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},To=class extends pn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},He=class extends Bn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xr,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ge=class extends He{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new At(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new wt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new wt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new wt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return Ni('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){Ni('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var ir=class extends Bn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xr,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ho,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ao=class extends Bn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ih,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ro=class extends Bn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function rs(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Qr(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var xi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Co=class extends xi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ol,endingEnd:ol}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case al:r=t,a=2*e-n;break;case ll:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case al:o=t,c=2*n-e;break;case ll:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),x=m*m,g=x*m,p=-h*g+2*h*x-h*m,v=(1+h)*g+(-1.5-2*h)*x+(-.5+h)*m+1,E=(-1-f)*g+(1.5+f)*x+.5*m,y=f*g-f*x;for(let T=0;T!==a;++T)r[T]=p*o[u+T]+v*o[l+T]+E*o[c+T]+y*o[d+T];return r}},Io=class extends xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(s-e),d=1-u;for(let h=0;h!==a;++h)r[h]=o[l+h]*d+o[c+h]*u;return r}},Po=class extends xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Lo=class extends xi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(n-e)/(s-e),x=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*x+o[c+g]*m;return r}let h=a*2,f=t-1;for(let m=0;m!==a;++m){let x=o[l+m],g=o[c+m],p=f*h+m*2,v=d[p],E=d[p+1],y=t*h+m*2,T=u[y],w=u[y+1],_=pf(n,e,v,T,s);r[m]=Yh(_,x,E,w,g)}return r}};function Yh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function ff(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function pf(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Yh(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=ff(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var mn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=rs(e,this.TimeBufferType),this.values=rs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:rs(t.times,Array),values:rs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Qr(t.settings)&&(n.settings={inTangents:rs(t.settings.inTangents,Array),outTangents:rs(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Po(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Io(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Co(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Lo(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Gs:e=this.InterpolantFactoryMethodDiscrete;break;case uo:e=this.InterpolantFactoryMethodLinear;break;case eo:e=this.InterpolantFactoryMethodSmooth;break;case rl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Xt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gs;case this.InterpolantFactoryMethodLinear:return uo;case this.InterpolantFactoryMethodSmooth:return eo;case this.InterpolantFactoryMethodBezier:return rl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;Qr(this.settings)&&(Qc(this.settings.inTangents,t),Qc(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Qr(this.settings)&&(jc(this.settings.inTangents,t),jc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Yt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Yt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Yt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Yt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&yd(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Yt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===eo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,h=d-n,f=d+n;for(let m=0;m!==n;++m){let x=e[d+m];if(x!==e[h+m]||x!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,h=o*n;for(let f=0;f!==n;++f)e[h+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Qr(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Qc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function jc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}mn.prototype.ValueTypeName="";mn.prototype.TimeBufferType=Float32Array;mn.prototype.ValueBufferType=Float32Array;mn.prototype.DefaultInterpolation=uo;var vi=class extends mn{constructor(t,e,n){super(t,e,n)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=Gs;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var No=class extends mn{constructor(t,e,n,s){super(t,e,n,s)}};No.prototype.ValueTypeName="color";var Do=class extends mn{constructor(t,e,n,s){super(t,e,n,s)}};Do.prototype.ValueTypeName="number";var Uo=class extends xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let u=l+a;l!==u;l+=4)Xe.slerpFlat(r,0,o,l-a,o,l,c);return r}},sr=class extends mn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Uo(this.times,this.values,this.getValueSize(),t)}};sr.prototype.ValueTypeName="quaternion";sr.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends mn{constructor(t,e,n){super(t,e,n)}};yi.prototype.ValueTypeName="string";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=Gs;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Fo=class extends mn{constructor(t,e,n,s){super(t,e,n,s)}};Fo.prototype.ValueTypeName="vector";var Oo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},$h=new Oo,Bo=class{constructor(t){this.manager=t!==void 0?t:$h,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Bo.DEFAULT_MATERIAL_NAME="__DEFAULT";var rr=class extends ke{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new wt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}};var sl=new ce,th=new D,eh=new D,or=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new mi,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;th.setFromMatrixPosition(t.matrixWorld),e.position.copy(th),eh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(eh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){sl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(sl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===hs||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(sl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},jr=new D,to=new Xe,Dn=new D,ar=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(jr,to,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jr,to,Dn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(jr,to,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jr,to,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},di=new D,nh=new At,ih=new At,Be=class extends ar{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ds*2*Math.atan(Math.tan(Bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(di.x,di.y).multiplyScalar(-t/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-t/di.z)}getViewSize(t,e){return this.getViewBounds(t,nh,ih),e.subVectors(ih,nh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var hl=class extends or{constructor(){super(new Be(90,1,.5,500)),this.isPointLightShadow=!0}},lr=class extends rr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new hl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},cr=class extends ar{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ul=class extends or{constructor(){super(new cr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ni=class extends rr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new ul}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var os=-90,as=1,xs=class extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Be(os,as,t,e);s.layers=this.layers,this.add(s);let r=new Be(os,as,t,e);r.layers=this.layers,this.add(r);let o=new Be(os,as,t,e);o.layers=this.layers,this.add(o);let a=new Be(os,as,t,e);a.layers=this.layers,this.add(a);let c=new Be(os,as,t,e);c.layers=this.layers,this.add(c);let l=new Be(os,as,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===_n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=x,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},zo=class extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Vl="\\[\\]\\.:\\/",mf=new RegExp("["+Vl+"]","g"),Wl="[^"+Vl+"]",gf="[^"+Vl.replace("\\.","")+"]",_f=/((?:WC+[\/:])*)/.source.replace("WC",Wl),xf=/(WCOD+)?/.source.replace("WCOD",gf),vf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),yf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),Mf=new RegExp("^"+_f+xf+vf+yf+"$"),Sf=["material","materials","bones","map"],dl=class{constructor(t,e,n){let s=n||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(mf,"")}static parseTrackName(t){let e=Mf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Sf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Yt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Yt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Yt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Yt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Yt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Yt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;Yt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Yt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=dl;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var K_=new Float32Array(1);var sh=new ce,Di=class{constructor(t,e,n=0,s=1/0){this.ray=new gs(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ps,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Yt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return sh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sh),this}intersectObject(t,e=!0,n=[]){return fl(t,this,n,e),n.sort(rh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)fl(t[s],this,n,e);return n.sort(rh),n}};function rh(i,t){return i.distance-t.distance}function fl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)fl(r[o],t,e,!0)}}var Jl=class Jl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Jl.prototype.isMatrix2=!0;var pl=Jl;function Xl(i,t,e,n){let s=bf(n);switch(e){case Pl:return i*t;case $o:return i*t/s.components*s.byteLength;case Zo:return i*t/s.components*s.byteLength;case Si:return i*t*2/s.components*s.byteLength;case Jo:return i*t*2/s.components*s.byteLength;case Ll:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case Ko:return i*t*4/s.components*s.byteLength;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case jo:case ea:return Math.max(i,16)*Math.max(t,8)/4;case Qo:case ta:return Math.max(i,8)*Math.max(t,8)/2;case na:case ia:case ra:case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sa:case gr:case aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case la:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ca:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ha:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case da:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case fa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case pa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ma:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case _a:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case xa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case va:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ya:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ma:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Sa:case ba:case Ea:return Math.ceil(i/4)*Math.ceil(t/4)*16;case wa:case Ta:return Math.ceil(i/4)*Math.ceil(t/4)*8;case _r:case Aa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function bf(i){switch(i){case an:case Al:return{byteLength:1,components:1};case Ss:case Rl:case Pn:return{byteLength:2,components:1};case qo:case Yo:return{byteLength:2,components:4};case In:case Xo:case bn:return{byteLength:4,components:1};case Cl:case Il:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function gu(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function If(i){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],x=d[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++h,d[h]=x)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let x=d[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Pf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Of=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Qf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,tp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ep=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,op="gl_FragColor = linearToOutputTexel( gl_FragColor );",ap=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_p=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Sp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,bp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ep=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ap=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ip=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Np=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Op=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,kp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wp=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,am=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_m=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,xm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ym=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Em=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Cm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nm=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Om=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ym=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Km=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,eg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,og=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:Pf,alphahash_pars_fragment:Lf,alphamap_fragment:Nf,alphamap_pars_fragment:Df,alphatest_fragment:Uf,alphatest_pars_fragment:Ff,aomap_fragment:Of,aomap_pars_fragment:Bf,batching_pars_vertex:zf,batching_vertex:kf,begin_vertex:Hf,beginnormal_vertex:Gf,bsdfs:Vf,iridescence_fragment:Wf,bumpmap_pars_fragment:Xf,clipping_planes_fragment:qf,clipping_planes_pars_fragment:Yf,clipping_planes_pars_vertex:$f,clipping_planes_vertex:Zf,color_fragment:Jf,color_pars_fragment:Kf,color_pars_vertex:Qf,color_vertex:jf,common:tp,defaultnormal_vertex:ep,displacementmap_pars_vertex:np,displacementmap_vertex:ip,emissivemap_fragment:sp,emissivemap_pars_fragment:rp,colorspace_fragment:op,colorspace_pars_fragment:ap,envmap_fragment:lp,envmap_common_pars_fragment:cp,envmap_pars_fragment:hp,envmap_pars_vertex:up,envmap_physical_pars_fragment:Sp,envmap_vertex:dp,fog_vertex:fp,fog_pars_vertex:pp,fog_fragment:mp,fog_pars_fragment:gp,gradientmap_pars_fragment:_p,lightmap_pars_fragment:xp,lights_lambert_fragment:vp,lights_lambert_pars_fragment:yp,lights_pars_begin:Mp,lights_toon_fragment:bp,lights_toon_pars_fragment:Ep,lights_phong_fragment:wp,lights_phong_pars_fragment:Tp,lights_physical_fragment:Ap,lights_physical_pars_fragment:Rp,lights_fragment_begin:Cp,lights_fragment_maps:Ip,lights_fragment_end:Pp,lightprobes_pars_fragment:Lp,logdepthbuf_fragment:Np,logdepthbuf_pars_fragment:Dp,logdepthbuf_pars_vertex:Up,logdepthbuf_vertex:Fp,map_fragment:Op,map_pars_fragment:Bp,map_particle_fragment:zp,map_particle_pars_fragment:kp,metalnessmap_fragment:Hp,metalnessmap_pars_fragment:Gp,morphinstance_vertex:Vp,morphcolor_vertex:Wp,morphnormal_vertex:Xp,morphtarget_pars_vertex:qp,morphtarget_vertex:Yp,normal_fragment_begin:$p,normal_fragment_maps:Zp,normal_pars_fragment:Jp,normal_pars_vertex:Kp,normal_vertex:Qp,normalmap_pars_fragment:jp,clearcoat_normal_fragment_begin:tm,clearcoat_normal_fragment_maps:em,clearcoat_pars_fragment:nm,iridescence_pars_fragment:im,opaque_fragment:sm,packing:rm,premultiplied_alpha_fragment:om,project_vertex:am,dithering_fragment:lm,dithering_pars_fragment:cm,roughnessmap_fragment:hm,roughnessmap_pars_fragment:um,shadowmap_pars_fragment:dm,shadowmap_pars_vertex:fm,shadowmap_vertex:pm,shadowmask_pars_fragment:mm,skinbase_vertex:gm,skinning_pars_vertex:_m,skinning_vertex:xm,skinnormal_vertex:vm,specularmap_fragment:ym,specularmap_pars_fragment:Mm,tonemapping_fragment:Sm,tonemapping_pars_fragment:bm,transmission_fragment:Em,transmission_pars_fragment:wm,uv_pars_fragment:Tm,uv_pars_vertex:Am,uv_vertex:Rm,worldpos_vertex:Cm,background_vert:Im,background_frag:Pm,backgroundCube_vert:Lm,backgroundCube_frag:Nm,cube_vert:Dm,cube_frag:Um,depth_vert:Fm,depth_frag:Om,distance_vert:Bm,distance_frag:zm,equirect_vert:km,equirect_frag:Hm,linedashed_vert:Gm,linedashed_frag:Vm,meshbasic_vert:Wm,meshbasic_frag:Xm,meshlambert_vert:qm,meshlambert_frag:Ym,meshmatcap_vert:$m,meshmatcap_frag:Zm,meshnormal_vert:Jm,meshnormal_frag:Km,meshphong_vert:Qm,meshphong_frag:jm,meshphysical_vert:tg,meshphysical_frag:eg,meshtoon_vert:ng,meshtoon_frag:ig,points_vert:sg,points_frag:rg,shadow_vert:og,shadow_frag:ag,sprite_vert:lg,sprite_frag:cg},St={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Gn={basic:{uniforms:en([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:en([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new wt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:en([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:en([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:en([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new wt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:en([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:en([St.points,St.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:en([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:en([St.common,St.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:en([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:en([St.sprite,St.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:en([St.common,St.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:en([St.lights,St.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Gn.physical={uniforms:en([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Ca={r:0,b:0,g:0},hg=new ce,_u=new Zt;_u.set(-1,0,0,0,1,0,0,0,1);function ug(i,t,e,n,s,r){let o=new wt(0),a=s===!0?0:1,c,l,u=null,d=0,h=null;function f(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let y=v.backgroundBlurriness>0;E=t.get(E,y)}return E}function m(v){let E=!1,y=f(v);y===null?g(o,a):y&&y.isColor&&(g(y,1),E=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(v,E){let y=f(E);y&&y.isCubeTexture?(l===void 0&&(l=new Ht(new dn(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:Hi(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hg.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(_u),l.material.toneMapped=oe.getTransfer(y.colorSpace)!==ge,(u!==y||d!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ht(new fn(2,2),new pn({name:"BackgroundMaterial",uniforms:Hi(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=oe.getTransfer(y.colorSpace)!==ge,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function g(v,E){v.getRGB(Ca,Gl(i)),e.buffers.color.setClear(Ca.r,Ca.g,Ca.b,E,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,E=1){o.set(v),a=E,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,g(o,a)},render:m,addToRenderList:x,dispose:p}}function dg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function a(z,k,J,N,H){let G=!1,X=d(z,N,J,k);r!==X&&(r=X,l(r.object)),G=f(z,N,J,H),G&&m(z,N,J,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,y(z,k,J,N),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(z){return i.bindVertexArray(z)}function u(z){return i.deleteVertexArray(z)}function d(z,k,J,N){let H=N.wireframe===!0,G=n[k.id];G===void 0&&(G={},n[k.id]=G);let X=z.isInstancedMesh===!0?z.id:0,rt=G[X];rt===void 0&&(rt={},G[X]=rt);let $=rt[J.id];$===void 0&&($={},rt[J.id]=$);let et=$[H];return et===void 0&&(et=h(c()),$[H]=et),et}function h(z){let k=[],J=[],N=[];for(let H=0;H<e;H++)k[H]=0,J[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:J,attributeDivisors:N,object:z,attributes:{},index:null}}function f(z,k,J,N){let H=r.attributes,G=k.attributes,X=0,rt=J.getAttributes();for(let $ in rt)if(rt[$].location>=0){let nt=H[$],mt=G[$];if(mt===void 0&&($==="instanceMatrix"&&z.instanceMatrix&&(mt=z.instanceMatrix),$==="instanceColor"&&z.instanceColor&&(mt=z.instanceColor)),nt===void 0||nt.attribute!==mt||mt&&nt.data!==mt.data)return!0;X++}return r.attributesNum!==X||r.index!==N}function m(z,k,J,N){let H={},G=k.attributes,X=0,rt=J.getAttributes();for(let $ in rt)if(rt[$].location>=0){let nt=G[$];nt===void 0&&($==="instanceMatrix"&&z.instanceMatrix&&(nt=z.instanceMatrix),$==="instanceColor"&&z.instanceColor&&(nt=z.instanceColor));let mt={};mt.attribute=nt,nt&&nt.data&&(mt.data=nt.data),H[$]=mt,X++}r.attributes=H,r.attributesNum=X,r.index=N}function x(){let z=r.newAttributes;for(let k=0,J=z.length;k<J;k++)z[k]=0}function g(z){p(z,0)}function p(z,k){let J=r.newAttributes,N=r.enabledAttributes,H=r.attributeDivisors;J[z]=1,N[z]===0&&(i.enableVertexAttribArray(z),N[z]=1),H[z]!==k&&(i.vertexAttribDivisor(z,k),H[z]=k)}function v(){let z=r.newAttributes,k=r.enabledAttributes;for(let J=0,N=k.length;J<N;J++)k[J]!==z[J]&&(i.disableVertexAttribArray(J),k[J]=0)}function E(z,k,J,N,H,G,X){X===!0?i.vertexAttribIPointer(z,k,J,H,G):i.vertexAttribPointer(z,k,J,N,H,G)}function y(z,k,J,N){x();let H=N.attributes,G=J.getAttributes(),X=k.defaultAttributeValues;for(let rt in G){let $=G[rt];if($.location>=0){let et=H[rt];if(et===void 0&&(rt==="instanceMatrix"&&z.instanceMatrix&&(et=z.instanceMatrix),rt==="instanceColor"&&z.instanceColor&&(et=z.instanceColor)),et!==void 0){let nt=et.normalized,mt=et.itemSize,It=t.get(et);if(It===void 0)continue;let j=It.buffer,ct=It.type,vt=It.bytesPerElement,Et=ct===i.INT||ct===i.UNSIGNED_INT||et.gpuType===Xo;if(et.isInterleavedBufferAttribute){let ft=et.data,Ut=ft.isInterleavedBuffer===!0?ft.stride:ft.itemSize,me=et.offset;if(ft.isInstancedInterleavedBuffer||ft.isInstancedBufferAttribute){for(let zt=0;zt<$.locationSize;zt++)p($.location+zt,ft.meshPerAttribute);z.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let zt=0;zt<$.locationSize;zt++)g($.location+zt);i.bindBuffer(i.ARRAY_BUFFER,j);for(let zt=0;zt<$.locationSize;zt++)E($.location+zt,mt/$.locationSize,ct,nt,Ut*vt,(me+mt/$.locationSize*zt)*vt,Et)}else{if(et.isInstancedBufferAttribute){for(let ft=0;ft<$.locationSize;ft++)p($.location+ft,et.meshPerAttribute);z.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let ft=0;ft<$.locationSize;ft++)g($.location+ft);i.bindBuffer(i.ARRAY_BUFFER,j);for(let ft=0;ft<$.locationSize;ft++)E($.location+ft,mt/$.locationSize,ct,nt,mt*vt,mt/$.locationSize*ft*vt,Et)}}else if(X!==void 0){let nt=X[rt];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv($.location,nt);break;case 3:i.vertexAttrib3fv($.location,nt);break;case 4:i.vertexAttrib4fv($.location,nt);break;default:i.vertexAttrib1fv($.location,nt)}}}}v()}function T(){U();for(let z in n){let k=n[z];for(let J in k){let N=k[J];for(let H in N){let G=N[H];for(let X in G)u(G[X].object),delete G[X];delete N[H]}}delete n[z]}}function w(z){if(n[z.id]===void 0)return;let k=n[z.id];for(let J in k){let N=k[J];for(let H in N){let G=N[H];for(let X in G)u(G[X].object),delete G[X];delete N[H]}}delete n[z.id]}function _(z){for(let k in n){let J=n[k];for(let N in J){let H=J[N];if(H[z.id]===void 0)continue;let G=H[z.id];for(let X in G)u(G[X].object),delete G[X];delete H[z.id]}}}function b(z){for(let k in n){let J=n[k],N=z.isInstancedMesh===!0?z.id:0,H=J[N];if(H!==void 0){for(let G in H){let X=H[G];for(let rt in X)u(X[rt].object),delete X[rt];delete H[G]}delete J[N],Object.keys(J).length===0&&delete n[k]}}}function U(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function fg(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function a(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function pg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let _=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==Ln&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){let b=_===Pn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==an&&_!==bn&&!b&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(Xt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),h=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Xt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:T,samples:w}}function mg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new hn,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||s;return s=h,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?u(null):l();else{let v=r?0:n,E=v*4,y=p.clippingState||null;c.value=y,y=u(m,h,E,f);for(let T=0;T!==E;++T)y[T]=e[T];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,h,f,m){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let p=f+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,y=f;E!==x;++E,y+=4)o.copy(d[E]).applyMatrix4(v,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}var Sr=class extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ks(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new dn(5,5,5),r=new pn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Ui});r.uniforms.tEquirect.value=e;let o=new Ht(s,r),a=e.minFilter;return e.minFilter===ii&&(e.minFilter=rn),new xs(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Zh=256,gg=3,_g=20,xu=256,vu=16,xg=3,vg=new D,yg=new wt,bi=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new xs(1,10,null),this._boxMesh=new Ht(new dn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=vg}=r,c=this._renderer;this._setSize(o);let l=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,h=c.autoClearColor,f=c.autoClearDepth,m=c.autoClearStencil,x=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(t.background=c.getClearColor(yg));let g=new xs(n,s,u);return g.position.copy(a),g.update(c,t),c.autoClear=d,c.autoClearColor=h,c.autoClearDepth=f,c.autoClearStencil=m,t.background=x,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Zh,zl(t))}_fromTexture(t,e){t.mapping===zi||t.mapping===Ms?this._setSize(t.image.length===0?Zh:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Jh(t,!1,!1),n=Math.log2(t)-gg;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Jh(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===zi||t.mapping===Ms?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qh()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Kh()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Mg(),this._integrationMaterial=Sg());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/vu);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-xg)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let c=a>0?Math.log2(e)+.5*Math.log2(6/(xu*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=c,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=bg());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function Jh(i,t,e){return new Sr(i,{minFilter:ii,generateMipmaps:t,type:Pn,colorSpace:Vs,depthBuffer:e})}function br(i,t,e){return new pn({name:i,uniforms:t,vertexShader:te.cube_vert,fragmentShader:e,side:Ye,blending:Ui,depthTest:!1,depthWrite:!1})}function Mg(){return br("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${xu}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Sg(){return br("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:vu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function bg(){return br("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${_g}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Kh(){return br("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Qh(){return br("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Eg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,f=!1){return h==null?null:f?o(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===Go||f===Vo)if(t.has(h)){let m=t.get(h).texture;return a(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let x=new Sr(m.height);return x.fromEquirectangularTexture(i,h),t.set(h,x),h.addEventListener("dispose",l),a(x.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){let f=h.mapping,m=f===Go||f===Vo,x=f===zi||f===Ms;if(m||x){let g=e.get(h),p=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new bi(i)),g=m?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{let v=h.image;return m&&v&&v.height>0||x&&v&&c(v)?(n===null&&(n=new bi(i)),g=m?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function a(h,f){return f===Go?h.mapping=zi:f===Vo&&(h.mapping=Ms),h}function c(h){let f=0,m=6;for(let x=0;x<m;x++)h[x]!==void 0&&f++;return f===m}function l(h){let f=h.target;f.removeEventListener("dispose",l);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function wg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Ni("WebGLRenderer: "+n+" extension not supported."),s}}}function Tg(i,t,e,n){let s={},r=new WeakMap,o=new FinalizationRegistry(m=>delete s[m]);function a(m){c(m.target)}function c(m){m.index!==null&&t.remove(m.index);for(let g in m.attributes)t.remove(m.attributes[g]);m.removeEventListener("dispose",a),delete s[m.id],o.unregister(m);let x=r.get(m);x&&(t.remove(x),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function l(m,x){return s[x.id]!==void 0||(x.addEventListener("dispose",a),s[x.id]=new WeakRef(x),o.register(x,x.id,x),e.memory.geometries++),x}function u(m){let x=m.attributes;for(let g in x)t.update(x[g],i.ARRAY_BUFFER)}function d(m){let x=m.index,g=m.attributes.position,p=0;if(g===void 0)return;let v=x!==null?x.array.length:g.array.length/3-1,E=g.count>=65535?$s:Ys,y=new E(Math.ceil(v/3)*6,1),T=y.array;if(x!==null){let _=x.array;p=x.version;for(let b=0,U=0;b<v;b+=3){let I=_[b+0],z=_[b+1],k=_[b+2];T[U++]=I,T[U++]=z,T[U++]=z,T[U++]=k,T[U++]=k,T[U++]=I}}else{p=g.version;for(let _=0,b=0;_<v;_+=3){let U=_+0,I=_+1,z=_+2;T[b++]=U,T[b++]=I,T[b++]=I,T[b++]=z,T[b++]=z,T[b++]=U}}y.version=p;let w=r.get(m);w&&t.remove(w),r.set(m,y)}function h(m){let x=r.get(m);if(x){let g=m.index;g!==null&&x.version<g.version&&d(m)}else d(m);return r.get(m)}function f(){for(let m in s){let x=s[m].deref();x!==void 0&&c(x)}}return{get:l,update:u,getWireframeAttribute:h,dispose:f}}function Ag(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,h){i.drawElements(n,h,r,d*o),e.update(h,n,1)}function l(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,d*o,f),e.update(h,n,f))}function u(d,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,d,0,f);let x=0;for(let g=0;g<f;g++)x+=h[g];e.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Rg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Yt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Cg(i,t,e){let n=new WeakMap,s=new be;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,h=n.get(a);if(h===void 0||h.count!==d){let U=function(){_.dispose(),n.delete(a),a.removeEventListener("dispose",U)};h!==void 0&&h.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],E=0;f===!0&&(E=1),m===!0&&(E=2),x===!0&&(E=3);let y=a.attributes.position.count*E,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let w=new Float32Array(y*T*4*d),_=new qs(w,y,T,d);_.type=bn,_.needsUpdate=!0;let b=E*4;for(let I=0;I<d;I++){let z=g[I],k=p[I],J=v[I],N=y*T*4*I;for(let H=0;H<z.count;H++){let G=H*b;f===!0&&(s.fromBufferAttribute(z,H),w[N+G+0]=s.x,w[N+G+1]=s.y,w[N+G+2]=s.z,w[N+G+3]=0),m===!0&&(s.fromBufferAttribute(k,H),w[N+G+4]=s.x,w[N+G+5]=s.y,w[N+G+6]=s.z,w[N+G+7]=0),x===!0&&(s.fromBufferAttribute(J,H),w[N+G+8]=s.x,w[N+G+9]=s.y,w[N+G+10]=s.z,w[N+G+11]=J.itemSize===4?s.w:1)}}h={count:d,texture:_,size:new At(y,T)},n.set(a,h),a.addEventListener("dispose",U)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Ig(i,t,e,n,s){let r=new WeakMap;function o(l){let u=s.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function a(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:o,dispose:a}}var Pg={[yl]:"LINEAR_TONE_MAPPING",[Ml]:"REINHARD_TONE_MAPPING",[Sl]:"CINEON_TONE_MAPPING",[bl]:"ACES_FILMIC_TONE_MAPPING",[wl]:"AGX_TONE_MAPPING",[Bi]:"NEUTRAL_TONE_MAPPING",[El]:"CUSTOM_TONE_MAPPING"};function Lg(i,t,e,n,s,r){let o=new un(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=null,u=new Re;u.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new pe([0,2,0,0,2,0],2));let d=new To({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Ht(u,d),f=new cr(-1,1,1,-1,0,1),m=null,x=null,g=!1,p,v=null,E=[],y=!1;this.setSize=function(T,w){o.setSize(T,w),a!==null&&a.setSize(T,w),c!==null&&c.setSize(T,w);for(let _=0;_<E.length;_++){let b=E[_];b.setSize&&b.setSize(T,w)}},this.setEffects=function(T){E=T,y=E.length>0&&E[0].isRenderPass===!0;let w=o.width,_=o.height;E.length>0&&a===null&&(a=new un(w,_,{type:Pn,depthBuffer:!1,stencilBuffer:!1}),c=new un(w,_,{type:Pn,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&E.some(U=>U.needsDepthTexture===!0);b!==(o.depthTexture!==null)&&(b===!0&&l===null&&(l=new ei(w,_),r===!0&&(l.format=si,l.type=ki)),o.dispose(),o.depthTexture=b?l:null,o.resolveDepthBuffer=b,o.storeMultisampledDepthBuffer=b);for(let U=0;U<E.length;U++){let I=E[U];I.setSize&&I.setSize(w,_),b&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(l)}},this.begin=function(T,w){if(g||T.toneMapping===kn&&E.length===0)return!1;if(v=w,w!==null){let _=w.width,b=w.height;(o.width!==_||o.height!==b)&&this.setSize(_,b)}return y===!1&&T.setRenderTarget(o),p=T.toneMapping,T.toneMapping=kn,!0},this.hasRenderPass=function(){return y},this.end=function(T,w){T.toneMapping=p,g=!0;let _=o,b=a;for(let U=0;U<E.length;U++){let I=E[U];I.enabled!==!1&&(I.render(T,b,_,w),I.needsSwap!==!1&&(_=b,b=b===a?c:a))}if(m!==T.outputColorSpace||x!==T.toneMapping){m=T.outputColorSpace,x=T.toneMapping,d.defines={},oe.getTransfer(m)===ge&&(d.defines.SRGB_TRANSFER="");let U=Pg[x];U&&(d.defines[U]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=_.texture,T.setRenderTarget(v),T.render(h,f),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var yu=new on,Mu=new ei(1,1),Su=new Qs(1),bu=new qs,Eu=new mo,wu=new Ks,jh=[],tu=[],eu=new Float32Array(16),nu=new Float32Array(9),iu=new Float32Array(4);function Ts(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=jh[s];if(r===void 0&&(r=new Float32Array(s),jh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Pa(i,t){let e=tu[t];e===void 0&&(e=new Int32Array(t),tu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ng(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Dg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function Ug(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function Fg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function Og(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;iu.set(n),i.uniformMatrix2fv(this.addr,!1,iu),Le(e,n)}}function Bg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;nu.set(n),i.uniformMatrix3fv(this.addr,!1,nu),Le(e,n)}}function zg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;eu.set(n),i.uniformMatrix4fv(this.addr,!1,eu),Le(e,n)}}function kg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function Gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function Vg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function Wg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function Yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function La(i){return i.version===0&&(i.compareFunction=Ul,i.needsUpdate=!0),i}function $g(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=La(Mu):r=yu,e.setTexture2D(t||r,s)}function Zg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Eu,s)}function Jg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=La(Su):r=wu,e.setTextureCube(t||r,s)}function Kg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||bu,s)}function Qg(i){switch(i){case 5126:return Ng;case 35664:return Dg;case 35665:return Ug;case 35666:return Fg;case 35674:return Og;case 35675:return Bg;case 35676:return zg;case 5124:case 35670:return kg;case 35667:case 35671:return Hg;case 35668:case 35672:return Gg;case 35669:case 35673:return Vg;case 5125:return Wg;case 36294:return Xg;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return Zg;case 35680:case 36300:case 36308:case 36293:return Jg;case 36289:case 36303:case 36311:case 36292:return Kg}}function jg(i,t){i.uniform1fv(this.addr,t)}function t0(i,t){let e=Ts(t,this.size,2);i.uniform2fv(this.addr,e)}function e0(i,t){let e=Ts(t,this.size,3);i.uniform3fv(this.addr,e)}function n0(i,t){let e=Ts(t,this.size,4);i.uniform4fv(this.addr,e)}function i0(i,t){let e=Ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function s0(i,t){let e=Ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function r0(i,t){let e=Ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function o0(i,t){i.uniform1iv(this.addr,t)}function a0(i,t){i.uniform2iv(this.addr,t)}function l0(i,t){i.uniform3iv(this.addr,t)}function c0(i,t){i.uniform4iv(this.addr,t)}function h0(i,t){i.uniform1uiv(this.addr,t)}function u0(i,t){i.uniform2uiv(this.addr,t)}function d0(i,t){i.uniform3uiv(this.addr,t)}function f0(i,t){i.uniform4uiv(this.addr,t)}function p0(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=La(Mu):o=yu;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function m0(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Eu,r[o])}function g0(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=La(Su):o=wu;for(let a=0;a!==s;++a)e.setTextureCube(t[a]||o,r[a])}function _0(i,t,e){let n=this.cache,s=t.length,r=Pa(e,s);Pe(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||bu,r[o])}function x0(i){switch(i){case 5126:return jg;case 35664:return t0;case 35665:return e0;case 35666:return n0;case 35674:return i0;case 35675:return s0;case 35676:return r0;case 5124:case 35670:return o0;case 35667:case 35671:return a0;case 35668:case 35672:return l0;case 35669:case 35673:return c0;case 5125:return h0;case 36294:return u0;case 36295:return d0;case 36296:return f0;case 35678:case 36198:case 36298:case 36306:case 35682:return p0;case 35679:case 36299:case 36307:return m0;case 35680:case 36300:case 36308:case 36293:return g0;case 36289:case 36303:case 36311:case 36292:return _0}}var jl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qg(e.type)}},tc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x0(e.type)}},ec=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Kl=/(\w+)(\])?(\[|\.)?/g;function su(i,t){i.seq.push(t),i.map[t.id]=t}function v0(i,t,e){let n=i.name,s=n.length;for(Kl.lastIndex=0;;){let r=Kl.exec(n),o=Kl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){su(e,l===void 0?new jl(a,i,t):new tc(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new ec(a),su(e,d)),e=d}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);v0(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function ru(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var y0=37297,M0=0;function S0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var ou=new Zt;function b0(i){oe._getMatrix(ou,oe.workingColorSpace,i);let t=`mat3( ${ou.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case Ws:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function au(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+S0(i.getShaderSource(t),a)}else return r}function E0(i,t){let e=b0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var w0={[yl]:"Linear",[Ml]:"Reinhard",[Sl]:"Cineon",[bl]:"ACESFilmic",[wl]:"AgX",[Bi]:"Neutral",[El]:"Custom"};function T0(i,t){let e=w0[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ia=new D;function A0(){oe.getLuminanceCoefficients(Ia);let i=Ia.x.toFixed(4),t=Ia.y.toFixed(4),e=Ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function R0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function C0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function I0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Mr(i){return i!==""}function lu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function cu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var P0=/^[ \t]*#include +<([\w\d./]+)>/gm;function nc(i){return i.replace(P0,L0)}function L0(i,t){let e=te[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return nc(e)}var N0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hu(i){return i.replace(N0,D0)}function D0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var U0={[hr]:"SHADOWMAP_TYPE_PCF",[vs]:"SHADOWMAP_TYPE_VSM"};function F0(i){return U0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var O0={[Ms]:"ENVMAP_MODE_REFRACTION"};function B0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":O0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var z0={[Ho]:"ENVMAP_BLENDING_MULTIPLY",[Ah]:"ENVMAP_BLENDING_MIX",[Rh]:"ENVMAP_BLENDING_ADD"};function k0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":z0[i.combine]||"ENVMAP_BLENDING_NONE"}function H0(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=F0(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=B0(e),d=k0(e),h=R0(e),f=C0(r),m=s.createProgram(),x,g,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Mr).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Mr).join(`
`),g.length>0&&(g+=`
`)):(x=[uu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),g=[uu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==kn?"#define TONE_MAPPING":"",e.toneMapping!==kn?te.tonemapping_pars_fragment:"",e.toneMapping!==kn?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,E0("linearToOutputTexel",e.outputColorSpace),A0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Mr).join(`
`)),o=nc(o),o=lu(o,e),o=cu(o,e),a=nc(a),a=lu(a,e),a=cu(a,e),o=hu(o),a=hu(a),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,x=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",e.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let v=p+x+o,E=p+g+a,y=ru(s,s.VERTEX_SHADER,v),T=ru(s,s.FRAGMENT_SHADER,E);s.attachShader(m,y),s.attachShader(m,T),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function w(I){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(m)||"",k=s.getShaderInfoLog(y)||"",J=s.getShaderInfoLog(T)||"",N=z.trim(),H=k.trim(),G=J.trim(),X=!0,rt=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,y,T);else{let $=au(s,y,"vertex"),et=au(s,T,"fragment");Yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+N+`
`+$+`
`+et)}else N!==""?Xt("WebGLProgram: Program Info Log:",N):(H===""||G==="")&&(rt=!1);rt&&(I.diagnostics={runnable:X,programLog:N,vertexShader:{log:H,prefix:x},fragmentShader:{log:G,prefix:g}})}s.deleteShader(y),s.deleteShader(T),_=new Es(s,m),b=I0(s,m)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(m,y0)),U},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=M0++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=y,this.fragmentShader=T,this}var G0=0,ic=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new sc(t),e.set(t,n)),n}},sc=class{constructor(t){this.id=G0++,this.code=t,this.usedTimes=0}};function V0(i){return i===Si||i===gr||i===_r}function W0(i,t,e,n,s,r){let o=new ps,a=new ic,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(_){return c.add(_),_===0?"uv":`uv${_}`}function m(_,b,U,I,z,k){let J=I.fog,N=z.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,X=t.get(_.envMap||H,G),rt=h[_.type],$=n.precision;_.precision!==null&&($=n.getMaxPrecision(_.precision),$!==_.precision&&Xt("WebGLProgram.getParameters:",_.precision,"not supported, using",$,"instead."));let et=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,nt=et!==void 0?et.length:0,mt=0;N.morphAttributes.position!==void 0&&(mt=1),N.morphAttributes.normal!==void 0&&(mt=2),N.morphAttributes.color!==void 0&&(mt=3);let It,j,ct,vt;if(rt){let pt=Gn[rt];It=pt.vertexShader,j=pt.fragmentShader}else{It=_.vertexShader,j=_.fragmentShader;let pt=a.getVertexShaderStage(_),Ft=a.getFragmentShaderStage(_);a.update(_,pt,Ft),ct=pt.id,vt=Ft.id}let Et=i.getRenderTarget(),ft=i.state.buffers.depth.getReversed(),Ut=z.isInstancedMesh===!0,me=z.isBatchedMesh===!0,zt=!!_.map,yt=!!_.matcap,xt=!!X,Tt=xt&&X.isPMREMTexture===!0,Rt=!!_.aoMap,Wt=!!_.lightMap,qt=!!_.bumpMap&&_.wireframe===!1,$t=!!_.normalMap,ne=!!_.displacementMap,Gt=!!_.emissiveMap,Qt=!!_.metalnessMap,_e=!!_.roughnessMap,jt=_.anisotropy>0,B=_.clearcoat>0,he=_.diffuseRoughness>0,ie=_.dispersion>0,le=_.retroreflectivity>0,ut=_.iridescence>0,de=_.sheen>0,dt=_.transmission>0,Mt=jt&&!!_.anisotropyMap,A=B&&!!_.clearcoatMap,M=B&&!!_.clearcoatNormalMap,P=B&&!!_.clearcoatRoughnessMap,V=he&&!!_.diffuseRoughnessMap,q=ut&&!!_.iridescenceMap,ot=ut&&!!_.iridescenceThicknessMap,R=de&&!!_.sheenColorMap,L=de&&!!_.sheenRoughnessMap,F=!!_.specularMap,tt=!!_.specularColorMap,C=!!_.specularIntensityMap,K=dt&&!!_.transmissionMap,Z=dt&&!!_.thicknessMap,lt=!!_.gradientMap,at=!!_.alphaMap,ht=_.alphaTest>0,Pt=!!_.alphaHash,it=!!_.extensions,st=kn;_.toneMapped&&(Et===null||Et.isXRRenderTarget===!0)&&(st=i.toneMapping);let Ct=Tt?X.isCompressedCubeTexture?X.image[0].mipmaps:X.mipmaps:null,kt={shaderID:rt,shaderType:_.type,shaderName:_.name,vertexShader:It,fragmentShader:j,defines:_.defines,customVertexShaderID:ct,customFragmentShaderID:vt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:$,batching:me,batchingColor:me&&z._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&z.instanceColor!==null,instancingMorph:Ut&&z.morphTexture!==null,outputColorSpace:Et===null?i.outputColorSpace:Et.isXRRenderTarget===!0?Et.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:zt,matcap:yt,envMap:xt,envMapMode:xt&&X.mapping,envMapPMREM:Tt,envMapMaxLod:Tt?Ct.length-1:null,envMapSize:Tt?Ct[0].width:null,aoMap:Rt,lightMap:Wt,bumpMap:qt,normalMap:$t,displacementMap:ne,emissiveMap:Gt,normalMapObjectSpace:$t&&_.normalMapType===Ph,normalMapTangentSpace:$t&&_.normalMapType===xr,packedNormalMap:$t&&_.normalMapType===xr&&V0(_.normalMap.format),metalnessMap:Qt,roughnessMap:_e,anisotropy:jt,anisotropyMap:Mt,clearcoat:B,clearcoatMap:A,clearcoatNormalMap:M,clearcoatRoughnessMap:P,diffuseRoughness:he,diffuseRoughnessMap:V,dispersion:ie,retroreflection:le,iridescence:ut,iridescenceMap:q,iridescenceThicknessMap:ot,sheen:de,sheenColorMap:R,sheenRoughnessMap:L,specularMap:F,specularColorMap:tt,specularIntensityMap:C,transmission:dt,transmissionMap:K,thicknessMap:Z,gradientMap:lt,opaque:_.transparent===!1&&_.blending===ys&&_.alphaToCoverage===!1,alphaMap:at,alphaTest:ht,alphaHash:Pt,combine:_.combine,mapUv:zt&&f(_.map.channel),aoMapUv:Rt&&f(_.aoMap.channel),lightMapUv:Wt&&f(_.lightMap.channel),bumpMapUv:qt&&f(_.bumpMap.channel),normalMapUv:$t&&f(_.normalMap.channel),displacementMapUv:ne&&f(_.displacementMap.channel),emissiveMapUv:Gt&&f(_.emissiveMap.channel),metalnessMapUv:Qt&&f(_.metalnessMap.channel),roughnessMapUv:_e&&f(_.roughnessMap.channel),anisotropyMapUv:Mt&&f(_.anisotropyMap.channel),clearcoatMapUv:A&&f(_.clearcoatMap.channel),clearcoatNormalMapUv:M&&f(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:P&&f(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:V&&f(_.diffuseRoughnessMap.channel),iridescenceMapUv:q&&f(_.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&f(_.iridescenceThicknessMap.channel),sheenColorMapUv:R&&f(_.sheenColorMap.channel),sheenRoughnessMapUv:L&&f(_.sheenRoughnessMap.channel),specularMapUv:F&&f(_.specularMap.channel),specularColorMapUv:tt&&f(_.specularColorMap.channel),specularIntensityMapUv:C&&f(_.specularIntensityMap.channel),transmissionMapUv:K&&f(_.transmissionMap.channel),thicknessMapUv:Z&&f(_.thicknessMap.channel),alphaMapUv:at&&f(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&($t||jt),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!N.attributes.uv&&(zt||at),fog:!!J,useFog:_.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&$t===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ft,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:mt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:k.filter(pt=>pt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:zt&&_.map.isVideoTexture===!0&&oe.getTransfer(_.map.colorSpace)===ge,decodeVideoTextureEmissive:Gt&&_.emissiveMap.isVideoTexture===!0&&oe.getTransfer(_.emissiveMap.colorSpace)===ge,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===$e,flipSided:_.side===Ye,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:it&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&_.extensions.multiDraw===!0||me)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return kt.vertexUv1s=c.has(1),kt.vertexUv2s=c.has(2),kt.vertexUv3s=c.has(3),c.clear(),kt}function x(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let U in _.defines)b.push(U),b.push(_.defines[U]);return _.isRawShaderMaterial===!1&&(g(b,_),p(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function g(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function p(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.diffuseRoughness&&o.enable(25),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function v(_){let b=h[_.type],U;if(b){let I=Gn[b];U=qh.clone(I.uniforms)}else U=_.uniforms;return U}function E(_,b){let U=u.get(b);return U!==void 0?++U.usedTimes:(U=new H0(i,b,_,s),l.push(U),u.set(b,U)),U}function y(_){if(--_.usedTimes===0){let b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){a.remove(_)}function w(){a.dispose()}return{getParameters:m,getProgramCacheKey:x,getUniforms:v,acquireProgram:E,releaseProgram:y,releaseShaderCache:T,programs:l,dispose:w}}function X0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function q0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function du(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function fu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function a(h,f,m,x,g,p){let v=i[t];return v===void 0?(v={id:h.id,object:h,geometry:f,material:m,materialVariant:o(h),groupOrder:x,renderOrder:h.renderOrder,z:g,group:p},i[t]=v):(v.id=h.id,v.object=h,v.geometry=f,v.material=m,v.materialVariant=o(h),v.groupOrder=x,v.renderOrder=h.renderOrder,v.z=g,v.group=p),t++,v}function c(h,f,m,x,g,p,v){v.reversedDepth===!0&&(g=-g);let E=a(h,f,m,x,g,p);m.transmission>0?n.push(E):m.transparent===!0?s.push(E):e.push(E)}function l(h,f,m,x,g,p){let v=a(h,f,m,x,g,p);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function u(h,f){e.length>1&&e.sort(h||q0),n.length>1&&n.sort(f||du),s.length>1&&s.sort(f||du)}function d(){for(let h=t,f=i.length;h<f;h++){let m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function Y0(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new fu,i.set(n,[o])):s>=r.length?(o=new fu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function $0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new D,color:new wt};break;case"SpotLight":e={position:new D,direction:new D,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":e={color:new wt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Z0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var J0=0;function K0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Q0(i){let t=new $0,e=Z0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);let s=new D,r=new ce,o=new ce;function a(l){let u=0,d=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,v=0,E=0,y=0,T=0,w=0,_=0,b=0,U=0,I=0;l.sort(K0);for(let k=0,J=l.length;k<J;k++){let N=l[k],H=N.color,G=N.intensity,X=N.distance,rt=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Si?rt=N.shadow.map.texture:rt=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=H.r*G,d+=H.g*G,h+=H.b*G;else if(N.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(N.sh.coefficients[$],G);I++}else if(N.isSunLight){let $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let et=N.shadow,nt=e.get(N);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),n.sunShadow[m]=nt,n.sunShadowMap[m]=rt;let mt=et.getViewportCount();for(let It=0;It<mt;It++)n.sunShadowMatrix[x+It]=et.getMatrix(It),n.sunShadowCascade[x+It]=et._cascadeData[It];x+=mt,m++}n.sun[f]=$,f++}else if(N.isDirectionalLight){let $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let et=N.shadow,nt=e.get(N);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,n.directionalShadow[g]=nt,n.directionalShadowMap[g]=rt,n.directionalShadowMatrix[g]=N.shadow.matrix,T++}n.directional[g]=$,g++}else if(N.isSpotLight){let $=t.get(N);$.position.setFromMatrixPosition(N.matrixWorld),$.color.copy(H).multiplyScalar(G),$.distance=X,$.coneCos=Math.cos(N.angle),$.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),$.decay=N.decay,n.spot[v]=$;let et=N.shadow;if(N.map&&(n.spotLightMap[b]=N.map,b++,et.updateMatrices(N),N.castShadow&&U++),n.spotLightMatrix[v]=et.matrix,N.castShadow){let nt=e.get(N);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,n.spotShadow[v]=nt,n.spotShadowMap[v]=rt,_++}v++}else if(N.isRectAreaLight){let $=t.get(N);$.color.copy(H).multiplyScalar(G),$.halfWidth.set(N.width*.5,0,0),$.halfHeight.set(0,N.height*.5,0),n.rectArea[E]=$,E++}else if(N.isPointLight){let $=t.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),$.distance=N.distance,$.decay=N.decay,N.castShadow){let et=N.shadow,nt=e.get(N);nt.shadowIntensity=et.intensity,nt.shadowBias=et.bias,nt.shadowNormalBias=et.normalBias,nt.shadowRadius=et.radius,nt.shadowMapSize=et.mapSize,nt.shadowCameraNear=et.camera.near,nt.shadowCameraFar=et.camera.far,n.pointShadow[p]=nt,n.pointShadowMap[p]=rt,n.pointShadowMatrix[p]=N.shadow.matrix,w++}n.point[p]=$,p++}else if(N.isHemisphereLight){let $=t.get(N);$.skyColor.copy(N.color).multiplyScalar(G),$.groundColor.copy(N.groundColor).multiplyScalar(G),n.hemi[y]=$,y++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=St.LTC_FLOAT_1,n.rectAreaLTC2=St.LTC_FLOAT_2):(n.rectAreaLTC1=St.LTC_HALF_1,n.rectAreaLTC2=St.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;let z=n.hash;(z.sunLength!==f||z.directionalLength!==g||z.pointLength!==p||z.spotLength!==v||z.rectAreaLength!==E||z.hemiLength!==y||z.numSunShadows!==m||z.numDirectionalShadows!==T||z.numPointShadows!==w||z.numSpotShadows!==_||z.numSpotMaps!==b||z.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=g,n.spot.length=v,n.rectArea.length=E,n.point.length=p,n.hemi.length=y,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+b-U,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=I,z.sunLength=f,z.directionalLength=g,z.pointLength=p,z.spotLength=v,z.rectAreaLength=E,z.hemiLength=y,z.numSunShadows=m,z.numDirectionalShadows=T,z.numPointShadows=w,z.numSpotShadows=_,z.numSpotMaps=b,z.numLightProbes=I,n.version=J0++)}function c(l,u){let d=0,h=0,f=0,m=0,x=0,g=0,p=u.matrixWorldInverse;for(let v=0,E=l.length;v<E;v++){let y=l[v];if(y.isSunLight){let T=n.sun[d];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let T=n.directional[h];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),h++}else if(y.isSpotLight){let T=n.spot[m];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),m++}else if(y.isRectAreaLight){let T=n.rectArea[x];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),x++}else if(y.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let T=n.hemi[g];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:n}}function pu(i){let t=new Q0(i),e=[],n=[],s=[];function r(d){u.camera=d,e.length=0,n.length=0,s.length=0}function o(d){d.isLightProbeGrid?s.push(d):e.push(d)}function a(d){n.push(d)}function c(){t.setup(e),s.sort((d,h)=>d.priority-h.priority||d.id-h.id)}function l(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function j0(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new pu(i),t.set(s,[a])):r>=o.length?(a=new pu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var t_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,n_=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],i_=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],mu=new ce,yr=new D,Ql=new D;function s_(i,t,e){let n=new mi,s=new At,r=new At,o=new be,a=new Ao,c=new Ro,l={},u=e.maxTextureSize,d={[Mi]:Ye,[Ye]:Mi,[$e]:$e},h=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:t_,fragmentShader:e_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new Re;m.setAttribute("position",new Se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ht(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hr;let p=this.type;this.render=function(w,_,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===lh&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=hr);let U=i.getRenderTarget(),I=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Ui),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let J=p!==this.type;J&&_.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=w.length;N<H;N++){let G=w[N],X=G.shadow;if(X===void 0){Xt("WebGLShadowMap:",G,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let rt=X.getFrameExtents();s.multiply(rt),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/rt.x),s.x=r.x*rt.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/rt.y),s.y=r.y*rt.y,X.mapSize.y=r.y));let $=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=$,X.map===null||J===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===vs){if(G.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new un(s.x,s.y,{format:Si,type:Pn,minFilter:rn,magFilter:rn,generateMipmaps:!1}),X.map.texture.name=G.name+".shadowMap",X.map.depthTexture=new ei(s.x,s.y,bn),X.map.depthTexture.name=G.name+".shadowMapDepth",X.map.depthTexture.format=Kn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ze,X.map.depthTexture.magFilter=ze}else G.isPointLight?(X.map=new Sr(s.x),X.map.depthTexture=new Qs(s.x,In)):(X.map=new un(s.x,s.y),X.map.depthTexture=new ei(s.x,s.y,In)),X.map.depthTexture.name=G.name+".shadowMap",X.map.depthTexture.format=Kn,this.type===hr?(X.map.depthTexture.compareFunction=$?Dl:Nl,X.map.depthTexture.minFilter=rn,X.map.depthTexture.magFilter=rn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=ze,X.map.depthTexture.magFilter=ze);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let et=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();G.isPointLight!==!0&&X.updateMatrices(G,b);let nt=(X.camera.layers.mask&4294967294)!==0?X.camera.layers:b.layers;for(let mt=0;mt<et;mt++){let It=X.getCamera(mt);if(G.isPointLight){let j=X.camera,ct=X.matrix,vt=G.distance||j.far;vt!==j.far&&(j.far=vt,j.updateProjectionMatrix()),yr.setFromMatrixPosition(G.matrixWorld),j.position.copy(yr),Ql.copy(j.position),Ql.add(n_[mt]),j.up.copy(i_[mt]),j.lookAt(Ql),j.updateMatrixWorld(),ct.makeTranslation(-yr.x,-yr.y,-yr.z),mu.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),X._frustum.setFromProjectionMatrix(mu,j.coordinateSystem,j.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,mt),i.clear();else{mt===0&&(i.setRenderTarget(X.map),i.clear());let j=X.getViewport(mt);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),k.viewport(o)}n=X.getFrustum(mt),y(_,b,It,G,nt,this.type)}X.isPointLightShadow!==!0&&this.type===vs&&v(X,b),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(U,I,z)};function v(w,_){let b=t.update(x);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new un(s.x,s.y,{format:Si,type:Pn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(_,null,b,h,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(_,null,b,f,x,null)}function E(w,_,b,U){let I=null,z=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(z!==void 0)I=z;else if(I=b.isPointLight===!0?c:a,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let k=I.uuid,J=_.uuid,N=l[k];N===void 0&&(N={},l[k]=N);let H=N[J];H===void 0&&(H=I.clone(),N[J]=H,_.addEventListener("dispose",T)),I=H}if(I.visible=_.visible,I.wireframe=_.wireframe,U===vs?I.side=_.shadowSide!==null?_.shadowSide:_.side:I.side=_.shadowSide!==null?_.shadowSide:d[_.side],I.alphaMap=_.alphaMap,I.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,I.map=_.map,I.clipShadows=_.clipShadows,I.clippingPlanes=_.clippingPlanes,I.clipIntersection=_.clipIntersection,I.displacementMap=_.displacementMap,I.displacementScale=_.displacementScale,I.displacementBias=_.displacementBias,I.wireframeLinewidth=_.wireframeLinewidth,I.linewidth=_.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let k=i.properties.get(I);k.light=b}return I}function y(w,_,b,U,I,z){if(w.visible===!1)return;if(w.layers.test(I)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&z===vs)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);let N=t.update(w),H=w.material;if(Array.isArray(H)){let G=N.groups;for(let X=0,rt=G.length;X<rt;X++){let $=G[X],et=H[$.materialIndex];if(et&&et.visible){let nt=E(w,et,U,z);w.onBeforeShadow(i,w,_,b,N,nt,$),i.renderBufferDirect(b,null,N,nt,w,$),w.onAfterShadow(i,w,_,b,N,nt,$)}}}else if(H.visible){let G=E(w,H,U,z);w.onBeforeShadow(i,w,_,b,N,G,null),i.renderBufferDirect(b,null,N,G,w,null),w.onAfterShadow(i,w,_,b,N,G,null)}}let J=w.children;for(let N=0,H=J.length;N<H;N++)y(J[N],_,b,U,I,z)}function T(w){w.target.removeEventListener("dispose",T);for(let b in l){let U=l[b],I=w.target.uuid;I in U&&(U[I].dispose(),delete U[I])}}}function r_(i,t){function e(){let C=!1,K=new be,Z=null,lt=new be(0,0,0,0);return{setMask:function(at){Z!==at&&!C&&(i.colorMask(at,at,at,at),Z=at)},setLocked:function(at){C=at},setClear:function(at,ht,Pt,it,st){st===!0&&(at*=it,ht*=it,Pt*=it),K.set(at,ht,Pt,it),lt.equals(K)===!1&&(i.clearColor(at,ht,Pt,it),lt.copy(K))},reset:function(){C=!1,Z=null,lt.set(-1,0,0,0)}}}function n(){let C=!1,K=!1,Z=null,lt=null,at=null;return{setReversed:function(ht){if(K!==ht){let Pt=t.get("EXT_clip_control");ht?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),K=ht;let it=at;at=null,this.setClear(it)}},getReversed:function(){return K},setTest:function(ht){ht?ft(i.DEPTH_TEST):Ut(i.DEPTH_TEST)},setMask:function(ht){Z!==ht&&!C&&(i.depthMask(ht),Z=ht)},setFunc:function(ht){if(K&&(ht=Gh[ht]),lt!==ht){switch(ht){case io:i.depthFunc(i.NEVER);break;case so:i.depthFunc(i.ALWAYS);break;case ro:i.depthFunc(i.LESS);break;case cs:i.depthFunc(i.LEQUAL);break;case oo:i.depthFunc(i.EQUAL);break;case ao:i.depthFunc(i.GEQUAL);break;case lo:i.depthFunc(i.GREATER);break;case co:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=ht}},setLocked:function(ht){C=ht},setClear:function(ht){at!==ht&&(at=ht,K&&(ht=1-ht),i.clearDepth(ht))},reset:function(){C=!1,Z=null,lt=null,at=null,K=!1}}}function s(){let C=!1,K=null,Z=null,lt=null,at=null,ht=null,Pt=null,it=null,st=null;return{setTest:function(Ct){C||(Ct?ft(i.STENCIL_TEST):Ut(i.STENCIL_TEST))},setMask:function(Ct){K!==Ct&&!C&&(i.stencilMask(Ct),K=Ct)},setFunc:function(Ct,kt,pt){(Z!==Ct||lt!==kt||at!==pt)&&(i.stencilFunc(Ct,kt,pt),Z=Ct,lt=kt,at=pt)},setOp:function(Ct,kt,pt){(ht!==Ct||Pt!==kt||it!==pt)&&(i.stencilOp(Ct,kt,pt),ht=Ct,Pt=kt,it=pt)},setLocked:function(Ct){C=Ct},setClear:function(Ct){st!==Ct&&(i.clearStencil(Ct),st=Ct)},reset:function(){C=!1,K=null,Z=null,lt=null,at=null,ht=null,Pt=null,it=null,st=null}}}let r=new e,o=new n,a=new s,c={},l=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],x=null,g=!1,p=null,v=null,E=null,y=null,T=null,w=null,_=null,b=new wt(0,0,0),U=0,I=!1,z=null,k=null,J=null,N=null,H=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,rt=0,$=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec($)[1]),X=rt>=1):$.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),X=rt>=2);let et=null,nt={},mt=i.getParameter(i.SCISSOR_BOX),It=i.getParameter(i.VIEWPORT),j=new be().fromArray(mt),ct=new be().fromArray(It);function vt(C,K,Z,lt){let at=new Uint8Array(4),ht=i.createTexture();i.bindTexture(C,ht),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<Z;Pt++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(K+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return ht}let Et={};Et[i.TEXTURE_2D]=vt(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[i.TEXTURE_2D_ARRAY]=vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(i.DEPTH_TEST),o.setFunc(cs),qt(!1),$t(ml),ft(i.CULL_FACE),Rt(Ui);function ft(C){u[C]!==!0&&(i.enable(C),u[C]=!0)}function Ut(C){u[C]!==!1&&(i.disable(C),u[C]=!1)}function me(C,K){return h[C]!==K?(i.bindFramebuffer(C,K),h[C]=K,C===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=K),C===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=K),!0):!1}function zt(C,K){let Z=m,lt=!1;if(C){Z=f.get(K),Z===void 0&&(Z=[],f.set(K,Z));let at=C.textures;if(Z.length!==at.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Pt=at.length;ht<Pt;ht++)Z[ht]=i.COLOR_ATTACHMENT0+ht;Z.length=at.length,lt=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,lt=!0);lt&&i.drawBuffers(Z)}function yt(C){return x!==C?(i.useProgram(C),x=C,!0):!1}let xt={[Oi]:i.FUNC_ADD,[hh]:i.FUNC_SUBTRACT,[uh]:i.FUNC_REVERSE_SUBTRACT};xt[dh]=i.MIN,xt[fh]=i.MAX;let Tt={[ph]:i.ZERO,[mh]:i.ONE,[gh]:i.SRC_COLOR,[xl]:i.SRC_ALPHA,[Sh]:i.SRC_ALPHA_SATURATE,[yh]:i.DST_COLOR,[xh]:i.DST_ALPHA,[_h]:i.ONE_MINUS_SRC_COLOR,[vl]:i.ONE_MINUS_SRC_ALPHA,[Mh]:i.ONE_MINUS_DST_COLOR,[vh]:i.ONE_MINUS_DST_ALPHA,[bh]:i.CONSTANT_COLOR,[Eh]:i.ONE_MINUS_CONSTANT_COLOR,[wh]:i.CONSTANT_ALPHA,[Th]:i.ONE_MINUS_CONSTANT_ALPHA};function Rt(C,K,Z,lt,at,ht,Pt,it,st,Ct){if(C===Ui){g===!0&&(Ut(i.BLEND),g=!1);return}if(g===!1&&(ft(i.BLEND),g=!0),C!==ch){if(C!==p||Ct!==I){if((v!==Oi||T!==Oi)&&(i.blendEquation(i.FUNC_ADD),v=Oi,T=Oi),Ct)switch(C){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fi:i.blendFunc(i.ONE,i.ONE);break;case gl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _l:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Yt("WebGLState: Invalid blending: ",C);break}else switch(C){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case gl:Yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _l:Yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Yt("WebGLState: Invalid blending: ",C);break}E=null,y=null,w=null,_=null,b.set(0,0,0),U=0,p=C,I=Ct}return}at=at||K,ht=ht||Z,Pt=Pt||lt,(K!==v||at!==T)&&(i.blendEquationSeparate(xt[K],xt[at]),v=K,T=at),(Z!==E||lt!==y||ht!==w||Pt!==_)&&(i.blendFuncSeparate(Tt[Z],Tt[lt],Tt[ht],Tt[Pt]),E=Z,y=lt,w=ht,_=Pt),(it.equals(b)===!1||st!==U)&&(i.blendColor(it.r,it.g,it.b,st),b.copy(it),U=st),p=C,I=!1}function Wt(C,K){C.side===$e?Ut(i.CULL_FACE):ft(i.CULL_FACE);let Z=C.side===Ye;K&&(Z=!Z),qt(Z),C.blending===ys&&C.transparent===!1?Rt(Ui):Rt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),o.setFunc(C.depthFunc),o.setTest(C.depthTest),o.setMask(C.depthWrite),r.setMask(C.colorWrite);let lt=C.stencilWrite;a.setTest(lt),lt&&(a.setMask(C.stencilWriteMask),a.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),a.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),Gt(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ft(i.SAMPLE_ALPHA_TO_COVERAGE):Ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function qt(C){z!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),z=C)}function $t(C){C!==oh?(ft(i.CULL_FACE),C!==k&&(C===ml?i.cullFace(i.BACK):C===ah?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ut(i.CULL_FACE),k=C}function ne(C){C!==J&&(X&&i.lineWidth(C),J=C)}function Gt(C,K,Z){C?(ft(i.POLYGON_OFFSET_FILL),(N!==K||H!==Z)&&(N=K,H=Z,o.getReversed()&&(K=-K,Z=-Z),i.polygonOffset(K,Z))):Ut(i.POLYGON_OFFSET_FILL)}function Qt(C){C?ft(i.SCISSOR_TEST):Ut(i.SCISSOR_TEST)}function _e(C){C===void 0&&(C=i.TEXTURE0+G-1),et!==C&&(i.activeTexture(C),et=C)}function jt(C,K,Z){Z===void 0&&(et===null?Z=i.TEXTURE0+G-1:Z=et);let lt=nt[Z];lt===void 0&&(lt={type:void 0,texture:void 0},nt[Z]=lt),(lt.type!==C||lt.texture!==K)&&(et!==Z&&(i.activeTexture(Z),et=Z),i.bindTexture(C,K||Et[C]),lt.type=C,lt.texture=K)}function B(){let C=nt[et];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function he(){try{i.compressedTexImage2D(...arguments)}catch(C){Yt("WebGLState:",C)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(C){Yt("WebGLState:",C)}}function le(){try{i.texSubImage2D(...arguments)}catch(C){Yt("WebGLState:",C)}}function ut(){try{i.texSubImage3D(...arguments)}catch(C){Yt("WebGLState:",C)}}function de(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Yt("WebGLState:",C)}}function dt(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Yt("WebGLState:",C)}}function Mt(){try{i.texStorage2D(...arguments)}catch(C){Yt("WebGLState:",C)}}function A(){try{i.texStorage3D(...arguments)}catch(C){Yt("WebGLState:",C)}}function M(){try{i.texImage2D(...arguments)}catch(C){Yt("WebGLState:",C)}}function P(){try{i.texImage3D(...arguments)}catch(C){Yt("WebGLState:",C)}}function V(C){return d[C]!==void 0?d[C]:i.getParameter(C)}function q(C,K){d[C]!==K&&(i.pixelStorei(C,K),d[C]=K)}function ot(C){j.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),j.copy(C))}function R(C){ct.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ct.copy(C))}function L(C,K){let Z=l.get(K);Z===void 0&&(Z=new WeakMap,l.set(K,Z));let lt=Z.get(C);lt===void 0&&(lt=i.getUniformBlockIndex(K,C.name),i.uniformBlockBinding(K,lt,lt),Z.set(C,lt))}function F(C,K,Z){let at=l.get(K).get(C);c[at]!==Z&&(i.bindBufferBase(i.UNIFORM_BUFFER,at,Z),c[at]=Z)}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},et=null,nt={},h={},c={},f=new WeakMap,m=[],x=null,g=!1,p=null,v=null,E=null,y=null,T=null,w=null,_=null,b=new wt(0,0,0),U=0,I=!1,z=null,k=null,J=null,N=null,H=null,j.set(0,0,i.canvas.width,i.canvas.height),ct.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ft,disable:Ut,bindFramebuffer:me,drawBuffers:zt,useProgram:yt,setBlending:Rt,setMaterial:Wt,setFlipSided:qt,setCullFace:$t,setLineWidth:ne,setPolygonOffset:Gt,setScissorTest:Qt,activeTexture:_e,bindTexture:jt,unbindTexture:B,compressedTexImage2D:he,compressedTexImage3D:ie,texImage2D:M,texImage3D:P,pixelStorei:q,getParameter:V,updateUBOMapping:L,uniformBlockBinding:F,texStorage2D:Mt,texStorage3D:A,texSubImage2D:le,texSubImage3D:ut,compressedTexSubImage2D:de,compressedTexSubImage3D:dt,scissor:ot,viewport:R,reset:tt}}function o_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new At,u=new WeakMap,d=new Set,h,f=new WeakMap,m=new Set,x=new FinalizationRegistry(A=>m.delete(A)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,M){return g?new OffscreenCanvas(A,M):Xs("canvas")}function v(A,M,P){let V=1,q=Mt(A);if((q.width>P||q.height>P)&&(V=P/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let ot=Math.floor(V*q.width),R=Math.floor(V*q.height);h===void 0&&(h=p(ot,R));let L=M?p(ot,R):h;return L.width=ot,L.height=R,L.getContext("2d").drawImage(A,0,0,ot,R),Xt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ot+"x"+R+")."),L}else return"data"in A&&Xt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function E(A){return A.generateMipmaps}function y(A){i.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(A,M,P,V,q,ot=!1){if(A!==null){if(i[A]!==void 0)return i[A];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let R;V&&(R=t.get("EXT_texture_norm16"),R||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let L=M;if(M===i.RED&&(P===i.FLOAT&&(L=i.R32F),P===i.HALF_FLOAT&&(L=i.R16F),P===i.UNSIGNED_BYTE&&(L=i.R8),P===i.UNSIGNED_SHORT&&R&&(L=R.R16_EXT),P===i.SHORT&&R&&(L=R.R16_SNORM_EXT)),M===i.RED_INTEGER&&(P===i.UNSIGNED_BYTE&&(L=i.R8UI),P===i.UNSIGNED_SHORT&&(L=i.R16UI),P===i.UNSIGNED_INT&&(L=i.R32UI),P===i.BYTE&&(L=i.R8I),P===i.SHORT&&(L=i.R16I),P===i.INT&&(L=i.R32I)),M===i.RG&&(P===i.FLOAT&&(L=i.RG32F),P===i.HALF_FLOAT&&(L=i.RG16F),P===i.UNSIGNED_BYTE&&(L=i.RG8),P===i.UNSIGNED_SHORT&&R&&(L=R.RG16_EXT),P===i.SHORT&&R&&(L=R.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(P===i.UNSIGNED_BYTE&&(L=i.RG8UI),P===i.UNSIGNED_SHORT&&(L=i.RG16UI),P===i.UNSIGNED_INT&&(L=i.RG32UI),P===i.BYTE&&(L=i.RG8I),P===i.SHORT&&(L=i.RG16I),P===i.INT&&(L=i.RG32I)),M===i.RGB_INTEGER&&(P===i.UNSIGNED_BYTE&&(L=i.RGB8UI),P===i.UNSIGNED_SHORT&&(L=i.RGB16UI),P===i.UNSIGNED_INT&&(L=i.RGB32UI),P===i.BYTE&&(L=i.RGB8I),P===i.SHORT&&(L=i.RGB16I),P===i.INT&&(L=i.RGB32I)),M===i.RGBA_INTEGER&&(P===i.UNSIGNED_BYTE&&(L=i.RGBA8UI),P===i.UNSIGNED_SHORT&&(L=i.RGBA16UI),P===i.UNSIGNED_INT&&(L=i.RGBA32UI),P===i.BYTE&&(L=i.RGBA8I),P===i.SHORT&&(L=i.RGBA16I),P===i.INT&&(L=i.RGBA32I)),M===i.RGB&&(P===i.UNSIGNED_SHORT&&R&&(L=R.RGB16_EXT),P===i.SHORT&&R&&(L=R.RGB16_SNORM_EXT),P===i.UNSIGNED_INT_5_9_9_9_REV&&(L=i.RGB9_E5),P===i.UNSIGNED_INT_10F_11F_11F_REV&&(L=i.R11F_G11F_B10F)),M===i.RGBA){let F=ot?Ws:oe.getTransfer(q);P===i.FLOAT&&(L=i.RGBA32F),P===i.HALF_FLOAT&&(L=i.RGBA16F),P===i.UNSIGNED_BYTE&&(L=F===ge?i.SRGB8_ALPHA8:i.RGBA8),P===i.UNSIGNED_SHORT&&R&&(L=R.RGBA16_EXT),P===i.SHORT&&R&&(L=R.RGBA16_SNORM_EXT),P===i.UNSIGNED_SHORT_4_4_4_4&&(L=i.RGBA4),P===i.UNSIGNED_SHORT_5_5_5_1&&(L=i.RGB5_A1)}return(L===i.R16F||L===i.R32F||L===i.RG16F||L===i.RG32F||L===i.RGBA16F||L===i.RGBA32F)&&t.get("EXT_color_buffer_float"),L}function _(A,M){let P;return A?M===null||M===In||M===ki?P=i.DEPTH24_STENCIL8:M===bn?P=i.DEPTH32F_STENCIL8:M===Ss&&(P=i.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===In||M===ki?P=i.DEPTH_COMPONENT24:M===bn?P=i.DEPTH_COMPONENT32F:M===Ss&&(P=i.DEPTH_COMPONENT16),P}function b(A,M){return E(A)===!0||A.isFramebufferTexture&&A.minFilter!==ze&&A.minFilter!==rn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function U(A){let M=new WeakRef(A);n.get(A).__ref=M,m.add(M),x.register(A,M,M)}function I(A){let M=n.get(A).__ref;M!==void 0&&(m.delete(M),x.unregister(M))}function z(A){J(A.target)}function k(A){N(A.target)}function J(A){A.removeEventListener("dispose",z),I(A),G(A),A.isVideoTexture&&u.delete(A),A.isHTMLTexture&&d.delete(A)}function N(A){A.removeEventListener("dispose",k),I(A),rt(A)}function H(){for(let A of m){let M=A.deref();M!==void 0&&(M.isRenderTarget===!0?N(M):J(M))}m.clear(),d.clear()}function G(A){let M=n.get(A);if(M.__webglInit===void 0)return;let P=A.source,V=f.get(P);if(V){let q=V[M.__cacheKey];q.usedTimes--,q.usedTimes===0&&X(A),Object.keys(V).length===0&&f.delete(P)}n.remove(A)}function X(A){let M=n.get(A);i.deleteTexture(M.__webglTexture);let P=A.source,V=f.get(P);delete V[M.__cacheKey],o.memory.textures--}function rt(A){let M=n.get(A);M.__depthDisposeCallback&&M.__depthDisposeCallback();let P=A.depthTexture;if(P&&P.renderTarget===A&&J(P),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let ot=0;ot<M.__webglFramebuffer[q].length;ot++)i.deleteFramebuffer(M.__webglFramebuffer[q][ot]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let V=A.textures;for(let q=0,ot=V.length;q<ot;q++){let R=n.get(V[q]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),o.memory.textures--),n.remove(V[q])}n.remove(A)}let $=0;function et(){$=0}function nt(){return $}function mt(A){$=A}function It(){let A=$;return A>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),$+=1,A}function j(A){let M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.mipmapsAutoUpdate),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function ct(A,M){let P=n.get(A);if(A.isVideoTexture&&de(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&P.__version!==A.version){let V=A.image;if(V===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{Wt(P,A,M);return}}else A.isExternalTexture&&(P.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,P.__webglTexture,i.TEXTURE0+M)}function vt(A,M){let P=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version){Wt(P,A,M);return}else A.isExternalTexture&&(P.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,P.__webglTexture,i.TEXTURE0+M)}function Et(A,M){let P=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&P.__version!==A.version){Wt(P,A,M);return}e.bindTexture(i.TEXTURE_3D,P.__webglTexture,i.TEXTURE0+M)}function ft(A,M){let P=n.get(A);if(A.version>0&&P.__version!==A.version){qt(P,A,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+M)}let Ut={[pi]:i.REPEAT,[Un]:i.CLAMP_TO_EDGE,[ho]:i.MIRRORED_REPEAT},me={[ze]:i.NEAREST,[Ch]:i.NEAREST_MIPMAP_NEAREST,[ur]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[Wo]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},zt={[Nh]:i.NEVER,[Ul]:i.ALWAYS,[Dh]:i.LESS,[Nl]:i.LEQUAL,[Uh]:i.EQUAL,[Dl]:i.GEQUAL,[Fh]:i.GREATER,[Oh]:i.NOTEQUAL};function yt(A,M){if(M.type===bn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===rn||M.magFilter===Wo||M.magFilter===ur||M.magFilter===ii||M.minFilter===rn||M.minFilter===Wo||M.minFilter===ur||M.minFilter===ii)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Ut[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Ut[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Ut[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,me[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,me[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,zt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===ze||M.minFilter!==ur&&M.minFilter!==ii||M.type===bn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let P=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function xt(A,M){let P=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",z),U(M));let V=M.source,q=f.get(V);q===void 0&&(q={},f.set(V,q));let ot=j(M);if(ot!==A.__cacheKey){q[ot]===void 0&&(q[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,P=!0),q[ot].usedTimes++;let R=q[A.__cacheKey];R!==void 0&&(q[A.__cacheKey].usedTimes--,R.usedTimes===0&&X(M)),A.__cacheKey=ot,A.__webglTexture=q[ot].texture}return P}function Tt(A,M,P){return Math.floor(Math.floor(A/P)/M)}function Rt(A,M,P,V){let ot=A.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,P,V,M.data);else{ot.sort((C,K)=>C.start-K.start);let R=0;for(let C=1;C<ot.length;C++){let K=ot[R],Z=ot[C],lt=K.start+K.count,at=Tt(Z.start,M.width,4),ht=Tt(K.start,M.width,4);Z.start<=lt+1&&at===ht&&Tt(Z.start+Z.count-1,M.width,4)===at?K.count=Math.max(K.count,Z.start+Z.count-K.start):(++R,ot[R]=Z)}ot.length=R+1;let L=e.getParameter(i.UNPACK_ROW_LENGTH),F=e.getParameter(i.UNPACK_SKIP_PIXELS),tt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let C=0,K=ot.length;C<K;C++){let Z=ot[C],lt=Math.floor(Z.start/4),at=Math.ceil(Z.count/4),ht=lt%M.width,Pt=Math.floor(lt/M.width),it=at,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(i.UNPACK_SKIP_ROWS,Pt),e.texSubImage2D(i.TEXTURE_2D,0,ht,Pt,it,st,P,V,M.data)}A.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,L),e.pixelStorei(i.UNPACK_SKIP_PIXELS,F),e.pixelStorei(i.UNPACK_SKIP_ROWS,tt)}}function Wt(A,M,P){let V=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(V=i.TEXTURE_3D);let q=xt(A,M),ot=M.source;e.bindTexture(V,A.__webglTexture,i.TEXTURE0+P);let R=n.get(ot);if(ot.version!==R.__version||q===!0){if(e.activeTexture(i.TEXTURE0+P),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let st=oe.getPrimaries(oe.workingColorSpace),Ct=M.colorSpace===ri?null:oe.getPrimaries(M.colorSpace),kt=M.colorSpace===ri||st===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt)}e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let F=v(M.image,!1,s.maxTextureSize);F=dt(M,F);let tt=r.convert(M.format,M.colorSpace),C=r.convert(M.type),K=w(M.internalFormat,tt,C,M.normalized,M.colorSpace,M.isVideoTexture);yt(V,M);let Z,lt=M.mipmaps,at=M.isVideoTexture!==!0,ht=R.__version===void 0||q===!0,Pt=ot.dataReady,it=b(M,F);if(M.isDepthTexture)K=_(M.format===si,M.type),ht&&(at?e.texStorage2D(i.TEXTURE_2D,1,K,F.width,F.height):e.texImage2D(i.TEXTURE_2D,0,K,F.width,F.height,0,tt,C,null));else if(M.isDataTexture)if(lt.length>0){at&&ht&&e.texStorage2D(i.TEXTURE_2D,it,K,lt[0].width,lt[0].height);for(let st=0,Ct=lt.length;st<Ct;st++)Z=lt[st],at?Pt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Z.width,Z.height,tt,C,Z.data):e.texImage2D(i.TEXTURE_2D,st,K,Z.width,Z.height,0,tt,C,Z.data);M.generateMipmaps=!1}else at?(ht&&e.texStorage2D(i.TEXTURE_2D,it,K,F.width,F.height),Pt&&Rt(M,F,tt,C)):e.texImage2D(i.TEXTURE_2D,0,K,F.width,F.height,0,tt,C,F.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){at&&ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,it,K,lt[0].width,lt[0].height,F.depth);for(let st=0,Ct=lt.length;st<Ct;st++)if(Z=lt[st],M.format!==Ln)if(tt!==null)if(at){if(Pt)if(M.layerUpdates.size>0){let kt=Xl(Z.width,Z.height,M.format,M.type);for(let pt of M.layerUpdates){let Ft=Z.data.subarray(pt*kt/Z.data.BYTES_PER_ELEMENT,(pt+1)*kt/Z.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,pt,Z.width,Z.height,1,tt,Ft)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Z.width,Z.height,F.depth,tt,Z.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,K,Z.width,Z.height,F.depth,0,Z.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?Pt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Z.width,Z.height,F.depth,tt,C,Z.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,K,Z.width,Z.height,F.depth,0,tt,C,Z.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{at&&ht&&e.texStorage2D(i.TEXTURE_2D,it,K,lt[0].width,lt[0].height);for(let st=0,Ct=lt.length;st<Ct;st++)Z=lt[st],M.format!==Ln?tt!==null?at?Pt&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,Z.width,Z.height,tt,Z.data):e.compressedTexImage2D(i.TEXTURE_2D,st,K,Z.width,Z.height,0,Z.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?Pt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Z.width,Z.height,tt,C,Z.data):e.texImage2D(i.TEXTURE_2D,st,K,Z.width,Z.height,0,tt,C,Z.data)}else if(M.isDataArrayTexture)if(at){if(ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,it,K,F.width,F.height,F.depth),Pt)if(M.layerUpdates.size>0){let st=Xl(F.width,F.height,M.format,M.type);for(let Ct of M.layerUpdates){let kt=F.data.subarray(Ct*st/F.data.BYTES_PER_ELEMENT,(Ct+1)*st/F.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ct,F.width,F.height,1,tt,C,kt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,tt,C,F.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,K,F.width,F.height,F.depth,0,tt,C,F.data);else if(M.isData3DTexture)at?(ht&&e.texStorage3D(i.TEXTURE_3D,it,K,F.width,F.height,F.depth),Pt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,tt,C,F.data)):e.texImage3D(i.TEXTURE_3D,0,K,F.width,F.height,F.depth,0,tt,C,F.data);else if(M.isFramebufferTexture){if(ht)if(at)e.texStorage2D(i.TEXTURE_2D,it,K,F.width,F.height);else{let st=F.width,Ct=F.height;for(let kt=0;kt<it;kt++)e.texImage2D(i.TEXTURE_2D,kt,K,st,Ct,0,tt,C,null),st>>=1,Ct>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),F.parentNode!==st){st.appendChild(F),d.add(M),st.onpaint=Ct=>{let kt=Ct.changedElements;for(let pt of d)kt.includes(pt.image)&&(pt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,F);else{let kt=i.RGBA,pt=i.RGBA,Ft=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,kt,pt,Ft,F)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(lt.length>0){if(at&&ht){let st=Mt(lt[0]);e.texStorage2D(i.TEXTURE_2D,it,K,st.width,st.height)}for(let st=0,Ct=lt.length;st<Ct;st++)Z=lt[st],at?Pt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,tt,C,Z):e.texImage2D(i.TEXTURE_2D,st,K,tt,C,Z);M.generateMipmaps=!1}else if(at){if(ht){let st=Mt(F);e.texStorage2D(i.TEXTURE_2D,it,K,st.width,st.height)}Pt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,tt,C,F)}else e.texImage2D(i.TEXTURE_2D,0,K,tt,C,F);E(M)&&M.mipmapsAutoUpdate===!0&&y(V),R.__version=ot.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function qt(A,M,P){if(M.image.length!==6)return;let V=xt(A,M),q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+P);let ot=n.get(q);if(q.version!==ot.__version||V===!0){e.activeTexture(i.TEXTURE0+P);let R=oe.getPrimaries(oe.workingColorSpace),L=M.colorSpace===ri?null:oe.getPrimaries(M.colorSpace),F=M.colorSpace===ri||R===L?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let tt=M.isCompressedTexture||M.image[0].isCompressedTexture,C=M.image[0]&&M.image[0].isDataTexture,K=[];for(let pt=0;pt<6;pt++)!tt&&!C?K[pt]=v(M.image[pt],!0,s.maxCubemapSize):K[pt]=C?M.image[pt].image:M.image[pt],K[pt]=dt(M,K[pt]);let Z=K[0],lt=r.convert(M.format,M.colorSpace),at=r.convert(M.type),ht=w(M.internalFormat,lt,at,M.normalized,M.colorSpace),Pt=M.isVideoTexture!==!0,it=ot.__version===void 0||V===!0,st=q.dataReady,Ct=b(M,Z);yt(i.TEXTURE_CUBE_MAP,M);let kt;if(M.isDepthTexture){if(ht=_(M.format===si,M.type),it)if(Pt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ht,Z.width,Z.height);else for(let pt=0;pt<6;pt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ht,Z.width,Z.height,0,lt,at,null)}else if(tt){Pt&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,ht,Z.width,Z.height);for(let pt=0;pt<6;pt++){kt=K[pt].mipmaps;for(let Ft=0;Ft<kt.length;Ft++){let xe=kt[Ft];M.format!==Ln?lt!==null?Pt?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft,0,0,xe.width,xe.height,lt,xe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft,ht,xe.width,xe.height,0,xe.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft,0,0,xe.width,xe.height,lt,at,xe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft,ht,xe.width,xe.height,0,lt,at,xe.data)}}}else{if(kt=M.mipmaps,Pt&&it){kt.length>0&&Ct++;let pt=Mt(K[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,ht,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(C){Pt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,K[pt].width,K[pt].height,lt,at,K[pt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ht,K[pt].width,K[pt].height,0,lt,at,K[pt].data);for(let Ft=0;Ft<kt.length;Ft++){let De=kt[Ft].image[pt].image;Pt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft+1,0,0,De.width,De.height,lt,at,De.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft+1,ht,De.width,De.height,0,lt,at,De.data)}}else{Pt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,lt,at,K[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,ht,lt,at,K[pt]);for(let Ft=0;Ft<kt.length;Ft++){let xe=kt[Ft];Pt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft+1,0,0,lt,at,xe.image[pt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ft+1,ht,lt,at,xe.image[pt])}}}E(M)&&M.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),ot.__version=q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function $t(A,M,P,V,q,ot){let R=r.convert(P.format,P.colorSpace),L=r.convert(P.type),F=w(P.internalFormat,R,L,P.normalized,P.colorSpace),tt=n.get(M),C=n.get(P);if(C.__renderTarget=M,!tt.__hasExternalTextures){let K=Math.max(1,M.width>>ot),Z=Math.max(1,M.height>>ot);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,ot,F,K,Z,M.depth,0,R,L,null):e.texImage2D(q,ot,F,K,Z,0,R,L,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),ut(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,q,C.__webglTexture,0,le(M)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,q,C.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ne(A,M,P){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){let V=M.depthTexture,q=V&&V.isDepthTexture?V.type:null,ot=_(M.stencilBuffer,q),R=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ut(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(M),ot,M.width,M.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(M),ot,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ot,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,R,i.RENDERBUFFER,A)}else{let V=M.textures;for(let q=0;q<V.length;q++){let ot=V[q],R=r.convert(ot.format,ot.colorSpace),L=r.convert(ot.type),F=w(ot.internalFormat,R,L,ot.normalized,ot.colorSpace);ut(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le(M),F,M.width,M.height):P?i.renderbufferStorageMultisample(i.RENDERBUFFER,le(M),F,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,F,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Gt(A,M,P){let V=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(M.depthTexture);q.__renderTarget=M;let ot=V?M.depthTexture.image[0]:M.depthTexture.image;(!q.__webglTexture||ot.width!==M.width||ot.height!==M.height)&&(ot.width=M.width,ot.height=M.height,M.depthTexture.needsUpdate=!0),V?ft(M.depthTexture,0):ct(M.depthTexture,0);let R=q.__webglTexture,L=le(M),F=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+P:i.TEXTURE_2D,tt=M.depthTexture.format===si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===Kn)ut(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,F,R,0,L):i.framebufferTexture2D(i.FRAMEBUFFER,tt,F,R,0);else if(M.depthTexture.format===si)ut(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,F,R,0,L):i.framebufferTexture2D(i.FRAMEBUFFER,tt,F,R,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Qt(A){let M=n.get(A),P=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){let V=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),V){let q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),M.__depthDisposeCallback=q}M.__boundDepthTexture=V}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(P)for(let V=0;V<6;V++)Gt(M.__webglFramebuffer[V],A,V);else A.texture.mipmaps.length>0?Gt(M.__webglFramebuffer[0],A,0):Gt(M.__webglFramebuffer,A,0);else if(P){M.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[V]),M.__webglDepthbuffer[V]===void 0)M.__webglDepthbuffer[V]=i.createRenderbuffer(),ne(M.__webglDepthbuffer[V],A,!1);else{let q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ot)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ne(M.__webglDepthbuffer,A,!1);else{let q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(A,M,P){let V=n.get(A);M!==void 0&&$t(V.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),P!==void 0&&Qt(A)}function jt(A){let M=A.texture,P=n.get(A),V=n.get(M);A.addEventListener("dispose",k),U(A);let q=A.textures,ot=A.isWebGLCubeRenderTarget===!0,R=q.length>1;if(R||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=M.version,o.memory.textures++),ot){P.__webglFramebuffer=[];for(let L=0;L<6;L++)if(M.mipmaps.length>0){P.__webglFramebuffer[L]=[];for(let F=0;F<M.mipmaps.length;F++)P.__webglFramebuffer[L][F]=i.createFramebuffer()}else P.__webglFramebuffer[L]=i.createFramebuffer()}else{if(M.mipmaps.length>0){P.__webglFramebuffer=[];for(let L=0;L<M.mipmaps.length;L++)P.__webglFramebuffer[L]=i.createFramebuffer()}else P.__webglFramebuffer=i.createFramebuffer();if(R)for(let L=0,F=q.length;L<F;L++){let tt=n.get(q[L]);tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&ut(A)===!1){P.__webglMultisampledFramebuffer=i.createFramebuffer(),P.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let L=0;L<q.length;L++){let F=q[L];P.__webglColorRenderbuffer[L]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,P.__webglColorRenderbuffer[L]);let tt=r.convert(F.format,F.colorSpace),C=r.convert(F.type),K=w(F.internalFormat,tt,C,F.normalized,F.colorSpace,A.isXRRenderTarget===!0),Z=le(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,K,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+L,i.RENDERBUFFER,P.__webglColorRenderbuffer[L])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(P.__webglDepthRenderbuffer=i.createRenderbuffer(),ne(P.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),yt(i.TEXTURE_CUBE_MAP,M);for(let L=0;L<6;L++)if(M.mipmaps.length>0)for(let F=0;F<M.mipmaps.length;F++)$t(P.__webglFramebuffer[L][F],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,F);else $t(P.__webglFramebuffer[L],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);E(M)?y(i.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(R){for(let L=0,F=q.length;L<F;L++){let tt=q[L],C=n.get(tt),K=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(K=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,C.__webglTexture),yt(K,tt),$t(P.__webglFramebuffer,A,tt,i.COLOR_ATTACHMENT0+L,K,0),E(tt)&&y(K)}e.unbindTexture()}else{let L=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(L=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(L,V.__webglTexture),yt(L,M),M.mipmaps.length>0)for(let F=0;F<M.mipmaps.length;F++)$t(P.__webglFramebuffer[F],A,M,i.COLOR_ATTACHMENT0,L,F);else $t(P.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,L,0);E(M)?y(L):M.mipmaps.length>0&&i.texParameteri(L,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&Qt(A)}function B(A){let M=A.textures;for(let P=0,V=M.length;P<V;P++){let q=M[P];if(E(q)&&q.mipmapsAutoUpdate===!0){let ot=T(A),R=n.get(q).__webglTexture;e.bindTexture(ot,R),y(ot),e.unbindTexture()}}}let he=[];function ie(A){if(A.samples>0){if(ut(A)===!1){let M=A.textures,P=A.width,V=A.height,q=i.COLOR_BUFFER_BIT,ot=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,R=n.get(A),L=M.length>1;if(L)for(let tt=0;tt<M.length;tt++)e.bindFramebuffer(i.FRAMEBUFFER,R.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,R.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,R.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,R.__webglFramebuffer);for(let tt=0;tt<M.length;tt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),L){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,R.__webglColorRenderbuffer[tt]);let C=n.get(M[tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,P,V,0,0,P,V,q,i.NEAREST),c===!0&&(he.length=0,he.push(i.COLOR_ATTACHMENT0+tt),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&he.push(ot),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),L)for(let tt=0;tt<M.length;tt++){e.bindFramebuffer(i.FRAMEBUFFER,R.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.RENDERBUFFER,R.__webglColorRenderbuffer[tt]);let C=n.get(M[tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+tt,i.TEXTURE_2D,C,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,R.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function le(A){return Math.min(s.maxSamples,A.samples)}function ut(A){let M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function de(A){let M=o.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function dt(A,M){let P=A.colorSpace,V=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||P!==Vs&&P!==ri&&(oe.getTransfer(P)===ge?(V!==Ln||q!==an)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Yt("WebGLTextures: Unsupported texture color space:",P)),M}function Mt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=It,this.resetTextureUnits=et,this.getTextureUnits=nt,this.setTextureUnits=mt,this.setTexture2D=ct,this.setTexture2DArray=vt,this.setTexture3D=Et,this.setTextureCube=ft,this.rebindTextures=_e,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=Qt,this.setupFrameBufferTexture=$t,this.useMultisampledRTT=ut,this.dispose=H}function a_(i,t){function e(n,s=ri){let r,o=oe.getTransfer(s);if(n===an)return i.UNSIGNED_BYTE;if(n===qo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Il)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Al)return i.BYTE;if(n===Rl)return i.SHORT;if(n===Ss)return i.UNSIGNED_SHORT;if(n===Xo)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===Pn)return i.HALF_FLOAT;if(n===Pl)return i.ALPHA;if(n===Ll)return i.RGB;if(n===Ln)return i.RGBA;if(n===Kn)return i.DEPTH_COMPONENT;if(n===si)return i.DEPTH_STENCIL;if(n===$o)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===Si)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===Ko)return i.RGBA_INTEGER;if(n===dr||n===fr||n===pr||n===mr)if(o===ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qo||n===jo||n===ta||n===ea)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===na||n===ia||n===sa||n===ra||n===oa||n===gr||n===aa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===na||n===ia)return o===ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ra)return r.COMPRESSED_R11_EAC;if(n===oa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===gr)return r.COMPRESSED_RG11_EAC;if(n===aa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga||n===_a||n===xa||n===va||n===ya||n===Ma)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===la)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ca)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ha)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ua)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===da)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ma)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ga)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_a)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===va)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ya)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ma)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sa||n===ba||n===Ea)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Sa)return o===ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ba)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ea)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wa||n===Ta||n===_r||n===Aa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ta)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_r)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Aa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var l_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,rc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new js(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new pn({vertexShader:l_,fragmentShader:c_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ht(new fn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oc=class extends Fn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,m=null,x=typeof XRWebGLBinding<"u",g=new rc,p={},v=e.getContextAttributes(),E=null,y=null,T=[],w=[],_=new At,b=null,U=null,I=new Be;I.viewport=new be;let z=new Be;z.viewport=new be;let k=[I,z],J=new zo,N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ct=T[j];return ct===void 0&&(ct=new ms,T[j]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(j){let ct=T[j];return ct===void 0&&(ct=new ms,T[j]=ct),ct.getGripSpace()},this.getHand=function(j){let ct=T[j];return ct===void 0&&(ct=new ms,T[j]=ct),ct.getHandSpace()};function G(j){let ct=w.indexOf(j.inputSource);if(ct===-1)return;let vt=T[ct];vt!==void 0&&(vt.update(j.inputSource,j.frame,l||o),vt.dispatchEvent({type:j.type,data:j.inputSource}))}function X(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",rt);for(let j=0;j<T.length;j++){let ct=w[j];ct!==null&&(w[j]=null,T[j].disconnect(ct))}N=null,H=null,g.reset();for(let j in p)delete p[j];if(t.setRenderTarget(E),f=null,h=null,d=null,s=null,y=null,It.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(_.width,_.height,!1),U!==null){let j=U.camera;j.fov=U.fov,j.zoom=U.zoom,j.updateProjectionMatrix(),U=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",X),s.addEventListener("inputsourceschange",rt),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(_),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,Et=null,ft=null;v.depth&&(ft=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=v.stencil?si:Kn,Et=v.stencil?ki:In);let Ut={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new un(h.textureWidth,h.textureHeight,{format:Ln,type:an,depthTexture:new ei(h.textureWidth,h.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let vt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new un(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:an,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),It.setContext(s),It.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function rt(j){for(let ct=0;ct<j.removed.length;ct++){let vt=j.removed[ct],Et=w.indexOf(vt);Et>=0&&(w[Et]=null,T[Et].disconnect(vt))}for(let ct=0;ct<j.added.length;ct++){let vt=j.added[ct],Et=w.indexOf(vt);if(Et===-1){for(let Ut=0;Ut<T.length;Ut++)if(Ut>=w.length){w.push(vt),Et=Ut;break}else if(w[Ut]===null){w[Ut]=vt,Et=Ut;break}if(Et===-1)break}let ft=T[Et];ft&&ft.connect(vt)}}function $(j,ct){ct===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ct.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ct=j.near,vt=j.far;g.texture!==null&&(g.depthNear>0&&(ct=g.depthNear),g.depthFar>0&&(vt=g.depthFar)),J.near=z.near=I.near=ct,J.far=z.far=I.far=vt,(N!==J.near||H!==J.far)&&(s.updateRenderState({depthNear:J.near,depthFar:J.far}),N=J.near,H=J.far),J.layers.mask=j.layers.mask|6,I.layers.mask=J.layers.mask&-5,z.layers.mask=J.layers.mask&-3;let Et=j.parent,ft=J.cameras;$(J,Et);for(let Ut=0;Ut<ft.length;Ut++)$(ft[Ut],Et);J.projectionMatrix.copy(I.projectionMatrix),J.projectionMatrixInverse.copy(I.projectionMatrixInverse),U===null&&j.isPerspectiveCamera&&(U={camera:j,fov:j.fov,zoom:j.zoom}),et(j,J,Et)};function et(j,ct,vt){vt===null?j.matrix.copy(ct.matrixWorld):(j.matrix.copy(vt.matrixWorld),j.matrix.invert(),j.matrix.multiply(ct.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ct.projectionMatrix),j.projectionMatrixInverse.copy(ct.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ds*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(j){c=j,h!==null&&(h.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(J)},this.getCameraTexture=function(j){return p[j]};let nt=null;function mt(j,ct){if(u=ct.getViewerPose(l||o),m=ct,u!==null){let vt=u.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Et=!1;vt.length!==J.cameras.length&&(J.cameras.length=0,Et=!0);for(let zt=0;zt<vt.length;zt++){let yt=vt[zt],xt=null;if(f!==null)xt=f.getViewport(yt);else{let Rt=d.getViewSubImage(h,yt);xt=Rt.viewport,zt===0&&(t.setRenderTargetTextures(y,Rt.colorTexture,Rt.depthStencilTexture),t.setRenderTarget(y))}let Tt=k[zt];Tt===void 0&&(Tt=new Be,Tt.layers.enable(zt),Tt.viewport=new be,k[zt]=Tt),Tt.matrix.fromArray(yt.transform.matrix),Tt.matrix.decompose(Tt.position,Tt.quaternion,Tt.scale),Tt.projectionMatrix.fromArray(yt.projectionMatrix),Tt.projectionMatrixInverse.copy(Tt.projectionMatrix).invert(),Tt.viewport.set(xt.x,xt.y,xt.width,xt.height),zt===0&&(J.matrix.copy(Tt.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),Et===!0&&J.cameras.push(Tt)}let ft=s.enabledFeatures;if(ft&&ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let zt=d.getDepthInformation(vt[0]);zt&&zt.isValid&&zt.texture&&g.init(zt,s.renderState)}if(ft&&ft.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let zt=0;zt<vt.length;zt++){let yt=vt[zt].camera;if(yt){let xt=p[yt];xt||(xt=new js,p[yt]=xt);let Tt=d.getCameraImage(yt);xt.sourceTexture=Tt}}}}for(let vt=0;vt<T.length;vt++){let Et=w[vt],ft=T[vt];Et!==null&&ft!==void 0&&ft.update(Et,ct,l||o)}nt&&nt(j,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),m=null}let It=new gu;It.setAnimationLoop(mt),this.setAnimationLoop=function(j){nt=j},this.dispose=function(){}}},h_=new ce,Tu=new Zt;Tu.set(-1,0,0,0,1,0,0,0,1);function u_(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Gl(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,E,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,v,E):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ye&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ye&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=t.get(p),E=v.envMap,y=v.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(h_.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Tu),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,v,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=E*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,v){g.ior.value=p.ior,p.diffuseRoughness>0&&(g.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ye&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let v=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function d_(i,t,e,n){let s={},r={};function o(v,E){let y=E.program;n.uniformBlockBinding(v,y,s[v.id])}function a(v,E){let y=s[v.id];y===void 0&&(m(v),y=c(v),s[v.id]=y,v.addEventListener("dispose",g));let T=E.program;n.updateUBOMapping(v,T);let w=t.render.frame;r[v.id]!==w&&(l(v),r[v.id]=w)}function c(v){let E=i.createBuffer(),y=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,y,T),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(v){let E=s[v.id],y=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,_=y.length;w<_;w++){let b=y[w];if(Array.isArray(b))for(let U=0,I=b.length;U<I;U++)u(b[U],w,U,T);else u(b,w,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,E,y,T){if(h(v,E,y,T)===!0){let w=v.__offset,_=v.value;if(Array.isArray(_)){let b=0;for(let U=0;U<_.length;U++){let I=_[U],z=x(I,!0);d(I,v.__data,b),b+=z.storage/Float32Array.BYTES_PER_ELEMENT}}else d(_,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,v.__data)}}function d(v,E,y){typeof v=="number"||typeof v=="boolean"?E[y]=v:v.isMatrix3?(E[y]=v.elements[0],E[y+1]=v.elements[1],E[y+2]=v.elements[2],E[y+3]=0,E[y+4]=v.elements[3],E[y+5]=v.elements[4],E[y+6]=v.elements[5],E[y+7]=0,E[y+8]=v.elements[6],E[y+9]=v.elements[7],E[y+10]=v.elements[8],E[y+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-y),y):v.toArray(E,y)}function h(v,E,y,T){let w=v.value,_=E+"_"+y;if(Array.isArray(w)){T[_]===void 0&&(T[_]=[]);let b=T[_],U=!1;for(let I=0;I<w.length;I++)f(w[I],b,I)===!0&&(U=!0);return U}return f(w,T,_)}function f(v,E,y){if(E[y]===void 0)return typeof v=="number"||typeof v=="boolean"?E[y]=v:ArrayBuffer.isView(v)?E[y]=v.slice():E[y]=v.clone(),!0;{let T=E[y];if(typeof v=="number"||typeof v=="boolean"){if(T!==v)return E[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(T.equals(v)===!1)return T.copy(v),!0}}return!1}function m(v){let E=v.uniforms,y=0,T=16;for(let _=0,b=E.length;_<b;_++){let U=Array.isArray(E[_])?E[_]:[E[_]];for(let I=0,z=U.length;I<z;I++){let k=U[I],J=Array.isArray(k.value)?k.value:[k.value],N=Array.isArray(E[_])||Array.isArray(k.value),H=y;for(let X=0,rt=J.length;X<rt;X++){let $=J[X],et=x($,N),nt=y%T,mt=nt%et.boundary,It=nt+mt;y+=mt,It!==0&&T-It<et.storage&&(y+=T-It),X===0&&(H=y),y+=et.storage}let G=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new G((y-H)/Float32Array.BYTES_PER_ELEMENT),k.__offset=H}}let w=y%T;return w>0&&(y+=T-w),v.__size=y,v.__cache={},this}function x(v,E){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function g(v){let E=v.target;E.removeEventListener("dispose",g),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(let v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:o,update:a,dispose:p}}var f_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function p_(){return Hn===null&&(Hn=new Zs(f_,16,16,Si,Pn),Hn.name="DFG_LUT",Hn.minFilter=rn,Hn.magFilter=rn,Hn.wrapS=Un,Hn.wrapT=Un,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var ws=class{constructor(t={}){let{canvas:e=zh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=an}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let x=f,g=new Set([Ko,Jo,Zo]),p=new Set([an,In,Ss,ki,qo,Yo]),v=new Uint32Array(4),E=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},T=null,w=null,_=[],b=[],U=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,z=!1,k=null,J=null,N=null,H=null;this._outputColorSpace=Te;let G=0,X=0,rt=null,$=-1,et=null,nt=new be,mt=new be,It=null,j=new wt(0),ct=0,vt=e.width,Et=e.height,ft=1,Ut=null,me=null,zt=new be(0,0,vt,Et),yt=new be(0,0,vt,Et),xt=!1,Tt=new mi,Rt=new go,Wt=!1,qt=!1,$t=new ce,ne=new D,Gt=new be,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_e=!1;function jt(){return rt===null?ft:1}let B=n;function he(S,O){return e.getContext(S,O)}let ie,le,ut,de,dt,Mt,A,M,P,V,q,ot,R,L,F,tt,C,K,Z,lt,at,ht,Pt;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",kt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),B===null){let O="webgl2";if(B=he(O,S),B===null)throw he(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}it()}catch(S){throw e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Yt("WebGLRenderer: "+S.message),S}function it(){ie=new wg(B),ie.init(),at=new a_(B,ie),le=new pg(B,ie,t,at),ut=new r_(B,ie),le.reversedDepthBuffer&&h&&ut.buffers.depth.setReversed(!0),J=B.createFramebuffer(),N=B.createFramebuffer(),H=B.createFramebuffer(),de=new Rg(B),dt=new X0,Mt=new o_(B,ie,ut,dt,le,at,de),A=new Eg(I),M=new If(B),ht=new dg(B,M),P=new Tg(B,M,de,ht),V=new Ig(B,P,M,ht,de),K=new Cg(B,le,Mt),F=new mg(dt),q=new W0(I,A,ie,le,ht,F),ot=new u_(I,dt),R=new Y0,L=new j0(ie),C=new ug(I,A,ut,V,m,c),tt=new s_(I,V,le),Pt=new d_(B,de,le,ut),Z=new fg(B,ie,de),lt=new Ag(B,ie,de),de.programs=q.programs,I.capabilities=le,I.extensions=ie,I.properties=dt,I.renderLists=R,I.shadowMap=tt,I.state=ut,I.info=de}x!==an&&(U=new Lg(x,e.width,e.height,a,s,r));let st=new oc(I,B);this.xr=st,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let S=ie.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ie.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ft},this.setPixelRatio=function(S){S!==void 0&&(ft=S,this.setSize(vt,Et,!1))},this.getSize=function(S){return S.set(vt,Et)},this.setSize=function(S,O,Q=!0){if(st.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}vt=S,Et=O,e.width=Math.floor(S*ft),e.height=Math.floor(O*ft),Q===!0&&(e.style.width=S+"px",e.style.height=O+"px"),U!==null&&U.setSize(e.width,e.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(vt*ft,Et*ft).floor()},this.setDrawingBufferSize=function(S,O,Q){vt=S,Et=O,ft=Q,e.width=Math.floor(S*Q),e.height=Math.floor(O*Q),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(x===an){Yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(nt)},this.getViewport=function(S){return S.copy(zt)},this.setViewport=function(S,O,Q,W){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,O,Q,W),ut.viewport(nt.copy(zt).multiplyScalar(jt()).round())},this.getScissor=function(S){return S.copy(yt)},this.setScissor=function(S,O,Q,W){S.isVector4?yt.set(S.x,S.y,S.z,S.w):yt.set(S,O,Q,W),ut.scissor(mt.copy(yt).multiplyScalar(jt()).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(S){ut.setScissorTest(xt=S)},this.setOpaqueSort=function(S){Ut=S},this.setTransparentSort=function(S){me=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,Q=!0){let W=0;if(S){let Y=!1;if(rt!==null){let _t=rt.texture.format;Y=g.has(_t)}if(Y){let _t=rt.texture.type,Lt=p.has(_t),gt=C.getClearColor(),bt=C.getClearAlpha(),Ot=gt.r,Kt=gt.g,se=gt.b;Lt?(v[0]=Ot,v[1]=Kt,v[2]=se,v[3]=bt,B.clearBufferuiv(B.COLOR,0,v)):(E[0]=Ot,E[1]=Kt,E[2]=se,E[3]=bt,B.clearBufferiv(B.COLOR,0,E))}else W|=B.COLOR_BUFFER_BIT}O&&(W|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),k=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),C.dispose(),R.dispose(),L.dispose(),Mt.dispose(),dt.dispose(),A.dispose(),V.dispose(),P.dispose(),ht.dispose(),Pt.dispose(),q.dispose(),st.dispose(),st.removeEventListener("sessionstart",qi),st.removeEventListener("sessionend",Yi),Ze.stop()};function Ct(S){S.preventDefault(),Ol("WebGLRenderer: Context Lost."),z=!0}function kt(){Ol("WebGLRenderer: Context Restored."),z=!1;let S=de.autoReset,O=tt.enabled,Q=tt.autoUpdate,W=tt.needsUpdate,Y=tt.type;it(),de.autoReset=S,tt.enabled=O,tt.autoUpdate=Q,tt.needsUpdate=W,tt.type=Y}function pt(S){Yt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ft(S){let O=S.target;O.removeEventListener("dispose",Ft),xe(O)}function xe(S){De(S),dt.remove(S)}function De(S){let O=dt.get(S).programs;O!==void 0&&(O.forEach(function(Q){q.releaseProgram(Q)}),S.isShaderMaterial&&q.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,Q,W,Y,_t){O===null&&(O=Qt);let Lt=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,gt=od(S,O,Q,W,Y);ut.setMaterial(W,Lt);let bt=Q.index,Ot=1;if(W.wireframe===!0){if(bt=P.getWireframeAttribute(Q),bt===void 0)return;Ot=2}let Kt=Q.drawRange,se=Q.attributes.position,Nt=Kt.start*Ot,re=(Kt.start+Kt.count)*Ot;_t!==null&&(Nt=Math.max(Nt,_t.start*Ot),re=Math.min(re,(_t.start+_t.count)*Ot)),bt!==null?(Nt=Math.max(Nt,0),re=Math.min(re,bt.count)):se!=null&&(Nt=Math.max(Nt,0),re=Math.min(re,se.count));let Ce=re-Nt;if(Ce<0||Ce===1/0)return;ht.setup(Y,W,gt,Q,bt);let ye,ve=Z;if(bt!==null&&(ye=M.get(bt),ve=lt,ve.setIndex(ye)),Y.isMesh)W.wireframe===!0?(ut.setLineWidth(W.wireframeLinewidth*jt()),ve.setMode(B.LINES)):ve.setMode(B.TRIANGLES);else if(Y.isLine){let Je=W.linewidth;Je===void 0&&(Je=1),ut.setLineWidth(Je*jt()),Y.isLineSegments?ve.setMode(B.LINES):Y.isLineLoop?ve.setMode(B.LINE_LOOP):ve.setMode(B.LINE_STRIP)}else Y.isPoints?ve.setMode(B.POINTS):Y.isSprite&&ve.setMode(B.TRIANGLES);if(Y.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))ve.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Je=Y._multiDrawStarts,Dt=Y._multiDrawCounts,sn=Y._multiDrawCount,fe=bt?M.get(bt).bytesPerElement:1,Ai=dt.get(W).currentProgram.getUniforms();for(let Ke=0;Ke<sn;Ke++)Ai.setValue(B,"_gl_DrawID",Ke),ve.render(Je[Ke]/fe,Dt[Ke])}else if(Y.isInstancedMesh)ve.renderInstances(Nt,Ce,Y.count);else if(Q.isInstancedBufferGeometry){let Je=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Dt=Math.min(Q.instanceCount,Je);ve.renderInstances(Nt,Ce,Dt)}else ve.render(Nt,Ce)};function Nn(S,O,Q,W){k!==null&&S.isNodeMaterial&&k.setObject(W,S),Wt===!0&&F.setState(S,Q,!1),S.transparent===!0&&S.side===$e&&S.forceSinglePass===!1?(S.side=Ye,S.needsUpdate=!0,Ps(S,O,W),S.side=Mi,S.needsUpdate=!0,Ps(S,O,W),S.side=$e):Ps(S,O,W)}this.compile=function(S,O,Q=null){Q===null&&(Q=S),k!==null&&k.renderStart(S,O,Q),w=L.get(Q),w.init(O),b.push(w),Q.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),S!==Q&&S.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),w.setupLights(),k!==null&&k.updateLights(w.state.lightsArray),qt=this.localClippingEnabled,Wt=F.init(this.clippingPlanes,qt),Wt===!0&&F.setGlobalState(this.clippingPlanes,O),k!==null&&tt.render(w.state.shadowsArray,Q,O);let W=new Set;return S.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let _t=Y.material;if(_t)if(Array.isArray(_t))for(let Lt=0;Lt<_t.length;Lt++){let gt=_t[Lt];Nn(gt,Q,O,Y),W.add(gt)}else Nn(_t,Q,O,Y),W.add(_t)}),w=b.pop(),k!==null&&k.renderEnd(),W},this.compileAsync=function(S,O,Q=null){let W=this.compile(S,O,Q);return new Promise(Y=>{function _t(){if(W.forEach(function(Lt){let bt=dt.get(Lt).currentProgram;(bt===void 0||bt.isReady())&&W.delete(Lt)}),W.size===0){Y(S);return}setTimeout(_t,10)}ie.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let wi=null;function Ti(S){wi&&wi(S)}function qi(){Ze.stop()}function Yi(){Ze.start()}let Ze=new gu;Ze.setAnimationLoop(Ti),typeof self<"u"&&Ze.setContext(self),this.setAnimationLoop=function(S){wi=S,st.setAnimationLoop(S),S===null?Ze.stop():Ze.start()},st.addEventListener("sessionstart",qi),st.addEventListener("sessionend",Yi),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){Yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;k!==null&&k.renderStart(S,O);let Q=st.enabled===!0&&st.isPresenting===!0,W=U!==null&&(rt===null||Q)&&U.begin(I,rt);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(O),O=st.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,O,rt),w=L.get(S,b.length),w.init(O),w.state.textureUnits=Mt.getTextureUnits(),b.push(w),$t.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?Rt.setFromArrayCamera(O):Tt.setFromProjectionMatrix($t,_n,O.reversedDepth),qt=this.localClippingEnabled,Wt=F.init(this.clippingPlanes,qt),T=R.get(S,_.length),T.init(),_.push(T),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let Lt=I.xr.getDepthSensingMesh();Lt!==null&&Ua(Lt,O,-1/0,I.sortObjects)}Ua(S,O,0,I.sortObjects),T.finish(),k!==null&&k.updateLights(w.state.lightsArray),I.sortObjects===!0&&T.sort(Ut,me),_e=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,_e&&C.addToRenderList(T,S),this.info.autoReset===!0&&this.info.reset(),Wt===!0&&F.beginShadows();let Y=w.state.shadowsArray;if(tt.render(Y,S,O),Wt===!0&&F.endShadows(),(W&&U.hasRenderPass())===!1){let Lt=T.opaque,gt=T.transmissive;if(w.setupLights(),O.isArrayCamera){let bt=O.cameras;if(gt.length>0)for(let Ot=0,Kt=bt.length;Ot<Kt;Ot++){let se=bt[Ot];fc(Lt,gt,S,se)}_e&&C.render(S);for(let Ot=0,Kt=bt.length;Ot<Kt;Ot++){let se=bt[Ot];dc(T,S,se,se.viewport)}}else gt.length>0&&fc(Lt,gt,S,O),_e&&C.render(S),dc(T,S,O)}rt!==null&&X===0&&(Mt.updateMultisampleRenderTarget(rt),Mt.updateRenderTargetMipmap(rt)),W&&U.end(I),S.isScene===!0&&S.onAfterRender(I,S,O),ht.resetDefaultState(),$=-1,et=null,b.pop(),b.length>0?(w=b[b.length-1],Mt.setTextureUnits(w.state.textureUnits),Wt===!0&&F.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,_.pop(),_.length>0?T=_[_.length-1]:T=null,k!==null&&k.renderEnd()};function Ua(S,O,Q,W){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)Q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){let Lt=O.isArrayCamera?Rt:Tt;if(!S.frustumCulled||S.intersectsFrustum(Lt)){W&&Gt.setFromMatrixPosition(S.matrixWorld).applyMatrix4($t);let gt=V.update(S),bt=S.material;bt.visible&&T.push(S,gt,bt,Q,Gt.z,null,O)}}else if(S.isMesh||S.isLine||S.isPoints){let Lt=O.isArrayCamera?Rt:Tt;if(!S.frustumCulled||S.intersectsFrustum(Lt)){let gt=V.update(S),bt=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Gt.copy(S.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Gt.copy(gt.boundingSphere.center)),Gt.applyMatrix4(S.matrixWorld).applyMatrix4($t)),Array.isArray(bt)){let Ot=gt.groups;for(let Kt=0,se=Ot.length;Kt<se;Kt++){let Nt=Ot[Kt],re=bt[Nt.materialIndex];re&&re.visible&&T.push(S,gt,re,Q,Gt.z,Nt,O)}}else bt.visible&&T.push(S,gt,bt,Q,Gt.z,null,O)}}}let _t=S.children;for(let Lt=0,gt=_t.length;Lt<gt;Lt++)Ua(_t[Lt],O,Q,W)}function dc(S,O,Q,W){let{opaque:Y,transmissive:_t,transparent:Lt}=S;w.setupLightsView(Q),Wt===!0&&F.setGlobalState(I.clippingPlanes,Q),W&&ut.viewport(nt.copy(W)),Y.length>0&&Ir(Y,O,Q),_t.length>0&&Ir(_t,O,Q),Lt.length>0&&Ir(Lt,O,Q),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function fc(S,O,Q,W){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[W.id]===void 0){let Nt=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[W.id]=new un(1,1,{generateMipmaps:!0,type:Nt?Pn:an,minFilter:ii,samples:Math.max(4,le.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let _t=w.state.transmissionRenderTarget[W.id],Lt=W.viewport||nt;_t.setSize(Lt.z*I.transmissionResolutionScale,Lt.w*I.transmissionResolutionScale);let gt=I.getRenderTarget(),bt=I.getActiveCubeFace(),Ot=I.getActiveMipmapLevel();I.setRenderTarget(_t),I.getClearColor(j),ct=I.getClearAlpha(),ct<1&&I.setClearColor(16777215,.5),I.clear(),_e&&C.render(Q);let Kt=I.toneMapping;I.toneMapping=kn;let se=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),w.setupLightsView(W),Wt===!0&&F.setGlobalState(I.clippingPlanes,W),Ir(S,Q,W),Mt.updateMultisampleRenderTarget(_t),Mt.updateRenderTargetMipmap(_t),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let re=0,Ce=O.length;re<Ce;re++){let ye=O[re],{object:ve,geometry:Je,material:Dt,group:sn}=ye;if(Dt.side===$e&&ve.layers.test(W.layers)){let fe=Dt.side;Dt.side=Ye,Dt.needsUpdate=!0,pc(ve,Q,W,Je,Dt,sn),Dt.side=fe,Dt.needsUpdate=!0,Nt=!0}}Nt===!0&&(Mt.updateMultisampleRenderTarget(_t),Mt.updateRenderTargetMipmap(_t))}I.setRenderTarget(gt,bt,Ot),I.setClearColor(j,ct),se!==void 0&&(W.viewport=se),I.toneMapping=Kt}function Ir(S,O,Q){let W=O.isScene===!0?O.overrideMaterial:null;for(let Y=0,_t=S.length;Y<_t;Y++){let Lt=S[Y],{object:gt,geometry:bt,group:Ot}=Lt,Kt=Lt.material;Kt.allowOverride===!0&&W!==null&&(Kt=W),gt.layers.test(Q.layers)&&pc(gt,O,Q,bt,Kt,Ot)}}function pc(S,O,Q,W,Y,_t){k!==null&&Y.isNodeMaterial&&k.setObject(S,Y),S.onBeforeRender(I,O,Q,W,Y,_t),S.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),Y.onBeforeRender(I,O,Q,W,S,_t),Y.transparent===!0&&Y.side===$e&&Y.forceSinglePass===!1?(Y.side=Ye,Y.needsUpdate=!0,I.renderBufferDirect(Q,O,W,Y,S,_t),Y.side=Mi,Y.needsUpdate=!0,I.renderBufferDirect(Q,O,W,Y,S,_t),Y.side=$e):I.renderBufferDirect(Q,O,W,Y,S,_t),S.onAfterRender(I,O,Q,W,Y,_t)}function mc(S){let O=0;for(let Q of S)Q.texture!==null&&O++;return O}function Ps(S,O,Q){O.isScene!==!0&&(O=Qt);let W=dt.get(S),Y=w.state.lights,_t=w.state.shadowsArray,Lt=Y.state.version,gt=q.getParameters(S,Y.state,_t,O,Q,w.state.lightProbeGridArray),bt=q.getProgramCacheKey(gt),Ot=W.programs;W.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,W.fog=O.fog;let Kt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;W.envMap=A.get(S.envMap||W.environment,Kt),W.envMapRotation=W.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,Ot===void 0&&(S.addEventListener("dispose",Ft),Ot=new Map,W.programs=Ot,W.programVariants=new Map);let se=Ot.get(bt);if(se!==void 0){if(W.currentProgram===se&&W.lightsStateVersion===Lt)return _c(S,gt),se}else gt.uniforms=q.getUniforms(S),k!==null&&S.isNodeMaterial&&k.build(S,Q,gt),S.onBeforeCompile(gt,I),se=q.acquireProgram(gt,bt),Ot.set(bt,se),W.uniforms=gt.uniforms;let Nt=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Nt.clippingPlanes=F.uniform),_c(S,gt),W.needsLights=ld(S),W.lightsStateVersion=Lt,W.needsLights&&(Nt.ambientLightColor.value=Y.state.ambient,Nt.lightProbe.value=Y.state.probe,Nt.sunLights.value=Y.state.sun,Nt.sunLightShadows.value=Y.state.sunShadow,Nt.directionalLights.value=Y.state.directional,Nt.directionalLightShadows.value=Y.state.directionalShadow,Nt.spotLights.value=Y.state.spot,Nt.spotLightShadows.value=Y.state.spotShadow,Nt.rectAreaLights.value=Y.state.rectArea,Nt.ltc_1.value=Y.state.rectAreaLTC1,Nt.ltc_2.value=Y.state.rectAreaLTC2,Nt.pointLights.value=Y.state.point,Nt.pointLightShadows.value=Y.state.pointShadow,Nt.hemisphereLights.value=Y.state.hemi,Nt.sunShadowMatrix.value=Y.state.sunShadowMatrix,Nt.sunShadowCascade.value=Y.state.sunShadowCascade,Nt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Nt.spotLightMatrix.value=Y.state.spotLightMatrix,Nt.spotLightMap.value=Y.state.spotLightMap,Nt.pointShadowMatrix.value=Y.state.pointShadowMatrix),W.numLightProbeGrids=mc(w.state.lightProbeGridArray),W.currentProgram=se,W.uniformsList=null,se}function rd(S,O,Q,W,Y){let _t=dt.get(S),Lt=_t.currentProgram.id+","+W+","+Y,gt=_t.programVariants.get(Lt);return gt===void 0?(gt=Ps(S,O,Q),_t.programVariants.set(Lt,gt)):(_t.currentProgram=gt,_t.uniformsList=null,_t.outputColorSpace=W,_t.toneMapping=Y),gt}function gc(S){if(S.uniformsList===null){let O=S.currentProgram.getUniforms();S.uniformsList=Es.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function _c(S,O){let Q=dt.get(S);Q.outputColorSpace=O.outputColorSpace,Q.batching=O.batching,Q.batchingColor=O.batchingColor,Q.instancing=O.instancing,Q.instancingColor=O.instancingColor,Q.instancingMorph=O.instancingMorph,Q.skinning=O.skinning,Q.morphTargets=O.morphTargets,Q.morphNormals=O.morphNormals,Q.morphColors=O.morphColors,Q.morphTargetsCount=O.morphTargetsCount,Q.numClippingPlanes=O.numClippingPlanes,Q.numIntersection=O.numClipIntersection,Q.vertexAlphas=O.vertexAlphas,Q.vertexTangents=O.vertexTangents,Q.toneMapping=O.toneMapping}function od(S,O,Q,W,Y){O.isScene!==!0&&(O=Qt),Mt.resetTextureUnits();let _t=O.fog,Lt=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?O.environment:null,gt=rt===null?I.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:oe.workingColorSpace,bt=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ot=A.get(W.envMap||Lt,bt),Kt=W.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,se=!!Q.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Nt=!!Q.morphAttributes.position,re=!!Q.morphAttributes.normal,Ce=!!Q.morphAttributes.color,ye=kn;W.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ye=I.toneMapping);let ve=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Je=ve!==void 0?ve.length:0,Dt=dt.get(W),sn=w.state.lights;if(Wt===!0&&(qt===!0||S!==et)){let Ee=S===et&&W.id===$;F.setState(W,S,Ee)}let fe=!1,Ai=!1;W.version===Dt.__version?Dt.needsLights&&Dt.lightsStateVersion!==sn.state.version||Y.isBatchedMesh&&Dt.batching===!1||!Y.isBatchedMesh&&Dt.batching===!0||Y.isBatchedMesh&&Dt.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Dt.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Dt.instancing===!1||!Y.isInstancedMesh&&Dt.instancing===!0||Y.isSkinnedMesh&&Dt.skinning===!1||!Y.isSkinnedMesh&&Dt.skinning===!0||Y.isInstancedMesh&&Dt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Dt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Dt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Dt.instancingMorph===!1&&Y.morphTexture!==null||Dt.envMap!==Ot||W.fog===!0&&Dt.fog!==_t||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==F.numPlanes||Dt.numIntersection!==F.numIntersection)||Dt.vertexAlphas!==Kt||Dt.vertexTangents!==se||Dt.morphTargets!==Nt||Dt.morphNormals!==re||Dt.morphColors!==Ce||Dt.morphTargetsCount!==Je||Dt.numLightProbeGrids!==mc(w.state.lightProbeGridArray)?fe=!0:(Dt.outputColorSpace!==gt||Dt.toneMapping!==ye)&&(Ai=!0):(fe=!0,Dt.__version=W.version);let Ke=Dt.currentProgram;(fe===!0||Ai===!0)&&(Ke=Ai===!0?rd(W,O,Y,gt,ye):Ps(W,O,Y),k&&W.isNodeMaterial&&k.onUpdateProgram(W,Ke,Dt));let Pr=!1,oi=!1,Ri=!1,ue=Ke.getUniforms(),We=Dt.uniforms;if(ut.useProgram(Ke.program)&&(Pr=!0,oi=!0,Ri=!0),W.id!==$&&($=W.id,oi=!0),Pr||et!==S){ut.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ue.setValue(B,"projectionMatrix",S.projectionMatrix),ue.setValue(B,"viewMatrix",S.matrixWorldInverse);let Ue=ue.map.cameraPosition;Ue!==void 0&&Ue.setValue(B,ne.setFromMatrixPosition(S.matrixWorld)),le.logarithmicDepthBuffer&&ue.setValue(B,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ue.setValue(B,"isOrthographic",S.isOrthographicCamera===!0),et!==S&&(et=S,oi=!0,Ri=!0)}if(Dt.needsLights&&(sn.state.sunShadowMap.length>0&&ue.setValue(B,"sunShadowMap",sn.state.sunShadowMap,Mt),sn.state.directionalShadowMap.length>0&&ue.setValue(B,"directionalShadowMap",sn.state.directionalShadowMap,Mt),sn.state.spotShadowMap.length>0&&ue.setValue(B,"spotShadowMap",sn.state.spotShadowMap,Mt),sn.state.pointShadowMap.length>0&&ue.setValue(B,"pointShadowMap",sn.state.pointShadowMap,Mt)),Y.isSkinnedMesh){ue.setOptional(B,Y,"bindMatrix"),ue.setOptional(B,Y,"bindMatrixInverse");let Ee=Y.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),ue.setValue(B,"boneTexture",Ee.boneTexture,Mt))}Y.isBatchedMesh&&(ue.setOptional(B,Y,"batchingTexture"),ue.setValue(B,"batchingTexture",Y._matricesTexture,Mt),ue.setOptional(B,Y,"batchingIdTexture"),ue.setValue(B,"batchingIdTexture",Y._indirectTexture,Mt),ue.setOptional(B,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ue.setValue(B,"batchingColorTexture",Y._colorsTexture,Mt));let Tn=Q.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&K.update(Y,Q,Ke),(oi||Dt.receiveShadow!==Y.receiveShadow)&&(Dt.receiveShadow=Y.receiveShadow,ue.setValue(B,"receiveShadow",Y.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&O.environment!==null&&(We.envMapIntensity.value=O.environmentIntensity),We.dfgLUT!==void 0&&(We.dfgLUT.value=p_()),oi){if(ue.setValue(B,"toneMappingExposure",I.toneMappingExposure),Dt.needsLights&&ad(We,Ri),_t&&W.fog===!0&&ot.refreshFogUniforms(We,_t),ot.refreshMaterialUniforms(We,W,ft,Et,w.state.transmissionRenderTarget[S.id]),Dt.needsLights&&Dt.numLightProbeGrids>0){let Ee=y,Ue=0;for(let Wn of w.state.lightProbeGridArray)Wn.texture!==null&&(Ee.textures[Ue]=Wn.texture,Ee.min[Ue]=Wn.boundingBox.min,Ee.max[Ue]=Wn.boundingBox.max,Ee.resolution[Ue]=Wn.resolution,Ue++);for(let Wn in Ee)Ee[Wn].length=Ue;We.probesSH.value=Ee.textures,We.probesMin.value=Ee.min,We.probesMax.value=Ee.max,We.probesResolution.value=Ee.resolution}Es.upload(B,gc(Dt),We,Mt)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Es.upload(B,gc(Dt),We,Mt),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ue.setValue(B,"center",Y.center),ue.setValue(B,"modelViewMatrix",Y.modelViewMatrix),ue.setValue(B,"normalMatrix",Y.normalMatrix),ue.setValue(B,"modelMatrix",Y.matrixWorld),W.uniformsGroups!==void 0){let Ee=W.uniformsGroups;for(let Ue=0,Wn=Ee.length;Ue<Wn;Ue++){let vc=Ee[Ue];Pt.update(vc,Ke),Pt.bind(vc,Ke)}}return Ke}function ad(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.sunLights.needsUpdate=O,S.sunLightShadows.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function ld(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return rt},this.setRenderTargetTextures=function(S,O,Q){let W=dt.get(S);W.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),dt.get(S.texture).__webglTexture=O,dt.get(S.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Q,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){let Q=dt.get(S);Q.__webglFramebuffer=O,Q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,Q=0){rt=S,G=O,X=Q;let W=null,Y=!1,_t=!1;if(S){let gt=dt.get(S);if(gt.__useDefaultFramebuffer!==void 0){ut.bindFramebuffer(B.FRAMEBUFFER,gt.__webglFramebuffer),nt.copy(S.viewport),mt.copy(S.scissor),It=S.scissorTest,ut.viewport(nt),ut.scissor(mt),ut.setScissorTest(It),$=-1;return}else if(gt.__webglFramebuffer===void 0)Mt.setupRenderTarget(S);else if(gt.__hasExternalTextures)Mt.rebindTextures(S,dt.get(S.texture).__webglTexture,dt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Kt=S.depthTexture;if(gt.__boundDepthTexture!==Kt){if(Kt!==null&&dt.has(Kt)&&(S.width!==Kt.image.width||S.height!==Kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Mt.setupDepthRenderbuffer(S)}}let bt=S.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(_t=!0);let Ot=dt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ot[O])?W=Ot[O][Q]:W=Ot[O],Y=!0):S.samples>0&&Mt.useMultisampledRTT(S)===!1?W=dt.get(S).__webglMultisampledFramebuffer:Array.isArray(Ot)?W=Ot[Q]:W=Ot,nt.copy(S.viewport),mt.copy(S.scissor),It=S.scissorTest}else nt.copy(zt).multiplyScalar(ft).floor(),mt.copy(yt).multiplyScalar(ft).floor(),It=xt;if(Q!==0&&(W=J),ut.bindFramebuffer(B.FRAMEBUFFER,W)&&ut.drawBuffers(S,W),ut.viewport(nt),ut.scissor(mt),ut.setScissorTest(It),Y){let gt=dt.get(S.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,gt.__webglTexture,Q)}else if(_t){let gt=O;for(let bt=0;bt<S.textures.length;bt++){let Ot=dt.get(S.textures[bt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+bt,Ot.__webglTexture,Q,gt)}}else if(S!==null&&Q!==0){let gt=dt.get(S.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,gt.__webglTexture,Q)}$=-1};function xc(S){let O=dt.get(S);return(O.__readFormat!==S.format||O.__readType!==S.type)&&(O.__readFormat=S.format,O.__readType=S.type,O.__formatReadable=le.textureFormatReadable(S.format),O.__typeReadable=le.textureTypeReadable(S.type)),O}this.readRenderTargetPixels=function(S,O,Q,W,Y,_t,Lt,gt=0){if(!(S&&S.isWebGLRenderTarget)){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=dt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Lt!==void 0&&(bt=bt[Lt],Array.isArray(bt)&&(bt=bt[0])),bt){ut.bindFramebuffer(B.FRAMEBUFFER,bt);try{let Ot=S.textures[gt],Kt=Ot.format,se=Ot.type;S.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+gt);let Nt=xc(Ot);if(Nt.__formatReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Nt.__typeReadable===!1){Yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-W&&Q>=0&&Q<=S.height-Y&&B.readPixels(O,Q,W,Y,at.convert(Kt),at.convert(se),_t)}finally{let Ot=rt!==null?dt.get(rt).__webglFramebuffer:null;ut.bindFramebuffer(B.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(S,O,Q,W,Y,_t,Lt,gt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=dt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Lt!==void 0&&(bt=bt[Lt],Array.isArray(bt)&&(bt=bt[0])),bt)if(O>=0&&O<=S.width-W&&Q>=0&&Q<=S.height-Y){ut.bindFramebuffer(B.FRAMEBUFFER,bt);let Ot=S.textures[gt],Kt=Ot.format,se=Ot.type;S.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+gt);let Nt=xc(Ot);if(Nt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Nt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,re),B.bufferData(B.PIXEL_PACK_BUFFER,_t.byteLength,B.STREAM_READ),B.readPixels(O,Q,W,Y,at.convert(Kt),at.convert(se),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let Ce=rt!==null?dt.get(rt).__webglFramebuffer:null;ut.bindFramebuffer(B.FRAMEBUFFER,Ce);let ye=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Hh(B,ye,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,re),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,_t),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(re),B.deleteSync(ye),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,Q=0){let W=Math.pow(2,-Q),Y=Math.floor(S.image.width*W),_t=Math.floor(S.image.height*W),Lt=O!==null?O.x:0,gt=O!==null?O.y:0;Mt.setTexture2D(S,0),B.copyTexSubImage2D(B.TEXTURE_2D,Q,0,0,Lt,gt,Y,_t),ut.unbindTexture()},this.copyTextureToTexture=function(S,O,Q=null,W=null,Y=0,_t=0){let Lt,gt,bt,Ot,Kt,se,Nt,re,Ce,ye=S.isCompressedTexture?S.mipmaps[_t]:S.image;if(Q!==null)Lt=Q.max.x-Q.min.x,gt=Q.max.y-Q.min.y,bt=Q.isBox3?Q.max.z-Q.min.z:1,Ot=Q.min.x,Kt=Q.min.y,se=Q.isBox3?Q.min.z:0;else{let ue=Math.pow(2,-Y);Lt=Math.floor(ye.width*ue),gt=Math.floor(ye.height*ue),S.isDataArrayTexture?bt=ye.depth:S.isData3DTexture?bt=Math.floor(ye.depth*ue):bt=1,Ot=0,Kt=0,se=0}W!==null?(Nt=W.x,re=W.y,Ce=W.z):(Nt=0,re=0,Ce=0);let ve=at.convert(O.format),Je=at.convert(O.type),Dt;O.isData3DTexture?(Mt.setTexture3D(O,0),Dt=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Mt.setTexture2DArray(O,0),Dt=B.TEXTURE_2D_ARRAY):(Mt.setTexture2D(O,0),Dt=B.TEXTURE_2D),ut.activeTexture(B.TEXTURE0),ut.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),ut.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),ut.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);let sn=ut.getParameter(B.UNPACK_ROW_LENGTH),fe=ut.getParameter(B.UNPACK_IMAGE_HEIGHT),Ai=ut.getParameter(B.UNPACK_SKIP_PIXELS),Ke=ut.getParameter(B.UNPACK_SKIP_ROWS),Pr=ut.getParameter(B.UNPACK_SKIP_IMAGES);ut.pixelStorei(B.UNPACK_ROW_LENGTH,ye.width),ut.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ye.height),ut.pixelStorei(B.UNPACK_SKIP_PIXELS,Ot),ut.pixelStorei(B.UNPACK_SKIP_ROWS,Kt),ut.pixelStorei(B.UNPACK_SKIP_IMAGES,se);let oi=S.isDataArrayTexture||S.isData3DTexture,Ri=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){let ue=dt.get(S),We=dt.get(O),Tn=dt.get(ue.__renderTarget),Ee=dt.get(We.__renderTarget);ut.bindFramebuffer(B.READ_FRAMEBUFFER,Tn.__webglFramebuffer),ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Ue=0;Ue<bt;Ue++)oi&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,dt.get(S).__webglTexture,Y,se+Ue),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,dt.get(O).__webglTexture,_t,Ce+Ue)),B.blitFramebuffer(Ot,Kt,Ot+Lt,Kt+gt,Nt,re,Nt+Lt,re+gt,B.DEPTH_BUFFER_BIT,B.NEAREST);ut.bindFramebuffer(B.READ_FRAMEBUFFER,null),ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Y!==0||S.isRenderTargetTexture||dt.has(S)){let ue=dt.get(S),We=dt.get(O);ut.bindFramebuffer(B.READ_FRAMEBUFFER,N),ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,H);for(let Tn=0;Tn<bt;Tn++)oi?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ue.__webglTexture,Y,se+Tn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ue.__webglTexture,Y),Ri?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,We.__webglTexture,_t,Ce+Tn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,We.__webglTexture,_t),Y!==0?B.blitFramebuffer(Ot,Kt,Ot+Lt,Kt+gt,Nt,re,Nt+Lt,re+gt,B.COLOR_BUFFER_BIT,B.NEAREST):Ri?B.copyTexSubImage3D(Dt,_t,Nt,re,Ce+Tn,Ot,Kt,Lt,gt):B.copyTexSubImage2D(Dt,_t,Nt,re,Ot,Kt,Lt,gt);ut.bindFramebuffer(B.READ_FRAMEBUFFER,null),ut.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ri?S.isDataTexture||S.isData3DTexture?B.texSubImage3D(Dt,_t,Nt,re,Ce,Lt,gt,bt,ve,Je,ye.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(Dt,_t,Nt,re,Ce,Lt,gt,bt,ve,ye.data):B.texSubImage3D(Dt,_t,Nt,re,Ce,Lt,gt,bt,ve,Je,ye):S.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,_t,Nt,re,Lt,gt,ve,Je,ye.data):S.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,_t,Nt,re,ye.width,ye.height,ve,ye.data):B.texSubImage2D(B.TEXTURE_2D,_t,Nt,re,Lt,gt,ve,Je,ye);ut.pixelStorei(B.UNPACK_ROW_LENGTH,sn),ut.pixelStorei(B.UNPACK_IMAGE_HEIGHT,fe),ut.pixelStorei(B.UNPACK_SKIP_PIXELS,Ai),ut.pixelStorei(B.UNPACK_SKIP_ROWS,Ke),ut.pixelStorei(B.UNPACK_SKIP_IMAGES,Pr),_t===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&B.generateMipmap(Dt),ut.unbindTexture()},this.initRenderTarget=function(S){dt.get(S).__webglFramebuffer===void 0&&Mt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Mt.setTextureCube(S,0):S.isData3DTexture?Mt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Mt.setTexture2DArray(S,0):Mt.setTexture2D(S,0),ut.unbindTexture()},this.resetState=function(){G=0,X=0,rt=null,ut.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var Rs=class extends Qn{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new dn;t.deleteAttribute("uv");let e=new He({side:Ye}),n=new He,s=new lr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Ht(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new ti(t,n,6),a=new ke;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let c=new Ht(t,As(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new Ht(t,As(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new Ht(t,As(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let d=new Ht(t,As(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let h=new Ht(t,As(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let f=new Ht(t,As(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function As(i){return new ir({color:0,emissive:16777215,emissiveIntensity:i})}function Er(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Re;c.morphTargetsRelative=a;let l=0;for(let u=0;u<i.length;++u){let d=i[u],h=0,f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let m in d.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(d.attributes[m]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let m in d.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;if(d.morphAttributes[m].length!==i[0].morphAttributes[m].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have the same number of morph targets for the "'+m+'" morph attribute.'),null;o[m]===void 0&&(o[m]=[]),o[m].push(d.morphAttributes[m]),f++}if(f!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of morph attributes."),null;if(t){let m;if(e)m=d.index.count;else if(d.attributes.position!==void 0)m=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,m,u),l+=m}}if(e){let u=0,d=[];for(let h=0;h<i.length;++h){let f=i[h].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+u);u+=i[h].attributes.position.count}c.setIndex(d)}for(let u in r){let d=Au(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in o){let d=o[u][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){let f=[];for(let x=0;x<o[u].length;++x)f.push(o[u][x][h]);let m=Au(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(m)}}}return c}function Au(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new Se(o,e,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let d=c/e;for(let h=0,f=u.count;h<f;h++)for(let m=0;m<e;m++){let x=u.getComponent(h,m);a.setComponent(h+d,m,x)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function lc(i,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,o=0,a=Object.keys(i.attributes),c=[],l=new Map,u=[],d=["getX","getY","getZ","getW"],h=t*.5,f=Math.log10(1/t),m=Math.pow(10,f),x=h*m;for(let p=0;p<r;p++){let v=n?n.getX(p):p,E="";for(let y=0,T=a.length;y<T;y++){let w=a[y],_=i.getAttribute(w),b=_.itemSize;for(let U=0;U<b;U++)E+=`${Math.trunc(_[d[U]](v)*m+x)},`}E in e?u.push(e[E]):(c.push(v),e[E]=o,u.push(o),o++)}let g=i.clone();for(let p in i.attributes)g.setAttribute(p,Ru(i.attributes[p],c,l));for(let p in i.morphAttributes)g.morphAttributes[p]=i.morphAttributes[p].map(v=>Ru(v,c,l));return g.setIndex(u),g}function Ru(i,t,e=new Map){let n=i.isInterleavedBufferAttribute,s=n?i.data:i,r=n?s.stride:i.itemSize,o=n?e.get(s):void 0;if(o===void 0){let c=new s.array.constructor(t.length*r);for(let l=0;l<t.length;l++)for(let u=0;u<r;u++)c[l*r+u]=s.array[t[l]*r+u];o=n?new s.constructor(c,r,s.meshPerAttribute):new i.constructor(c,i.itemSize,i.normalized,i.meshPerAttribute),o.setUsage(s.usage),n&&e.set(s,o)}let a=n?new i.constructor(o,i.itemSize,i.offset,i.normalized):o;return a.name=i.name,n||(a.gpuType=i.gpuType),a}var En={coral:14702404,tomato:13968664,carrot:16343061,sun:16763174,cream:15984844,forest:1594410,kiwi:10140677,ink:924434},Jt=D,Vn=(i,t,e)=>{let n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function m_(i,t,e){let n=Math.imul(i|0,374761393)^Math.imul(t|0,668265263)^Math.imul(e|0,1440662683);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967295}function wr(i,t,e){let n=Math.floor(i),s=Math.floor(t),r=Math.floor(e),o=i-n,a=t-s,c=e-r,l=o*o*(3-2*o),u=a*a*(3-2*a),d=c*c*(3-2*c),h=(E,y,T)=>m_(n+E,s+y,r+T),f=h(0,0,0)+(h(1,0,0)-h(0,0,0))*l,m=h(0,1,0)+(h(1,1,0)-h(0,1,0))*l,x=h(0,0,1)+(h(1,0,1)-h(0,0,1))*l,g=h(0,1,1)+(h(1,1,1)-h(0,1,1))*l,p=f+(m-f)*u,v=x+(g-x)*u;return(p+(v-p)*d)*2-1}var Cu=(i,t,e)=>wr(i,t,e)*.6+wr(i*2.1,t*2.1,e*2.1)*.28+wr(i*4.3,t*4.3,e*4.3)*.12;function Iu(i,t){let e=new wt(t),n=i.attributes.position.count,s=new Float32Array(n*3);for(let r=0;r<n;r++)s[r*3]=e.r,s[r*3+1]=e.g,s[r*3+2]=e.b;return i.setAttribute("color",new Se(s,3)),i}function Pu(i,t){let e=new gi(1,i);e.deleteAttribute("normal"),e.deleteAttribute("uv"),e=lc(e,1e-5);let n=e.attributes.position,s=n.count,r=new Float32Array(s*3),o=new wt(16033171),a=new wt(15237228),c=new wt(11748667),l=new wt(12999782),u=new wt,d=t.notch?11.3:3.7;for(let h=0;h<s;h++){let f=n.getX(h),m=n.getY(h),x=n.getZ(h),g=f,p=m,v=x,E=(m+1)/2,y=1-.44*Vn(.28,1,E);if(g*=y,v*=y,g<0&&(g*=.58),v*=v<0?.9:.72,m<0){let J=Math.max(0,1-(g*g+v*v)/.5);p+=.55*J*Vn(-.1,-1,m)}let T=0;t.notch&&(T=Math.exp(-(((f+.62)/.34)**2+((m+.18)/.36)**2+((x-.6)/.42)**2)),g+=T*.3);let w=Math.exp(-(((f+.9)/.25)**2+((m-.1)/.24)**2+(x/.28)**2));g+=w*.08;let _=(1.8*m+1.25*x+.135)/2.19,b=Vn(-.95,-.45,f),U=.05*Math.exp(-((_/.032)**2))*b;t.horizontal&&(U+=.04*Math.exp(-(((m-.2)/.03)**2))*Vn(0,.1,_)*Vn(-.3,.15,x)*b);let I=Cu(f*2.4+d,m*2.4,x*2.4)*.03+wr(f*9+d,m*9,x*9)*.006,z=1-U+I;n.setXYZ(h,g*z,p*z*1.42,v*z);let k=.5+.5*Cu(f*5+d,m*5,x*5);u.copy(a).lerp(o,Vn(0,.6,f)*.55+Vn(.2,.9,m)*.15),u.lerp(l,Math.max(0,k-.55)*.9),u.lerp(c,Math.min(1,Math.min(1,U*16)*.8+Vn(-.3,-.9,f)*.25+T*.2)),r[h*3]=u.r,r[h*3+1]=u.g,r[h*3+2]=u.b}return e.setAttribute("color",new Se(r,3)),e.computeVertexNormals(),e}function Lu(i){let t=[],e=i,n=()=>(e=e*16807%2147483647)/2147483647,s=new Jt(0,1,0),r=l=>{let u=l.x/(l.x>0?.9:.46),d=l.y/1.22,h=l.z/.6;return u*u+d*d+h*h<.8},o=(l,u,d,h)=>{let f=new Jt().subVectors(u,l),m=f.length(),x=new zn(h,d,m,8,1,!0);x.translate(0,m/2,0),x.applyQuaternion(new Xe().setFromUnitVectors(s,f.normalize())),x.translate(l.x,l.y,l.z),x.deleteAttribute("uv"),t.push(x);let g=new Sn(h,8,6);g.translate(u.x,u.y,u.z),g.deleteAttribute("uv"),t.push(g)},a=(l,u,d,h,f)=>{let m=l.clone().addScaledVector(u,d);for(let x=0;x<3&&!r(m);x++)d*=.65,m=l.clone().addScaledVector(u,d);if(r(m)&&(o(l,m,h,h*.78),!(f<=0)))for(let x of[-1,1]){let g=new Jt(n()-.5,n()-.5,n()-.5).cross(u).normalize(),p=u.clone().applyAxisAngle(g,x*(.38+n()*.3)).normalize();a(m,p,d*.74,h*.72,f-1)}},c=new Jt(-.34,.12,0);return[[.35,1,.05],[1,-.22,.5],[.45,-1,-.25]].forEach(l=>a(c,new Jt(...l).normalize(),.42,.06,3)),Er(t)}function g_(){let i=[],t=new qe([new Jt(0,2.35,-.02),new Jt(0,1.7,.02),new Jt(0,1.15,0),new Jt(0,.82,-.04)]);i.push(new tn(t,48,.118,20,!1));for(let r=0;r<15;r++){let o=.04+r*.062;if(o>.93)break;let a=t.getPointAt(o),c=new _i(.127,.021,8,28);c.rotateX(Math.PI/2),c.translate(a.x,a.y,a.z),i.push(c)}let e=new qe([new Jt(0,.84,-.04),new Jt(-.38,.5,0),new Jt(-.72,.15,0)]),n=new qe([new Jt(0,.84,-.04),new Jt(.44,.58,0),new Jt(.72,.17,0)]);i.push(new tn(e,24,.088,16,!1)),i.push(new tn(n,24,.078,16,!1));let s=new Sn(.105,18,12);return s.translate(0,.83,-.04),i.push(s),Er(i)}function __(){let i=[],t=new qe([new Jt(0,2.3,-.02),new Jt(0,1.7,.02),new Jt(0,1.15,0),new Jt(0,.82,-.04)]),e=new qe([new Jt(0,.84,-.04),new Jt(-.38,.5,0),new Jt(-.72,.15,0)]),n=new qe([new Jt(0,.84,-.04),new Jt(.44,.58,0),new Jt(.72,.17,0)]);return i.push(new tn(t,40,.05,10,!1),new tn(e,20,.04,10,!1),new tn(n,20,.036,10,!1)),Er(i)}function Nu({detail:i=32,lowEnd:t=!1}={}){let e=new Ae,n=new Ae;n.position.y=-.47,e.add(n);let s={uBreath:{value:0},uRim:{value:new wt(16754060)}},r=(T,w)=>{T.onBeforeCompile=_=>{_.uniforms.uBreath=s.uBreath,_.uniforms.uRim=s.uRim,_.vertexShader=`uniform float uBreath;
`+_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        float wB = (1.0 - smoothstep(-1.25, 1.45, position.y)) * (0.55 + 0.45 * smoothstep(-0.6, 0.9, position.x));
        transformed += objectNormal * (uBreath * 0.075 * wB);`),w&&(_.fragmentShader=`uniform vec3 uRim;
`+_.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
          float fres = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
          totalEmissiveRadiance += uRim * fres * 0.42;`))},T.customProgramCacheKey=()=>w?"lung-rim":"lung-glass"},o=new Ge({vertexColors:!0,roughness:.5,clearcoat:.35,clearcoatRoughness:.35,sheen:1,sheenRoughness:.45,sheenColor:new wt(16761512)});r(o,!0);let a=new Ge({color:16777215,roughness:.05,metalness:0,transmission:1,thickness:.9,ior:1.42,attenuationColor:new wt(16769236),attenuationDistance:3.6,iridescence:.4,iridescenceIOR:1.3,iridescenceThicknessRange:[120,480],clearcoat:1,clearcoatRoughness:.03,envMapIntensity:1.7,dispersion:t?0:.35});r(a,!1);let c=new He({color:16765562,emissive:16738862,emissiveIntensity:2,roughness:.4}),l=new Ge({color:15852752,roughness:.45,clearcoat:.25,sheen:.5,sheenColor:new wt(16777215)}),u=new Ge({color:16777215,roughness:.2,transmission:1,thickness:.5,ior:1.4,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:1.4}),d=new Ae;d.position.set(-1.05,0,0);let h=new Ht(Pu(i,{horizontal:!0}),a),f=new Ht(Lu(7),c);d.add(h,f);let m=new Ae;m.position.set(1.05,0,0);let x=new Ht(Pu(i,{notch:!0}),a),g=new Ht(Lu(19),c);m.add(x,g);let p=new Ht(g_(),u),v=new Ht(__(),c);n.add(d,m,p,v);let E="glass",y=()=>{let T=E==="glass";h.material=x.material=T?a:o,p.material=T?u:l,f.visible=g.visible=v.visible=T};return y(),{root:e,nh:3.85,nw:4.2,meshes:[h,x],setMode(T){E=T==="tissue"?"tissue":"glass",y()},getMode(){return E},update(T){s.uBreath.value=T;let w=1+.02*T,_=1+.012*T,b=1+.02*T;d.scale.set(-w,_,b),m.scale.set(w,_,b),d.position.y=m.position.y=-.035*T,c.emissiveIntensity=1.5+1.4*Math.min(1,T)}}}function Du(i=3){let t=new gi(.26,i);t.deleteAttribute("normal"),t.deleteAttribute("uv"),t=lc(t);let e=t.attributes.position,n=e.count,s=new Float32Array(n*3),r=new wt(En.kiwi),o=new wt(6258432),a=new wt;for(let h=0;h<n;h++){let f=e.getX(h),m=e.getY(h),x=e.getZ(h),g=wr(f*9+5,m*9,x*9),p=1+g*.07;e.setXYZ(h,f*p,m*p,x*p),a.copy(r).lerp(o,Math.max(0,g)*1.1),s[h*3]=a.r,s[h*3+1]=a.g,s[h*3+2]=a.b}t.setAttribute("color",new Se(s,3)),t.computeVertexNormals();let c=[t.toNonIndexed()],l=new Jt(0,1,0),u=new Xe,d=18;for(let h=0;h<d;h++){let f=1-(h+.5)/d*2,m=Math.sqrt(1-f*f),x=h*2.39996;u.setFromUnitVectors(l,new Jt(Math.cos(x)*m,f,Math.sin(x)*m));let g=new zn(.016,.026,.13,6);g.translate(0,.31,0),g.deleteAttribute("uv"),Iu(g,En.forest).applyQuaternion(u);let p=new Sn(.043,10,8);p.translate(0,.385,0),p.deleteAttribute("uv"),Iu(p,En.sun).applyQuaternion(u),c.push(g.toNonIndexed(),p.toNonIndexed())}return Er(c)}var Uu=()=>new Ge({vertexColors:!0,roughness:.42,clearcoat:.5,clearcoatRoughness:.3,sheen:.6,sheenColor:new wt(15398832)});function x_(){let i=document.createElement("canvas");i.width=i.height=128;let t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){let r=128+(Math.random()-.5)*90;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);let n=new yn(i);return n.wrapS=n.wrapT=pi,n.repeat.set(6,4),n}function Fu(){let i=new Ae,t=1.8,e=1.02,n=90,s=50,r=1.1,o=new fn(t,e,n,s),a=o.attributes.position;for(let p=0;p<a.count;p++){let v=a.getX(p),E=a.getY(p),y=Math.abs(v)/(t/2),T=Math.abs(E)/(e/2),w=v/r,_=Math.sin(w)*r,b=(Math.cos(w)-1)*r,U=.26*(1-T*T)*(1-.5*y*y),I=(E+.27)/.2,z=0;if(I>0&&I<3){let k=I-Math.floor(I);z=.044*Vn(0,.9,k)*(k>.9?(1-k)/.1:1)}z*=Vn(.96,.74,y),a.setXYZ(p,_,E*(1-.07*y*y),b+U+z)}o.computeVertexNormals();let c=new Ge({color:16249316,roughness:.92,sheen:1,sheenRoughness:.7,sheenColor:new wt(16777215),side:$e,bumpMap:x_(),bumpScale:.9}),l=new Ht(o,c);i.add(l);let u=(p,v)=>new Jt().fromBufferAttribute(a,v*(n+1)+p),d=[];for(let p=0;p<=n;p+=3)d.push(u(p,0));for(let p=3;p<=s;p+=3)d.push(u(n,p));for(let p=n-3;p>=0;p-=3)d.push(u(p,s));for(let p=s-3;p>0;p-=3)d.push(u(0,p));let h=new Ge({color:15524556,roughness:.8,sheen:.6});i.add(new Ht(new tn(new qe(d,!0),260,.017,6,!0),h));let f=[];for(let p=30;p<=60;p+=3){let v=u(p,1);v.z+=.014,f.push(v)}let m=new tn(new qe(f),40,.011,6);m.scale(1,.6,1),i.add(new Ht(m,new He({color:15328990,metalness:.35,roughness:.45})));let x=new Ge({color:En.sun,roughness:.55,sheen:.4});for(let p of[-1,1]){let v=p>0?n:0,E=u(v,3),y=u(v,s-3),T=Math.abs(E.x),w=[E,new Jt(p*(T+.2),E.y-.02,E.z-.26),new Jt(p*(T+.3),0,E.z-.5),new Jt(p*(T+.2),y.y+.02,y.z-.26),y];i.add(new Ht(new tn(new qe(w),64,.013,6),x))}let g=new Ht(new dn(2.3,1.25,.8),new vn({visible:!1}));return i.add(g),{root:i,body:l,hit:g,nh:1.25,nw:2.45}}function Ou(){let i=new Ae,t=new Ae;t.position.y=-.445,i.add(t);let e=new He({color:15132906,metalness:1,roughness:.18}),n=new Ge({color:En.carrot,metalness:.35,roughness:.28,clearcoat:1,clearcoatRoughness:.1}),s=new Ge({color:En.sun,roughness:.3,clearcoat:1,clearcoatRoughness:.2}),r=new Ge({color:En.tomato,roughness:.32,clearcoat:.8,clearcoatRoughness:.25}),o=new He({color:1844256,roughness:.6}),a=new Ae,c=new zn(.46,.46,.14,64);c.rotateX(Math.PI/2);let l=new zn(.37,.37,.02,64);l.rotateX(Math.PI/2);let u=new Ht(l,s);u.position.z=.075;let d=new Ht(new _i(.4,.035,12,64),e);d.position.z=.075;let h=new Sn(.36,40,20,0,Math.PI*2,0,Math.PI/2);h.rotateX(-Math.PI/2),h.scale(1,1,.45);let f=new Ht(h,e);f.position.z=-.07;let m=new Ht(new zn(.055,.07,.5,20),e);m.position.set(0,.62,-.1),m.rotation.x=-.15,a.add(new Ht(c,n),u,d,f,m),a.position.set(0,-1.5,.05),a.rotation.x=-.2,t.add(a);let x=new qe([new Jt(0,-.86,-.1),new Jt(.18,-.45,-.08),new Jt(.42,0,0),new Jt(.2,.45,.08),new Jt(-.12,.8,.04),new Jt(0,1.12,0)]);t.add(new Ht(new tn(x,120,.068,18),r));let g=new Ht(new Sn(.085,20,14),e);g.position.set(0,1.14,0),t.add(g);for(let v of[-1,1]){let E=new qe([new Jt(0,1.14,0),new Jt(v*.18,1.36,.02),new Jt(v*.36,1.72,0),new Jt(v*.42,2,-.02)]);t.add(new Ht(new tn(E,60,.058,16),r));let y=new qe([new Jt(v*.42,2,-.02),new Jt(v*.46,2.3,-.02),new Jt(v*.38,2.58,.04),new Jt(v*.22,2.74,.1)]);t.add(new Ht(new tn(y,50,.026,12),e));let T=new Ht(new zn(.066,.066,.1,16),e);T.position.set(v*.42,2,-.02),t.add(T);let w=new Ht(new Sn(.075,20,14),o);w.position.set(v*.2,2.76,.11),w.scale.set(1,1.15,1),t.add(w)}let p=new Ht(new dn(1.5,4.8,.9),new vn({visible:!1}));return i.add(p),{root:i,hit:p,nh:4.85,nw:1.35}}var v_=[[-.78,.34],[.8,.42],[-.7,-.38],[.76,-.26],[-.44,.78],[.5,-.7],[.96,.06]],y_=[[-.62,.2],[.18,.52],[.66,-.1],[-.12,-.46],[.52,.66],[-.78,-.5]],Bu={paper:[14702404,13968664,16343061],coral:[13968664,14702404,16343061],roster:[1594410,10140677,14702404],forest:[1594410,10140677,16763174],sun:[16343061,14702404,16763174],tomato:[13968664,14702404,16343061]},Ne=(i,t)=>i+Math.random()*(t-i);function M_(){let i={uTime:{value:0},uAspect:{value:1},uBreath:{value:0},uFlash:{value:0},uBase:{value:new wt(531472)},uPtr:{value:new At},uC0:{value:new wt(14702404)},uC1:{value:new wt(13968664)},uC2:{value:new wt(16343061)}},t=new pn({uniforms:i,depthTest:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }",fragmentShader:`
      varying vec2 vUv;
      uniform float uTime, uAspect, uBreath, uFlash;
      uniform vec3 uBase, uC0, uC1, uC2;
      uniform vec2 uPtr;
      float blob(vec2 p, vec2 c, float r){ vec2 d = p - c; return exp(-dot(d, d) / (r * r)); }
      void main(){
        vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
        float t = uTime;
        p += 0.07 * vec2(sin(p.y * 3.1 + t * 0.31), cos(p.x * 2.6 - t * 0.27));
        float w = min(uAspect, 1.6);
        float br = 0.85 + 0.35 * uBreath;
        vec3 col = uBase * mix(0.8, 1.4, vUv.y);
        float b0 = blob(p, vec2(0.06 * sin(t * 0.21), 0.04 + 0.06 * cos(t * 0.17)), 0.42);
        col = mix(col, uC0, b0 * 0.44 * br);
        float b1 = blob(p, vec2(-0.46 * w + 0.08 * cos(t * 0.19), -0.36 + 0.08 * sin(t * 0.23)), 0.34);
        col = mix(col, uC1, b1 * 0.3 * br);
        float b2 = blob(p, vec2(0.46 * w + 0.06 * sin(t * 0.13), 0.38 + 0.05 * sin(t * 0.29)), 0.16);
        col = mix(col, uC2, b2 * 0.45);
        col += mix(uC0, uC2, 0.5) * blob(p, uPtr * vec2(0.5 * uAspect, 0.5), 0.2) * 0.07;
        col += uC0 * uFlash * 0.4 * blob(p, vec2(0.0, 0.05), 0.8);
        float v = smoothstep(1.35, 0.15, length((vUv - 0.5) * vec2(1.2, 1.0)));
        col *= mix(0.55, 1.0, v);
        float g = fract(sin(dot(vUv * vec2(1453.1, 913.7) + fract(t), vec2(12.9898, 78.233))) * 43758.5453);
        col += (g - 0.5) * 0.022;
        gl_FragColor = vec4(max(col, 0.0), 1.0);
        #include <colorspace_fragment>
      }`}),e=new Ht(new fn(2,2),t);return e.frustumCulled=!1,e.renderOrder=-100,{mesh:e,u:i}}function S_(){let i=document.createElement("canvas");i.width=2048,i.height=600;let t=new yn(i);t.colorSpace=Te,t.anisotropy=8;let e={uReveal:{value:-.05}},n=new vn({map:t,alphaTest:.5,alphaToCoverage:!0,toneMapped:!1});n.onBeforeCompile=a=>{a.uniforms.uReveal=e.uReveal,a.fragmentShader=`uniform float uReveal;
`+a.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
  if (vMapUv.y > uReveal) discard;`)};let s=new Ht(new fn(1,i.height/i.width),n);s.visible=!1;let r=()=>{let a=i.getContext("2d");a.clearRect(0,0,i.width,i.height);let c=560,l=h=>{a.font=`900 condensed ${Math.round(h)}px "Anybody", sans-serif`,a.font.indexOf(Math.round(h)+"px")<0&&(a.font=`900 ${Math.round(h)}px "Anybody", sans-serif`)};l(c);let u=a.measureText("BREATHE").width;u>i.width*.98&&(c*=i.width*.98/u,l(c));let d=a.createLinearGradient(0,40,0,i.height-40);d.addColorStop(0,"#F3E8CC"),d.addColorStop(.6,"#F3E8CC"),d.addColorStop(1,"#F2B49C"),a.fillStyle=d,a.textAlign="center",a.textBaseline="alphabetic",a.fillText("BREATHE",i.width/2,i.height/2+c*.36),t.needsUpdate=!0,s.visible=!0},o=document.fonts&&document.fonts.load?document.fonts.load('900 100px "Anybody"'):Promise.resolve();return Promise.race([o,new Promise(a=>setTimeout(a,1500))]).then(r,r),{mesh:s,u:e,aspect:i.height/i.width}}function b_(i){let t=new Re,e=new Float32Array(i*3),n=new Float32Array(i*3),s=new Float32Array(i),r=new Float32Array(i),o=[16765562,16773852,16747100,16763174,13033562].map(h=>new wt(h)),a=[],c=(h,f)=>(h.a=Ne(0,Math.PI*2),h.r=Ne(1.5,3.4),h.y=f?Ne(-1.9,2.7):Ne(-2.1,-1.4),h.w=Ne(.08,.26)*(Math.random()<.5?-1:1),h.vy=Ne(.05,.16),h.f=0,h.k=Ne(.6,1),h.age=0,h);for(let h=0;h<i;h++){a.push(c({},!0));let f=o[h%o.length];n.set([f.r,f.g,f.b],h*3),r[h]=Ne(2.2,6.5)}t.setAttribute("position",new Se(e,3)),t.setAttribute("aColor",new Se(n,3)),t.setAttribute("aSize",new Se(s,1));let l=new pn({transparent:!0,depthWrite:!1,blending:Fi,uniforms:{uScale:{value:1}},vertexShader:`attribute float aSize; attribute vec3 aColor; varying vec3 vC; uniform float uScale;
      void main(){ vC = aColor; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * uScale; }`,fragmentShader:`varying vec3 vC;
      void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); a *= a; if (a < 0.01) discard; gl_FragColor = vec4(vC, a * 0.85);
      #include <colorspace_fragment>
      }`}),u=new Js(t,l);u.frustumCulled=!1;let d=new D(0,2.25,0);return{points:u,mat:l,update(h,f){for(let m=0;m<i;m++){let x=a[m];x.a+=x.w*h,x.y+=x.vy*h,x.age+=h,x.f=f>0?Math.min(1,x.f+f*2.4*x.k):Math.max(0,x.f+f*1.7);let g=x.f*x.f,p=Math.cos(x.a)*x.r,v=x.y,E=Math.sin(x.a)*x.r*.55;p+=(d.x-p)*g,v+=(d.y+.3-v)*g,E+=(d.z-E)*g,(g>.9||x.y>2.9)&&c(x,!1),e[m*3]=p,e[m*3+1]=v,e[m*3+2]=E,s[m]=r[m]*(1-g*.7)*Math.min(1,x.age*2)}t.attributes.position.needsUpdate=!0,t.attributes.aSize.needsUpdate=!0}}}function E_(i){let t=new ti(new gi(1,1),new He({roughness:.35,emissive:2236928}),i);t.instanceMatrix.setUsage(vr),t.frustumCulled=!1;let e=[En.kiwi,En.sun,En.carrot,16773852].map(l=>new wt(l)),n=[];for(let l=0;l<i;l++)t.setColorAt(l,e[l%e.length]),n.push({life:1,max:1,p:new D,v:new D,s:0});let s=new ce,r=new Xe,o=new D,a=0,c=!1;for(let l=0;l<i;l++)s.makeScale(0,0,0),t.setMatrixAt(l,s);return{mesh:t,emit(l,u){for(let d=0;d<14;d++){let h=n[a=(a+1)%i];h.p.copy(l),h.v.set(Ne(-1,1),Ne(-1,1),Ne(-.5,.5)).normalize().multiplyScalar(Ne(1.4,3.2)*u),h.life=0,h.max=Ne(.45,.85),h.s=Ne(.05,.12)*u}c=!0},update(l){if(!c)return!1;let u=!1;for(let d=0;d<i;d++){let h=n[d];h.life<h.max?(h.life+=l,h.p.addScaledVector(h.v,l),h.v.multiplyScalar(Math.pow(.05,l)),o.setScalar(Math.max(0,h.s*(1-h.life/h.max))),u=!0):o.setScalar(0),s.compose(h.p,r,o),t.setMatrixAt(d,s)}return t.instanceMatrix.needsUpdate=!0,c=u,u}}}function zu({reduced:i}){let t=document.getElementById("gl"),e=document.documentElement,n=matchMedia("(pointer: coarse)").matches,s=n||Math.min(innerWidth,innerHeight)<700,r=new ws({canvas:t,antialias:!0,alpha:!1,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,s?1.35:1.75)),r.outputColorSpace=Te,r.toneMapping=Bi,r.toneMappingExposure=1.05,"transmissionResolutionScale"in r&&(r.transmissionResolutionScale=s?.5:.85),e.classList.add("has-gl");let o=new Qn,a=new bi(r);o.environment=a.fromScene(new Rs,.04).texture,o.environmentIntensity=1,a.dispose();let c=new Be(30,1,.1,100);c.position.set(0,0,14);let l=new ni(16773602,1.6);l.position.set(4,6,8);let u=new ni(16762536,1.2);u.position.set(-5,3,-6);let d=new ni(13231871,.35);d.position.set(-6,-3,5),o.add(l,u,d);let h=M_();o.add(h.mesh);let f=S_();o.add(f.mesh);let m=Nu({detail:s?22:36,lowEnd:s});o.add(m.root);let x=b_(s?110:190);m.root.add(x.points);let g=Fu(),p=new Ae;p.add(g.root),o.add(p);let v=Ou(),E=new Ae;E.add(v.root),o.add(E);let y=Du(s?2:3),T=Uu(),w=new Sn(.62,8,6),_=new vn({visible:!1}),b=[],U=(P,V)=>{let q=new Ht(y,T),ot=new Ht(w,_);q.add(ot),o.add(q);let R={mesh:q,hit:ot,slot:P,spot:V,phase:Ne(0,6.28),spin:new D(Ne(-.6,.6),Ne(-.8,.8),Ne(-.4,.4)),alive:!0,popT:-1,back:0,born:1,hv:0,burst:!1,push:new At};ot.userData.germ=R,b.push(R)};v_.slice(0,s?5:7).forEach(P=>U("hero",P)),y_.slice(0,s?4:6).forEach(P=>U("germs",P));let I=E_(64);o.add(I.mesh);let z=(()=>{let P=document.createElement("canvas");P.width=P.height=128;let V=P.getContext("2d"),q=V.createRadialGradient(64,64,0,64,64,64);return q.addColorStop(0,"rgba(255,255,255,0.9)"),q.addColorStop(.5,"rgba(255,255,255,0.22)"),q.addColorStop(1,"rgba(255,255,255,0)"),V.fillStyle=q,V.fillRect(0,0,128,128),new yn(P)})(),k=P=>{let V=new Ht(new fn(1,1),new vn({map:z,color:P,transparent:!0,depthWrite:!1,blending:Fi,toneMapped:!1}));return V.visible=!1,o.add(V),V},J=k(16742994),N=k(16763174),H=k(10140677),G=Array.from({length:6},()=>{let P=new Ht(new nr(.44,.5,48),new vn({color:En.sun,transparent:!0,opacity:0,depthWrite:!1,blending:Fi,side:$e,toneMapped:!1}));return P.visible=!1,o.add(P),{m:P,t:1,s:1}}),X=0,rt=null,$=(P,V)=>{let q=G[X=(X+1)%G.length];q.m.position.copy(P),q.t=0,q.s=V,q.m.visible=!0},et={};document.querySelectorAll("[data-slot]").forEach(P=>et[P.dataset.slot]=P);let nt=0,mt=0,It=()=>{let P=t.clientWidth,V=t.clientHeight;!P||!V||P===nt&&V===mt||(nt=P,mt=V,r.setSize(P,V,!1),c.aspect=P/V,c.updateProjectionMatrix(),h.u.uAspect.value=P/V)};"ResizeObserver"in window&&new ResizeObserver(It).observe(t),window.addEventListener("resize",It),It();let j=P=>Math.tan(Ra.degToRad(c.fov/2))*(c.position.z-P),ct=(P,V=0)=>{let q=et[P];if(!q)return null;let ot=q.getBoundingClientRect();if(!ot.width||!ot.height||ot.bottom<-160||ot.top>mt+160)return null;let R=2*j(V)/mt;return{cx:(ot.left+ot.width/2-nt/2)*R,cy:-(ot.top+ot.height/2-mt/2)*R,hw:ot.width/2*R,hh:ot.height/2*R,upp:R}},vt=(P,V,q,ot)=>Math.min(P.hh*2*ot/V,P.hw*2*ot/q),Et=new At(0,0),ft=new At(99,99),Ut=new At,me=!1,zt=P=>{Et.set(P.clientX/nt*2-1,-(P.clientY/mt)*2+1);let V=j(0);ft.set(Et.x*V*c.aspect,Et.y*V)};window.addEventListener("pointermove",P=>{zt(P),P.pointerType==="mouse"&&(me=!0)},{passive:!0});let yt=new Di,xt=0,Tt=0,Rt=0,Wt=()=>{let P=[];return b.forEach(V=>{V.alive&&V.mesh.visible&&V.born>.6&&P.push(V.hit)}),p.visible&&P.push(g.hit),E.visible&&P.push(v.hit),P},qt=P=>{P.alive=!1,P.popT=0,P.back=Ne(2.6,4.2),xt++,window.dispatchEvent(new CustomEvent("poa:germ",{detail:xt})),navigator.vibrate&&n&&navigator.vibrate(12)};window.addEventListener("pointerdown",P=>{if(P.button>0||e.classList.contains("gated"))return;let V=P.target;if(V&&V.closest&&V.closest("a,button,input,textarea,select,label,.modal,.suggest,.glass"))return;zt(P),yt.setFromCamera(Et,c);let q=yt.intersectObjects(Wt(),!1)[0];if(!q)return;let ot=q.object;ot.userData.germ?(qt(ot.userData.germ),P.__germ=!0):ot===g.hit?Tt=1:ot===v.hit&&(Rt=1)},{capture:!0,passive:!0});let $t=0,ne=0,Gt=null,Qt=et.hero;if(Qt){Qt.addEventListener("pointerdown",V=>{if(!V.__germ){Gt={id:V.pointerId,x:V.clientX};try{Qt.setPointerCapture(V.pointerId)}catch{}Fe.holding=!0}}),Qt.addEventListener("pointermove",V=>{if(!Gt||V.pointerId!==Gt.id)return;let q=V.clientX-Gt.x;Gt.x=V.clientX,$t+=q*.011,ne=q*.011});let P=()=>{Gt&&(Gt=null,Fe.holding=!1)};Qt.addEventListener("pointerup",P),Qt.addEventListener("pointercancel",P),Qt.addEventListener("lostpointercapture",P),Qt.addEventListener("contextmenu",V=>V.preventDefault())}let _e=e.classList.contains("gated")?"gate":"hero",jt=_e==="hero"&&e.classList.contains("intro")?-1:9,B=0,he=0,ie=0,le=0,ut=0,de=performance.now(),dt={x:0,y:0,s:1,ok:!1},Mt=[new wt,new wt,new wt],A=P=>1-Math.pow(1-Math.min(1,Math.max(0,P)),3);function M(P,V){It(),le+=V*(i?.25:1);let q=P/1e3,ot=Fe.value;me&&Ut.lerp(Et,1-Math.exp(-V*3));let R=_e==="gate",L=Bu[e.dataset.theme]||Bu.paper,F=Math.min(.6,Math.max(0,(P-de)/1e3));de=P;let tt=1-Math.exp(-F*1.8);L.forEach((it,st)=>{Mt[st].setHex(it),h.u["uC"+st].value.lerp(Mt[st],tt)}),he*=Math.pow(.12,V),h.u.uTime.value=le,h.u.uBreath.value=Math.min(1,ot),h.u.uFlash.value=he,h.u.uPtr.value.copy(Ut);let C=jt<0?0:A(jt/1.7);jt>=0&&jt<9&&(jt=(P-ut)/1e3);let K=R?0:Math.min(1,Math.max(0,window.scrollY/(window.innerHeight*.9))),Z=R?null:ct("word",-2.6);if(Z&&f.mesh.visible!==!1){let it=Z.hw*2;f.mesh.position.set(Z.cx,Z.cy+K*Z.hh*.6,-2.6),f.mesh.scale.set(it*(1+.035*Math.min(1,ot)),it,1),f.u.uReveal.value=jt<0?-.05:-.05+1.15*A((jt-.15)/1.1),f.mesh.renderOrder=-50}f.mesh.userData.active=!!Z,Z||f.mesh.position.set(0,999,-2.6);let lt=ct(R?"gate":"hero");if(lt){let it=vt(lt,m.nh,m.nw,R?.84:.9);if(!dt.ok||B<=0)dt.x=lt.cx,dt.y=lt.cy,dt.s=it,dt.ok=!0;else{let kt=1-Math.exp(-V*4.5);dt.x+=(lt.cx-dt.x)*kt,dt.y+=(lt.cy-dt.y)*kt,dt.s+=(it-dt.s)*kt,B-=V}let st=dt.s*(.55+.45*C)*(1-K*.14);m.root.visible=jt>=0,m.root.position.set(dt.x,dt.y,0),m.root.scale.setScalar(Math.max(1e-4,st)),Gt||($t+=ne,ne*=Math.pow(.04,V));let Ct=i?0:Math.sin(q*.35)*.26;m.root.rotation.set(.05-Ut.y*.12+K*.35,$t+Ct+Ut.x*.22+K*1.3-(1-C)*1.2,0),m.update(ot),x.mat.uniforms.uScale.value=r.getPixelRatio()*Math.min(1.6,st*1.25),x.update(i?V*.3:V,Fe.delta),J.visible=m.root.visible,J.position.set(dt.x,dt.y-st*1.9,-1.2),J.scale.set(st*6.2,st*1.6,1),J.material.opacity=(.16+.12*Math.min(1,ot))*C*(1-K)}else m.root.visible=!1,J.visible=!1;let at=R?null:ct("mask");if(at){let it=vt(at,g.nh,g.nw,.9);p.visible=!0,p.position.set(at.cx,at.cy,0),p.scale.setScalar(it),Tt*=Math.pow(.02,V);let st=i?0:1;g.root.rotation.set(.16+Math.sin(q*.7)*.06*st-Ut.y*.15,.5+Math.sin(q*.5)*.32*st+Ut.x*.3,Math.sin(q*9)*.12*Tt),g.root.position.y=Math.sin(q*1.1)*.05*st,g.body.scale.z=1+.16*(.55-Math.min(1,ot))+Tt*.25,N.visible=!0,N.position.set(at.cx,at.cy-it*.8,-1),N.scale.set(it*3.2,it*1.1,1),N.material.opacity=.14}else p.visible=!1,N.visible=!1;let ht=R?null:ct("steth");if(ht){let it=vt(ht,v.nh,v.nw,.92);E.visible=!0,E.position.set(ht.cx,ht.cy,0),E.scale.setScalar(it),Rt*=Math.pow(.03,V);let st=i?0:1;v.root.rotation.set(-Ut.y*.12+Math.sin(q*.6)*.05*st,Math.sin(q*.42)*.6*st+Ut.x*.35+Math.sin(q*7)*.3*Rt,Math.sin(q*.8)*.08*st),v.root.position.y=Math.sin(q*.9)*.06*st,H.visible=!0,H.position.set(ht.cx,ht.cy-it*2.4,-1),H.scale.set(it*2.2,it*.8,1),H.material.opacity=.16}else E.visible=!1,H.visible=!1;let Pt={hero:lt&&!R&&jt>=0?lt:null,germs:R?null:ct("germs")};for(let it of b){let st=Pt[it.slot];if(!st){it.mesh.visible=!1;continue}let Ct=(it.slot==="hero"?.19:.24)*st.hh*2*(s?1.15:1),kt=Ct/.86,pt=kt;if(it.alive)it.born<1&&(it.born=Math.min(1,it.born+V*1.8),pt=it.born<=0?0:kt*(1-Math.pow(1-it.born,3)));else if(it.popT>=0){it.popT+=V;let Ze=it.popT;pt=Ze<.08?kt*(1+Ze*5):kt*1.4*Math.max(0,1-(Ze-.08)/.14),Ze>.08&&!it.burst&&(it.burst=!0,I.emit(it.mesh.position,kt),$(it.mesh.position,kt)),Ze>.22&&(it.popT=-1,pt=0)}else pt=0,it.back-=V,it.back<=0&&(it.alive=!0,it.born=0,it.burst=!1);it.hv+=((it===rt?1:0)-it.hv)*(1-Math.exp(-V*10)),pt*=1+.2*it.hv;let Ft=i?.2:1,xe=st.cx+it.spot[0]*st.hw*.92+Math.sin(q*.7+it.phase)*Ct*.5*Ft,De=st.cy+it.spot[1]*st.hh*.86+Math.cos(q*.9+it.phase*1.3)*Ct*.5*Ft,Nn=xe+it.push.x-ft.x,wi=De+it.push.y-ft.y,Ti=Math.hypot(Nn,wi),qi=Ct*1.6;if(Ti<qi&&Ti>1e-4&&me){let Ze=(qi-Ti)/qi*Ct*.25;it.push.x+=Nn/Ti*Ze,it.push.y+=wi/Ti*Ze}it.push.multiplyScalar(Math.pow(.15,V)),it.mesh.position.set(xe+it.push.x,De+it.push.y,.6);let Yi=Ft*(1+3*it.hv);it.mesh.rotation.x+=it.spin.x*V*Yi,it.mesh.rotation.y+=it.spin.y*V*Yi,it.mesh.rotation.z+=it.spin.z*V*Yi,it.mesh.scale.setScalar(Math.max(1e-4,pt)),it.mesh.visible=pt>.001}I.update(V);for(let it of G){if(it.t>=1){it.m.visible&&(it.m.visible=!1);continue}it.t=Math.min(1,it.t+V/.5),it.m.scale.setScalar(it.s*(.6+2.6*A(it.t))),it.m.material.opacity=.9*(1-it.t)}if(me&&++ie%4===0){yt.setFromCamera(Et,c);let it=yt.intersectObjects(Wt(),!1)[0];rt=it&&it.object.userData.germ?it.object.userData.germ:null,e.classList.toggle("hover-3d",!!it)}r.render(o,c)}return{frame:M,setXray(P){m.setMode(P?"tissue":"glass")},leaveGate(){_e="hero",B=1.4,he=1},intro(){jt=0,ut=performance.now(),b.forEach(P=>{P.slot==="hero"&&(P.born=-.5-Math.random()*.6)})}}}var Tr=new D;function wn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Tr.copy(t),Tr[n]=0,Tr.normalize();let l=.5*o/(o+a),u=1-Tr.angleTo(i)/c;return Math.sign(Tr[e])===1?u*l:a/(o+a)+l+l*(1-u)}var Ar=class i extends dn{constructor(t=1,e=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new D,l=new D,u=new D(t,e,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,x=new D,g=.5/o;for(let p=0,v=0;p<d.length;p+=3,v+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[p+0]=u.x*Math.sign(c.x)+l.x*r,d[p+1]=u.y*Math.sign(c.y)+l.y*r,d[p+2]=u.z*Math.sign(c.z)+l.z*r,h[p+0]=l.x,h[p+1]=l.y,h[p+2]=l.z,Math.floor(p/m)){case 0:x.set(1,0,0),f[v+0]=wn(x,l,"z","y",r,n),f[v+1]=1-wn(x,l,"y","z",r,e);break;case 1:x.set(-1,0,0),f[v+0]=1-wn(x,l,"z","y",r,n),f[v+1]=1-wn(x,l,"y","z",r,e);break;case 2:x.set(0,1,0),f[v+0]=1-wn(x,l,"x","z",r,t),f[v+1]=wn(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),f[v+0]=1-wn(x,l,"x","z",r,t),f[v+1]=1-wn(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),f[v+0]=1-wn(x,l,"x","y",r,t),f[v+1]=1-wn(x,l,"y","x",r,e);break;case 5:x.set(0,0,-1),f[v+0]=wn(x,l,"x","y",r,t),f[v+1]=1-wn(x,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var ae={coral:"#E05744",tomato:"#D52518",carrot:"#F96015",sun:"#FFC926",cream:"#F3E8CC",forest:"#18542A",kiwi:"#9ABC05",ink:"#0E1B12",paper:"#FBF4E4"},w_=new Set(["forest","tomato"]),Gi=1024,Vi=1620,T_=1.24,ku=1.24*Vi/Gi,A_="M18.5 13C13 14 8.5 22.5 7.5 31c-.7 6 1.3 10 6 10 4 0 6.5-2.5 6.5-7V17.5c0-2.7-.4-4.5-1.5-4.5Z",R_="M29.5 13C35 14 39.5 22.5 40.5 31c.7 6-1.3 10-6 10-4 0-6.5-2.5-6.5-7V17.5c0-2.7.4-4.5 1.5-4.5Z",C_="M24 6v13m0 0-5 5m5-5 5 5",cc=null;function Hu(){return cc||(cc=Promise.all([document.fonts.load('900 120px "Anybody"'),document.fonts.load('800 80px "Archivo"'),document.fonts.load('500 30px "Plex Mono"')]).catch(()=>{})),cc}function Ve(i,t,e,n,s){let r=Math.round(n);i.font=`${t} ${e?e+" ":""}${r}px ${s}`,e&&i.font.indexOf(r+"px")<0&&(i.font=`${t} ${r}px ${s}`)}function hc(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}function Vu(i,t,e,n,s,r){i.save(),i.translate(t-n/2,e-n/2),i.scale(n/48,n/48),i.lineWidth=3,i.lineCap=i.lineJoin="round",i.strokeStyle=s,i.stroke(new Path2D(C_)),i.stroke(new Path2D(A_)),i.fillStyle=r,i.fill(new Path2D(R_)),i.beginPath(),i.arc(13,32,3,0,Math.PI*2),i.fill(),i.restore()}function I_(i,t,e,n,s,r,o){i.save(),i.strokeStyle=r,i.lineWidth=o,i.lineCap=i.lineJoin="round",i.beginPath();let a=220;for(let c=0;c<=a;c++){let l=c/a,u=t+(e-t)*l,d=l*4.2%1,h=l>.47&&l<.72?1.7:1,f=d<.4?Math.sin(d/.4*Math.PI*.5):Math.cos((d-.4)/.6*Math.PI*.5),m=n-f*s*h;c?i.lineTo(u,m):i.moveTo(u,m)}i.stroke(),i.restore()}function P_(i,t,e,n,s,r,o,a){let c=String(t).split(/\s+/);for(let l=s;l>=r;l-=4){Ve(i,o,"",l,a);let u=[],d="";for(let h of c){let f=d?d+" "+h:h;i.measureText(f).width<=e||!d?d=f:(u.push(d),d=h)}if(u.push(d),u.length<=n&&u.every(h=>i.measureText(h).width<=e))return{size:l,lines:u}}return Ve(i,o,"",r,a),{size:r,lines:[String(t)]}}function Gu(i,t,e=Gi,n=Vi){let s=e/1024;i.save(),i.fillStyle=ae.cream,i.fillRect(0,0,e,n);let r=560*s;i.fillStyle=ae.coral,i.fillRect(0,0,e,r),i.strokeStyle="rgba(243,232,204,.2)",i.lineWidth=3*s;for(let p=1;p<=7;p++)i.beginPath(),i.arc(e-160*s,190*s,p*54*s,0,Math.PI*2),i.stroke();hc(i,e/2-92*s,50*s,184*s,38*s,19*s),i.fillStyle="rgba(14,27,18,.32)",i.fill(),i.fillStyle=ae.cream,i.textBaseline="alphabetic",Ve(i,500,"",30*s,'"Plex Mono", monospace'),i.fillText("POINT OF ACTION 2026",64*s,182*s);let o=236*s;Ve(i,900,"condensed",o,'"Anybody", sans-serif');let a=i.measureText("PANITIA").width;a>e-128*s&&(o*=(e-128*s)/a,Ve(i,900,"condensed",o,'"Anybody", sans-serif')),i.fillText("PANITIA",58*s,412*s),Ve(i,500,"",27*s,'"Plex Mono", monospace'),i.fillText("TEMA  \xB7  BREATHE",64*s,498*s),Vu(i,e-160*s,190*s,150*s,ae.cream,ae.sun);let c=64*s,l=e-128*s;i.fillStyle="rgba(14,27,18,.55)",Ve(i,500,"",26*s,'"Plex Mono", monospace'),i.fillText("NAMA",c,652*s),i.fillStyle=ae.ink;let u=P_(i,t.name,l,2,100*s,52*s,800,'"Archivo", sans-serif'),d=652*s+22*s+u.size*.92;u.lines.forEach((p,v)=>{i.fillText(p,c,d),v<u.lines.length-1&&(d+=u.size*1.04)}),d+=92*s,i.fillStyle="rgba(14,27,18,.55)",Ve(i,500,"",26*s,'"Plex Mono", monospace'),i.fillText("JABATAN",c,d),d+=22*s+70*s,i.fillStyle=ae.ink;let h=78*s;Ve(i,800,"condensed",h,'"Anybody", sans-serif');let f=i.measureText(t.role).width;f>l&&(h*=l/f,Ve(i,800,"condensed",h,'"Anybody", sans-serif')),i.fillText(t.role,c,d),d+=40*s,Ve(i,700,"",46*s,'"Archivo", sans-serif');let m=t.group,x=Math.min(l,i.measureText(m).width+64*s);hc(i,c,d,x,88*s,44*s),i.fillStyle=ae[t.color]||ae.sun,i.fill(),i.fillStyle=w_.has(t.color)?ae.cream:ae.ink,i.fillText(m,c+32*s,d+60*s,l-64*s);let g=n-330*s;i.fillStyle=ae.forest,i.fillRect(0,g,e,n-g),I_(i,64*s,e-64*s,g+92*s,34*s,ae.sun,5*s),i.fillStyle=ae.cream,Ve(i,820,"condensed",64*s,'"Anybody", sans-serif'),i.fillText("ASTRAMEDICA",64*s,n-120*s),Ve(i,500,"",23*s,'"Plex Mono", monospace'),i.fillText("FK UNIVERSITAS SRIWIJAYA",64*s,n-74*s),i.textAlign="right",i.fillStyle=ae.sun,Ve(i,500,"",30*s,'"Plex Mono", monospace'),i.fillText("PoA26 \xB7 "+t.id,e-64*s,n-120*s),i.fillStyle=ae.cream,Ve(i,500,"",23*s,'"Plex Mono", monospace'),i.fillText("PALEMBANG",e-64*s,n-74*s),i.restore()}function L_(i,t=Gi,e=Vi){let n=t/1024;i.fillStyle=ae.coral,i.fillRect(0,0,t,e);let s=[ae.cream,ae.sun,ae.carrot,"rgba(14,27,18,.18)"];Ve(i,900,"condensed",170*n,'"Anybody", sans-serif'),i.textBaseline="alphabetic";for(let r=0,o=150*n;o<e+160*n;r++,o+=150*n)i.fillStyle=s[r%s.length],i.fillText("BREATHE BREATHE",(r%2?-220:-40)*n,o);i.fillStyle=ae.cream,i.beginPath(),i.arc(t/2,e/2,230*n,0,Math.PI*2),i.fill(),Vu(i,t/2,e/2-30*n,230*n,ae.ink,ae.coral),i.fillStyle=ae.ink,i.textAlign="center",Ve(i,500,"",28*n,'"Plex Mono", monospace'),i.fillText("POA BREATHE 2026",t/2,e/2+150*n),i.textAlign="left"}function N_(i,t,e){i.fillStyle=ae.carrot,i.fillRect(0,0,t,e),i.save(),i.translate(t/2,0),i.rotate(Math.PI/2),i.fillStyle=ae.cream,Ve(i,500,"",46,'"Plex Mono", monospace'),i.textBaseline="middle",i.fillText("POA BREATHE 2026  \xB7  ASTRAMEDICA  \xB7",6,0),i.restore()}var D_=i=>i.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");function Wu({reduced:i}){let t=document.getElementById("lanyard"),e=document.getElementById("card-fallback"),n=document.createElement("canvas");n.width=Gi,n.height=Vi;let s=null,r,o,a,c,l,u,d=!0,h=!1,f=0,m=0,x=8,g=.2,p=new D(0,2.9,0),v=[],E=[];for(let yt=0;yt<=x;yt++)v.push(new D),E.push(new D);let y=0,T=0,w=!1,_=!1,b=0,U=0,I=new D,z=new D,k=null,J=!1,N=[],H=new ce,G=new Xe,X=new D,rt=new Di,$=new hn(new D(0,0,1),0),et=new At,nt=new D;function mt(){try{s=new ws({canvas:t,antialias:!0,alpha:!0})}catch{d=!1;return}s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.outputColorSpace=Te,s.toneMapping=Bi,s.setClearColor(0,0),r=new Qn;let yt=new bi(s);r.environment=yt.fromScene(new Rs,.04).texture,r.environmentIntensity=.9,yt.dispose(),o=new Be(30,1,.1,50);let xt=new ni(16773858,1.4);xt.position.set(3,4,6),r.add(xt),c=new yn(n),c.colorSpace=Te,c.anisotropy=s.capabilities.getMaxAnisotropy();let Tt=document.createElement("canvas");Tt.width=Gi,Tt.height=Vi,L_(Tt.getContext("2d"));let Rt=new yn(Tt);Rt.colorSpace=Te;let Wt=dt=>new Ge({map:dt,roughness:.38,clearcoat:1,clearcoatRoughness:.12}),qt=new Ge({color:15722194,roughness:.4,clearcoat:.6}),$t=new He({color:14672870,metalness:1,roughness:.2});a=new Ae;let ne=new Ht(new Ar(T_,ku,.03,4,.06),[qt,qt,qt,qt,Wt(c),Wt(Rt)]);ne.position.y=-(.17+ku/2);let Gt=new Ht(new Ar(.17,.2,.06,2,.025),$t);Gt.position.y=-.1,a.add(ne,Gt),r.add(a),u=new Ht(new _i(.075,.017,10,28),$t),r.add(u);let Qt=document.createElement("canvas");Qt.width=128,Qt.height=1024,N_(Qt.getContext("2d"),128,1024);let _e=new yn(Qt);_e.colorSpace=Te,_e.wrapS=_e.wrapT=pi,_e.anisotropy=4;let jt=x+2;l=new Re,l.setAttribute("position",new Se(new Float32Array(jt*6),3)),l.setAttribute("uv",new Se(new Float32Array(jt*4),2));let B=new Float32Array(jt*6);for(let dt=0;dt<jt*2;dt++)B[dt*3+2]=1;l.setAttribute("normal",new Se(B,3));let he=[];for(let dt=0;dt<jt-1;dt++){let Mt=dt*2;he.push(Mt,Mt+1,Mt+2,Mt+1,Mt+3,Mt+2)}l.setIndex(he);let ie=new Ht(l,new He({map:_e,roughness:.62,side:$e}));ie.frustumCulled=!1,r.add(ie);let le=i?0:90;if(le){k=new ti(new fn(.075,.13),new He({side:$e,roughness:.5,metalness:.1}),le),k.frustumCulled=!1,k.instanceMatrix.setUsage(vr);let dt=["#E05744","#FFC926","#F96015","#9ABC05","#18542A","#F3E8CC"].map(Mt=>new wt(Mt));for(let Mt=0;Mt<le;Mt++)k.setColorAt(Mt,dt[Mt%dt.length]),N.push({p:new D,v:new D,r:new xn,w:new D,ph:Math.random()*6.28,live:!1});r.add(k)}let ut=dt=>{let Mt=t.getBoundingClientRect();return et.set((dt.clientX-Mt.left)/Mt.width*2-1,-((dt.clientY-Mt.top)/Mt.height)*2+1),rt.setFromCamera(et,o),rt.ray.intersectPlane($,nt)?nt:null};t.addEventListener("pointerdown",dt=>{let Mt=ut(dt);if(Mt){w=!0,_=!0,z.subVectors(v[x],Mt),I.copy(v[x]);try{t.setPointerCapture(dt.pointerId)}catch{}}}),t.addEventListener("pointermove",dt=>{if(!w)return;let Mt=ut(dt);Mt&&I.copy(Mt).add(z)});let de=()=>{w=!1};t.addEventListener("pointerup",de),t.addEventListener("pointercancel",de),t.addEventListener("lostpointercapture",de)}function It(){k&&(N.forEach(yt=>{yt.p.set((Math.random()-.5)*4.6,1.4+Math.random()*3.2,(Math.random()-.5)*1.6),yt.v.set((Math.random()-.5)*.6,-(.75+Math.random()*1.1),0),yt.r.set(Math.random()*6,Math.random()*6,Math.random()*6),yt.w.set((Math.random()-.5)*9,(Math.random()-.5)*9,(Math.random()-.5)*6),yt.live=!0}),J=!0)}function j(yt){if(!k||!J)return;let xt=!1;for(let Tt=0;Tt<N.length;Tt++){let Rt=N[Tt];Rt.live&&(Rt.p.x+=(Rt.v.x+Math.sin(U*2.2+Rt.ph)*.35)*yt,Rt.p.y+=Rt.v.y*yt,Rt.r.x+=Rt.w.x*yt,Rt.r.y+=Rt.w.y*yt,Rt.r.z+=Rt.w.z*yt,Rt.p.y<-2.8?Rt.live=!1:xt=!0),G.setFromEuler(Rt.r),X.setScalar(Rt.live?1:0),H.compose(Rt.p,G,X),k.setMatrixAt(Tt,H)}k.instanceMatrix.needsUpdate=!0,J=xt}function ct(){let yt=i?.1:.95;for(let xt=0;xt<=x;xt++)v[xt].set(p.x+Math.sin(yt)*xt*g,p.y-Math.cos(yt)*xt*g,0),E[xt].copy(v[xt]);y=0,T=0,b=0,_=!1}function vt(){let yt=t.clientWidth,xt=t.clientHeight;if(!yt||!xt||yt===f&&xt===m)return;f=yt,m=xt,s.setSize(yt,xt,!1),o.aspect=yt/xt;let Tt=Math.max(6.8,4.6/o.aspect);o.position.set(0,.35,Tt),o.lookAt(0,.35,0),o.updateProjectionMatrix()}function Et(yt){let xt=-16*yt*yt;for(let Rt=1;Rt<=x;Rt++){if(Rt===x&&w)continue;let Wt=v[Rt],qt=E[Rt],$t=(Wt.x-qt.x)*.981,ne=(Wt.y-qt.y)*.981,Gt=(Wt.z-qt.z)*.9;qt.copy(Wt),Wt.x+=$t,Wt.y+=ne+xt,Wt.z+=Gt}if(w){let Rt=v[x];E[x].copy(Rt),Rt.lerp(I,.35),Rt.z=0}else i||(v[x].x+=Math.sin(U*.9)*35e-5);for(let Rt=0;Rt<8;Rt++)for(let Wt=0;Wt<x;Wt++){let qt=v[Wt],$t=v[Wt+1],ne=$t.x-qt.x,Gt=$t.y-qt.y,Qt=$t.z-qt.z,_e=Math.sqrt(ne*ne+Gt*Gt+Qt*Qt)||1e-6,jt=(_e-g)/_e,B=Wt===0?0:1,he=Wt+1===x?w?0:.25:1;if(B+he===0)continue;let ie=jt/(B+he);qt.x+=ne*ie*B,qt.y+=Gt*ie*B,qt.z+=Qt*ie*B,$t.x-=ne*ie*he,$t.y-=Gt*ie*he,$t.z-=Qt*ie*he}let Tt=v[x].x-E[x].x;T+=Tt*(_?1.3:.15)-Math.sin(y)*.03,T*=.93,y+=T}let ft=new D,Ut=new D,me=new D(0,0,1);function zt(){let yt=Math.atan2(v[x].x-v[x-1].x,-(v[x].y-v[x-1].y));a.position.copy(v[x]),a.rotation.set(0,y,yt,"ZYX"),u.position.copy(v[x]);let xt=[ft.copy(p).add(new D(0,1.6,0)).clone(),...v],Tt=l.attributes.position.array,Rt=l.attributes.uv.array,Wt=0;for(let qt=0;qt<xt.length;qt++){let $t=xt[Math.max(0,qt-1)],ne=xt[Math.min(xt.length-1,qt+1)];Ut.subVectors(ne,$t).cross(me).normalize().multiplyScalar(.085),qt>0&&(Wt+=xt[qt].distanceTo(xt[qt-1]));let Gt=xt[qt];Tt.set([Gt.x-Ut.x,Gt.y-Ut.y,Gt.z-.01,Gt.x+Ut.x,Gt.y+Ut.y,Gt.z-.01],qt*6);let Qt=-Wt/1.1;Rt.set([0,Qt,1,Qt],qt*4)}l.attributes.position.needsUpdate=!0,l.attributes.uv.needsUpdate=!0}return{async open(yt){await Hu();let xt=n.getContext("2d");if(xt.clearRect(0,0,Gi,Vi),Gu(xt,yt),!s&&d&&mt(),!d){t.hidden=!0,e.src=n.toDataURL("image/png"),e.hidden=!1;return}c.needsUpdate=!0,ct(),It(),f=m=0,h=!0},close(){h=!1,w=!1},frame(yt,xt){if(!h)return;vt(),U+=xt,b=Math.min(b+xt,.1);let Tt=1/120;for(;b>=Tt;)Et(Tt),b-=Tt;j(xt),zt(),s.render(r,o)},async save(yt){await Hu();let xt=document.createElement("canvas");xt.width=1080,xt.height=Math.round(1080*Vi/Gi);let Tt=xt.getContext("2d");hc(Tt,0,0,xt.width,xt.height,58),Tt.clip(),Gu(Tt,yt,xt.width,xt.height);let Rt=await new Promise(Gt=>xt.toBlob(Gt,"image/png"));if(!Rt)throw new Error("blob");let Wt=`kartu-poa-breathe-2026-${D_(yt.name)}.png`;if(matchMedia("(pointer: coarse)").matches&&navigator.canShare&&typeof File=="function"){let Gt=new File([Rt],Wt,{type:"image/png"});if(navigator.canShare({files:[Gt]}))try{return await navigator.share({files:[Gt],title:"Kartu panitia PoA BREATHE 2026"}),"shared"}catch(Qt){if(Qt&&Qt.name==="AbortError")return"cancel"}}let $t=URL.createObjectURL(Rt),ne=document.createElement("a");return ne.href=$t,ne.download=Wt,document.body.appendChild(ne),ne.click(),ne.remove(),setTimeout(()=>URL.revokeObjectURL($t),5e3),"downloaded"}}}var Vt=(i,t=document)=>t.querySelector(i),nn=(i,t=document)=>Array.from(t.querySelectorAll(i)),Xu={paper:"#081C10"},qu=new Set(["forest","tomato"]),U_=new Set(["m","muh","moh","mhd","muhamad","mohammad","mohamad","muhammed","mochammad","moch","mochamad"]),Rr=i=>String(i).padStart(2,"0"),we=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Wi=i=>String(i||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/['’`.]/g,"").replace(/[^a-z0-9]+/g," ").trim(),$u=i=>Wi(i).split(" ").filter(Boolean).map(t=>U_.has(t)?"muhammad":t);function F_(i,t){if(i===t)return 1;if(i.length<2||t.length<2)return 0;let e=new Map;for(let s=0;s<i.length-1;s++){let r=i.substr(s,2);e.set(r,(e.get(r)||0)+1)}let n=0;for(let s=0;s<t.length-1;s++){let r=t.substr(s,2),o=e.get(r);o&&(e.set(r,o-1),n++)}return 2*n/(i.length+t.length-2)}function O_(i){let t=[];(i.bph||[]).forEach((n,s)=>t.push({name:n.name,role:n.role||"BPH",group:"Badan Pengurus Harian",color:"forest",id:`BPH-${Rr(s+1)}`,kind:"bph"})),(i.divisions||[]).forEach(n=>{let s=1,r=(o,a,c)=>{o&&String(o).trim()&&t.push({name:String(o).trim(),role:a,group:`Divisi ${n.name}`,color:n.color,id:`${n.code}-${Rr(s++)}`,kind:c})};r(n.koor,"Koordinator","koor"),r(n.wakoor,"Wakil Koordinator","wakoor"),(n.staf||[]).forEach(o=>r(o,"Anggota","staf"))});let e=i.aliases||{};return t.forEach(n=>{n.keys=[n.name,...e[n.name]||[]].map($u),n.flat=n.keys.map(s=>s.join(" "))}),t}function Yu(i,t){let e=$u(t);if(!e.length||e.join("").length<2)return{type:"none",list:[]};let n=e.join(" "),s=i.filter(a=>a.flat.includes(n)),r=i.filter(a=>a.keys.some(c=>e.every(l=>c.some(u=>u.startsWith(l)))));if(s.length===1&&e.length===1&&r.length>1){let a=r.filter(c=>c!==s[0]).sort((c,l)=>c.name.length-l.name.length);return{type:"multi",list:[s[0],...a].slice(0,8)}}if(s.length)return{type:s.length===1?"exact":"multi",list:s};if(r.length)return r.sort((a,c)=>a.name.length-c.name.length),{type:r.length===1&&e.length>=2?"exact":"multi",list:r.slice(0,8)};let o=i.map(a=>({p:a,s:Math.max(...a.flat.map(c=>F_(c,n)))})).filter(a=>a.s>=.6).sort((a,c)=>c.s-a.s).slice(0,4).map(a=>a.p);return o.length?{type:"fuzzy",list:o}:{type:"none",list:[]}}function B_(i=520,t=44){let e="",s=t*.78;for(let r=0;r<=260;r++){let o=r/260,a=o*i,c=o*5.2%1,l=o>.55&&o<.75?1.75:1,u=c<.4?Math.sin(c/.4*Math.PI*.5):Math.cos((c-.4)/.6*Math.PI*.5),d=s-u*t*.36*l;e+=(r?"L":"M")+a.toFixed(1)+" "+d.toFixed(1)}return e}function Zu({data:i,scene:t,lanyard:e,reduced:n,fx:s}){let r=()=>window.__lenis||null,o=i.config||{},a=document.documentElement,c=O_(i),l=o.announceAt?new Date(o.announceAt).getTime():NaN,u=()=>!isNaN(l)&&Date.now()<l;nn("[data-bind]").forEach(R=>{let L=o[R.dataset.bind];R.textContent=L&&String(L).trim()?L:R.dataset.bind==="eventDate"?"Menyusul":R.textContent}),nn("[data-bind-href]").forEach(R=>{let L=R.dataset.bindHref,F=o[L];F&&(R.href=L==="email"?"mailto:"+F:F,L==="email"&&(R.textContent=F))}),nn(".trace path").forEach(R=>{R.setAttribute("d",B_());try{R.style.setProperty("--len",Math.ceil(R.getTotalLength())+1)}catch{}});let d=Vt("#topbar"),h=Vt("#menu-btn"),f=Vt("#nav"),m=()=>d.classList.toggle("is-scrolled",window.scrollY>24);window.addEventListener("scroll",m,{passive:!0}),m();let x=()=>{d.classList.remove("is-open"),h.setAttribute("aria-expanded","false"),h.textContent="Menu"};h.addEventListener("click",()=>{let R=!d.classList.contains("is-open");d.classList.toggle("is-open",R),h.setAttribute("aria-expanded",String(R)),h.textContent=R?"Tutup":"Menu"}),f.addEventListener("click",R=>{R.target.closest("a")&&x()}),document.addEventListener("keydown",R=>{R.key==="Escape"&&x()});let g=Vt('meta[name="theme-color"]'),p="paper",v=R=>{!R||R===p||(p=R,a.dataset.theme=R,g&&g.setAttribute("content",Xu[R]||Xu.paper))},E=nn("#nav a, .index a"),y=new IntersectionObserver(R=>{R.forEach(L=>{L.isIntersecting&&(v(L.target.dataset.theme),E.forEach(F=>F.classList.toggle("is-active",F.getAttribute("href")==="#"+L.target.id)))})},{rootMargin:"-50% 0px -50% 0px"});nn("main [data-theme]").forEach(R=>y.observe(R));let T=new IntersectionObserver(R=>{R.forEach(L=>{L.isIntersecting&&(L.target.classList.add("is-in"),T.unobserve(L.target))})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});nn("[data-reveal]").forEach(R=>T.observe(R));let w=Vt("#xray");t?w.addEventListener("click",()=>{let R=w.getAttribute("aria-pressed")!=="true";w.setAttribute("aria-pressed",String(R)),w.textContent=R?"Tampilan: jaringan":"Tampilan: kaca",t.setXray(R)}):(w.hidden=!0,Vt("#hero-hint").hidden=!0),matchMedia("(pointer: coarse)").matches&&(Vt("#hero-hint").textContent="Tahan paru-parunya, geser untuk memutar. Kumannya bisa diketuk.");let _=Vt("#hero-stage");nn("[data-focus]").forEach(R=>R.addEventListener("click",()=>{let L=document.getElementById(R.dataset.focus);L&&!L.disabled&&setTimeout(()=>L.focus({preventScroll:!0}),n?0:650)}));let b=Vt("#wordmark"),U=Vt(".wm-in"),I=nn(".wm-in span"),z=Vt(".wordlayer"),k=Vt(".hero"),J=Vt(".hero__stage"),N=86,H=126,G=100,X=()=>{I.forEach(F=>F.style.setProperty("--w",H+6)),b.style.fontSize="100px";let R=U.getBoundingClientRect().width||1,L=a.clientWidth*.95;G=Math.max(48,100*L/R),b.style.fontSize=G.toFixed(1)+"px",rt()},rt=()=>{z.style.setProperty("--hero-h",k.offsetHeight+"px");let L=J.getBoundingClientRect().bottom+window.scrollY;b.style.setProperty("--wm-top",Math.max(0,L-G*.8*.95)+"px")},$=0;window.addEventListener("resize",()=>{clearTimeout($),$=setTimeout(X,120)}),X(),document.fonts&&document.fonts.ready&&document.fonts.ready.then(X);let et=Vt("#meter"),nt=Vt("#meter span"),mt="",It=ot(),j=Vt("#stage-note");j.textContent=o.staffPending?`Tahap ini: ${o.stage||"penempatan panitia"}. Penempatan anggota menyusul.`:`${o.stage||"Susunan lengkap panitia"}.`;let ct=Vt("#q"),vt=Vt(".lookup__go"),Et=Vt("#lookup-msg"),ft=Vt("#suggest"),Ut=Vt("#countdown"),me=R=>new Date(R).toLocaleString("id-ID",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Jakarta"})+" WIB";if(_&&(_.textContent=u()?"Dibuka "+me(l):"Pengumuman sudah dibuka"),u()){ct.disabled=vt.disabled=!0,ct.placeholder="Belum dibuka",Ut.hidden=!1;let R=()=>{let L=l-Date.now();if(L<=0){location.reload();return}let F=Math.floor(L/864e5),tt=Math.floor(L%864e5/36e5),C=Math.floor(L%36e5/6e4),K=Math.floor(L%6e4/1e3);Ut.innerHTML=`<p>Pengumuman dibuka ${we(me(l))}.</p>`+[[F,"hari"],[tt,"jam"],[C,"menit"],[K,"detik"]].map(([Z,lt])=>`<div><b>${Rr(Z)}</b><span>${lt}</span></div>`).join("")};R(),setInterval(R,1e3)}let zt=Vt("#roster-q"),yt=Vt("#roster-count"),xt=Vt("#roster-empty"),Tt=R=>u()?'<span class="locked">\u2022 \u2022 \u2022 \u2022 \u2022</span>':`<span class="nm">${we(R)}</span>`,Rt=Vt("#bph");Rt.innerHTML='<p class="bph__title">Badan Pengurus Harian</p>'+(i.bph||[]).map(R=>`<div class="person" data-names="${we(Wi(R.name))}"><b>${Tt(R.name)}</b><span>${we(R.role||"BPH")}</span></div>`).join("");let Wt=Vt("#divs");Wt.innerHTML=(i.divisions||[]).map((R,L)=>{let F=ae[R.color]||ae.sun,tt=qu.has(R.color)?ae.cream:ae.ink,C=(at,ht)=>`<div><dt>${at}</dt>${ht?`<dd>${Tt(ht)}</dd>`:'<dd class="tba">Menyusul</dd>'}</div>`,K=R.staf||[],Z=[R.koor,R.wakoor,...K].filter(Boolean).map(Wi).join("|"),lt=K.length?`<button class="staff-toggle" type="button" aria-expanded="false">Lihat ${K.length} anggota</button><ul class="staff" hidden>${K.map(at=>`<li>${Tt(at)}</li>`).join("")}</ul>`:`<p class="staff-note">${o.staffPending?"Anggota diumumkan menyusul":"Belum ada anggota"}</p>`;return`<article class="div glass" data-reveal data-names="${we(Z)}" style="--c:${F};--cfg:${tt}">
      <div class="div__top"><span class="div__no">${Rr(L+1)}</span><span class="div__code">${we(R.code)}</span></div>
      <h3 class="div__name">${we(R.name)}${R.nick?`<small>atau ${we(R.nick)}</small>`:""}</h3>
      <p class="div__blurb">${we(R.blurb||"")}</p>
      <dl class="people">${C("Koordinator",R.koor)}${C("Wakil",R.wakoor)}</dl>
      ${lt}
    </article>`}).join(""),nn(".div[data-reveal]",Wt).forEach(R=>T.observe(R)),Wt.addEventListener("click",R=>{let L=R.target.closest(".staff-toggle");if(!L)return;let F=L.nextElementSibling,tt=F.hidden;F.hidden=!tt,L.setAttribute("aria-expanded",String(tt)),L.textContent=tt?"Sembunyikan anggota":`Lihat ${F.children.length} anggota`});let qt=new Set(c.map(R=>Wi(R.name))).size;yt.textContent=u()?"Nama tampil saat pengumuman dibuka":`${qt} nama terdaftar`;let $t=(R,L)=>{nn(".nm",R).forEach(F=>{let tt=F.textContent;if(!L){F.textContent=tt;return}let C=tt.toLowerCase().indexOf(zt.value.trim().toLowerCase());if(C<0){F.textContent=tt;return}let K=zt.value.trim().length;F.innerHTML=we(tt.slice(0,C))+"<mark>"+we(tt.slice(C,C+K))+"</mark>"+we(tt.slice(C+K))})};zt.addEventListener("input",()=>{if(u())return;let R=Wi(zt.value),L=0;nn(".person",Rt).forEach(F=>{let tt=!R||F.dataset.names.includes(R);F.hidden=!tt,tt&&R&&L++}),nn(".div",Wt).forEach(F=>{let tt=!R||F.dataset.names.includes(R);if(F.hidden=!tt,tt&&R){L+=F.dataset.names.split("|").filter(Z=>Z.includes(R)).length;let C=Vt(".staff",F),K=Vt(".staff-toggle",F);C&&C.hidden&&Array.from(C.children).some(Z=>Wi(Z.textContent).includes(R))&&K.click()}}),$t(document,R),Rt.hidden=!!R&&!nn(".person",Rt).some(F=>!F.hidden),xt.hidden=!R||L>0,yt.textContent=R?`${L} cocok`:`${qt} nama terdaftar`});let ne=i.links||{},Gt=(R,L)=>{let F=Rr(L+1),tt=(R.href||"").trim();if(!tt)return`<div class="tile glass is-soon" aria-disabled="true"><span class="tile__k">${F}</span><span class="tile__t">${we(R.title)}</span><span class="tile__d">${we(R.desc||"")}</span><span class="tile__go">Menyusul</span></div>`;let C=/^https?:/i.test(tt),K=/^mailto:/i.test(tt);return`<a class="tile glass" href="${we(tt)}"${C?' target="_blank" rel="noopener"':""}><span class="tile__k">${F}</span><span class="tile__t">${we(R.title)}</span><span class="tile__d">${we(R.desc||"")}</span><span class="tile__go">${K?"Tulis email":C?"Buka \u2197":"Lihat"}</span></a>`};Vt("#tp-divisi").innerHTML=(ne.divisi||[]).map(Gt).join(""),Vt("#tp-bph").innerHTML=(ne.bph||[]).map(Gt).join(""),Vt("#tp-sekretariat").innerHTML=(ne.sekretariatNote?`<p class="note">${we(ne.sekretariatNote)}</p>`:"")+(ne.sekretariat||[]).map(Gt).join("");let Qt=nn('[role="tab"]'),_e=(R,L)=>{Qt.forEach(F=>{let tt=F===R;F.setAttribute("aria-selected",String(tt)),F.tabIndex=tt?0:-1,document.getElementById(F.getAttribute("aria-controls")).hidden=!tt}),L&&R.focus()};Qt.forEach((R,L)=>{R.addEventListener("click",()=>_e(R)),R.addEventListener("keydown",F=>{F.key!=="ArrowRight"&&F.key!=="ArrowLeft"||(F.preventDefault(),_e(Qt[(L+(F.key==="ArrowRight"?1:Qt.length-1))%Qt.length],!0))})});let jt=-1,B=[],he=()=>{ft.hidden=!0,ft.innerHTML="",ct.setAttribute("aria-expanded","false"),jt=-1},ie=()=>{if(u())return;let R=ct.value.trim();if(Wi(R).length<3){he();return}let L=Yu(c,R);if(B=L.type==="none"?[]:L.list.slice(0,6),!B.length){he();return}jt=-1,ft.innerHTML=B.map((F,tt)=>`<li role="option" id="sg-${tt}" aria-selected="false" data-i="${tt}"><b>${we(F.name)}</b><small>${we(F.kind==="bph"?"BPH":F.group.replace("Divisi ",""))}</small></li>`).join(""),ft.hidden=!1,ct.setAttribute("aria-expanded","true")};ct.addEventListener("input",()=>{Et.textContent="",ie()}),ct.addEventListener("keydown",R=>{if(ft.hidden)return;let L=nn("li",ft);if(R.key==="ArrowDown"||R.key==="ArrowUp")R.preventDefault(),jt=(jt+(R.key==="ArrowDown"?1:L.length-1)+(jt<0&&R.key==="ArrowUp"?1:0))%L.length,L.forEach((F,tt)=>F.setAttribute("aria-selected",String(tt===jt))),ct.setAttribute("aria-activedescendant","sg-"+jt);else if(R.key==="Enter"&&jt>=0){R.preventDefault();let F=B[jt];he(),ct.value=F.name,A(F)}else R.key==="Escape"&&he()}),ft.addEventListener("pointerdown",R=>{let L=R.target.closest("li");if(!L)return;R.preventDefault();let F=B[+L.dataset.i];he(),ct.value=F.name,A(F)}),document.addEventListener("pointerdown",R=>{R.target.closest(".lookup")||he()});let le=R=>`<div class="pick">${R.map(L=>`<button type="button" data-pid="${we(L.id)}"><b>${we(L.name)}</b><small>${we(L.kind==="bph"?"BPH":L.group)}</small></button>`).join("")}</div>`;Et.addEventListener("click",R=>{let L=R.target.closest("[data-pid]");if(!L)return;let F=c.find(tt=>tt.id===L.dataset.pid);F&&(ct.value=F.name,A(F))}),Vt("#lookup").addEventListener("submit",R=>{if(R.preventDefault(),he(),u())return;let L=ct.value.trim();if(!L){Et.textContent="Tulis namamu dulu.",ct.focus();return}let F=Yu(c,L);if(F.type==="exact"){Et.textContent="",A(F.list[0]);return}if(F.type==="multi"){Et.innerHTML=`<strong>Ada ${F.list.length>1?"beberapa nama":"nama"} yang cocok.</strong> Kamu yang mana?${le(F.list)}`;return}if(F.type==="fuzzy"){Et.innerHTML=`<strong>Belum ketemu yang persis.</strong> Mungkin maksudmu:${le(F.list)}`;return}Et.textContent=o.staffPending?`Nama ini belum ada di daftar tahap ini (${String(o.stage||"").toLowerCase()}). Kalau kamu daftar sebagai anggota divisi, tunggu pengumuman berikutnya di grup LINE.`:"Nama ini belum ketemu. Coba tulis nama lengkap sesuai form, atau tanya BPH di grup LINE."});let ut=Vt("#result"),de=null,dt=null,Mt=R=>R.kind==="bph"?"Terima kasih sudah jaga PoA dari awal.":R.kind==="staf"?"Info selanjutnya dari koordinator divisimu lewat grup LINE.":"Info rapat koordinasi pertama akan dikabarkan BPH lewat grup LINE.";function A(R){dt=R,Vt("#r-role").textContent=R.role;let L=Vt("#r-div");L.textContent=R.group;let F=R.color==="coral"?"paper":R.color;L.style.background=ae[F]||ae.paper,L.style.color=qu.has(F)?ae.cream:ae.ink,Vt("#r-name").textContent=R.name,Vt("#r-note").textContent=Mt(R),o.lineGroup&&(Vt("#r-line").href=o.lineGroup);let tt=Vt("#r-save");tt.textContent="Simpan kartu",tt.disabled=!1,de=document.activeElement,ut.hidden=!1,a.classList.add("modal-open"),r()&&r().stop(),requestAnimationFrame(()=>{ut.classList.add("is-open"),s&&s.replay(Vt(".modal__yay"))}),e.open(R),setTimeout(()=>Vt(".modal__x",ut).focus({preventScroll:!0}),30)}function M(){ut.hidden||(ut.hidden=!0,ut.classList.remove("is-open"),a.classList.remove("modal-open"),r()&&r().start(),e.close(),de&&de.focus&&de.focus({preventScroll:!0}))}ut.addEventListener("click",R=>{R.target.closest("[data-close]")&&M()}),Vt("#r-all").addEventListener("click",()=>M()),document.addEventListener("keydown",R=>{if(!ut.hidden){if(R.key==="Escape"){M();return}if(R.key==="Tab"){let L=nn("button:not([disabled]), a[href]",ut).filter(C=>C.offsetParent!==null);if(!L.length)return;let F=L[0],tt=L[L.length-1];R.shiftKey&&document.activeElement===F?(R.preventDefault(),tt.focus()):!R.shiftKey&&document.activeElement===tt&&(R.preventDefault(),F.focus())}}}),Vt("#r-save").addEventListener("click",async()=>{let R=Vt("#r-save");if(dt){R.disabled=!0,R.textContent="Menyiapkan...";try{let L=await e.save(dt);R.textContent=L==="shared"?"Terkirim":L==="cancel"?"Simpan kartu":"Tersimpan"}catch{R.textContent="Gagal, coba lagi"}R.disabled=!1}});let P=Vt("#germchip"),V=Vt("#foot-germs"),q=0;return window.addEventListener("poa:germ",R=>{let L=R.detail;P.hidden=!1,P.textContent=L===10?"Refleks bagus. Divisi Games butuh yang kayak gini.":`Kuman ditangkis: ${L}`,V.textContent=`Kuman yang kamu tangkis hari ini: ${L}.`,clearTimeout(q),q=setTimeout(()=>{P.hidden=!0},L===10?4200:2600)}),{frame(R,L){It.frame(L);let F=Fe.value,tt=Math.min(1,F);if(Fe.label!==mt&&(mt=Fe.label,nt.textContent=mt),et.style.setProperty("--b",(.45+.55*tt).toFixed(3)),a.classList.contains("no-gl")&&window.scrollY<k.offsetHeight+40){let C=R/1e3;I.forEach((K,Z)=>{let lt=N+(H-N)*tt+(n?0:Math.sin(C*1.1+Z*.75)*3);K.style.setProperty("--w",lt.toFixed(1))})}}};function ot(){let R={frame(){}};if(!a.classList.contains("gated"))return R;r()&&r().stop();let L=Vt("#hold"),F=Vt("#hold-fill"),tt=Vt("#hold-label"),C=Vt("#gate-hint"),K=Vt("#gate"),Z=289.03,lt=!1,at=0,ht=!1,Pt=!1,it=0,st=0,Ct=Ft=>{Pt||lt||(Ft&&Ft.cancelable&&Ft.preventDefault(),lt=!0,st=performance.now()-at*2200,Fe.holding=!0,L.classList.add("is-holding"),ht||(tt.textContent="Terus..."))},kt=()=>{!lt||Pt||(lt=!1,Fe.holding=!1,L.classList.remove("is-holding"),ht?pt(!0):(tt.textContent="Tahan",C.textContent="Belum penuh. Coba sekali lagi, tahan lebih lama."))};L.addEventListener("pointerdown",Ft=>{try{L.setPointerCapture(Ft.pointerId)}catch{}Ct(Ft)}),L.addEventListener("pointerup",kt),L.addEventListener("pointercancel",kt),L.addEventListener("lostpointercapture",kt),L.addEventListener("keydown",Ft=>{(Ft.key===" "||Ft.key==="Enter")&&!Ft.repeat&&Ct(Ft)}),L.addEventListener("keyup",Ft=>{(Ft.key===" "||Ft.key==="Enter")&&(Ft.preventDefault(),kt())}),L.addEventListener("contextmenu",Ft=>Ft.preventDefault()),L.addEventListener("click",Ft=>Ft.preventDefault()),Vt("#gate-skip").addEventListener("click",()=>pt(!1));function pt(Ft){Pt=!0,Fe.holding=!1;try{localStorage.setItem("poa26-gate","1")}catch{}tt.textContent="Hembuskan";let xe=()=>{a.classList.remove("gated"),window.scrollTo(0,0),X(),r()&&r().start(),s&&s.runIntro()},De=Vt("#wipe");if(!Ft||n||!De){K.classList.add("is-leaving"),t&&t.leaveGate(!1),setTimeout(xe,Ft?600:0);return}let Nn=L.getBoundingClientRect();De.style.setProperty("--wx",(Nn.left+Nn.width/2).toFixed(0)+"px"),De.style.setProperty("--wy",(Nn.top+Nn.height/2).toFixed(0)+"px"),K.classList.add("is-exhale"),De.classList.add("is-on"),setTimeout(()=>{K.classList.add("is-leaving"),t&&t.leaveGate(!0),xe(),requestAnimationFrame(()=>De.classList.add("is-out"))},900),setTimeout(()=>De.classList.remove("is-on","is-out"),2100)}return{frame(){let Ft=performance.now(),xe=Math.min(.25,(Ft-(it||Ft))/1e3);it=Ft,!Pt&&(lt?at=Math.min(1,(Ft-st)/2200):ht||(at=Math.max(0,at-xe*1.6)),at>=1&&!ht&&(ht=!0,L.classList.add("is-full"),tt.textContent="Lepas",navigator.vibrate&&navigator.vibrate(18)),F.style.strokeDashoffset=(Z*(1-at)).toFixed(1))}}}}var Ei=(i,t=document)=>t.querySelector(i),Cr=(i,t=document)=>Array.from(t.querySelectorAll(i)),uc=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ju=(i,t,e)=>Math.min(e,Math.max(t,i));function Na(i,{chars:t=!1,lines:e=!1}={}){if(!i||i.dataset.split)return;i.dataset.split="1";let n=e?i.innerHTML.split(/<br\s*\/?>/i).map(a=>a.replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()).filter(Boolean):[i.textContent.replace(/\s+/g," ").trim()],s=0,r=0,o=a=>{let c=t?Array.from(a).map(l=>`<span class="ch" style="--j:${r++}">${uc(l)}</span>`).join(""):uc(a);return`<span class="w"><span class="wi" style="--i:${s++}">${c}</span></span>`};i.innerHTML=`<span class="sr-only">${uc(n.join(" "))}</span><span aria-hidden="true">${n.map(a=>a.split(" ").map(o).join(" ")).join("<br>")}</span>`}function Ku({reduced:i,fine:t,scene:e}){let n=document.documentElement,s=!i;Cr(".h2").forEach(H=>Na(H)),Na(Ei(".gate__title")),Na(Ei(".foot__big"),{lines:!0,chars:!0}),Na(Ei(".modal__yay"),{chars:!0}),requestAnimationFrame(()=>{let H=Ei(".gate__title");H&&H.classList.add("split-in")}),Cr(".wm-in span").forEach((H,G)=>H.style.setProperty("--i",G));let r=!1,o=()=>{r||(r=!0,requestAnimationFrame(()=>{n.classList.remove("intro"),e&&e.intro()}))};if(!n.classList.contains("gated")){let H=document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve();Promise.race([H,new Promise(G=>setTimeout(G,1400))]).then(o)}let a=null,c=null,l="",u="",d=-200,h=-200,f=-200,m=-200;t&&s&&(a=document.createElement("div"),a.className="cursor",a.setAttribute("aria-hidden","true"),a.innerHTML='<span class="cursor__label"></span>',document.body.appendChild(a),c=a.firstChild,n.classList.add("has-cursor"),document.addEventListener("pointerover",H=>{let G=H.target;!G||!G.closest||(G.closest("input,textarea")?(l="text",u=""):G.closest("#lanyard")?(l="drag",u="seret"):G.closest(".hero__stage")?(l="drag",u="tahan"):G.closest(".strip")?(l="drag",u="geser"):G.closest('a,button,[role="tab"],label')?(l="link",u=""):(l="",u=""))}),n.addEventListener("mouseleave",()=>{d=h=-200}));let x=".btn, .chip, .lookup__go, .menu-btn, .tabs button, .gate__skip, .modal__x",g=".div, a.tile",p=null,v=null,E=H=>{H.style.transition="transform .8s cubic-bezier(.22,.8,.2,1)",H.style.transform=""};t&&s&&(Cr(x).forEach(H=>H.classList.add("mag")),window.addEventListener("pointermove",H=>{if(H.pointerType!=="mouse")return;d=H.clientX,h=H.clientY;let G=H.target&&H.target.closest?H.target:null,X=G?G.closest(x):null;if(p&&p!==X&&(p.style.translate="",p=null),X){X.classList.contains("mag")||X.classList.add("mag");let $=X.getBoundingClientRect();X.style.translate=`${((H.clientX-$.left-$.width/2)*.22).toFixed(1)}px ${((H.clientY-$.top-$.height/2)*.32).toFixed(1)}px`,p=X}let rt=G?G.closest(g):null;if(v&&v!==rt&&(E(v),v=null),rt){let $=rt.getBoundingClientRect(),et=(H.clientX-$.left)/$.width-.5,nt=(H.clientY-$.top)/$.height-.5;rt.style.transition="transform .16s ease-out",rt.style.transform=`perspective(900px) rotateX(${(-nt*7).toFixed(2)}deg) rotateY(${(et*9).toFixed(2)}deg) translateY(-4px)`,rt.style.setProperty("--gx",((et+.5)*100).toFixed(1)+"%"),rt.style.setProperty("--gy",((nt+.5)*100).toFixed(1)+"%"),v=rt}},{passive:!0}));let y=Ei(".strip"),T=y?Cr(".ph img",y):[],w=null,_=0;if(y){y.addEventListener("pointerdown",G=>{if(!(G.pointerType!=="mouse"||G.button!==0)){w={x:G.clientX,sl:y.scrollLeft,last:G.clientX,moved:0},_=0,y.classList.add("is-drag");try{y.setPointerCapture(G.pointerId)}catch{}}}),y.addEventListener("pointermove",G=>{w&&(y.scrollLeft=w.sl-(G.clientX-w.x),_=G.clientX-w.last,w.moved+=Math.abs(_),w.last=G.clientX)});let H=()=>{w&&(w=null)};y.addEventListener("pointerup",H),y.addEventListener("pointercancel",H),y.addEventListener("lostpointercapture",H),y.addEventListener("dragstart",G=>G.preventDefault())}let b=Cr(".foot__big .ch"),U=Ei(".foot__big"),I=Ei("#topbar"),z=Ei(".progress i"),k=window.scrollY,J=0,N=1;return{runIntro:o,replay(H){H&&(H.classList.remove("split-in"),H.offsetWidth,H.classList.add("split-in"))},frame(H,G){let X=H/1e3,rt=window.scrollY,$=window.innerHeight,et=rt-k;if(k=rt,G>0&&(J+=(et/G-J)*Math.min(1,G*8)),Math.abs(et)>.5&&(N=et>0?1:-1),n.style.setProperty("--hp",Ju(rt/($*.9),0,1).toFixed(4)),I&&!n.classList.contains("gated")&&(rt>160&&et>2&&!I.classList.contains("is-open")?I.classList.add("is-hidden"):(et<-2||rt<160)&&I.classList.remove("is-hidden")),z){let nt=document.documentElement.scrollHeight-$;z.style.transform=`scaleX(${nt>0?Ju(rt/nt,0,1).toFixed(4):0})`}if(a){let nt=1-Math.exp(-G*18);f+=(d-f)*nt,m+=(h-m)*nt;let mt=n.classList.contains("hover-3d"),It=mt?"tap":l,j=mt?"ketuk":u;a.dataset.state!==It&&(a.dataset.state=It),c.textContent!==j&&(c.textContent=j),a.style.transform=`translate3d(${f.toFixed(1)}px,${m.toFixed(1)}px,0)`}if(y){!w&&Math.abs(_)>.4?(y.scrollLeft-=_,_*=Math.pow(.02,G)):!w&&y.classList.contains("is-drag")&&(_=0,y.classList.remove("is-drag"));let nt=y.getBoundingClientRect();if(nt.bottom>0&&nt.top<$&&s){let mt=window.innerWidth/2,It=T.map(j=>j.parentNode.getBoundingClientRect());T.forEach((j,ct)=>{let vt=It[ct],Et=(vt.left+vt.width/2-mt)/window.innerWidth;j.style.transform=`translate3d(${(-Et*9).toFixed(2)}%,0,0) scale(1.16)`})}}if(U&&b.length&&s){let nt=U.getBoundingClientRect();if(nt.bottom>0&&nt.top<$)if(t&&d>-100){let mt=b.map(It=>It.getBoundingClientRect());b.forEach((It,j)=>{let ct=mt[j],vt=Math.hypot(ct.left+ct.width/2-d,ct.top+ct.height/2-h);It.style.setProperty("--cw",(62+46*Math.exp(-((vt/170)**2))).toFixed(1))})}else{let mt=Math.min(1,Fe.value);b.forEach((It,j)=>It.style.setProperty("--cw",(62+22*mt*(.5+.5*Math.sin(X*1.4-j*.32))).toFixed(1)))}}}}}function Qu(){let i=null,t=null,e=null,n=null,s=null,r=null,o=!1;function a(){let c=window.AudioContext||window.webkitAudioContext;if(!c)return!1;i=new c;let l=i.sampleRate*2,u=i.createBuffer(1,l,i.sampleRate),d=u.getChannelData(0),h=0;for(let E=0;E<l;E++)h=(h+.02*(Math.random()*2-1))/1.02,d[E]=h*3.5;let f=i.createBuffer(1,l,i.sampleRate),m=f.getChannelData(0);for(let E=0;E<l;E++)m[E]=Math.random()*2-1;t=i.createGain(),t.gain.value=0,t.connect(i.destination);let x=i.createBufferSource();x.buffer=u,x.loop=!0,s=i.createBiquadFilter(),s.type="bandpass",s.frequency.value=650,s.Q.value=.7,e=i.createGain(),e.gain.value=0,x.connect(s),s.connect(e),e.connect(t);let g=i.createBufferSource();g.buffer=f,g.loop=!0;let p=i.createBiquadFilter();p.type="highpass",p.frequency.value=2600,n=i.createGain(),n.gain.value=0,g.connect(p),p.connect(n),n.connect(t),r=i.createGain(),r.gain.value=0;let v=i.createBiquadFilter();return v.type="lowpass",v.frequency.value=820,r.connect(v),v.connect(t),[110,164.81,220,277.18].forEach((E,y)=>{let T=i.createOscillator();T.type=y%2?"sine":"triangle",T.frequency.value=E,T.detune.value=(y-1.5)*4;let w=i.createGain();w.gain.value=.22/(y+1),T.connect(w),w.connect(r),T.start()}),x.start(),g.start(),!0}return{get on(){return o},async toggle(c){let l=typeof c=="boolean"?c:!o;if(l&&!i&&!a()||!i)return!1;if(i.state==="suspended")try{await i.resume()}catch{return!1}return o=l,t.gain.setTargetAtTime(o?.55:0,i.currentTime,.35),o},update(c,l){if(!i||!o)return;let u=i.currentTime,d=Math.min(1,Math.abs(c)*1.6);e.gain.setTargetAtTime(.015+.32*d,u,.08),n.gain.setTargetAtTime(.003+.035*d,u,.08),s.frequency.setTargetAtTime(c>0?880:520,u,.25),r.gain.setTargetAtTime(.045+.035*Math.min(1,l),u,.6)}}}window.__poa=!0;var Da=document.documentElement,Is=Da.classList.contains("reduced"),td=window.matchMedia("(hover: hover) and (pointer: fine)").matches,z_=window.POA||{config:{},bph:[],divisions:[],links:{}},Xi=null;if(td&&!Is)try{Xi=new wc({lerp:.085,smoothWheel:!0,wheelMultiplier:.95}),window.__lenis=Xi}catch{Xi=null}document.addEventListener("click",i=>{let t=i.target.closest&&i.target.closest('a[href^="#"]');if(!t||!Xi)return;let e=t.getAttribute("href"),n=e.length>1?document.querySelector(e):null;n&&(i.preventDefault(),Xi.scrollTo(n,{duration:1.6}),history.replaceState&&history.replaceState(null,"",e))});var Cs=null;try{Cs=zu({reduced:Is})}catch(i){Da.classList.add("no-gl"),console.warn("WebGL tidak tersedia, situs jalan tanpa 3D.",i)}var ed=Wu({reduced:Is}),nd=Ku({reduced:Is,fine:td,scene:Cs}),k_=Zu({data:z_,scene:Cs,lanyard:ed,reduced:Is,fx:nd}),id=Qu(),H_=i=>{Da.classList.toggle("sound-on",i),document.querySelectorAll("[data-sound]").forEach(t=>{t.setAttribute("aria-pressed",String(i));let e=t.querySelector("[data-sound-label]");e&&(e.textContent=i?t.dataset.on:t.dataset.off)})};document.addEventListener("click",async i=>{i.target.closest&&i.target.closest("[data-sound]")&&(i.preventDefault(),H_(await id.toggle()))});var ju=performance.now();function sd(i){let t=Math.min(.05,Math.max(0,(i-ju)/1e3));if(ju=i,Xi&&Xi.raf(i),Fe.update(t,Is),id.update(t>0?Fe.delta/t:0,Fe.value),k_.frame(i,t),nd.frame(i,t),Cs)try{Cs.frame(i,t)}catch(e){console.error(e),Cs=null,Da.classList.add("no-gl")}ed.frame(i,t),requestAnimationFrame(sd)}requestAnimationFrame(sd);
