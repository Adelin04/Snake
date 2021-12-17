import React from "react";
import styled from "styled-components";
import { Snake } from "./Snake";

const Screen = () => {
  let snakeX;
  let snakeY;
  let snake = new Snake(snakeX, snakeY);

  
  return (
    <Wrapper>
      {/*             <div className="screen">
                
            </div> */}
    </Wrapper>
  );
};

export default Screen;

const Wrapper = styled.section`
  diplay: flex;
  width: 600px;
  height: 600px;
  background: rgb(125, 165, 165);
`;
