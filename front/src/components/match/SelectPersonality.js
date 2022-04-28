import React, { useState, useContext } from "react";
import styled from "../../css/match.module.css";
import Select from "@mui/material/Select";

import { NicknameContext } from "../../context/NicknameContext";

function SelectPersonality({ nextSlide }) {
  const { nickname } = useContext(NicknameContext);
  const [person, setPerson] = useState(null);

  const personality = [
    "주변의 변화를 늦게 알아차리는 편이다.",
    "운동을 즐겨하는 편이다.",
    "츤데레라는 소리를 자주 듣는 편이다.",
    "내 안의 흑염룡이 날뛰고 있는 것 같다. 크큭.",
    "평소에 남을 잘 챙기는 편이다.",
    "엉뚱하고 오덕기질이 있다.",
    "쇼핑, 패션에 관심이 많다.",
    "노빠꾸 기질이 있다.",
  ];

  const handlePersonalityChange = (e) => {
    setPerson(e.target.value);
  };

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>
        {nickname}님의 성향에 가까운 것을 선택해주세요!
      </div>
      <form className={styled.personForm}>
        <div>
          <div className={styled.personalityLeftDiv}>
            {personality
              .filter((p) => personality.indexOf(p) < 4)
              .map((p, i) => (
                <div key={`input${i}`} className={styled.personRadioBtn}>
                  <input
                    type="radio"
                    value={i}
                    id={i}
                    name="personality"
                    onChange={handlePersonalityChange}
                  />
                  <label htmlFor={i}>{p}</label>
                </div>
              ))}
          </div>
          <div className={styled.personalityRightDiv}>
            {personality
              .filter((p) => personality.indexOf(p) >= 4)
              .map((p, i) => (
                <div key={`input${i + 4}`} className={styled.personRadioBtn}>
                  <input
                    type="radio"
                    value={i + 4}
                    id={i + 4}
                    name="personality"
                    onChange={handlePersonalityChange}
                  />
                  <label htmlFor={i + 4}>{p}</label>
                </div>
              ))}
          </div>
        </div>
      </form>
      <button
        className={person !== null ? styled.btnActive : styled.btnHidden}
        onClick={nextSlide}
      >
        다음
      </button>
    </div>
  );
}

export default SelectPersonality;
