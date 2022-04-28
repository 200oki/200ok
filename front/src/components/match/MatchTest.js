import React, { createRef } from "react";
import styled from "../../css/match.module.css";

import InputBirthday from "./InputBirthday";
import SelectPersonality from "./SelectPersonality";

/* 
? 테스트 순서
* 생일 입력 -> 색(1) 14개 -> 성격 8 -> 취미 6개 -> 스타일(1) 6개
 */

function MatchTest() {
  const slideRef = createRef(null);

  const nextSlide = () => {
    console.log(slideRef.current);
    slideRef.current.style.transform += "translateX(-100vw)";
  };

  return (
    <div className={styled.slider} ref={slideRef}>
      <InputBirthday nextSlide={nextSlide} />
      <SelectPersonality nextSlide={nextSlide} />
    </div>
  );
}

export default MatchTest;
