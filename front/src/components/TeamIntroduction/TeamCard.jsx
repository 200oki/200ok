import React, { useState, useRef, useEffect } from "react";
import styled from "../../css/team.module.css";

const TeamList = ({ teamInfo, card, idx }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 150));
  };

  useEffect(setMaxHeight, [teamInfo]);

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
        style={{ backgroundImage: `url(${card.image})` }}
      ></div>
      <div className="back backImg" ref={backEl}>
        {idx < 3 ? (
          <div
            className={styled.teamPositionTitleBg}
            style={{ backgroundColor: "#91ed92" }}
          >
            <span
              className={styled.teamPositionTitle}
              style={{ color: "#fcf2cc" }}
            >
              {card.position}
            </span>
          </div>
        ) : (
          <div
            className={styled.teamPositionTitleBg}
            style={{ backgroundColor: "#ffe269" }}
          >
            <span className={styled.teamPositionTitle}>{card.position}</span>
          </div>
        )}
        <div className={styled.teamSubTitle}>
          <span className={styled.subTitle}>이름: </span>
          {card.name}
        </div>
        <div className={styled.teamSubTitle}>
          <span className={styled.subTitle}>매칭주민: </span>
          {card.character}
        </div>
        <div className={styled.teamSubTitle}>
          <span className={styled.subTitle}>한줄소개: </span>
          {card.introduction}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
