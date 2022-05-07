import React, { useState, createContext, useMemo } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const store = useMemo(() => ({ score, setScore }), [score, setScore]);

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
