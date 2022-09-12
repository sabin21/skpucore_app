const Default={placement:"left",bodyScrolling:!1,backdrop:!0,edge:!1,edgeOffset:"bottom-[60px]",backdropClasses:"bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30",onShow:()=>{},onHide:()=>{},onToggle:()=>{}};class Drawer{constructor(t=null,e){this._targetEl=t,this._options={...Default,...e},this._visible=!1,this._init()}_init(){this._targetEl&&(this._targetEl.setAttribute("aria-hidden","true"),this._targetEl.classList.add("transition-transform")),this._getPlacementClasses(this._options.placement).base.map((t=>{this._targetEl.classList.add(t)})),this.hide()}isVisible(){return this._visible}hide(){this._options.edge?(this._getPlacementClasses(this._options.placement+"-edge").active.map((t=>{this._targetEl.classList.remove(t)})),this._getPlacementClasses(this._options.placement+"-edge").inactive.map((t=>{this._targetEl.classList.add(t)}))):(this._getPlacementClasses(this._options.placement).active.map((t=>{this._targetEl.classList.remove(t)})),this._getPlacementClasses(this._options.placement).inactive.map((t=>{this._targetEl.classList.add(t)}))),this._targetEl.setAttribute("aria-hidden","true"),this._targetEl.removeAttribute("aria-modal"),this._targetEl.removeAttribute("role"),this._options.bodyScrolling||document.body.classList.remove("overflow-hidden"),this._options.backdrop&&this._destroyBackdropEl(),this._visible=!1,this._options.onHide(this)}show(){this._options.edge?(this._getPlacementClasses(this._options.placement+"-edge").active.map((t=>{this._targetEl.classList.add(t)})),this._getPlacementClasses(this._options.placement+"-edge").inactive.map((t=>{this._targetEl.classList.remove(t)}))):(this._getPlacementClasses(this._options.placement).active.map((t=>{this._targetEl.classList.add(t)})),this._getPlacementClasses(this._options.placement).inactive.map((t=>{this._targetEl.classList.remove(t)}))),this._targetEl.setAttribute("aria-modal","true"),this._targetEl.setAttribute("role","dialog"),this._targetEl.removeAttribute("aria-hidden"),this._options.bodyScrolling||document.body.classList.add("overflow-hidden"),this._options.backdrop&&this._createBackdrop(),this._visible=!0,this._options.onShow(this)}toggle(){this.isVisible()?this.hide():this.show()}_createBackdrop(){if(!this._visible){const t=document.createElement("div");t.setAttribute("drawer-backdrop",""),t.classList.add(...this._options.backdropClasses.split(" ")),document.querySelector("body").append(t),t.addEventListener("click",(()=>{this.hide()}))}}_destroyBackdropEl(){this._visible&&document.querySelector("[drawer-backdrop]").remove()}_getPlacementClasses(t){switch(t){case"top":return{base:["top-0","left-0","right-0"],active:["transform-none"],inactive:["-translate-y-full"]};case"right":return{base:["right-0","top-0"],active:["transform-none"],inactive:["translate-x-full"]};case"bottom":return{base:["bottom-0","left-0","right-0"],active:["transform-none"],inactive:["translate-y-full"]};case"left":default:return{base:["left-0","top-0"],active:["transform-none"],inactive:["-translate-x-full"]};case"bottom-edge":return{base:["left-0","top-0"],active:["transform-none"],inactive:["translate-y-full",this._options.edgeOffset]}}}}window.Drawer=Drawer;const getDrawerInstance=(t,e)=>!!e.some((e=>e.id===t))&&e.find((e=>e.id===t));function initDrawer(){let t=[];document.querySelectorAll("[data-drawer-target]").forEach((e=>{const a=document.getElementById(e.getAttribute("data-drawer-target")),s=a.id,i=e.getAttribute("data-drawer-placement"),r=e.getAttribute("data-drawer-body-scrolling"),o=e.getAttribute("data-drawer-backdrop"),n=e.getAttribute("data-drawer-edge"),l=e.getAttribute("data-drawer-edge-offset");let d=null;getDrawerInstance(s,t)?(d=getDrawerInstance(s,t),d=d.object):(d=new Drawer(a,{placement:i||Default.placement,bodyScrolling:r?"true"===r:Default.bodyScrolling,backdrop:o?"true"===o:Default.backdrop,edge:n?"true"===n:Default.edge,edgeOffset:l||Default.edgeOffset}),t.push({id:s,object:d}))})),document.querySelectorAll("[data-drawer-toggle]").forEach((e=>{const a=document.getElementById(e.getAttribute("data-drawer-toggle")).id,s=getDrawerInstance(a,t);e.addEventListener("click",(()=>{s.object.isVisible()?s.object.hide():s.object.show()}))})),document.querySelectorAll("[data-drawer-dismiss]").forEach((e=>{const a=document.getElementById(e.getAttribute("data-drawer-dismiss")).id,s=getDrawerInstance(a,t);e.addEventListener("click",(()=>{s.object.hide()}))})),document.querySelectorAll("[data-drawer-show]").forEach((e=>{const a=document.getElementById(e.getAttribute("data-drawer-show")).id,s=getDrawerInstance(a,t);e.addEventListener("click",(()=>{s.object.show()}))}))}"loading"!==document.readyState?initDrawer():document.addEventListener("DOMContentLoaded",initDrawer);export default Drawer;