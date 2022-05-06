import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./css/index.css";

import { GameProvider } from "./context/GameContext";
import { GuestIdProvider } from "./context/GuestIdContext";
import { ParamProvider } from "./context/ParamContext";
import { NicknameProvider } from "./context/NicknameContext";
import { MatchElementProvider } from "./context/MatchElementContext";
import { GameAnswerProvider } from "./context/GameAnswerContext";
import { DateProvider } from "./context/DateContext";
import { BoardPostIdProvider } from "./context/BoardPostId";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NicknameProvider>
    <MatchElementProvider>
      <GameAnswerProvider>
        <GameProvider>
          <ParamProvider>
            <GuestIdProvider>
              <DateProvider>
                <BoardPostIdProvider>
                  <App />
                </BoardPostIdProvider>
              </DateProvider>
            </GuestIdProvider>
          </ParamProvider>
        </GameProvider>
      </GameAnswerProvider>
    </MatchElementProvider>
  </NicknameProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
