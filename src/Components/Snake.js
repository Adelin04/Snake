import React from "react";
const keyboard = document.querySelector("body");

export class Snake extends React.Component {
  constructor() {
    super();
    this.X = 0;
    this.Y = 0;
  }
  setSnakeX = (x) => {
    this.X = this.X + x;
  };

  setSnakeY = (y) => {
    this.Y = this.Y + y;
  };

  fillSnake = () => {};

  showX = () => {
    console.log(this.X);
  };

  moveSnake = (event) => {
    keyboard.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        this.X += 10;
      }
      if (e.key === "ArrowUp") {
        this.X -= 10;
      }
      if (e.key === "ArrowLeft") {
        this.Y -= 10;
      }
      if (e.key === "ArrowRight") {
        this.Y += 10;
      }
/*       console.log(e.key);
      console.log(this.X);
      console.log(this.Y); */
    });
  };
}
