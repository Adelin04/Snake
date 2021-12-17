import React from "react";

export class Snake extends React.Component {
  constructor(X, Y) {
    super();
    this.X = X;
    this.Y = Y;
  }

  setSnakeX = x => {
    this.X = x;
  };

  setSnakeY = y => {
    this.y = y;
  };

  componentDidMount() {}

  render() {
    return <div />;
  }
}
