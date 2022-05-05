import "../../css/backButton.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ParamContext } from "../../context/ParamContext";

/**
 * @param content
 * What you see in Back Button
 * @param destination
 * Where you want Navigate to
 */
const BackButton = ({ content, destination }) => {
  const { param } = useContext(ParamContext);
  const navigator = useNavigate();

  const backHome = () => {
    if (destination === undefined && param === null) {
      navigator(-1);
    } else if (param) {
      navigator(param);
    } else {
      destination.startsWith("/")
        ? navigator(destination)
        : navigator(`/${destination}`);
    }
  };

  return (
    <div className="leftArrow" onClick={backHome}>
      {content}
    </div>
  );
};

export default BackButton;
