import React, { createRef } from "react";
import styled from "../../css/match.module.css";
import InputBirthday from "./InputBirthday";
import SelectColor from "./SelectColor";
import SelectPersonality from "./SelectPersonality";
import SelectHobby from "./SelectHobby";
import SelectStyle from "./SelectStyle";

/* 
? 테스트 순서
* 생일 입력 -> 색(1) 14개 -> 성격 8 -> 취미 6개 -> 스타일(1) 6개
 */

function MatchTest() {
  const slideRef = createRef(null);

  const nextSlide = () => {
    slideRef.current.style.transform += "translateX(-100vw)";
  };

  const hobby = ["취미", "자연", "운동", "놀이", "교육", "패션", "음악"];
  const styles = [
    "스타일",
    "액티브",
    "쿨",
    "큐트",
    "엘레강스",
    "고져스",
    "심플",
  ];

  return (
    <div className={styled.slider} ref={slideRef}>
      <InputBirthday nextSlide={nextSlide} />
      <SelectColor nextSlide={nextSlide} />
      <SelectPersonality nextSlide={nextSlide} />
      <SelectHobby array={hobby} nextSlide={nextSlide} />
      <SelectStyle array={styles} nextSlide={nextSlide} />
    </div>
  );
}

export default MatchTest;
