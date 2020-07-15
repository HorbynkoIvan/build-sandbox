"use strict";

class App {
  constructor() {
    this.run = (name = "World") => {
      console.log(`Hello ${name}`);
    };
  }
  /*run() {
      const name = "World"
      console.log(`Hello ${name}`)
  }*/


}

const app = new App();
app.run();