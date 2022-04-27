import React, { useState, createContext } from "react";

const MatchCommentContext = createContext();

const MatchCommentProvider = ({ children }) => {
  const [comment, setComment] = useState([]);
  const store = { comment, setComment };

  return (
    <MatchCommentContext.Provider value={store}>
      {children}
    </MatchCommentContext.Provider>
  );
};

export { MatchCommentProvider, MatchCommentContext };
