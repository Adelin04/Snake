"use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import snakeTail from "../icon/tail.png";
import apple from "../icon/apple.png";
import { setPhoto } from "./UTILS";

const keyboard = document.querySelector("body");

const Screen = () => {
  /*   let RIGHT = "RIGHT";
  let LEFT = "LEFT";
  let UP = "UP";
  let DOWN = "DOWN"; */
  let direction = "";

  const WIDTH_RECTANGULAR_SCREEN = 400;
  const img_snakeRight = setPhoto(snakeRight, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeDown = setPhoto(snakeDown, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeUp = setPhoto(snakeUp, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeLeft = setPhoto(snakeLeft, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeTail = setPhoto(snakeTail, WIDTH_RECTANGULAR_SCREEN);
  const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
  const [snakePozitionTail, setSnakePositionTail] = useState(snakeTail);

  const [sizeUnit, setSizeUnit] = useState(20);
  const [snake, setSnake] = useState([[0, 0], [20, 0], [40, 0]]);

  let [counterApple, setCounterApple] = useState(0);

  let [pozAppleX, setPozAppleX] = useState(
    () => (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
  );
  let [pozAppleY, setPozAppleY] = useState(
    (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
  );

  let [pozSnakeX, setPozSnakeX] = useState(0);
  let [pozSnakeY, setPozSnakeY] = useState(0);
  let interval;
  useEffect(
    () => {
      interval = setInterval(moveSnake, 3000);
      // moveSnake();
      CheckApple();
      console.log("RENDER");

      keyboard.addEventListener("keydown", directionSnake);

      return () => {
        keyboard.removeEventListener("keydown", directionSnake);

        clearInterval(direction);
      };
    },
    [interval]
  );

  function newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    setPozAppleX(x);

    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    setPozAppleY(y);

    setSnake(previousSnake => [...previousSnake, [x, y]]);
  }

  function CheckApple() {
    if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
      newApple();
      setCounterApple(prevousCounterApple => {
        return prevousCounterApple + 1;
      });
    }
  }

  const moveSnake = () => {
    let snakeCopy = snake;
    let headSnake = snake[snakeCopy.length - 1];
    console.log("headSnake <-", headSnake);
    // console.log("snakeCopy.length", snakeCopy.length);
    // console.log("headSnake", headSnake);
    // eslint-disable-next-line default-case
    switch (direction) {
      case "RIGHT":
        headSnake = [headSnake[0] + sizeUnit, headSnake[1]];
        console.log("right");
        break;
      case "LEFT":
        headSnake = [headSnake[0] - sizeUnit, headSnake[1]];
        break;
      case "DOWN":
        headSnake = [headSnake[0], headSnake[1] + sizeUnit];
        break;
      case "UP":
        headSnake = [headSnake[0], headSnake[1] - sizeUnit];
        break;
    }
    console.log("headSnake ->", headSnake);
    snakeCopy.push(headSnake);
    snakeCopy.shift();
    setSnake(snakeCopy);
    console.log("snakeCopy", snakeCopy);
    console.log("snake <-", snake);
    console.log("snake ->", snake);
  };

  function directionSnake({ key }) {
    // for (let i = 0; i < counterApple.length; i++) {
    //   snake[i] = snake[i - 1];
    // }
    // console.log(key);

    switch (key) {
      case "ArrowDown":
        setSnakePositionHead(snakeDown);
        direction = "DOWN";

        break;
      case "ArrowUp":
        setSnakePositionHead(snakeUp);
        direction = "UP";

        break;
      case "ArrowRight":
        setSnakePositionHead(snakeRight);
        direction = "RIGHT";

        break;
      case "ArrowLeft":
        setSnakePositionHead(snakeLeft);
        direction = "LEFT";

        break;
      default:
        return null;
    }
  }

  const returnSnake = () => {
    return snake.map((segment, index) => {
      console.log("segment[0]", segment[0]);
      console.log("segment[1]", segment[1]);
      // snake[0] = img_snakeRight
      return (
        <div
          className="segment"
          key={index}
          style={{
            position: "absolute",
            left: `${segment[0]}px`,
            top: `${segment[1]}px`
          }}
        >
          {/* {segment} */}
        </div>
      );
    });
  };

  const returnApple = () => {
    return (
      <div style={{ display: "flex", position: "absolute" }} className="apple">
        <img width={"20px"} height={"20px"} src={apple} />
      </div>
    );
  };

  return (
    <Wrapper
      style={{ display: "flex", position: "relative" }}
      pozSnakeX={pozSnakeX}
      pozSnakeY={pozSnakeY}
      pozAppleX={pozAppleX}
      pozAppleY={pozAppleY}
      sizeUnit={sizeUnit}
      segment={snake}
    >
      {returnSnake()}
      {returnApple()}
    </Wrapper>
  );
};
export default Screen;

const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  background: rgb(125, 165, 165);

  .snake {
    // width: ${({ sizeUnit }) => sizeUnit}px;
    // height: ${({ sizeUnit }) => sizeUnit}px;
    // z-index: 1;
    // background: green;
  }
  
  .segment {
    left: ${({ segment }) => segment[0]}px;
    top: ${({ segment }) => segment[1]}px;
    width: 20px;
    height: 20px;
    background: green;
  }

  .apple {
    left: ${({ pozAppleX }) => pozAppleX}px;
    top: ${({ pozAppleY }) => pozAppleY}px;
    z-index: 0;

    //background: green;
  }
`;

//*****************************//

/* "use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import snakeTail from "../icon/tail.png";
import apple from "../icon/apple.png";
import { setPhoto } from "./UTILS";

const keyboard = document.querySelector("body");

const Screen = e => {
  const WIDTH_RECTANGULAR_SCREEN = 400;
  const img_snakeRight = setPhoto(snakeRight, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeDown = setPhoto(snakeDown, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeUp = setPhoto(snakeUp, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeLeft = setPhoto(snakeLeft, WIDTH_RECTANGULAR_SCREEN);
  const img_snakeTail = setPhoto(snakeTail, WIDTH_RECTANGULAR_SCREEN);
  const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
  const [snakePozitionTail, setSnakePositionTail] = useState(snakeTail);

  const [sizeUnit, setSizeUnit] = useState(20);
  const [snake, setSnake] = useState([snakePozitionHead]);
  let [counterApple, setCounterApple] = useState(0);

  let [pozAppleX, setPozAppleX] = useState(
    () => (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
  );
  let [pozAppleY, setPozAppleY] = useState(
    (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit
  );

  let [pozSnakeX, setPozSnakeX] = useState(0);
  let [pozSnakeY, setPozSnakeY] = useState(0);

  let right = false;
  let left = false;
  let up = false;
  let down = false;
  let running = 0;
  let interval = null;
  let changeDirection = false;
  let pozSnake_X = 0;
  let pozSnake_Y = 0;

  useEffect(
    () => {
      returnSnake();
      console.log("render");
      // newApple();
      // console.log("add event listener");
      keyboard.addEventListener("keydown", directionSnake);

      return () => {
        // console.log("remove event listener");
        keyboard.removeEventListener("keydown", directionSnake);

        // clearInterval(interval);
      };
    },
    [pozAppleX, pozAppleY, right, left]
  );

  function setPosition() {
    CheckApple();
    if (left) {
      setPozSnakeX((pozSnakeX -= sizeUnit));
    }
    if (right) {
      setPozSnakeX((pozSnakeX += sizeUnit));
    }
    if (up) {
      setPozSnakeY((pozSnakeY -= sizeUnit));
    }
    if (down) {
      setPozSnakeY((pozSnakeY += sizeUnit));
    }
    // console.log("pozSnakeX " + pozSnakeX, " - ", "pozSnakeY " + pozSnakeY);
    // console.log("pozAppleX " + pozAppleX, " - ", "pozAppleY " + pozAppleY);
  }

  function newApple() {
    let x = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    setPozAppleX(x);
    // setPozAppleX(previousX => {
    //   return { ...previousX };
    // });
    let y = (Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit;
    setPozAppleY(y);
    // setPozAppleY(previousY => {
    //   return { ...previousY };
    // });
    // setSnake(previousSegment => {
    //   return [...previousSegment, snakePozitionTail];
    // });

    setSnake(previousSnake => [...previousSnake, snakePozitionTail]);
    // console.log("snake", snake.length);
    // console.log("X-apple", x);
    // console.log("Y-apple", y);
  }

  const CheckApple = () => {
    if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
      newApple();
      setCounterApple(prevousCounterApple => {
        return prevousCounterApple + 1;
      });
      // setCounterApple(counterApple + 1);
      // console.log("counterApple", counterApple);
      // console.log("pozSnakeX", pozSnakeX);
      // console.log("pozSnakeY", pozSnakeY);
      // console.log("pozAppleX", pozAppleX);
      // console.log("pozAppleY", pozAppleY);
    }
  };

  const directionSnake = ({ key }) => {
    // for (let i = 0; i < counterApple.length; i++) {
    //   snake[i] = snake[i - 1];
    // }
    // console.log(key);

    // interval = setInterval(() => {
    running += 20;
    // console.log(running);
    switch (key) {
      case "ArrowDown":
        setSnakePositionHead(snakeDown);
        snake[0] = snakeDown;
        console.log(snake[0]);
        down = true;
        up = false;
        left = false;
        right = false;

        break;
      case "ArrowUp":
        setSnakePositionHead(snakeUp);
        snake[0] = snakeUp;
        up = true;
        down = false;
        left = false;
        right = false;

        break;
      case "ArrowRight":
        setSnakePositionHead(snakeRight);
        snake[0] = snakeRight;
        right = true;
        up = false;
        down = false;
        left = false;

        break;
      case "ArrowLeft":
        setSnakePositionHead(snakeLeft);
        snake[0] = snakeLeft;
        left = true;
        right = false;
        up = false;
        down = false;

        break;
      default:
        return null;
    }
    setPosition();
    // }, 100);
  };

  const returnSnake = () => {
    // console.log("segment", snake);
    // console.log("pozSnakeX", pozSnakeX);
    // console.log("pozSnakeY", pozSnakeY);
    // console.log("pozAppleX", pozAppleX);
    // console.log("pozAppleY", pozAppleY);
    console.log("snake.length => ", snake.length);
    console.log("\n");
    let secundPozSnakeX = pozSnakeX - 20;
    let secundPozSnakeY = pozSnakeY - 20;
    // interval = setInterval(() => {
    return (
      <div
        className="snake"
        style={{
          position: "absolute",
          left: `${pozSnakeX}px`,
          top: `${pozSnakeY}px`
        }}
      >
        {snake.map((segment, index) => {
          console.log("pozSnakeX =>", pozSnakeX);
          console.log("pozSnakeY =>", pozSnakeY);
          console.log("snake.length =>", segment === snakePozitionHead);
          // if (segment === snakePozitionHead)
          return (
            <img
              className="segment"
              key={index}
              style={{
                position: "relative"
                // left: `${pozSnakeX}px`,
                // top: `${pozSnakeY}px`
                // left: `${() =>
                //   segment === snakePozitionHead ? pozSnakeX + 20 : pozSnakeX}px`,
                // top: `${() =>
                //   segment === snakePozitionTail ? pozSnakeY - 20 : pozSnakeY - 40}px`
              }}
              width={"20px"}
              height={"20px"}
              src={segment}
              alt="segment"
            />
          );
          //  else {
          //   return (
          //     <img
          //       className="segment"
          //       key={index}
          //       style={{
          //         position: "absolute",
          //         left: `${pozSnakeX - 20}px`,
          //         top: `${pozSnakeY - 20}px`
          //       }}
          //       width={"20px"}
          //       height={"20px"}
          //       src={segment}
          //       alt="segment"
          //     />
          //   );
          // }
        })}
        
      </div>
    );
    // }, 1000);
  };

  const returnApple = () => {
    return (
      <div style={{ display: "flex", position: "absolute" }} className="apple">
        <img width={"20px"} height={"20px"} src={apple} />
      </div>
    );
  };

  return (
    <Wrapper
      style={{ display: "flex", position: "relative" }}
      pozSnakeX={pozSnakeX}
      pozSnakeY={pozSnakeY}
      pozAppleX={pozAppleX}
      pozAppleY={pozAppleY}
      sizeUnit={sizeUnit}
    >
      {returnSnake()}
      {returnApple()}
    <div
        className="snake-head"
        style={{ display: "flex", position: "absolute" }}
      >
        {snake}
        <img width={"20px"} height={"20px"} src={snakePozitionHead} />
      </div> 
    </Wrapper>
  );
};
export default Screen;

const Wrapper = styled.div`
  position:relative;
  width: 600px;
  height: 600px;
  background: rgb(125, 165, 165);

  .snake {
    width: ${({ sizeUnit }) => sizeUnit}px;
    height: ${({ sizeUnit }) => sizeUnit}px;

    // left: ${({ pozSnakeX }) => pozSnakeX}px;
    // top: ${({ pozSnakeY }) => pozSnakeY}px;
    // transition: width 0.1s ease-out;
    z-index: 1;
    
    // background: green;
  }
  
  .segment {
    // background: green;
    // left: ${({ pozSnakeX }) => pozSnakeX + 20}px,
    // top: ${({ pozSnakeY }) => pozSnakeY - 20}px
    // transition: all 0.5s ease-out;
    // left: ${({ pozSnakeX }) => pozSnakeX}px;
    // top: ${({ pozSnakeY }) => pozSnakeY  - sizeUnit * snake.length}px;
  }

  .apple {
    left: ${({ pozAppleX }) => pozAppleX}px;
    top: ${({ pozAppleY }) => pozAppleY}px;
    z-index: 0;

    //background: green;
  }
`; */

//*****************************//

/*   function useInterval(callback, delay) {
        const savedCallback = useRef();
        
        // Remember the latest callback.
        
        useEffect(
          () => {
            savedCallback.current = callback;
          },
      [callback]
    );
    
    // Set up the interval.
    
    useEffect(
      () => {
        function tick() {
          savedCallback.current();
        }
        
        if (delay !== null) {
          let id = setInterval(tick, delay);
          
          return () => clearInterval(id);
        }
      },
      [delay]
      );
    }
  useInterval(directionSnake, 1000); */

// const returnSnake = () => {
//   console.log("segment", snake);
//   // return snake.map((segment, index) => {
//   return (
//     <div
//       key={counterApple}
//       className="snake-head"
//       style={{ position: "absolute", width: "auto" }}
//     >
// {/*         {snake[0] !== null
//         ? <img
//             style={{
//               position: "absolute",
//               left: `${({ pozSnakeX }) => pozSnakeX}px`,
//               top: `${({ pozSnakeY }) => pozSnakeY}px`
//             }}
//             width={"20px"}
//             height={"20px"}
//             src={snakePozitionHead}
//             alt="segment"
//           />
//         : null} */}

//       {snake.length > 0
//         ? <img
//             style={{
//               position: "absolute",
//               // left: `${({ pozSnakeX }) => pozSnakeX + sizeUnit * snake.length}px`,
//               top: `${({ pozSnakeY }) =>
//                 pozSnakeY - sizeUnit * snake.length}px`
//             }}
//             width={"20px"}
//             height={"20px"}
//             src={snake[counterApple]}
//             alt="segment"
//           />
//         : null}
//     </div>
//   );
//   // });
// };

/* 
"use strict";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import snakeRight from "../icon/snakeRight.png";
import snakeLeft from "../icon/snakeLeft.png";
import snakeUp from "../icon/snakeUp.png";
import snakeDown from "../icon/snakeDown.png";
import apple from "../icon/apple.png";

const keyboard = document.querySelector("body");

const Screen = e => {
  const [sizeUnit, setSizeUnit] = useState(20);
  let [counterApple, setCounterApple] = useState(0);
  let [pozAppleX, setPozAppleX] = useState(0);
  let [pozAppleY, setPozAppleY] = useState(0);
  let [pozSnakeX, setPozSnakeX] = useState(0);
  let [pozSnakeY, setPozSnakeY] = useState(0);

  const [snakePozitionHead, setSnakePositionHead] = useState(snakeRight);
  let right = false;
  let left = false;
  let up = false;
  let down = false;
  let running = 0;
  let interval = null;
  let changeDirection = false;
  let pozSnake_X = 0;
  let pozSnake_Y = 0;

  useEffect(
    () => {
      console.log("render");
      if (pozSnakeX === pozAppleX && pozSnakeY === pozAppleY) {
        newApple(setPozAppleX, setPozAppleY);
        setCounterApple(counterApple + 1);
      }
      // console.log("add event listener");
      keyboard.addEventListener("keydown", directionSnake);

      console.log("counterApple ", counterApple);
      return () => {
        // console.log("remove event listener");
        keyboard.removeEventListener("keydown", directionSnake);
        clearInterval(interval);
      };
    },
    [snakePozitionHead]
  );

  // console.log("X -> " + pozSnakeX, " - ", "Y -> " + pozSnakeY);

  function Check() {
    if (left) {
      pozSnake_X -= sizeUnit;
      setPozSnakeX(pozSnake_X);
    }
    if (right) {
      pozSnake_X += sizeUnit;
      setPozSnakeX(pozSnake_X);
    }
    if (up) {
      pozSnake_Y -= sizeUnit;
      setPozSnakeY(pozSnake_Y);
    }
    if (down) {
      pozSnake_Y += sizeUnit;
      setPozSnakeY(pozSnake_Y);
    }
    console.log("pozSnakeX " + pozSnake_X, " - ", "pozSnakeY " + pozSnake_Y);
  }

  const directionSnake = ({ key }) => {
    console.log(key);
    // interval = setInterval(() => {
      running += 20;
      console.log(running);
      switch (key) {
        case "ArrowDown":
          down = true;
          up = false;
          left = false;
          right = false;

          // pozSnakeX += running;
          // setPozSnakeY(pozSnakeY + running);

          // setPozSnakeY(pozSnakeY + sizeUnit);
          setSnakePositionHead(snakeDown);
          break;
        case "ArrowUp":
          up = true;
          down = false;
          left = false;
          right = false;

          // pozSnakeY -= running;
          // setPozSnakeY(pozSnakeY - running);

          // setPozSnakeY(pozSnakeY - sizeUnit);
          setSnakePositionHead(snakeUp);
          break;
        case "ArrowRight":
          right = true;
          up = false;
          down = false;
          left = false;
          // pozSnakeX += running;
          // setPozSnakeX(pozSnakeX + running);

          // setPozSnakeX(pozSnakeX + sizeUnit);
          setSnakePositionHead(snakeRight);
          break;
        case "ArrowLeft":
          left = true;
          right = false;
          up = false;
          down = false;
          // pozSnakeX -= running;
          // setPozSnakeX(pozSnakeX - running);

          setSnakePositionHead(snakeLeft);
          break;
        default:
          console.log("Error");
      }
      Check();
    // }, 1000);
  };

  //     function useInterval(callback, delay) {
  //   const savedCallback = useRef();

  //   // Remember the latest callback.

  //   useEffect(
  //     () => {
  //       savedCallback.current = callback;
  //     },
  //     [callback]
  //   );

  //   // Set up the interval.

  //   useEffect(
  //     () => {
  //       function tick() {
  //         savedCallback.current();
  //       }

  //       if (delay !== null) {
  //         let id = setInterval(tick, delay);

  //         return () => clearInterval(id);
  //       }
  //     },
  //     [delay]
  //   );
  // }
  // useInterval(directionSnake, 1000);
  const newApple = (setPozX, setPozY) => {
    setPozX((Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit);
    setPozY((Math.floor(Math.random() * sizeUnit - 1) + 1) * sizeUnit);
  };

  return (
    <Wrapper
      style={{ display: "flex", position: "relative" }}
      pozSnakeX={pozSnakeX}
      pozSnakeY={pozSnakeY}
      pozAppleX={pozAppleX}
      pozAppleY={pozAppleY}
      sizeUnit={sizeUnit}
    >
      <div style={{ display: "flex", position: "absolute" }} className="apple">
        <img width={"20px"} height={"20px"} src={apple} />
      </div>

      <div
        className="snake-head"
        style={{ display: "flex", position: "absolute" }}
      >
        <img width={"20px"} height={"20px"} src={snakePozitionHead} />
      </div>
    </Wrapper>
  );
};
export default Screen;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background: rgb(125, 165, 165);

  .snake-head {
    // width: ${({ sizeUnit }) => sizeUnit}px;
    // height: ${({ sizeUnit }) => sizeUnit}px;

    left: ${({ pozSnakeX }) => pozSnakeX}px;
    top: ${({ pozSnakeY }) => pozSnakeY}px;
    transition: all 0.1s ease-out;

    // background: green;
  }

  .apple {
    left: ${({ pozAppleX }) => pozAppleX}px;
    top: ${({ pozAppleY }) => pozAppleY}px;

    //background: green;
  }
`;
 */
