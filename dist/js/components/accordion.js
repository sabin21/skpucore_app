const Default={alwaysOpen:!1,activeClasses:"bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",inactiveClasses:"text-gray-500 dark:text-gray-400",onOpen:()=>{},onClose:()=>{},onToggle:()=>{}};class Accordion{constructor(t=[],e={}){this._items=t,this._options={...Default,...e},this._init()}_init(){this._items.length&&this._items.map((t=>{t.active&&this.open(t.id),t.triggerEl.addEventListener("click",(()=>{this.toggle(t.id)}))}))}getItem(t){return this._items.filter((e=>e.id===t))[0]}open(t){const e=this.getItem(t);this._options.alwaysOpen||this._items.map((t=>{t!==e&&(t.triggerEl.classList.remove(...this._options.activeClasses.split(" ")),t.triggerEl.classList.add(...this._options.inactiveClasses.split(" ")),t.targetEl.classList.add("hidden"),t.triggerEl.setAttribute("aria-expanded",!1),t.active=!1,t.iconEl&&t.iconEl.classList.remove("rotate-180"))})),e.triggerEl.classList.add(...this._options.activeClasses.split(" ")),e.triggerEl.classList.remove(...this._options.inactiveClasses.split(" ")),e.triggerEl.setAttribute("aria-expanded",!0),e.targetEl.classList.remove("hidden"),e.active=!0,e.iconEl&&e.iconEl.classList.add("rotate-180"),this._options.onOpen(this,e)}toggle(t){const e=this.getItem(t);e.active?this.close(t):this.open(t),this._options.onToggle(this,e)}close(t){const e=this.getItem(t);e.triggerEl.classList.remove(...this._options.activeClasses.split(" ")),e.triggerEl.classList.add(...this._options.inactiveClasses.split(" ")),e.targetEl.classList.add("hidden"),e.triggerEl.setAttribute("aria-expanded",!1),e.active=!1,e.iconEl&&e.iconEl.classList.remove("rotate-180"),this._options.onClose(this,e)}}function initAccordion(){document.querySelectorAll("[data-accordion]").forEach((t=>{const e=t.getAttribute("data-accordion"),i=t.getAttribute("data-active-classes"),s=t.getAttribute("data-inactive-classes"),a=[];t.querySelectorAll("[data-accordion-target]").forEach((t=>{const e={id:t.getAttribute("data-accordion-target"),triggerEl:t,targetEl:document.querySelector(t.getAttribute("data-accordion-target")),iconEl:t.querySelector("[data-accordion-icon]"),active:"true"===t.getAttribute("aria-expanded")};a.push(e)})),new Accordion(a,{alwaysOpen:"open"===e,activeClasses:i||Default.activeClasses,inactiveClasses:s||Default.inactiveClasses})}))}window.Accordion=Accordion,"loading"!==document.readyState?initAccordion():document.addEventListener("DOMContentLoaded",initAccordion);export default Accordion;