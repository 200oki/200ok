import React, { useState, createContext, useMemo } from "react";

const GameAnswerContext = createContext();

const GameAnswerProvider = ({ children }) => {
  const [answer, setAnswer] = useState([]);
  const [isTwoSelected, setIsTwoSelected] = useState(false);
  const store = useMemo(
    () => ({ answer, setAnswer, isTwoSelected, setIsTwoSelected }),
    [answer, setAnswer, isTwoSelected, setIsTwoSelected]
  );

  return (
    <GameAnswerContext.Provider value={store}>
      {children}
    </GameAnswerContext.Provider>
  );
};

export { GameAnswerProvider, GameAnswerContext };
