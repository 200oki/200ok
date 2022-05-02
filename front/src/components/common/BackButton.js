import "../../css/backButton.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NicknameContext } from "../../context/NicknameContext";

const BackButton = ({ content, destination }) => {
  const { setNickname } = useContext(NicknameContext);
  const navigator = useNavigate();

  const backHome = () => {
    console.log(destination);
    if (destination) {
      destination.startsWith("/")
        ? navigator(destination)
        : navigator(`/${destination}`);
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
