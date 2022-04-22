import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Api from './api';
import Today from './components/Today/Today';

function App() {
  const today = new Date();

  return (

    <Router>
      <Routes>
        <Route path='/today' element={<Today today = {today}/>} />
      </Routes>
    </Router>
  );
}

export default App;
