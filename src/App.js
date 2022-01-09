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
      <_Snake2 StartGame={StartGame} />
      <button className="btn_startGame" onClick={() => setStartGame(true)}>
        Start
      </button>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100&;
  height: 100%;

  .btn_startGame {
    width: 50px;
    height: 50px;
  }
`;

{
  /* <Level level={1} />
<Title title={"Snake"} />
<Score score={score} /> */
}
