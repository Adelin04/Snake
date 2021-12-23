import React, { useEffect, useState } from "react";
import styled from "styled-components";

import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";

const Screen2 = () => {
  let WIDTH_SCREEN = 30;
  let [SIZE_UNIT, set_SIZE_UNIT] = useState(20);
  let ROWS = 30;
  let COLLUMNS = 30;
  let cells = [];
  let [pozSnakeX, setPozSnakeX] = useState(2);
  let [pozSnakeY, setPozSnakeY] = useState(0);
  let board = Array(ROWS).fill().map(row => new Array(COLLUMNS).fill(<div className="rows">1</div>));

/*   const uniqueKey = () => {
    let index = 0;
    for (let i = 0; i < WIDTH_SCREEN + 1; i++) {
      index = i;
    }
    console.log(index);
    return index;
  }; */

  board[0][1] = <img className="img" src={snakeRight} key={()=>{WIDTH_SCREEN.map(e=>{return e})}} width="20px"/* {`${20}px`} */ height="20px" /* {`${20}px`} */  alt={'cell'}/>;
  board[0][29] = <img className="img" src={snakeRight} key={()=>{WIDTH_SCREEN.map(e=>{return e})}} width="20px"/* {`${20}px`} */ height="20px" /* {`${20}px`} */  alt={'cell'}/>;
  board[29][29] = <img className="img" src={snakeRight} key={()=>{WIDTH_SCREEN.map(e=>{return e})}} width="20px"/* {`${20}px`} */ height="20px" /* {`${20}px`} */  alt={'cell'}/>;
 
  useEffect(() => {
    console.log("render");

    return () => {};
  }, []);
  
  
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
  