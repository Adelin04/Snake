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

const WIDTH_RECTANGULAR_SCREEN = 400;
const img_snakeRight = setPhoto(snakeRight, WIDTH_RECTANGULAR_SCREEN);
const img_snakeDown = setPhoto(snakeDown, WIDTH_RECTANGULAR_SCREEN);
const img_snakeUp = setPhoto(snakeUp, WIDTH_RECTANGULAR_SCREEN);
const img_snakeLeft = setPhoto(snakeLeft, WIDTH_RECTANGULAR_SCREEN);
const img_snakeTail = setPhoto(snakeTail, WIDTH_RECTANGULAR_SCREEN);
// const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
// const [snakePozitionTail, setSnakePositionTail] = useState(snakeTail);

const sizeUnit = 20;

/* let [counterApple, setCounterApple] = useState(0);

let [pozAppleX, setPozAppleX] = useState(
  () => (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
);
let [pozAppleY, setPozAppleY] = useState(
  (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
);

let [pozSnakeX, setPozSnakeX] = useState(0);
let [pozSnakeY, setPozSnakeY] = useState(0);
let interval; */

class _Snake2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: "",
      snake: [[0, 0], [20, 0], [40, 0]],
      counterApple: 0,
      pozAppleX: () =>
        (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit,
      pozAppleY: () => (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
    };

    this.directionSnake = this.directionSnake.bind(this);
  }

  componentDidMount() {
    setInterval(this.moveSnake, 1000);
    keyboard.addEventListener("keydown", this.directionSnake);
    // console.log("mount", this.state.snake);
  }

  componentDidUpdate() {
    // clearInterval(this.interval);
    // console.log('clear');
  }

  componentWillUnmount() {
    // console.log("update", this.state.snake);
    keyboard.removeEventListener("keydown", this.directionSnake);
  }

  newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    this.setState({ pozAppleX: x });

    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    this.setState({ pozAppleY: y });
    this.setState({ snake: previousSnake => [...previousSnake, [x, y]] });
  }

  /* CheckApple() {
    if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
      this.newApple();
      setCounterApple(prevousCounterApple => {
        return prevousCounterApple + 1;
      });
    }
  } */

  moveSnake = () => {
    let snakeCopy = this.state.snake;
    let headSnake = this.state.snake[snakeCopy.length - 1];
    console.log("headSnake <-", headSnake);
    // console.log("snakeCopy.length", snakeCopy.length);
    // console.log("headSnake", headSnake);
    // eslint-disable-next-line default-case
    switch (this.state.direction) {
      case "RIGHT":
        headSnake = [headSnake[0] + sizeUnit, headSnake[1]];
        console.log("right");
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
    console.log("headSnake ->", headSnake);
    snakeCopy.push(headSnake);
    snakeCopy.shift();
    this.setState({ snake: snakeCopy });
    console.log("snakeCopy", snakeCopy);
    console.log("snake <-", this.state.snake);
    console.log("snake ->", this.state.snake);
  };

  directionSnake({ key }) {
    // for (let i = 0; i < counterApple.length; i++) {
    //   snake[i] = snake[i - 1];
    // }
    // console.log(key);

    // eslint-disable-next-line default-case
    switch (key) {
      case "ArrowDown":
        // setSnakePositionHead(snakeDown);
        this.setState({ direction: "DOWN" });

        break;
      case "ArrowUp":
        // setSnakePositionHead(snakeUp);
        this.setState({ direction: "UP" });

        break;
      case "ArrowRight":
        // setSnakePositionHead(snakeRight);
        this.setState({ direction: "RIGHT" });

        break;
      case "ArrowLeft":
        // setSnakePositionHead(snakeLeft);
        this.setState({ direction: "LEFT" });
    }
  }

  returnSnake = () => {
    return this.state.snake.map((segment, index) => {
      console.log("segment[0]", segment[0]);
      console.log("segment[1]", segment[1]);
      // snake[0] = img_snakeRight
      return (
        <div
          className="segment"
          key={index}
          style={{
            position: "absolute",
            left: `${segment[0]}px`,
            top: `${segment[1]}px`
          }}
        >
          {/* {segment} */}
        </div>
      );
    });
  };

  returnApple = () => {
    return (
      <div style={{ display: "flex", position: "absolute" }} className="apple">
        <img width={"20px"} height={"20px"} src={apple} />
      </div>
    );
  };

  render() {
    return (
      <Wrapper
        style={{ display: "flex", position: "relative" }}
        // pozSnakeX={pozSnakeX}
        // pozSnakeY={pozSnakeY}
        pozAppleX={this.state.pozAppleX}
        pozAppleY={this.state.pozAppleY}
        sizeUnit={sizeUnit}
      >
        {this.returnSnake()}
        {this.returnApple()}
      </Wrapper>
    );
  }
}
export default _Snake2;

const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  background: rgb(125, 165, 165);

  .snake {
    // width: ${({ sizeUnit }) => sizeUnit}px;
    // height: ${({ sizeUnit }) => sizeUnit}px;
    // z-index: 1;
    // background: green;
  }
  
  .segment {
    width: 20px;
    height: 20px;
    background: green;
  }

  .apple {
    left: ${({ pozAppleX }) => pozAppleX}px;
    top: ${({ pozAppleY }) => pozAppleY}px;
    z-index: 0;

    //background: green;
  }
`;
