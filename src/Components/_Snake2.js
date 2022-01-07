import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import snakeTail from "../icon/tail.png";
import apple from "../icon/apple.png";
import { setPhoto } from "./UTILS";

const keyboard = document.querySelector("body");

const WIDTH_RECTANGULAR_SCREEN = 600;

const sizeUnit = 20;
class _Snake2 extends React.Component {
  initialHead_img = snakeRight;
  interval = null;
  constructor(props) {
    super(props);
    this.StartGame = this.props.StartGame;
    console.log("thisScore", this.props.thisScore);

    this.state = {
      GAME_OVER: false,
      direction: "RIGHT",
      snake: [[0, 0], [20, 0], [40, 0]],
      apple: this.newApple(),
      counterApple: 0
    };

    this.directionSnake = this.directionSnake.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.moveSnake, 100);
    keyboard.addEventListener("keydown", this.directionSnake);
  }

  componentDidUpdate() {
    this.CheckApple();
    this.CheckColision();
    this.CheckCollapsed();
  }

  componentWillUnmount() {
    console.log("willUnmonted");
    clearInterval(this.interval);
    keyboard.removeEventListener("keydown", this.directionSnake);
  }

  initialState() {
    this.setState({ snake: [[0, 0], [20, 0], [40, 0]] });
  }

  newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;

    if (x === 0 || y === 0) this.newApple();

    return [x, y];
  }

  CheckApple() {
    let headSnake = this.state.snake[this.state.snake.length - 1];

    if (
      headSnake[0] === this.state.apple[0] &&
      headSnake[1] === this.state.apple[1]
    ) {
      this.setState({
        snake: [...this.state.snake, [this.state.apple[0], this.state.apple[1]]]
      });
      this.setState({ apple: this.newApple() });
      this.setState({ counterApple: this.state.counterApple + 1 });
      // this.props.thisScore = this.state.counterApple;
    }
  }

  CheckColision() {
    let snakeCopy = [...this.state.snake];
    let headSnake = this.state.snake[snakeCopy.length - 1];

    if (headSnake[0] === 600) {
      headSnake = [0, headSnake[1]];
      snakeCopy.push(headSnake);
      snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }
    if (headSnake[0] < 0) {
      headSnake = [580, headSnake[1]];
      snakeCopy.push(headSnake);
      snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[1] === 600) {
      headSnake = [headSnake[0], 0];
      snakeCopy.push(headSnake);
      snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[1] < 0) {
      headSnake = [headSnake[0], 580];
      snakeCopy.push(headSnake);
      snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }
  }

  CheckCollapsed() {
    let snakeCopy = [...this.state.snake];
    let headSnake = snakeCopy[snakeCopy.length - 1];
    console.log("snakeCopy.pop() =>", snakeCopy.pop());
    snakeCopy.pop();

    snakeCopy.forEach(element => {
      console.log(headSnake[0]);
      console.log(element[0]);
      if (headSnake[0] === element[0] && headSnake[1] === element[1])
        // this.GAMEOVER();
        console.log('GAME OVER');
    });
  }

  GAMEOVER() {
    this.setState({ GAME_OVER: true });
  }

  moveSnake = () => {
    let snakeCopy = this.state.snake;
    let headSnake = this.state.snake[snakeCopy.length - 1];

    // eslint-disable-next-line default-case
    switch (this.state.direction) {
      case "RIGHT":
        headSnake = [headSnake[0] + sizeUnit, headSnake[1]];

        break;
      case "LEFT":
        headSnake = [headSnake[0] - sizeUnit, headSnake[1]];
        break;
      case "DOWN":
        headSnake = [headSnake[0], headSnake[1] + sizeUnit];
        break;
      case "UP":
        headSnake = [headSnake[0], headSnake[1] - sizeUnit];
        break;
    }

    snakeCopy.push(headSnake);
    snakeCopy.shift();
    this.setState({ snake: snakeCopy });
  };

  directionSnake({ key }) {
    // eslint-disable-next-line default-case
    switch (key) {
      case "ArrowDown":
        this.initialHead_img = snakeDown;
        this.setState({ direction: "DOWN" });

        break;
      case "ArrowUp":
        this.initialHead_img = snakeUp;
        this.setState({ direction: "UP" });

        break;
      case "ArrowRight":
        this.initialHead_img = snakeRight;
        this.setState({ direction: "RIGHT" });

        break;
      case "ArrowLeft":
        this.initialHead_img = snakeLeft;
        this.setState({ direction: "LEFT" });
    }
  }

  returnSnake = () => {
    let headSnake = this.state.snake[this.state.snake.length - 1];
    return this.state.snake.map((segment, index) => {
      if (headSnake === segment) {
        return (
          <img
            className="segment"
            key={index}
            style={{
              position: "absolute",
              left: `${segment[0]}px`,
              top: `${segment[1]}px`
            }}
            src={this.initialHead_img}
            alt="snake"
          />
        );
      } else
        return (
          <img
            className="segment"
            key={index}
            style={{
              position: "absolute",
              left: `${segment[0]}px`,
              top: `${segment[1]}px`
            }}
            src={snakeTail}
            alt="snake"
          />
        );
    });
  };

  returnApple = () => {
    return (
      <div style={{ position: "absolute" }} className="apple">
        <img width={"20px"} height={"20px"} src={apple} />
      </div>
    );
  };

  Start_Game = () => {
    // this.initialState();
    this.returnSnake();
  };

  render() {
    return (
      <Wrapper
        style={{ position: "relative" }}
        // pozSnakeX={pozSnakeX}
        // pozSnakeY={pozSnakeY}
        pozAppleX={this.state.pozAppleX}
        pozAppleY={this.state.pozAppleY}
        sizeUnit={sizeUnit}
      >
        {this.props.StartGame ? this.returnSnake() : null}

        {this.props.StartGame
          ? <img
              className="apple"
              style={{
                position: "absolute",
                // background: "red",
                left: `${this.state.apple[0]}px`,
                top: `${this.state.apple[1]}px`
              }}
              width={"20px"}
              height={"20px"}
              src={apple}
              alt="apple"
            />
          : null}
        {/* {this.CheckBorder()} */}
        {/* {this.returnApple()} */}
      </Wrapper>
    );
  }
}
export default _Snake2;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  position: relative;
  width: 600px;
  height: 600px;    
  box-shadow: 20px 0px 50px 2px rgba(0, 0, 0, 0.363);
  background: salmon;
  
  .snake {
    // width: ${({ sizeUnit }) => sizeUnit}px;
    // height: ${({ sizeUnit }) => sizeUnit}px;
    // z-index: 1;
    // background: green;
  }
  
  .segment {
    width: 20px;
    height: 20px;
    // background: green;
  }
  
  .apple {

    // left: ${({ pozAppleX }) => pozAppleX}px;
    // top: ${({ pozAppleY }) => pozAppleY}px;
    z-index: 0;

    //background: green;
  }
`;
