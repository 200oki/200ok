import React, { useState, createContext, useMemo } from "react";

const NicknameContext = createContext();

const NicknameProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const store = useMemo(
    () => ({ nickname, setNickname }),
    [nickname, setNickname]
  );

  return (
    <NicknameContext.Provider value={store}>
      {children}
    </NicknameContext.Provider>
  );
};

export { NicknameProvider, NicknameContext };
