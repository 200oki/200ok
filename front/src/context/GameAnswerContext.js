import React, { useState, createContext, useMemo } from "react";

const GameAnswerContext = createContext();

const GameAnswerProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const store = useMemo(() => ({ score, setScore }), [score, setScore]);

  return (
    <GameAnswerContext.Provider value={store}>
      {children}
    </GameAnswerContext.Provider>
  );
};

export { GameAnswerProvider, GameAnswerContext };
