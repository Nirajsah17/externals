import getTemplate from "./navbar.template.js";

function define(o) {

  class NavbarEl extends HTMLElement {
    constructor(){
      super();
      this.config = o || {};
      this.element = ``;
      this.state = {name:"niraj"} || {};
      this.store = o.store;
      this.bus = o.bus;
      let template = getTemplate(o);
      this.appendChild(template.content.cloneNode(true));
      this.domRefs = {
        home : this.querySelector("#home"),
        service : this.querySelector("#service"),
        about : this.querySelector("#about"),
        profile : this.querySelector("#profile"),
      }

      this.domRefs.home.addEventListener("click",this.homeClick.bind(this));
      this.domRefs.service.addEventListener("click",this.serviceClick.bind(this));
      this.domRefs.about.addEventListener("click",this.aboutClick.bind(this));
      this.domRefs.profile.addEventListener("click",this.profileClick.bind(this));
    };

    homeClick(){
      this.bus.emit("home-click",{"clicked":"home"});
    }

    serviceClick(){
      this.bus.emit("service-click",{"clicked":"service"});
    }

    aboutClick(){
      this.bus.emit("about-click",{"clicked":"about"});
    }

    profileClick(){
      this.bus.emit("profile-click",{"clicked":"profile"});
    }

    connectedCallback(){
      console.log(this);
    }

    disconnectedCallback(){
      console.log(this);
    }

  }

  return NavbarEl;
}

class Navbar {
  constructor(o){
    this.config = o || {};
  }
  init(){
    customElements.define("draw-nav",define(this.config));
  }
}

export default Navbar