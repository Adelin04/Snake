import React, { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import snakeTail from "../icon/tail.png";
import apple from "../icon/apple.png";
import btn_play from "../icon/play-ico.svg";
import btn_pause_stop from "../icon/pause-stop.svg";
import Level from "./Level";
import Title from "./Title";
import Score from "./Score";
import { SnakeContext } from "./Context/SnakeContext";

const keyboard = document.querySelector("body");

const sizeUnit = 20;
class _Snake2 extends React.Component {
  static contextType = SnakeContext;

  constructor(props) {
    super(props);
    console.log("StartGame", this.props.StartGame);

    this.initialHead_img = snakeRight;
    this.state = {
      RECTANGULAR_SCREEN: 400,
      btn_StartGame: false,
      btn_StopGame: true,
      toggleBtn: false,
      interval: null,
      GAME_OVER: false,
      direction: "RIGHT",
      score: 0,
      snake: [[0, 0], [20, 0], [40, 0]],
      apple: this.newApple(),
      counterApple: 0
    };

    this.directionSnake = this.directionSnake.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.state.RECTANGULAR_SCREEN);
    this.RECTANGULAR_SCREEN = this.context.resolution;

    keyboard.addEventListener("keydown", this.directionSnake);
  }

  componentDidUpdate() {
    this.CheckApple();
    this.CheckColision();
    this.CheckCollapsed();
    // console.log("check", this.state.RECTANGULAR_SCREEN);
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
    } else {
    }
  };

  restartGame = e => {
    this.setState({ RECTANGULAR_SCREEN: e.target.value });
    this.setState({ snake: [[0, 0], [20, 0], [40, 0]] });
    this.setState({ direction: "RIGHT" });
    this.initialHead_img = snakeRight;
  };

  newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;

    if (x === 0 || y === 0) this.newApple();

    return [x, y];
  }

  CheckApple() {
    let headSnake = this.state.snake[this.state.snake.length - 1];

    if (
      headSnake[0] == this.state.apple[0] &&
      headSnake[1] == this.state.apple[1]
    ) {
      this.setState({
        snake: [...this.state.snake, [this.state.apple[0], this.state.apple[1]]]
      });
      this.setState({ apple: this.newApple() });
      this.setState({ counterApple: this.state.counterApple + 1 });
      this.setState({ score: this.state.score + 20 });
      // this.props.thisScore = this.state.counterApple;
    }
  }

  CheckColision() {
    let { RECTANGULAR_SCREEN } = this.state;
    let snakeCopy = [...this.state.snake];
    let headSnake = snakeCopy[snakeCopy.length - 1];

    if (headSnake[0] == RECTANGULAR_SCREEN) {
      snakeCopy.pop();
      headSnake = [0, headSnake[1]];
      snakeCopy.push(headSnake);
      // snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[0] < 0) {
      snakeCopy.pop();
      headSnake = [RECTANGULAR_SCREEN - sizeUnit, headSnake[1]];
      snakeCopy.push(headSnake);
      // snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[1] == RECTANGULAR_SCREEN) {
      snakeCopy.pop();
      headSnake = [headSnake[0], 0];
      snakeCopy.push(headSnake);
      // snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }

    if (headSnake[1] < 0) {
      snakeCopy.pop();
      headSnake = [headSnake[0], RECTANGULAR_SCREEN - sizeUnit];
      snakeCopy.push(headSnake);
      // snakeCopy.shift();
      this.setState({ snake: snakeCopy });
    }
  }

  CheckCollapsed() {
    let snakeCopy = [...this.state.snake];
    let headSnake = snakeCopy[snakeCopy.length - 1];
    snakeCopy.pop();

    snakeCopy.forEach(element => {
      if (headSnake[0] == element[0] && headSnake[1] == element[1])
        // this.GAMEOVER();
        console.log("GAME OVER");
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
      </div>
    );
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
          {this.state.btn_StartGame ? this.Start_Game() : null}
        </Board>

        <div className="footer">
          <button
            className="btn_startGame"
            disabled={this.state.toggleBtn}
            onClick={() => {
              this.setState({ btn_StartGame: true });
              this.setState({ toggleBtn: !this.state.toggleBtn });
              this.setState({ interval: setInterval(this.moveSnake, 100) });
            }}
          >
            <img width={"40px"} height={"40px"} src={btn_play} alt="btn_play" />
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

  .footer {
    display: flex;
    justify-content: space-around;
    margin: 25px auto;
    width: ${({ resolution }) => resolution}px;
    // background: skyblue;
  }

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

  .btn_startGame,
  .btn_stopGame {
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
  background: black;
`;

//************************************************************************//
/* render() {
  return (
    <Wrapper style={{ position: "relative" }} sizeUnit={sizeUnit}>
      <div className="navbar">
        <Level level={1} />
        <Title title={"Snake"} />
        <Score score={this.state.score} />
      </div>
      <Board RECTANGULAR_SCREEN={this.context.resolution}>
        {this.props.StartGame ? this.Start_Game() : null}
      </Board>
                <select
            disabled={StartGame}
            name="resolution"
            className="resolution"
            onChange={e => {
              setResolution(e.target.value);
            }}
          >
            <option value={400}>400 x 400</option>
            <option value={600}>600 x 600</option>
            <option value={800}>800 x 800</option>
          </select>
    </Wrapper>
  );
}
} */

//************************************************************************//
/* render() {
  return (
    <SnakeContext.Consumer>
      {resolution => {
        this.setState({ RECTANGULAR_SCREEN: resolution.resolution });
        return (
          <Wrapper style={{ position: "relative" }} sizeUnit={sizeUnit}>
            <div className="navbar">
              <Level level={1} />
              <Title title={"Snake"} />
              <Score score={this.state.score} />
            </div>
            <Board RECTANGULAR_SCREEN={resolution.resolution}>
              {this.props.StartGame ? this.Start_Game() : null}
            </Board>
          </Wrapper>
        );
      }}
    </SnakeContext.Consumer>
  );
}
} */

//*************************************************************************************//

/* import React, { useEffect, useRef, useState } from "react";
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
      snake: [
        [0, 0],
        [20, 0],
        [40, 0],
      ],
      apple: this.newApple(),
      counterApple: 0,
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
    this.setState({
      snake: [
        [0, 0],
        [20, 0],
        [40, 0],
      ],
    });
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
        snake: [
          ...this.state.snake,
          [this.state.apple[0], this.state.apple[1]],
        ],
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
    snakeCopy.pop();

    snakeCopy.forEach((element) => {
      if (headSnake[0] === element[0] && headSnake[1] === element[1])
        // this.GAMEOVER();
        console.log("GAME OVER");
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
        this.props.StartGame = false
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
        width={"20px"}
        height={"20px"}
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
      </div>
    );
  };

  render() {
    return (
      <Wrapper
        style={{ position: "relative" }}
        pozAppleX={this.state.pozAppleX}
        pozAppleY={this.state.pozAppleY}
        sizeUnit={sizeUnit}
      >
        {this.props.StartGame ? this.Start_Game() : null}

      </Wrapper>
    );
  }
}
export default _Snake2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
  height: 400px;
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
 */
