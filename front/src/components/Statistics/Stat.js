import React from 'react';
import StatBtn from "./StatBtn.js";
import { Outlet } from "react-router-dom";
import styled from "../../css/match.module.css";

const Stat = () => {
  return (
    <div className={styled.Wrapper}>
      <StatBtn />
      <Outlet />
    </div>
  );
}

export default Stat;