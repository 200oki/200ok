import React, { useState, createContext } from "react";
import StatBtn from "./StatBtn.js";
import { Outlet } from "react-router-dom";
import "../../css/stats.css";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";

export const DescContext = createContext();

const Stat = () => {
  const [isDesc, setIsDesc] = useState(false); // 뒤로가기 버튼에서 다시 false로 세팅해주면 될거같아용..

  return (
    <DescContext.Provider value={{ isDesc, setIsDesc }}>
      <div className="stat">
        <div className="nav-bar" style={{ position: "fixed", top: "0", zIndex: "1", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100vw" }}>
          <BackButton content={"메인메뉴"} />
          <HomeButton className="homeBtn" />
        </div>
        <div className="stat-content">
          {isDesc ? <></> : <p className="clickBtn">버튼을 클릭해주세요!</p>}
          <StatBtn />
          <Outlet />
        </div>
      </div>
    </DescContext.Provider>
  );
};

export default Stat;
