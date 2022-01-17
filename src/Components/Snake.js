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
import directionIco from "../icon/direction-ico.png";
import enterIco from "../icon/enter-ico.png";
import spaceIco from "../icon/space-ico.png";
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
      disabledBtn: false,
      interval: null,
      GAME_OVER: false,
      direction: "RIGHT",
      speed: 100,
      locationChangeDirection: [],
      score: 0,
      snake: [[0, 0] /* , [20, 0], [40, 0] */],
      apple: this.newApple(),
      counterApple: 0,
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
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    keyboard.removeEventListener("keydown", this.directionSnake);
  }

  handleChange = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    let response = window.confirm(
      "This action will restart the game"
    );
    if (response) {
      this.restartGame(e);
    } else this.setState({ RECTANGULAR_SCREEN: e.target.value });
    localStorage.setItem("size", e.target.value);
  };

  newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;

    if (x === 0 && y === 0) this.newApple();

    return [x, y];
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

    for (let i = 1; i < snakeCopy.length; i++) {
      if (
        headSnake[0] === snakeCopy[i - 1][0] &&
        headSnake[1] === snakeCopy[i - 1][1]
      ) {
        this.GAMEOVER();
      }
    }

    snakeCopy.push(headSnake);
    snakeCopy.shift();
    this.setState({ snake: snakeCopy });
  };

  directionSnake({ key }) {
    let snakeCopy = this.state.snake;
    let headSnake = this.state.snake[snakeCopy.length - 1];
    this.setState({ locationChangeDirection: headSnake });

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
        this.setState({ btn_StopGame: false });
        this.setState({ disabledBtn: false });
        this.setState({
          interval: clearInterval(this.state.interval),
        });
        break;
      case "Enter":
        this.copySpeed = this.state.speed;
        this.setState({
          interval: clearInterval(this.state.interval),
        });
        this.setState({ speed: this.copySpeed });
        this.setState({
          interval: setInterval(this.moveSnake, this.state.speed),
        });
        this.setState({ btn_StartGame: true });
        this.setState({ disabledBtn: true });
        break;
    }
  }

  CheckApple() {
    let newSnake = [...this.state.snake];
    let headSnake = newSnake[newSnake.length - 1];
    if (
      headSnake[0] === this.state.apple[0] &&
      headSnake[1] === this.state.apple[1]
    ) {
      newSnake.unshift([]);
      this.setState({ snake: newSnake });
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

  Start_Game = () => {
    return (
      <div>
        {this.state.GAME_OVER ? clearInterval(this.state.interval) : null}
        {this.returnSnake()}
        {this.returnApple()}
      </div>
    );
  };

  GAMEOVER = () => {
    this.state.GAME_OVER = true;
    return <div className="game-over">Game Over</div>;
  };

  restartGame = (e) => {
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
      counterApple: 0,
    });

    this.initialHead_img = snakeRight;
    this.initialTail_img = snakeTail;
  };

  returnSnake = () => {
    let headSnake = this.state.snake[this.state.snake.length - 1];
    let snakeCopy = [...this.state.snake];

    return this.state.snake.map((segment, index) => {
      if (headSnake === segment) {
        return (
          <img
            className="segment"
            key={index}
            style={{
              position: "absolute",
              left: `${segment[0]}px`,
              top: `${segment[1]}px`,
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
              top: `${segment[1]}px`,
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
          top: `${this.state.apple[1]}px`,
        }}
        width={sizeUnit}
        height={sizeUnit}
        src={apple}
        alt="apple"
      />
    );
  };

  render() {
    const { RECTANGULAR_SCREEN } = this.state;

    return (
      <Wrapper style={{ position: "relative" }} sizeUnit={sizeUnit}>
        {/* <div className="navbar"> */}
        <NavBar RECTANGULAR_SCREEN={RECTANGULAR_SCREEN}>
          <Level level={1} />
          <Title title={"Snake"} />
          <Score score={this.state.score} />
        </NavBar>
        {/* </div> */}

        <div className="wrapper-board">
          <Board RECTANGULAR_SCREEN={RECTANGULAR_SCREEN}>
            {this.state.GAME_OVER ? this.GAMEOVER() : null}
            {this.state.btn_StartGame ? this.Start_Game() : null}
          </Board>

          <div className="keys">
            <img width={"100px"} src={directionIco} alt="direction-ico" />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "5px",
                margin: "10px 0px",
                width: "auto",
              }}
            >
              <img
                style={{ width: "40px", margin: "5px" }}
                src={spaceIco}
                alt="space-ico"
              />
              <img
                style={{ width: "40px", margin: "5px" }}
                src={enterIco}
                alt="enter-ico"
              />
            </div>
          </div>
        </div>

        <Footer RECTANGULAR_SCREEN={RECTANGULAR_SCREEN}>
          {!this.state.GAME_OVER ? (
            <div className="wrapper-btn">
              <button
                className="btn_startGame"
                disabled={this.state.disabledBtn}
                onClick={() => {
                  this.setState({ btn_StartGame: true });
                  this.setState({ disabledBtn: !this.state.disabledBtn });
                  this.setState({
                    interval: setInterval(this.moveSnake, 100),
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
                disabled={!this.state.disabledBtn}
                onClick={(e) => {
                  this.setState({ btn_StopGame: false });
                  this.setState({ disabledBtn: !this.state.disabledBtn });
                  this.setState({
                    interval: clearInterval(this.state.interval),
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
                  disabled={this.state.disabledBtn}
                  name="RECTANGULAR_SCREEN"
                  onChange={this.handleChange}
                >
                  <option value={400}>400 x 400</option>
                  <option value={600}>600 x 600</option>
                  <option value={800}>800 x 800</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="wrapper-btn">
              <button
                className="btn_restartGame"
                onClick={(e) => {
                  this.setState({ GAME_OVER: false });
                  this.restartGame(e);
                }}
              >
                <img
                  width={"40px"}
                  height={"40px"}
                  src={btn_restart}
                  alt="btn_restart"
                />
              </button>
            </div>
          )}
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

  .wrapper-board {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    // background: aqua;
  }

  .keys {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: auto;
    margin: auto;
    // background: black;
  }

  .wrapper-left-down-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
const NavBar = Footer;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ RECTANGULAR_SCREEN }) => RECTANGULAR_SCREEN}px;
  height: ${({ RECTANGULAR_SCREEN }) => RECTANGULAR_SCREEN}px;
  box-shadow: 5px 0px 50px 10px rgba(0, 0, 0, 0.363);
  // background: black;
  background: rgba(22, 51, 63, 0.89);
`;
