import React, { useState, createContext, useMemo } from "react";

const ParamContext = createContext();

const ParamProvider = ({ children }) => {
  const [param, setParam] = useState(null);
  const store = useMemo(() => ({ param, setParam }), [param, setParam]);

  return (
    <ParamContext.Provider value={store}>{children}</ParamContext.Provider>
  );
};

export { ParamProvider, ParamContext };
