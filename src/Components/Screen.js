import React, { useEffect, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";

const keyboard = document.querySelector("body");

const Screen = () => {
  const [sizeUnit, setSizeUnit] = useState(20);
  let [counterApple, setCounterApple] = useState(0);
  const [pozAppleX, setPozAppleX] = useState(0);
  const [pozAppleY, setPozAppleY] = useState(0);
  const [pozSnakeX, setPozSnakeX] = useState(0);
  const [pozSnakeY, setPozSnakeY] = useState(0);
  const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
  let right = false;
  let left = false;
  let up = false;
  let down = false;
  let running = 0;

  let interval = setInterval(Timer, 1000);

  useEffect(() => {
    if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
      newApple(setPozAppleX, setPozAppleY);
      setCounterApple(counterApple + 1);
    }
    // console.log("add event listener");
    keyboard.addEventListener("keydown", directionSnake);

    console.log("counterApple ", counterApple);
    console.log("X" + pozSnakeX, " - ", "Y" + pozSnakeY);
    console.log("pozAppleX" + pozAppleX, " - ", "pozAppleY" + pozAppleY);
    return () => {
      // console.log("remove event listener");
      keyboard.removeEventListener("keydown", directionSnake);
      //  clearInterval(interval);
    };
  }, [/* pozSnakeX, pozSnakeY */]);

  function Timer() {
    // running += 20;
    // console.log(running);
    
    // setCounterApple(counterApple + 1);
    
    // setPozSnakeX(running);
    
    // if (right) setPozSnakeX(pozSnakeX + sizeUnit);
    // if (left) setPozSnakeX(pozSnakeX - sizeUnit);
    // if (up) setPozSnakeY(pozSnakeY - sizeUnit);
    // if (down) setPozSnakeY(pozSnakeY + sizeUnit);
    // setPozSnakeX(pozSnakeX * 1 + sizeUnit);
    // setPozSnakeY(pozSnakeY * 1 + sizeUnit);
  }
  
  const directionSnake = ({ key }) => {
    
    switch (key) {
      case "ArrowDown":
        down = true;
        up = false;
        left = false;
        right = false;
        //  setPozSnakeY(pozSnakeY + running);
        setSnakePositionHead(snakeDown);
        break;
      case "ArrowUp":
        up = true;
        down = false;
        left = false;
        right = false;
        // setPozSnakeY(pozSnakeY - running);
        setSnakePositionHead(snakeUp);
        break;
      case "ArrowRight":
        right = true;
        up = false;
        down = false;
        left = false;
        // setPozSnakeX(pozSnakeX + running);
        setSnakePositionHead(snakeRight);
        break;
      case "ArrowLeft":
        left = true;
        right = false;
        up = false;
        down = false;
        // setPozSnakeX(pozSnakeX - running);
        setSnakePositionHead(snakeLeft);
        break;
    }
  };

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
    // background: green;
    transition: all 0.1s ease-out;
  }

  .apple {
    left: ${({ pozAppleX }) => pozAppleX}px;
    top: ${({ pozAppleY }) => pozAppleY}px;
    //background: green;
  }
`;
