import './css/main.css'
import React from 'react'
import {useEffect, useState, useRef} from "react";
import StyledItem from './components/StyledItem'
import {useStyles} from "./utils/useStyles";
import Player from 'react-audio-player';
import mainAudio from './audio/Main_Theme_PG.mp3'

function App() {
    const classes = useStyles()
    const [effect, setEffect] = useState('')
    const ref = useRef(null)
    useEffect(()=>{
        setEffect('logo')
        // document.querySelector('audio').play()
    }, [])

  return (
      <React.Fragment>
          <React.Fragment>
              <img className={effect} src='../public/images/main_logo_rm.png' alt={'animal Crossing'}/>
              <StyledItem type='button' className={`${classes.startBtn} ${effect}`} content='시작하기' />
              <Player className={classes.audio} src={mainAudio} autoPlay controls loop volume={0.3} controlsList={'nodownload'} ref={ref}/>
          </React.Fragment>
      </React.Fragment>
  );
}

export default App;
