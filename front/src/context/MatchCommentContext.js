import React, { useState, createContext, useMemo } from "react";

const MatchCommentContext = createContext();

const MatchCommentProvider = ({ children }) => {
  const [comment, setComment] = useState([]);
  const store = useMemo(() => ({ comment, setComment }), [comment, setComment]);

  return (
    <MatchCommentContext.Provider value={store}>
      {children}
    </MatchCommentContext.Provider>
  );
};

export { MatchCommentProvider, MatchCommentContext };
