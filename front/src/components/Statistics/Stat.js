import React from 'react';
import StatBtn from "./StatBtn.js";
import { Outlet } from "react-router-dom";
import "../../css/stats.css";

const Stat = () => {
  return (
    <div className="bgImg">
      <StatBtn />
      <Outlet />
      <p className="desc">
        버튼을 클릭해주세요!
      </p>
    </div>
  );
}

export default Stat;