import React, { useState, createContext, useMemo } from "react";

const MatchElementContext = createContext();

const MatchElementProvider = ({ children }) => {
  const [matchElem, setMatchElem] = useState([]);
  const [id, setId] = useState(null);
  const [resultMent, setResultMent] = useState([]);
  const [idKo, setIdKo] = useState(null);

  const store = useMemo(
    () => ({
      matchElem,
      setMatchElem,
      id,
      setId,
      resultMent,
      setResultMent,
      idKo,
      setIdKo,
    }),
    [
      matchElem,
      setMatchElem,
      id,
      setId,
      resultMent,
      setResultMent,
      idKo,
      setIdKo,
    ]
  );

  return (
    <MatchElementContext.Provider value={store}>
      {children}
    </MatchElementContext.Provider>
  );
};

export { MatchElementProvider, MatchElementContext };
