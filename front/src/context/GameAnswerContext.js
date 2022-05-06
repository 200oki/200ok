import React, { useState, createContext, useMemo } from "react";

const GameAnswerContext = createContext();

const GameAnswerProvider = ({ children }) => {
  const [answer, setAnswer] = useState([]);

  const store = useMemo(() => ({ answer, setAnswer }), [answer, setAnswer]);

  return (
    <GameAnswerContext.Provider value={store}>
      {children}
    </GameAnswerContext.Provider>
  );
};

export { GameAnswerProvider, GameAnswerContext };
