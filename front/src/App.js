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
import Stat from "./components/Statistics/Stat";
import GenderChart from "./components/Statistics/GenderChart";
import SpeciesChart from "./components/Statistics/SpeciesChart";
import PersonalityChart from "./components/Statistics/PersonalityChart";
import HobbyChart from "./components/Statistics/HobbyChart";
import StyleChart from "./components/Statistics/StyleChart";

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
          <Route path="/stats" element={<Stat />}>
            <Route path="gender" element={<GenderChart />} />
            <Route path="species" element={<SpeciesChart />} />
            <Route path="personality" element={<PersonalityChart />} />
            <Route path="hobby" element={<HobbyChart />} />
            <Route path="style" element={<StyleChart />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
