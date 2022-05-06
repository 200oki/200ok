import React, { useState, createContext, useMemo } from "react";

const DateContext = createContext();

const DateProvider = ({ children }) => {
  const today = new Date(); // 오늘 날짜
  const nowMonth = String(today.getMonth() + 1).padStart(2, "0")
  const nowDay = String(today.getDate()).padStart(2, "0")
  const [date, setDate] = useState({ month: nowMonth, day: nowDay });
  const store = useMemo(() => ({ date, setDate }), [date, setDate]);

  return (
    <DateContext.Provider value={store}>
      {children}
    </DateContext.Provider>
  );
};

export { DateProvider, DateContext };
