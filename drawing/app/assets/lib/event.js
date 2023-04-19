class Bus {
  constructor(o) {
    this.config = o || {};
    this.eventQ = [];
  }

  on(eventName, callbacks) {
    document.addEventListener(eventName, callbacks);
  }

  emit(name, data) {
    let ev = document.dispatchEvent(
      new CustomEvent(name,
        {
          bubbles:true,
          details: data
        }
      )
    );
    this.eventQ.push(ev);
  }

  totalEvent(){
    return this.eventQ;
  }
}

export default Bus;