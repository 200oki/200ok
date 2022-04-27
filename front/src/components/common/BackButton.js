import "../../css/backButton.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigator = useNavigate();

  const backHome = () => {
    navigator(-1);
    // if (window.location.pathname === "/game-start") {
    //   navigator("/explore");
    // }
  };

  return (
    <div className="leftArrow" onClick={backHome}>
      뒤로 가기
    </div>
  );
};

export default BackButton;
