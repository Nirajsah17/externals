import {Store,Bus} from "./assets/lib/index.js";
import {Navbar,Footer} from "../component/index.js";

// Utility
const store = new Store();
const bus = new Bus();

// instance of component
// let navOptions = {store,bus};
let nav = new Navbar({store,bus});
let footer = new Footer({store,bus});


// initialization of component
nav.init();
footer.init();

bus.on("service-click",(e)=>{
  console.log("sevice");
});
// debugging Global space
window["store"] = store;
window["bus"] = bus;

