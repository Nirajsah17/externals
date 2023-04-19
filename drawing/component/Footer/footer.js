import getTemplate from "./footer.template.js";

function define(o) {

  class FooterEl extends HTMLElement {
    constructor() {
      super();
      this.config = o || {};
      this.element = ``;
      this.state = { name: "niraj" } || {};
      this.store = o.store;
      this.bus = o.bus;
      console.log(this.bus);
      let template = getTemplate(o);
      this.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      console.log(this);
      this.bus.on("home-click",(e)=>{
        console.log(e);
        console.log("data");
      });
    }

    disconnectedCallback() {
      console.log(this);
    }

  }

  return FooterEl;
}

class Footer {
  constructor(o) {
    this.config = o || {};
  }
  init() {
    customElements.define("draw-footer", define(this.config));
  }
}

export default Footer