import React from "react";
import Snake from "./Components/Snake";

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
`;
