import React, { useState, createContext, useMemo } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tier, setTier] = useState(1);
  const [matchedTotal, setMatchedTotal] = useState([]);

  const store = useMemo(
    () => ({ score, setScore, tier, setTier, matchedTotal, setMatchedTotal }),
    [score, setScore, tier, setTier, matchedTotal, setMatchedTotal]
  );

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export { GameProvider, GameContext };
