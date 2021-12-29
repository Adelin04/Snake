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
  let img_snakeRight = (
    <img
      className="img"
      src={snakeRight}
      width="20px"
      height="20px"
      alt={"cell"}
    />
  ); //setPhoto(snakeRight, WIDTH_SCREEN);
  let img_apple = setPhoto(apple, WIDTH_SCREEN);

  const [sizeUnit, setSizeUnit] = useState(20);
  let pozAppleX = 0;
  let pozAppleY = 0;
  // let pozAppleY, setPozAppleY] = useState(0);
  /*  Math.floor(Math.random() * sizeUnit) */
  /*Math.floor(Math.random() * sizeUnit) */
  let [pozSnakeX, setPozSnakeX] = useState(1);
  let [pozSnakeY, setPozSnakeY] = useState(10);
  let [snakePozitionHead, setSnakePositionHead] = useState(img_snakeRight);
  let [grid, setGrid] = useState([]);
  let arr = [];

  let right = false;
  let left = false;
  let up = false;
  let down = false;

  const keyboard = document.querySelector("body");

  let board = Array(ROWS).fill().map(() => new Array(COLLUMNS).fill());
  // const board = [...new Array(COLLUMNS).keys()]

  // newApple(setPozAppleX,setPozAppleY)
  useEffect(() => {
    makeGrid();

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
  }, []);

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
        {/* {board.map(y =>
          <div key={y}>
            {board.map(x =>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                key={x}
                className="grid"
              />
            )}
          </div>
        )} */}

        {console.log("ReturnBoard_HTML ", pozSnakeX)}
        {console.log("ReturnBoard_HTML ", pozSnakeY)}
        {MoveSnake(pozSnakeX, pozSnakeY)}
      </div>
    );
  };

  const MoveSnake = (pozSnakeX, pozSnakeY) => {
    board[pozSnakeX][pozSnakeY] = arr;
    arr.push(
      <div className="arr">
        {snakePozitionHead}
      </div>
    );
    console.log(board);
    // console.log(arr);
  };

  function testFunc() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = arr;
      }
    }
    return (
      <div style={{ background: "green" }}>
        {board}
      </div>
    );
  }

  function makeGrid() {
    let TMP_GRID = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        TMP_GRID.push({
          row,
          col
        });
      }
    }
    setGrid(TMP_GRID);
  }

  function returnGrid() {
    const gridItem = grid.map(grid => {
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className="grid-item"
        />
      );
    });

    return (
      <div className="board">
        <div>
          <div className="grid">
            {gridItem}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Wrapper SIZE_UNIT={SIZE_UNIT} style={{ display: "flex" }}>
      {/* {ReturnBoard_HTML(pozSnakeX, pozSnakeY)} */}
      {returnGrid()}
      {console.log("grid", grid)}
      {console.log("RETURN")}
      {/* {testFunc()} */}
      {/* {initialArray && initialArray} */}
      {/* {console.log(initialArray)} */}
      {/* {getHTML()} */}
    </Wrapper>
  );
};

export default Screen2;

const Wrapper = styled.div`
  // width: 100vw;
  // height: 100vh;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  /*   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: grey;
  width: 600px;
  height: 600px;
  flex-wrap: wrap; */

  .arr {
    width: 20px;
    height: 20px;
    background: green;
  }

  .grid {
    outline: 1px solid grey;
    width: 20px;
    height: 20px;
  }

  .board {
    width: 600px;
    height: 600px;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: salmon;
  }
  /*   .board {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    // background: salmon;
  } */

  .cell {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
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
