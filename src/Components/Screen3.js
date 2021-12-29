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
  let [row, setRow] = useState(30);
  let [col, setCol] = useState(30);
  let [grid, setGrid] = useState([]);
  let arr = [];

  let right = false;
  let left = false;
  let up = false;
  let down = false;

  const keyboard = document.querySelector("body");

  useEffect(() => {
    makeGrid();

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
    return {
      row: (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit,
      col: (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
    };
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
        // setPozSnakeX(pozSnakeX => pozSnakeX + 1);
        setSnakePositionHead(img_snakeDown);
        grid[0].row += 1;
        break;
      case "ArrowUp":
        up = true;
        down = false;
        left = false;
        right = false;
        // setPozSnakeX(pozSnakeX => pozSnakeX - 1);
        setSnakePositionHead(img_snakeUp);
        grid[0].row -= 1;
        break;
      case "ArrowRight":
        right = true;
        up = false;
        down = false;
        left = false;
        // setPozSnakeY(pozSnakeY => pozSnakeY + 1);
        setSnakePositionHead(img_snakeRight);
        grid[0].col += 1;
        break;
      case "ArrowLeft":
        left = true;
        right = false;
        up = false;
        down = false;
        // setPozSnakeY(pozSnakeY => pozSnakeY - 1);
        setSnakePositionHead(img_snakeLeft);
        grid[0].col -= 1;
        break;
      default:
        console.log("Error");
    }
    // }, 1000);
  }

  function makeGrid() {
    let TMP_GRID = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLLUMNS; col++) {
        TMP_GRID.push({
          row,
          col
        });
      }
    }
    // console.log("TMP_GRID", TMP_GRID);
    // console.log("TMP_GRID[0]", TMP_GRID[0]);

    setGrid(TMP_GRID);
  }

  function returnGrid() {
    const gridItem = grid.map(grid => {
      return (
        <div
          className="grid-item"
          key={grid.row.toString() + "-" + grid.col.toString()}
        />
      );
    });
    // gridItem[0] = snakePozitionHead;
    // arr.push(snakePozitionHead)

    return (
      <div className="snake-container">
        <div className="grid">
          {gridItem}
        </div>
      </div>
    );
  }

  function render() {
    let fruit = newApple();
    console.log("fruit", fruit);
    console.log("fruit.row", fruit.row);
    console.log("row", row);
    const isFood = fruit.row === row && fruit.row === grid.col;
    grid.push({
      row,
      col,
      isFood,
      snakePozitionHead
    });

    /* const gridItems = */ grid.map(grid => {
      return (
        <div>
          <div
            key={grid.row.toString() + "-" + grid.col.toString()}
            className={grid.isFood ? "grid-item is-food" : "grid-item"}
          />
          <div
            key={grid.row.toString() + "-" + grid.col.toString()}
            className={
              grid.snakePozitionHead ? "grid-item is-head" : "grid-item"
            }
          />
        </div>
      );
    });
  }

  return (
    <Wrapper SIZE_UNIT={SIZE_UNIT} style={{ display: "flex" }}>
      {returnGrid()}
      {render()}
      {console.log("grid", grid)}
      {/* {console.log("arr", arr)} */}
      {console.log("RETURN")}
    </Wrapper>
  );
};

export default Screen2;

const Wrapper = styled.div`
  /*   width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center; */

  .snake-container {
    width: 600px;
    height: 600px;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-shadow: 20px 0px 50px 2px rgba(0, 0, 0, 0.363);
    background: salmon;
    // background: #01020a;
  }

  /*   .arr {
    width: 20px;
    height: 20px;
    background: green;
  } */

  .grid {
    width: 600px;
    height: 600px;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .grid-item {
    outline: 1px solid grey;
    width: 20px;
    height: 20px;
  }

  .is-food {
    background-color: red;
  }
  .is-head {
    background-color: green;
  }

  .img {
    // position: absolute;
    display: block;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
