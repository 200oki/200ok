import "../../css/backButton.css";
import React from "react";
import usePathParams from "../../utils/usePathParams";
import { useNavigate } from "react-router-dom";

const BackButton = ({ content }) => {
  const navigator = useNavigate();
  const pathname = usePathParams();

  const backHome = () => {
    if (pathname === "/match-result") {
      navigator("/explore");
    } else {
      navigator(-1);
    }
  };

  return (
    <div className="leftArrow" onClick={backHome}>
      {content}
    </div>
  );
};

export default BackButton;
