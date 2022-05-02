import React, { useState, useRef, useEffect } from "react";
import styled from "../../css/team.module.css";

const TeamList = ({ tmp, card, idx }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 150));
  };

  useEffect(setMaxHeight, [tmp]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  const handleClick = () => {
    setFlip((v) => !v);
  };

  return (
    <div
      style={{ height: height }}
      onClick={handleClick}
      className={`card2 ${flip ? "flip" : ""}`}
      key={idx}
    >
      <div
        className="front"
        ref={frontEl}
        style={{ backgroundImage: `url(${card.image_photo})` }}
      ></div>
      <div className="back" ref={backEl}>
        <div className="teamPositionTitle">
          {idx < 3 ? "Back End" : "Front End"}
        </div>
        <div className="teamMemberTitle">ㅇㅇㅇ</div>
        <div className="teamMemberIntro">한줄소개</div>
      </div>
    </div>
  );
};

export default TeamList;
