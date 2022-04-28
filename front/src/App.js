import styled from "./css/App.module.css";
import "./css/main.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import InputNickname from "./components/match/InputNickname";
import Explore from "./components/explore/Explore";
import MatchResult from "./components/match/MatchResult";
import Today from "./components/Today/Today";
import Bestiary from "./components/Bestiary/Bestiary";
import Gender from "./components/Statistics/Gender";

function App() {
  const today = new Date();

  return (
    <div className={styled.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/today" element={<Today today={today} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/match" element={<InputNickname />} />
          <Route path="/game" element={<InputNickname />} />
          <Route path="/matchResult" element={<MatchResult />} />
          <Route path="/stats/gender" element={<Gender />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
