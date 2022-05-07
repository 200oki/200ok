import React, { useState, createContext, useMemo } from "react";

const GuestIdContext = createContext();

const GuestIdProvider = ({ children }) => {
  const [id, setId] = useState(null);

  const store = useMemo(() => ({ id, setId }), [id, setId]);

  return (
    <GuestIdContext.Provider value={store}>{children}</GuestIdContext.Provider>
  );
};

export { GuestIdProvider, GuestIdContext };
