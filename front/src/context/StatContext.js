import React, { useState, createContext, useMemo } from "react";

const StatContext = createContext();

const StatProvider = ({ children }) => {
  const [isDesc, setIsDesc] = useState(null);
  const store = useMemo(() => ({ isDesc, setIsDesc }), [isDesc, setIsDesc]);

  return <StatContext.Provider value={store}>{children}</StatContext.Provider>;
};

export { StatProvider, StatContext };
