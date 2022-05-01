import "../../css/backButton.css";
import React, { useContext } from "react";
import usePathParams from "../../utils/usePathParams";
import { useNavigate } from "react-router-dom";

import { NicknameContext } from "../../context/NicknameContext";

const BackButton = ({ content }) => {
  const { setNickname } = useContext(NicknameContext);
  const navigator = useNavigate();
  const pathname = usePathParams();

  const backHome = () => {
    if (pathname === "/match-result" || "/match") {
      setNickname("");
      navigator("/explore");
    } else if (pathname === "/bestiary/list" || pathname === "/bestiary/statistics") {
      navigator("/bestiary");
    } else if (pathname === "/bestiary") {
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
