import styled from "./css/App.module.css";
import "./css/main.css";
import React from "react";
import { useStyles } from "./utils/useStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import InputNickname from "./components/match/InputNickname";
import Explore from "./components/explore/Explore";
import Quiz from "./components/quiz/Quiz";
import MatchResult from "./components/match/MatchResult";
import Today from './components/Today/Today';

function App() {
  const today = new Date();
  const classes = useStyles();

  return (
    <div className={styled.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/today' element={<Today today = {today}/>} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/match" element={<InputNickname />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/matchResult" element={<MatchResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
