import React, { useState } from "react";

const SnakeContext = React.createContext();

const SnakeProvider = ({ children }) => {
  const [resolution, setResolution] = useState(400);

  /*   const setRes = res => {
    setResolution(res);
  }; */

  return (
    <SnakeContext.Provider value={{ resolution, setResolution }}>
      {children}
    </SnakeContext.Provider>
  );
};

export { SnakeContext, SnakeProvider };
