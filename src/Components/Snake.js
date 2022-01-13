import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import snakeTail from "../icon/tail.png";
import apple from "../icon/apple.png";
import btn_play from "../icon/play-ico.svg";
import btn_pause_stop from "../icon/pause-stop-ico.svg";
import btn_restart from "../icon/restart-ico.svg";
import Level from "./Level";
import Title from "./Title";
import Score from "./Score";

const keyboard = document.querySelector("body");

const sizeUnit = 20;
class _Snake2 extends React.Component {
  constructor(props) {
    super(props);

    this.initialHead_img = snakeRight;
    this.state = {
      RECTANGULAR_SCREEN: localStorage.getItem("size") || 400,
      btn_StartGame: false,
      btn_StopGame: true,
      toggleBtn: false,
      interval: null,
      GAME_OVER: false,
      direction: "RIGHT",
      score: 0,
      snake: [[0, 0] /* , [20, 0], [40, 0] */],
      apple: this.newApple(),
      counterApple: 0
    };

    this.directionSnake = this.directionSnake.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.GAMEOVER = this.GAMEOVER.bind(this);
  }

  componentDidMount() {
    keyboard.addEventListener("keydown", this.directionSnake);
  }

  componentDidUpdate() {
    this.CheckApple();
    this.CheckColision();
    this.CheckCollapsed();
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    keyboard.removeEventListener("keydown", this.directionSnake);
  }

  handleChange = e => {
    // this.setState({ [e.target.name]: e.target.value });
    let response = window.confirm(
      "this action restarts the game from the beginning"
    );
    if (response) {
      this.restartGame(e);
    } else this.setState({ RECTANGULAR_SCREEN: e.target.value });
    localStorage.setItem("size", e.target.value);
  };

  restartGame = e => {
    this.setState({
      RECTANGULAR_SCREEN: e.target.value || localStorage.getItem("size") || 400,
      btn_StartGame: false,
      btn_StopGame: true,
      toggleBtn: false,
      interval: null,
      GAME_OVER: false,
      direction: "RIGHT",
      score: 0,
      snake: [[0, 0] /* , [20, 0], [40, 0] */],
      apple: this.newApple(),
      counterApple: 0
    });

    this.initialHead_img = snakeRight;
  };

  newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;

    if (x === 0 && y === 0) this.newApple();

    return [x, y];
  }

  CheckApple() {
    let headSnake = this.state.snake[this.state.snake.length - 1];

    if (
      // eslint-disable-next-line eqeqeq
      headSnake[0] == this.state.apple[0] &&
      // eslint-disable-next-line eqeqeq
      headSnake[1] == this.state.apple[1]
    ) {
      this.setState({
        snake: [...this.state.snake, [this.state.apple[0], this.state.apple[1]]]
      });
      this.setState({ apple: this.newApple() });
      this.setState({ counterApple: this.state.counterApple + 1 });
      this.setState({ score: this.state.score + 20 });
    }
  }

  CheckColision() {
    let { RECTANGULAR_SCREEN } = this.state;
    let snakeCopy = [...this.state.snake];
    let headSnake = snakeCopy[snakeCopy.length - 1];

    // eslint-disable-next-line eqeqeq
    if (headSnake[0] == RECTANGULAR_SCREEN) {
      snakeCopy.pop();
      headSnake = [0, headSnake[1]];
      snakeCopy.push(headSnake);
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[0] < 0) {
      snakeCopy.pop();
      headSnake = [RECTANGULAR_SCREEN - sizeUnit, headSnake[1]];
      snakeCopy.push(headSnake);
      this.setState({ snake: snakeCopy });
    }

    // eslint-disable-next-line eqeqeq
    if (headSnake[1] == RECTANGULAR_SCREEN) {
      snakeCopy.pop();
      headSnake = [headSnake[0], 0];
      snakeCopy.push(headSnake);
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[1] < 0) {
      snakeCopy.pop();
      headSnake = [headSnake[0], RECTANGULAR_SCREEN - sizeUnit];
      snakeCopy.push(headSnake);
      this.setState({ snake: snakeCopy });
    }
  }

  CheckCollapsed() {
    let snakeCopy = [...this.state.snake];
    let headSnake = this.state.snake[snakeCopy.length - 1];

    // snakeCopy.forEach(element => {
    // console.log("element", element);
    // snakeCopy.pop();
    // eslint-disable-next-line eqeqeq
    //   if (headSnake[0] == element[0] && headSnake[1] == element[1])
    //     this.GAMEOVER();
    // });

    /*     let headX = headSnake[0];
    let headY = headSnake[1];
    for (let i = 2; i < snakeCopy.length; i++) {
      let currentX = snakeCopy[i][0];
      let currentY = snakeCopy[i][1];
      console.log(snakeCopy);
      console.log(snakeCopy[i][0]);
      console.log(snakeCopy[i][1]);
      if (headX === currentX && headY === currentY) {
        this.GAMEOVER();
      }
    } */

    for (let i = snakeCopy.length - 1; i > 1; i--) {
      if (
        headSnake[0] === snakeCopy[i - 2][0] &&
        headSnake[1] === snakeCopy[i - 2][1]
      ) {
        this.GAMEOVER();
      }
    }
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
        break;
      case " ":
        console.log("space");
        this.setState({ btn_StopGame: true });
        break;
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
      <img
        className="apple"
        style={{
          position: "absolute",
          left: `${this.state.apple[0]}px`,
          top: `${this.state.apple[1]}px`
        }}
        width={sizeUnit}
        height={sizeUnit}
        src={apple}
        alt="apple"
      />
    );
  };

  Start_Game = () => {
    return (
      <div>
        {this.returnSnake()}
        {this.returnApple()}
        {this.state.GAME_OVER ? clearInterval(this.state.interval) : null}
      </div>
    );
  };

  GAMEOVER = () => {
    this.state.GAME_OVER = true;
    return <div className="game-over">Game Over</div>;
  };

  render() {
    const { RECTANGULAR_SCREEN } = this.state;
    // this.setResolution(RECTANGULAR_SCREEN);
    return (
      <Wrapper style={{ position: "relative" }} sizeUnit={sizeUnit}>
        <div className="navbar">
          <Level level={1} />
          <Title title={"Snake"} />
          <Score score={this.state.score} />
        </div>
        <Board RECTANGULAR_SCREEN={RECTANGULAR_SCREEN}>
          {this.state.GAME_OVER ? this.GAMEOVER() : null}
          {this.state.btn_StartGame ? this.Start_Game() : null}
        </Board>

        <Footer RECTANGULAR_SCREEN={RECTANGULAR_SCREEN}>
          {!this.state.GAME_OVER
            ? <div className="wrapper-btn">
                <button
                  className="btn_startGame"
                  disabled={this.state.toggleBtn}
                  onClick={() => {
                    this.setState({ btn_StartGame: true });
                    this.setState({ toggleBtn: !this.state.toggleBtn });
                    this.setState({
                      interval: setInterval(this.moveSnake, 1000)
                    });
                  }}
                >
                  <img
                    width={"40px"}
                    height={"40px"}
                    src={btn_play}
                    alt="btn_play"
                  />
                </button>

                <button
                  className="btn_stopGame"
                  disabled={!this.state.toggleBtn}
                  onClick={() => {
                    this.setState({ btn_StopGame: false });
                    this.setState({ toggleBtn: !this.state.toggleBtn });
                    this.setState({
                      interval: clearInterval(this.state.interval)
                    });
                  }}
                >
                  <img
                    width={"40px"}
                    height={"40px"}
                    src={btn_pause_stop}
                    alt="btn_pause_stop"
                  />
                </button>

                <div className="wrapper-resolution">
                  {/* <span>Resolution</span> */}
                  <select
                    className="resolution"
                    value={this.state.RECTANGULAR_SCREEN}
                    disabled={this.state.toggleBtn}
                    name="RECTANGULAR_SCREEN"
                    onChange={this.handleChange}
                  >
                    <option value={400}>400 x 400</option>
                    <option value={600}>600 x 600</option>
                    <option value={800}>800 x 800</option>
                  </select>
                </div>
              </div>
            : <div className="wrapper-btn">
                <button
                  className="btn_restartGame"
                  onClick={e => {
                    this.setState({ GAME_OVER: false });
                    this.restartGame(e);
                    console.log("this.state", this.state);
                  }}
                >
                  <img
                    width={"40px"}
                    height={"40px"}
                    src={btn_restart}
                    alt="btn_restart"
                  />
                </button>
              </div>}
        </Footer>
      </Wrapper>
    );
  }
}

export default _Snake2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .segment {
    width: 20px;
    height: 20px;
  }

  .apple {
    z-index: 0;
  }

  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 400px;
    height: auto;
  }

  .game-over {
    font-weight: bolder;
    font-size: 50px;
    color: red;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 25px 0px;
  width: ${({ RECTANGULAR_SCREEN }) => RECTANGULAR_SCREEN}px;

  .wrapper-resolution {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    // background: salmon;

    span {
      font-size: 20px;
    }
  }

  .resolution {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 20px;
    border-radius: 5px;
    // outline: none;
    // background: salmon;
  }

  .wrapper-btn {
    display: contents;
  }

  .btn_startGame,
  .btn_stopGame,
  .btn_restartGame {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
  }
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ RECTANGULAR_SCREEN }) => RECTANGULAR_SCREEN}px;
  height: ${({ RECTANGULAR_SCREEN }) => RECTANGULAR_SCREEN}px;
  box-shadow: 20px 0px 50px 2px rgba(0, 0, 0, 0.363);
  // background: black;
  background: rgba(22, 51, 63, 0.89);
`;
