import React, { useState, createContext } from "react";

const NicknameContext = createContext();

const NicknameProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const store = { nickname, setNickname };

  return (
    <NicknameContext.Provider value={store}>
      {children}
    </NicknameContext.Provider>
  );
};

export { NicknameProvider, NicknameContext };
