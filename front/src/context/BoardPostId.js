import React, { useState, createContext, useMemo } from "react";

const BoardPostIdContext = createContext();

const BoardPostIdProvider = ({ children }) => {
  const [postId, setPostId] = useState(null);

  const store = useMemo(() => ({ postId, setPostId }), [postId, setPostId]);

  return (
    <BoardPostIdContext.Provider value={store}>
      {children}
    </BoardPostIdContext.Provider>
  );
};

export { BoardPostIdProvider, BoardPostIdContext };
