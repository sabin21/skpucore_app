const Default={triggerEl:null,onCollapse:()=>{},onExpand:()=>{},onToggle:()=>{}};class Collapse{constructor(t=null,e){this._targetEl=t,this._triggerEl=e?e.triggerEl:Default.triggerEl,this._options={...Default,...e},this._visible=!1,this._init()}_init(){this._triggerEl&&(this._triggerEl.hasAttribute("aria-expanded")?this._visible="true"===this._triggerEl.getAttribute("aria-expanded"):this._visible=!this._targetEl.classList.contains("hidden"),this._triggerEl.addEventListener("click",(()=>{this._visible?this.collapse():this.expand()})))}collapse(){this._targetEl.classList.add("hidden"),this._triggerEl&&this._triggerEl.setAttribute("aria-expanded","false"),this._visible=!1,this._options.onCollapse(this)}expand(){this._targetEl.classList.remove("hidden"),this._triggerEl&&this._triggerEl.setAttribute("aria-expanded","true"),this._visible=!0,this._options.onExpand(this)}toggle(){this._visible?this.collapse():this.expand()}}function initCollapse(){document.querySelectorAll("[data-collapse-toggle]").forEach((t=>{const e=document.getElementById(t.getAttribute("data-collapse-toggle"));new Collapse(e,{triggerEl:t})}))}window.Collapse=Collapse,"loading"!==document.readyState?initCollapse():document.addEventListener("DOMContentLoaded",initCollapse);export default Collapse;