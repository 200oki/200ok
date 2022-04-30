import React, { useState, createContext } from "react";
import StatBtn from "./StatBtn.js";
import { Outlet } from "react-router-dom";
import "../../css/stats.css";

export const DescContext = createContext();

const Stat = () => {
  const [isDesc, setIsDesc] = useState(false); // 뒤로가기 버튼에서 다시 false로 세팅해주면 될거같아용..

  return (
    <DescContext.Provider value={{ isDesc, setIsDesc }}>
      <div className="bgImg">
        {isDesc ? <></> : <p className="desc">버튼을 클릭해주세요!</p>}
        <StatBtn />
        <Outlet />
      </div>
    </DescContext.Provider>
  );
};

export default Stat;
