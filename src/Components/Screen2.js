import React, { useEffect, useState } from "react";
import styled from "styled-components";

import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";
import { Snake } from "./Snake";
import { setPhoto } from "./UTILS";

const Screen2 = () => {
  let WIDTH_SCREEN = 30;
  let [SIZE_UNIT, set_SIZE_UNIT] = useState(20);
  let ROWS = 30;
  let COLLUMNS = 30;
  let [counterApple, setCounterApple] = useState(0);

  let img_snakeDown = setPhoto(snakeDown, WIDTH_SCREEN);
  let img_snakeUp = setPhoto(snakeUp, WIDTH_SCREEN);
  let img_snakeLeft = setPhoto(snakeLeft, WIDTH_SCREEN);
  let img_snakeRight = setPhoto(snakeRight, WIDTH_SCREEN);
  let img_apple = setPhoto(apple, WIDTH_SCREEN);

  const [sizeUnit, setSizeUnit] = useState(20);
  let [pozAppleX, setPozAppleX] = useState(
    Math.floor(Math.random() * sizeUnit)
  );
  let [pozAppleY, setPozAppleY] = useState(
    Math.floor(Math.random() * sizeUnit)
  );
  let [pozSnakeX, setPozSnakeX] = useState(0);
  let [pozSnakeY, setPozSnakeY] = useState(0);
  const [snakePozitionHead, setSnakePositionHead] = useState(img_snakeDown);
  let right = false;
  let left = false;
  let up = false;
  let down = false;

  const keyboard = document.querySelector("body");

  let board = Array(ROWS).fill().map((row, index) =>
    new Array(COLLUMNS).fill(
      <div key={index} className="rows">
        0
      </div>
    )
  );

  board[pozSnakeX][pozSnakeY] = snakePozitionHead;
  board[pozAppleX][pozAppleY] = img_apple;

  let initialArray = Array.from(
    { length: WIDTH_SCREEN },
    (element, index, array) =>
      Array.from(
        { length: WIDTH_SCREEN },
        (secDimElement, secDimIndex, secDimArray) => ({
          x: index,
          y: secDimIndex
        })
      )
  );

  // initialArray[pozSnakeX][pozSnakeY] = snakePozitionHead;

  useEffect(
    () => {
      console.log(pozAppleX);
      console.log(pozAppleY);
      console.log("render");

      // console.log("add event listener");
      keyboard.addEventListener("keydown", directionSnake);

      // console.log("counterApple ", counterApple);
      // Check()
      return () => {
        // console.log("remove event listener");
        keyboard.removeEventListener("keydown", directionSnake);
        //clearInterval(interval);
      };
    },
    [pozAppleY]
  );

  const newApple = (setPozX, setPozY) => {
    setPozX((Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit);
    setPozY((Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit);
  };

  /*   let interval = setInterval(() => {
    if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
      newApple(setPozAppleX, setPozAppleY);
      setCounterApple(counterApple + 1);
    }
  }, 1000); */

  function directionSnake({ key }) {
    // interval = setInterval(() => {
    console.log(key);

    switch (key) {
      case "ArrowDown":
        down = true;
        up = false;
        left = false;
        right = false;
        setPozSnakeX(pozSnakeX => pozSnakeX + 1);
        // pozSnakeY += 1;
        setSnakePositionHead(img_snakeDown);
        console.log("pozSnakeY => ", pozSnakeY);
        break;
      case "ArrowUp":
        up = true;
        down = false;
        left = false;
        right = false;
        setPozSnakeX(pozSnakeX => pozSnakeX - 1);
        setSnakePositionHead(img_snakeUp);
        // pozSnakeY -= 1;
        break;
      case "ArrowRight":
        right = true;
        up = false;
        down = false;
        left = false;
        setPozSnakeY(pozSnakeY => pozSnakeY + 1);
        setSnakePositionHead(img_snakeRight);
        // pozSnakeX += 1;
        break;
      case "ArrowLeft":
        left = true;
        right = false;
        up = false;
        down = false;
        setPozSnakeY(pozSnakeY => pozSnakeY - 1);
        setSnakePositionHead(img_snakeLeft);
        // pozSnakeX -= 1;
        break;
      default:
        console.log("Error");
    }
    // }, 1000);
  }

  const getHTML = () => {
   return initialArray.map((item, index) => {
      // console.log(item);
      return (
        <div key={index} className="cells">
          {item.map((x,y)=>(<span key={x,y} className="cell">{}</span>))}
        </div>
      );
    });
  };
  return (
    <Wrapper SIZE_UNIT={SIZE_UNIT} style={{ display: "flex" }}>
      {console.log("pozSnakeX", pozSnakeX)}
      {console.log("pozSnakeY", pozSnakeY)}
      {/* {board && board} */}
      {/* {console.log(board)} */}
      {/* {initialArray && initialArray} */}
      {console.log(initialArray)}
      {getHTML()}
    </Wrapper>
  );
};

export default Screen2;

const Wrapper = styled.div`
  // display: block;
  background: aqua;
  width: 600px;
  height: 600px;
  flex-wrap: wrap;

  .test {
    width: 20px;
    height: 20px;
  }

  .cell {
    // position: relative;
    display: flex;
    flex-direction: reverse-column;
    justify-content: center;
    align-items: center;
    width: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    height: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    background: skyblue;
  }

  .rows {
    // position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    height: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    // background: red;
  }

  .img {
    display: 'flex';
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: solmon;
  }
`;

/*   const uniqueKey = () => {
    let index = 0;
    for (let i = 0; i < WIDTH_SCREEN + 1; i++) {
      index = i;
    }
    console.log(index);
    return index;
  }; */
