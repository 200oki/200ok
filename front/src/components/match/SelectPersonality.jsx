import React, { useState, useContext } from "react";
import styled from "../../css/match.module.css";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";
import { useEffect } from "react";

function SelectPersonality({ nextSlide }) {
  const { nickname } = useContext(NicknameContext);
  const { matchElem, setMatchElem } = useContext(MatchElementContext);
  const { resultMent, setResultMent } = useContext(MatchElementContext);
  const [personality, setPersonality] = useState(null);

  const personalities = [
    {
      key: "무뚝뚝",
      value: "츤데레라는 소리를 자주 듣는 편이다.",
      result: "겉으로는 강해보여도 의외로 여린면이 있는",
    },
    {
      key: "아이돌",
      value: "엉뚱하고 오덕기질이 있다.",
      result: "사교적이고 발랄한",
    },
    {
      key: "단순 활발",
      value: "노빠꾸 기질이 있는 편이다.",
      result: "거침없고 털털한",
    },
    {
      key: "먹보",
      value: "주변의 변화를 늦게 알아차리는 편이다.",
      result: "순수한 어린 아이같은",
    },
    {
      key: "친절함",
      value: "평소에 남을 잘 챙기는 편이다.",
      result: "누구에게든 친절하고 상냥한",
    },
    {
      key: "성숙함",
      value: "쇼핑, 패션에 관심이 많다.",
      result: "우아하고 기품있는",
    },
    {
      key: "운동광",
      value: "운동을 즐겨하는 편이다.",
      result: "활기찬 근육덕후인",
    },
    {
      key: "느끼함",
      value: "내 안의 흑염룡이 날뛰고 있는 것 같다. 크큭.",
      result: "낭만적이고 로맨틱한",
    },
  ];

  const handlePersonalityChange = (e) => {
    setPersonality(e.target.value);
  };

  const handleResultMentSetting = () => {
    const rm = personalities.filter((p) => {
      return p.key === personality;
    });
    setResultMent([...resultMent, rm[0].result]);
  };

  useEffect(() => {
    if (personality !== null) {
      handleResultMentSetting();
    }
  }, [personality]);

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>
        {nickname}님의 성향에 가까운 것을 선택해주세요!
        <span className={styled.subTestTitle}>(3 / 5)</span>
      </div>
      <form className={styled.personForm}>
        <div>
          <div className={styled.personalityLeftDiv}>
            {personalities
              .filter((p) => personalities.indexOf(p) < 4)
              .map((p, i) => (
                <div key={`input${i}`} className={styled.personRadioBtn}>
                  <input
                    type="radio"
                    value={p.key}
                    id={`personality${i}`}
                    name="personality"
                    onChange={handlePersonalityChange}
                  />
                  <label htmlFor={`personality${i}`}>{p.value}</label>
                </div>
              ))}
          </div>
          <div className={styled.personalityRightDiv}>
            {personalities
              .filter((p) => personalities.indexOf(p) >= 4)
              .map((p, i) => (
                <div key={`input${i + 4}`} className={styled.personRadioBtn}>
                  <input
                    type="radio"
                    value={p.key}
                    id={`personality${i + 4}`}
                    name="personality"
                    onChange={handlePersonalityChange}
                  />
                  <label htmlFor={`personality${i + 4}`}>{p.value}</label>
                </div>
              ))}
          </div>
        </div>
      </form>
      <button
        className={personality !== null ? styled.btnActive : styled.btnHidden}
        onClick={() => {
          setMatchElem([...matchElem, personality]);
          nextSlide();
        }}
      >
        다음
      </button>
    </div>
  );
}

export default SelectPersonality;
