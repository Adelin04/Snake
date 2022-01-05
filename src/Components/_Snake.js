import React from "react";
import { setPhoto } from "./UTILS";
import styled from "styled-components";

import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import snakeTail from "../icon/tail.png";
import apple from "../icon/apple.png";
import { isElementType } from "@testing-library/user-event/dist/utils";
// const HEIGHT_SCREEN = 400;

const WIDTH_RECTANGULAR_SCREEN = 400;
const keyboard = document.querySelector("body");
const img_snakeDown = setPhoto(snakeDown);
const img_snakeUp = setPhoto(snakeUp, WIDTH_RECTANGULAR_SCREEN);
const img_snakeLeft = setPhoto(snakeLeft, WIDTH_RECTANGULAR_SCREEN);
const img_snakeRight = setPhoto(snakeRight, WIDTH_RECTANGULAR_SCREEN);
const img_snakeTail = setPhoto(snakeTail, WIDTH_RECTANGULAR_SCREEN);

class _Snake extends React.Component {
  constructor(props) {
    super(props);
    this.initialSnakeHead = img_snakeRight;
    this.interval = 0;
    this.dx = 0;
    this.dy = 0;
    this.timer = 0;
    this.SIZE_UNIT = 20;
    this.state = {
      WIDTH_RECTANGULAR: 400,
      ROWS: 20,
      COLLUMNS: 20,
      snake: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
      grid: [],
      startPosition: { x: 0, y: 0 },
      apple: this.newApple(),
      directions: { right: false, left: false, up: false, down: false }
    };
    this.directionSnake = this.directionSnake.bind(this);
    this.initialzedGrid = this.initialzedGrid.bind(this);
    this.newApple = this.newApple.bind(this);
    this.fillGrid = this.fillGrid.bind(this);
  }

  componentDidMount() {
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

  initialzedGrid() {
    let { ROWS, COLLUMNS } = this.state;
    this.state.grid = new Array(ROWS).fill(new Array(COLLUMNS).fill());
  }

  fillGrid() {
    let { ROWS, COLLUMNS } = this.state;
    let TMP_GRID = [];
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLLUMNS; y++) {
        TMP_GRID.push({ x, y });
      }
    }
    // TMP_GRID[0] = this.state.snake;
    this.state.grid = TMP_GRID;
    console.log(this.state.grid);
  }

  initSnake() {
    let newElement = {
      x: this.state.startPosition.x,
      y: this.state.startPosition.y
    };
    for (let i = 0; i < this.state.snake.length; i++) {
      this.setState({
        snake: newElement /*  [...this.state.snake, newElement], */
      });
    }
    console.log("snake", this.state.snake);
    // this.timer = setInterval(this.drawSnake, 100);
  }

  newApple = () => {
    return {
      x: Math.floor(Math.random() * (29 - 0 + 1)) + 0,
      // x: (Math.floor(Math.random() * this.SIZE_UNIT - 1) + 1) * this.SIZE_UNIT,
      y: (Math.floor(Math.random() * this.SIZE_UNIT - 1) + 1) * this.SIZE_UNIT
    };
  };

  returnApple() {
    let { ROWS, COLLUMNS } = this.state;
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLLUMNS; y++) {
        /*   console.log("x", x);
        console.log("this.state.apple.x", this.state.apple.x);
        if (x === this.state.apple.x && y === this.state.apple.y)
          return this.state.apple; */
      }
    }
  }

  directionSnake({ key }) {
    // this.setState({ snake: [...this.state.snake, img_snakeDown] });

    // this.interval = setInterval(() => {
    console.log(key);
    this.dx++;
    switch (key) {
      case "ArrowDown":
        this.initialSnakeHead = img_snakeDown;
        this.state.snake.map((element, index) => {
          element.y = element.y + 1;
        });
        console.log(this.state.snake);
        // this.setState({ directions: { down: true } });
        break;
      case "ArrowUp":
        this.initialSnakeHead = img_snakeUp;

        break;
      case "ArrowRight":
        this.initialSnakeHead = img_snakeRight;

        break;
      case "ArrowLeft":
        this.initialSnakeHead = img_snakeLeft;
        break;
      default:
        console.log("Error");
        break;
    }
    // }, 50);
  }

  returnSnake = () => {
    let TMP_SNAKE = this.state.snake.map((element, index) => {
      return (
        <div key={index} style={{ display: "flex" }}>
          {element.x && element.y !== null
            ? <div>
                {img_snakeTail}
              </div>
            : null}
          {element.x && element.y !== 0
            ? <div>
                {this.initialSnakeHead}
              </div>
            : null}
        </div>
      );
    });

    return TMP_SNAKE;
  };

  render() {
    return (
      <Wrapper>
        {this.initialzedGrid()}
        {this.fillGrid()}
        {this.returnApple()}
        {this.returnSnake()}
      </Wrapper>
    );
  }
}

export default _Snake;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  flex-wrap: wrap;
  background: salmon;
  box-sizing: border-box;
`;

// width: ${({ WIDTH_RECTANGULAR }) => WIDTH_RECTANGULAR}px;
// height: ${({ WIDTH_RECTANGULAR_SCREEN }) => WIDTH_RECTANGULAR_SCREEN}px;

//**********************************************************************

/* import React from "react";
import { setPhoto } from "./UTILS";
import styled from "styled-components";

import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";
// const HEIGHT_SCREEN = 400;

const WIDTH_RECTANGULAR_SCREEN = 400;
const keyboard = document.querySelector("body");
const img_snakeDown = setPhoto(snakeDown);
const img_snakeUp = setPhoto(snakeUp, WIDTH_RECTANGULAR_SCREEN);
const img_snakeLeft = setPhoto(snakeLeft, WIDTH_RECTANGULAR_SCREEN);
const img_snakeRight = setPhoto(snakeRight, WIDTH_RECTANGULAR_SCREEN);

class _Snake extends React.Component {
  constructor(props) {
    super(props);
    this.initialSnakeHead = img_snakeRight;
    this.interval = 0;
    this.dx = 0;
    this.dy = 0;

    this.state = {
      WIDTH_RECTANGULAR: 400,
      SIZE_UNIT: 20,
      ROWS: 20,
      COLLUMNS: 30,
      snake: [this.initialSnakeHead],
      grid: [],
      directions: { right: false, left: false, up: false, down: false },
    };
    this.directionSnake = this.directionSnake.bind(this);
    this.initialzedGrid = this.initialzedGrid.bind(this);
    this.fillGrid = this.fillGrid.bind(this);
  }

  componentDidMount() {
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

  initialzedGrid() {
    let { ROWS, COLLUMNS } = this.state;
    this.state.grid = new Array(ROWS).fill(new Array(COLLUMNS).fill());
  }

  fillGrid() {
    let { ROWS, COLLUMNS } = this.state;
    let TMP_GRID = [];
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLLUMNS; y++) {
        TMP_GRID.push([" "]);
      }
    }
    TMP_GRID[0] = this.state.snake;
    this.state.grid = TMP_GRID;
    console.log(this.state.grid);
  }

  ReturnBoard_HTML = () => {};

  directionSnake({ key }) {
    // this.setState({ snake: [...this.state.snake, img_snakeDown] });
    // let { left, right, up, down } = this.state.directions;
    let down = false;
    let up = false;
    let left = false;
    let right = false;
    // let img_snakeDown = this.state.img_snakeDown;
    // this.interval = setInterval(() => {
      console.log(key);
      this.dx++;
      switch (key) {
        case "ArrowDown":
          this.initialSnakeHead = img_snakeDown;
          this.setState({ snake: [this.initialSnakeHead] });

          down = true;
          up = false;
          left = false;
          right = false;
          // this.setState({ directions: { down: true } });
          break;
        case "ArrowUp":
          this.initialSnakeHead = img_snakeUp;
          this.setState({ snake: [this.initialSnakeHead] });
          up = true;
          down = false;
          left = false;
          right = false;
          break;
        case "ArrowRight":
          this.initialSnakeHead = img_snakeRight;
          this.setState({ snake: [this.initialSnakeHead] });
          this.state.grid[this.dx] = this.state.snake;
          console.log(this.state.grid);
          this.state.grid[0] = " ";

          right = true;
          up = false;
          down = false;
          left = false;
          break;
        case "ArrowLeft":
          this.initialSnakeHead = img_snakeLeft;
          this.setState({ snake: [this.initialSnakeHead] });
          left = true;
          right = false;
          up = false;
          down = false;
          break;
        default:
          console.log("Error");
          break;
      }
    // }, 50);
  }

  setSnake(snake) {
    snake.push(img_snakeDown);
  }

  returnDirection(keyPress) {
    const directions = this.state.directions;
    console.log("directions", directions);
    for (const key in directions) {
      if (Object.hasOwnProperty.call(directions, key)) {
        if (key === keyPress) {
          return key;
        }
      }
    }
  }

  returnSnake() {
    const { snake } = this.state;
    const headSnake = this.state.initialSnakeHead;
    console.log("render snake", headSnake);
    snake.unshift(headSnake);

    return snake.map((element, key) => {
      return (
        <div className="snake" key={key}>
          {element}
        </div>
      );
    });
  }

  render() {
    return (
      <Wrapper>
        {this.initialzedGrid()}
        {this.fillGrid()}

        {this.state.snake.map((e, key) => {
          return (
            <div className="snake" key={key}>
              {e}
            </div>
          );
        })}
      </Wrapper>
    );
  }
}

export default _Snake;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  flex-wrap: wrap;
  background: salmon;

  .snake {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    // left: ${({ dx }) => dx}px
    background: green;
  }

  /*   .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin: auto;
  }

  .snake {
    width: 20px;
    height: 20px;
    margin: 0px;
    // background: green;
  }

  .cells {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: blue;
  }
  .cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // width: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    // height: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    height: 20px;
    width: 20px;
    background: skyblue;
  } 
  `;
  */

/*   {this.state.grid.map(dictionary => {
    console.log(dictionary);
    if (
      dictionary.x === this.state.apple.x &&
      dictionary.y === this.state.apple.y
      ) {
        console.log("da");
        return dictionary.x, " : ", dictionary.y;
      } else {
        console.log("nu");
      }
    })}
    {console.log(this.state.apple)} */

/* returnSnake = () => {
      let i = 0;
      let TMP_SNAKE = this.state.grid.map(cell => {
        if (
          this.state.snake[i].x === cell.x &&
          this.state.snake[i].y === cell.y
        ) {
          return (
            <div
              key={cell.x.toString() + " : " + cell.y.toString()}
              style={{
                display: "flex",
                width: "20px",
                height: "20px",
                background: "black"
              }}
            >
              {img_snakeRight}
            </div>
          );
        }
      });
      i++;
      console.log(i);
      return TMP_SNAKE;
    }; */
