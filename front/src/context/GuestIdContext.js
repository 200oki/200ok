import React, { useState, createContext, useMemo } from "react";

const GuestIdContext = createContext();

const GuestIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const store = useMemo(() => ({ userId, setUserId }), [userId, setUserId]);

  return (
    <GuestIdContext.Provider value={store}>{children}</GuestIdContext.Provider>
  );
};

export { GuestIdProvider, GuestIdContext };
