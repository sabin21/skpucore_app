import{createPopper}from"@popperjs/core";const Default={placement:"bottom",triggerType:"click",onShow:()=>{},onHide:()=>{}};class Dropdown{constructor(t=null,e=null,i={}){this._targetEl=t,this._triggerEl=e,this._options={...Default,...i},this._popperInstance=this._createPopperInstace(),this._visible=!1,this._init()}_init(){this._triggerEl&&this._triggerEl.addEventListener("click",(()=>{this.toggle()}))}_createPopperInstace(){return createPopper(this._triggerEl,this._targetEl,{placement:this._options.placement,modifiers:[{name:"offset",options:{offset:[0,10]}}]})}_handleClickOutside(t,e){const i=t.target;i===e||e.contains(i)||this._triggerEl.contains(i)||!this._visible||this.hide(),document.body.removeEventListener("click",this._handleClickOutside,!0)}toggle(){this._visible?(this.hide(),document.body.removeEventListener("click",this._handleClickOutside,!0)):this.show()}show(){this._targetEl.classList.remove("hidden"),this._targetEl.classList.add("block"),this._popperInstance.setOptions((t=>({...t,modifiers:[...t.modifiers,{name:"eventListeners",enabled:!0}]}))),document.body.addEventListener("click",(t=>{this._handleClickOutside(t,this._targetEl)}),!0),this._popperInstance.update(),this._visible=!0,this._options.onShow(this)}hide(){this._targetEl.classList.remove("block"),this._targetEl.classList.add("hidden"),this._popperInstance.setOptions((t=>({...t,modifiers:[...t.modifiers,{name:"eventListeners",enabled:!1}]}))),this._visible=!1,this._options.onHide(this)}}function initDropdown(){document.querySelectorAll("[data-dropdown-toggle]").forEach((t=>{const e=document.getElementById(t.getAttribute("data-dropdown-toggle")),i=t.getAttribute("data-dropdown-placement");new Dropdown(e,t,{placement:i||Default.placement})}))}window.Dropdown=Dropdown,"loading"!==document.readyState?initDropdown():document.addEventListener("DOMContentLoaded",initDropdown);export default Dropdown;