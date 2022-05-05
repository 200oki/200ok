import "../../css/backButton.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NicknameContext } from "../../context/NicknameContext";

/**
 * @param content
 * @param destination
 */
const BackButton = ({ content, destination }) => {
  const { nickname, setNickname } = useContext(NicknameContext);
  const navigator = useNavigate();

  const backHome = () => {
    if (nickname) setNickname("");
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
