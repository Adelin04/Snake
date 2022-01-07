import styled from "styled-components";
import "./App.css";
import Level from "../src/Components/Level";
import Score from "../src/Components/Score";
import Screen from "../src/Components/Screen";
import Title from "../src/Components/Title";
import Screen2 from "./Components/Screen2";
import Screen3 from "./Components/Screen3";
import _Snake from "./Components/_Snake";
import _Snake2 from "./Components/_Snake2";
import { useRef, useState } from "react";

function App() {
  let [StartGame, setStartGame] = useState(false);
  let [score, setScore] = useState(0);
  // let StartGame = false;
  return (
    <Wrapper>
      <div className="App">
        <div className="navBar">
          <Level level={1} />
          <Title title={"Snake"} />
          <Score score={score} />
        </div>
        {/* <_Snake /> */}
        {/* <Screen /> */}
        {/* <Screen2 /> */}
        {/* {<Screen3 />} */}

        <button onClick={() => setStartGame(true)}>Start</button>

        <_Snake2 StartGame={StartGame} />
      </div>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;

  .navBar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 400px;
    height: auto;
    // background: skyblue;
    // border: solid 1px rgba(128, 128, 128, 0.466);;
    // border-radius: 5px;
  }
`;
