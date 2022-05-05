import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./css/index.css";

import { GameProvider } from "./context/GameContext";
import { NicknameProvider } from "./context/NicknameContext";
import { MatchElementProvider } from "./context/MatchElementContext";
import { MatchCommentProvider } from "./context/MatchCommentContext";
import { GameAnswerProvider } from "./context/GameAnswerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NicknameProvider>
    <MatchElementProvider>
      <MatchCommentProvider>
        <GameAnswerProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </GameAnswerProvider>
      </MatchCommentProvider>
    </MatchElementProvider>
  </NicknameProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
