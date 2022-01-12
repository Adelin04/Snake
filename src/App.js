import React, { useContext } from "react";
import Snake from "./Components/Snake";
import { useState } from "react";

//import Style
import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <Wrapper>
      <Snake />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .footer {
    display: flex;
    justify-content: space-around;
    margin: 25px auto;
    width: ${({ resolution }) => resolution}px;
  }
`;
