import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import * as Api from './api';
import { loginReducer, searchReducer } from './reducer';
import Today from './components/Today/Today';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const SearchContext = createContext(null);
export const BookmarkListContext = createContext(null);

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
