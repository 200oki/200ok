import React, { useState, createContext, useMemo } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tier, setTier] = useState(null);
  const store = useMemo(
    () => ({ score, setScore, tier, setTier }),
    [score, setScore, tier, setTier]
  );

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
