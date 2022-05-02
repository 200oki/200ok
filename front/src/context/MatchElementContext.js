import React, { useState, createContext, useMemo } from "react";

const MatchElementContext = createContext();

const MatchElementProvider = ({ children }) => {
  const [matchElem, setMatchElem] = useState([]);
  const store = useMemo(
    () => ({ matchElem, setMatchElem }),
    [matchElem, setMatchElem]
  );

  return (
    <MatchElementContext.Provider value={store}>
      {children}
    </MatchElementContext.Provider>
  );
};

export { MatchElementProvider, MatchElementContext };
