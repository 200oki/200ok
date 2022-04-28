import styled from "./css/App.module.css";
import "./css/main.css";
import "./fonts/font.css"
import { createGlobalStyle } from "styled-components";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import InputNickname from "./components/common/InputNickname";
import Explore from "./components/explore/Explore";
import MatchTest from "./components/match/MatchTest";
import MatchResult from "./components/match/MatchResult";
import Today from "./components/Today/Today";
import Bestiary from "./components/Bestiary/Bestiary";
import GameResult from "./components/game/GameResult";

const GlobalFont = createGlobalStyle`
  font-family: "TmoneyRoundWindExtraBold"
`

function App() {
  return (
    <div className={styled.App}>
      <GlobalFont />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/game" element={<InputNickname />} />
          <Route path="/game-result" element={<GameResult />} />
          <Route path="/today" element={<Today />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/match" element={<InputNickname />} />
          <Route path="/match-test" element={<MatchTest />} />
          <Route path="/match-result" element={<MatchResult />} />
          <Route path="/game" element={<InputNickname />} />
          <Route path="/matchResult" element={<MatchResult />} />
          <Route path="/bestiary" element={<Bestiary />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
