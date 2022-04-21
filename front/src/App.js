import InputNickname from "./components/match/InputNickname";
import styled from "./css/App.module.css";
import Today from './components/Today/Today';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/main.css'
import React from 'react'
import {useEffect, useState, useRef} from "react";
import StyledItem from './components/StyledItem'
import {useStyles} from "./utils/useStyles";
import Player from 'react-audio-player';
import mainAudio from './audio/Main_Theme_PG.mp3'

function App() {
    const today = new Date();
    const classes = useStyles()
    const [effect, setEffect] = useState('')
    const ref = useRef(null)
    useEffect(()=>{
        setEffect('logo')
        // document.querySelector('audio').play()
    }, [])

  return (
    <div className={styled.App}>
      {/* <InputNickname /> */}
      <Router>
        <Routes>
          <Route path='/today' element={<Today today = {today}/>} />
        </Routes>
      </Router>
        <img className={effect} src='../public/images/main_logo_rm.png' alt={'animal Crossing'}/>
        <StyledItem type='button' className={`${classes.startBtn} ${effect}`} content='시작하기' />
        <Player className={classes.audio} src={mainAudio} autoPlay controls loop volume={0.3} controlsList={'nodownload'} ref={ref}/>
    </div>


  );
}

export default App;
