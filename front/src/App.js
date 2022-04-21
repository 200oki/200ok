import InputNickname from "./components/match/InputNickname";
import styled from "./css/App.module.css";
import Today from './components/Today/Today';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const today = new Date();

  return (
    <div className={styled.App}>
      {/* <InputNickname /> */}
      <Router>
        <Routes>
          <Route path='/today' element={<Today today = {today}/>} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
