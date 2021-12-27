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
  let pozAppleX = 0;
  let pozAppleY = 0;
  // let pozAppleY, setPozAppleY] = useState(0);
  /*  Math.floor(Math.random() * sizeUnit) */
  /*Math.floor(Math.random() * sizeUnit) */
  let [pozSnakeX, setPozSnakeX] = useState(10);
  let [pozSnakeY, setPozSnakeY] = useState(10);
  const [snakePozitionHead, setSnakePositionHead] = useState(img_snakeRight);
  let right = false;
  let left = false;
  let up = false;
  let down = false;

  const keyboard = document.querySelector("body");

  let board = Array(ROWS).fill().map(() => new Array(COLLUMNS).fill());

  // newApple(setPozAppleX,setPozAppleY)
  useEffect(
    () => {
      board[pozAppleX][pozAppleY] = img_apple;

      newApple();
      console.log(pozAppleX, pozAppleY);
      console.log("appleX", pozAppleX);
      console.log("appleY", pozAppleY);
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
    [pozSnakeX, pozSnakeY]
  );

  const newApple = () => {
    let appleX = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    let appleY = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    // let appleX =1;
    // let appleY =2;
    // setPozAppleX( appleX );
    // setPozAppleY(appleY);
    pozAppleX = appleX;
    pozAppleY = appleY;
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

  let ReturnBoard_HTML = (pozSnakeX, pozSnakeY) => {
    return (
      <div className="board">
        {board.map(row => {
          return row.map((cell, i) => {
            return (
              <span key={i} className="row">
                {'-'}
              </span>
            );
          });
        })}
        {console.log("ReturnBoard_HTML ", pozSnakeX)}
        {console.log("ReturnBoard_HTML ", pozSnakeY)}
        {MoveSnake(pozSnakeX, pozSnakeY)}
      </div>
    );
  };

  const MoveSnake = (pozSnakeX, pozSnakeY) => {
    // return (board[pozSnakeX][pozSnakeY] = snakePozitionHead);
    return (board[pozSnakeX][pozSnakeY] = snakePozitionHead);
  };

  return (
    <Wrapper SIZE_UNIT={SIZE_UNIT} style={{ display: "flex" }}>
      {ReturnBoard_HTML(pozSnakeX, pozSnakeY)}
      {console.log("RETURN")}

      {/* {initialArray && initialArray} */}
      {/* {console.log(initialArray)} */}
      {/* {getHTML()} */}
    </Wrapper>
  );
};

export default Screen2;

const Wrapper = styled.div`
  // display: block;
  background: grey;
  width: 600px;
  height: 600px;
  flex-wrap: wrap;

  .test {
    width: 20px;
    height: 20px;
  }

  .board {
    position:relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: salmon;
  }

  .cell {
    // position: relative;
    display: flex;
    flex-direction: reverse-column;
    justify-content: center;
    align-items: center;
    width: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    height: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    // background: skyblue;
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

  .row {
    // position: absolute;
    display: flex;
    flex-direction: column;
    width: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    height: ${({ SIZE_UNIT }) => SIZE_UNIT}px;
    // background: skyblue;
  }

  .img {
    // position: absolute;
    display: block;
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

//HTML =>
/* {board &&
        board.map(row => {
          return row.map((cell, i) => {
            return (
              <span key={i} className="row">
                0
              </span>
            );
          });
        })} */

// board[pozAppleX][pozAppleY] = img_apple;

/*   let initialArray = Array.from(
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
      
      const getHTML = () => {
        return initialArray.map((item, index) => {
          // console.log(item);
          return (
            <div key={index} className="cells">
            {item.map((x, y) =>
              <span key={(x, y)} className="cell">
              {}
              </span>
              )}
              </div>
              );
            });
          };
          */
// initialArray[pozSnakeX][pozSnakeY] = snakePozitionHead;
