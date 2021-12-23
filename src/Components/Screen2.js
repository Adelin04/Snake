import React, { useEffect, useState } from "react";
import styled from "styled-components";

import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";
import { Snake } from "./Snake";


const Screen2 = () => {
  let WIDTH_SCREEN = 30;
  let [SIZE_UNIT, set_SIZE_UNIT] = useState(20);
  let ROWS = 30;
  let COLLUMNS = 30;
  let [counterApple, setCounterApple] = useState(0);

  let [pozAppleX, setPozAppleX] = useState(0);
  let [pozAppleY, setPozAppleY] = useState(0);
  let [pozSnakeX, setPozSnakeX] = useState(2);
  let [pozSnakeY, setPozSnakeY] = useState(0);
  const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
  let board = Array(ROWS).fill().map(row => new Array(COLLUMNS).fill(<div className="rows">0</div>));
  let right = false;
  let left = false;
  let up = false;
  let down = false;

  const keyboard = document.querySelector("body");
/*   const uniqueKey = () => {
    let index = 0;
    for (let i = 0; i < WIDTH_SCREEN + 1; i++) {
      index = i;
    }
    console.log(index);
    return index;
  }; */

  board[0][1] = <img className="img" src={snakePozitionHead} key={()=>{WIDTH_SCREEN.map(e=>{return e})}} width="20px"/* {`${20}px`} */ height="20px" /* {`${20}px`} */  alt={'cell'}/>;

  useEffect(() => {
    console.log("render");
    if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
      newApple(setPozAppleX, setPozAppleY);
      setCounterApple(counterApple + 1);
    }
    // console.log("add event listener");
    keyboard.addEventListener("keydown", directionSnake);
    
    console.log("counterApple ", counterApple);
    // Check()
    return () => {
      // console.log("remove event listener");
      keyboard.removeEventListener("keydown", directionSnake);
      //clearInterval(interval);
    };
  }, []);
  
    const newApple = (setPozX, setPozY) => {
    setPozX((Math.floor(Math.random() * SIZE_UNIT - 1) + 1) * SIZE_UNIT);
    setPozY((Math.floor(Math.random() * SIZE_UNIT - 1) + 1) * SIZE_UNIT);
  };

  function Check() {

    if(left) {
      board[0][1] -= board[0][1 - 1];
    }
    if (right) {
      board[0][1]+= SIZE_UNIT;
    }
/*     if (up) {
      pozSnake_Y -= sizeUnit;
      setPozSnakeY(pozSnake_Y);
    }
    if (down) {
      pozSnake_Y += sizeUnit;
      setPozSnakeY(pozSnake_Y);
    } */
    // console.log("pozSnakeX " + pozSnake_X, " - ", "pozSnakeY " + pozSnake_Y);
  }


  const directionSnake = ({ key }) => {
    console.log(key);
    // interval = setInterval(() => {
      
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
          board[0][1] = board[0][1 - 1];
          setSnakePositionHead(snakeLeft);
          break;
        default:
          console.log("Error");
      }
    // }, 1000);
  };


  return (
    <Wrapper
    SIZE_UNIT={SIZE_UNIT}
    style={{ display: "flex" /* ,flexDirection:'column' */ }}
    >
        {board}
        {console.log(board)}
     
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

.test{
  width:20px;
  height:20px;
}

  .cell {
    // position: relative;
    display: flex;
    flex-direction: column;
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
  
  .img{
    display:'flex';
    flex-direction:column;
    justify-content: center;
    align-items: center;
    background: solmon;
  }
  `;
  