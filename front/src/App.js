import styled from "./css/App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import Today from "./components/Today/Today";
import InputNickname from "./components/match/InputNickname";

import React from "react";
import { useEffect, useState, useRef } from "react";

function App() {
  const today = new Date();

  return (
    <div className={styled.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path='/today' element={<Today today = {today}/>} /> */}
          <Route path="/match" element={<InputNickname />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
