import React, { useState, createContext, useMemo } from "react";

const MatchElementContext = createContext();

const MatchElementProvider = ({ children }) => {
  const [matchElem, setMatchElem] = useState([]);
  const [id, setId] = useState(null);
  const [resultMent, setResultMent] = useState([]);

  const store = useMemo(
    () => ({ matchElem, setMatchElem, id, setId, resultMent, setResultMent }),
    [matchElem, setMatchElem, id, setId, resultMent, setResultMent]
  );

  return (
    <MatchElementContext.Provider value={store}>
      {children}
    </MatchElementContext.Provider>
  );
};

export { MatchElementProvider, MatchElementContext };
