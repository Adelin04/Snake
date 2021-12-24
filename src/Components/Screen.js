"use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";

const keyboard = document.querySelector("body");

const Screen = e => {
  const [sizeUnit, setSizeUnit] = useState(20);
  let [counterApple, setCounterApple] = useState(0);
  let [pozAppleX, setPozAppleX] = useState(0);
  let [pozAppleY, setPozAppleY] = useState(0);
  let [pozSnakeX, setPozSnakeX] = useState(0);
  let [pozSnakeY, setPozSnakeY] = useState(0);

  const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
  let right = false;
  let left = false;
  let up = false;
  let down = false;
  let running = 0;
  let interval = null;
  let changeDirection = false;
  let pozSnake_X = 0;
  let pozSnake_Y = 0;

  useEffect(
    () => {
      console.log("render");
      if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
        newApple(setPozAppleX, setPozAppleY);
        setCounterApple(counterApple + 1);
      }
      // console.log("add event listener");
      keyboard.addEventListener("keydown", directionSnake);

      console.log("counterApple ", counterApple);
      return () => {
        // console.log("remove event listener");
        keyboard.removeEventListener("keydown", directionSnake);
        clearInterval(interval);
      };
    },
    [snakePozitionHead]
  );

  // console.log("X -> " + pozSnakeX, " - ", "Y -> " + pozSnakeY);

  function Check() {
    if (left) {
      pozSnake_X -= sizeUnit;
      setPozSnakeX(pozSnake_X);
    }
    if (right) {
      pozSnake_X += sizeUnit;
      setPozSnakeX(pozSnake_X);
    }
    if (up) {
      pozSnake_Y -= sizeUnit;
      setPozSnakeY(pozSnake_Y);
    }
    if (down) {
      pozSnake_Y += sizeUnit;
      setPozSnakeY(pozSnake_Y);
    }
    console.log("pozSnakeX " + pozSnake_X, " - ", "pozSnakeY " + pozSnake_Y);
  }

  const directionSnake = ({ key }) => {
    console.log(key);
    interval = setInterval(() => {
      running += 20;
      console.log(running);
      switch (key) {
        case "ArrowDown":
          down = true;
          up = false;
          left = false;
          right = false;

          // pozSnakeX += running;
          // setPozSnakeY(pozSnakeY + running);

          // setPozSnakeY(pozSnakeY + sizeUnit);
          setSnakePositionHead(snakeDown);
          break;
        case "ArrowUp":
          up = true;
          down = false;
          left = false;
          right = false;

          // pozSnakeY -= running;
          // setPozSnakeY(pozSnakeY - running);

          // setPozSnakeY(pozSnakeY - sizeUnit);
          setSnakePositionHead(snakeUp);
          break;
        case "ArrowRight":
          right = true;
          up = false;
          down = false;
          left = false;
          // pozSnakeX += running;
          // setPozSnakeX(pozSnakeX + running);

          // setPozSnakeX(pozSnakeX + sizeUnit);
          setSnakePositionHead(snakeRight);
          break;
        case "ArrowLeft":
          left = true;
          right = false;
          up = false;
          down = false;
          // pozSnakeX -= running;
          // setPozSnakeX(pozSnakeX - running);

          setSnakePositionHead(snakeLeft);
          break;
        default:
          console.log("Error");
      }
      Check();
    }, 1000);
  };

  /*     function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.

    useEffect(
      () => {
        savedCallback.current = callback;
      },
      [callback]
    );

    // Set up the interval.

    useEffect(
      () => {
        function tick() {
          savedCallback.current();
        }

        if (delay !== null) {
          let id = setInterval(tick, delay);

          return () => clearInterval(id);
        }
      },
      [delay]
    );
  }
  useInterval(directionSnake, 1000); */
  const newApple = (setPozX, setPozY) => {
    setPozX((Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit);
    setPozY((Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit);
  };

  return (
    <Wrapper
      style={{ display: "flex", position: "relative" }}
      pozSnakeX={pozSnakeX}
      pozSnakeY={pozSnakeY}
      pozAppleX={pozAppleX}
      pozAppleY={pozAppleY}
      sizeUnit={sizeUnit}
    >
      <div style={{ display: "flex", position: "absolute" }} className="apple">
        <img width={"20px"} height={"20px"} src={apple} />
      </div>

      <div
        className="snake-head"
        style={{ display: "flex", position: "absolute" }}
      >
        <img width={"20px"} height={"20px"} src={snakePozitionHead} />
      </div>
    </Wrapper>
  );
};
export default Screen;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background: rgb(125, 165, 165);

  .snake-head {
    /* width: ${({ sizeUnit }) => sizeUnit}px;
    height: ${({ sizeUnit }) => sizeUnit}px; */

    left: ${({ pozSnakeX }) => pozSnakeX}px;
    top: ${({ pozSnakeY }) => pozSnakeY}px;
    transition: all 0.1s ease-out;

    // background: green;
  }

  .apple {
    left: ${({ pozAppleX }) => pozAppleX}px;
    top: ${({ pozAppleY }) => pozAppleY}px;

    //background: green;
  }
`;
