import React, { useContext } from "react";
import Snake from "./Components/Snake";
import { useState } from "react";

//import Style
import styled from "styled-components";
import "./App.css";
import { SnakeContext } from "./Components/Context/SnakeContext";

function App() {
  let [StartGame, setStartGame] = useState(false);
  const { resolution, setResolution } = useContext(SnakeContext);

  return (
    <Wrapper resolution={resolution}>
      <Snake StartGame={StartGame} resolution={resolution} />

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
            onChange={e => {
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
    // outline: none;
    // background: salmon;
  }

  .btn_startGame,
  .btn_stopGame {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: auto;
    height: 50px;
  }
`;

/* class App extends React.Component {
    constructor(props) {
      super(props);
     
      this.state = {
        resolution:'',
        StartGame:'',
      };
    }
    render() {
      return (
        <Wrapper resolution={this.state.resolution}>
          <Snake StartGame={this.state.StartGame} resolution={this.state.resolution} />
  
          <div className="footer">
            <button className="btn_startGame" onClick={() => this.setState({StartGame:true})}>
              Start Game
            </button>
            <button className="btn_stopGame" onClick={() => this.setState({StartGame:false})}>
              Stop Game
            </button>
  
            <div className="wrapper-resolution">
              <span>Resolution</span>
              <select
                disabled={this.state.StartGame}
                name="resolution"
                className="resolution"
                onChange={e => {
                  this.setState({resolution:e.target.value});
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
  } */
