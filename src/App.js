import React from "react";
import _Snake from "./Components/_Snake";
import _Snake2 from "./Components/_Snake2";
import { useState } from "react";

//import Style
import styled from "styled-components";
import "./App.css";

function App() {
  let [StartGame, setStartGame] = useState(false);
  let [resolution, setResolution] = useState(400);
  let [toggleFocus, setToggleFocus] = useState(false);

  const ChangeFocus = () => {
    if (StartGame === true) setToggleFocus(true);
  };
  return (
    <Wrapper resolution={resolution}>
      <_Snake2 StartGame={StartGame} resolution={resolution} />

      <div className="footer">
        <button className="btn_startGame" onClick={() => setStartGame(true)}>
          Start Game
        </button>
        <button className="btn_stopGame" onClick={() => setStartGame(false)}>
          Stop Game
        </button>

        <div className="wrapper-resolution">
          <span>Resolution</span>
          <select
            disabled={StartGame}
            name="resolution"
            className="resolution"
            onChange={(e) => {
              setResolution(e.target.value);
            }}
          >
            <option value={400}>400 x 400</option>
            <option value={600}>600 x 600</option>
            <option value={800}>800 x 800</option>
          </select>
        </div>
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
  width: 100%;
  height: 100%;

  .footer {
    display: flex;
    justify-content: space-around;
    margin: 25px auto;
    width: ${({ resolution }) => resolution}px;
    // background: skyblue;
  }

  .wrapper-resolution {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: auto;
    // background: salmon;

    span {
      font-size: 20px;
    }
  }

  .resolution {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 20px;
    border-radius: 5px;
    outline: none;
    // background: salmon;
  }

  .btn_startGame {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: auto;
    height: 50px;
  }
`;
