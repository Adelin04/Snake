import styled from "styled-components";
import "./App.css";
import Level from "./Level";
import Score from "./Score";
import Screen from "./Screen";
import Title from "./Title";

function App() {
  return (
    <Wrapper>
      <div className="App">
        <div className="navBar">
          <Level level={1} />
          <Title title={"Snake"} />
          <Score score={0} />
        </div>
        <Screen />
      </div>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;

  .navBar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // border: solid 1px rgba(128, 128, 128, 0.466);;
    // border-radius: 5px;
  }
`;
