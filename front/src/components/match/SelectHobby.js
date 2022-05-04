import React, { useState, useContext } from "react";
import styled from "../../css/match.module.css";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const SelectHobby = ({ array, nextSlide }) => {
  const { nickname } = useContext(NicknameContext);
  const { matchElem, setMatchElem } = useContext(MatchElementContext);

  const [hobby, setHobby] = useState(null);

  const handleClick = (e) => {
    nextSlide();
    handleTestSubmit(e);
  };

  const handleHobbyStyleChange = (e) => {
    setHobby(e.target.value);
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();

    setMatchElem([...matchElem, hobby]);
  };

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>{nickname}님의 취미는 무엇인가요?</div>
      <form className={styled.hobbyStyleForm}>
        <div>
          <div className={styled.hobbyStyleDiv}>
            {array
              .filter((a) => array.indexOf(a) !== 0)
              .map((p, i) => (
                <div key={`input${i}`} className={styled.hobbyStyleRadioBtn}>
                  <input
                    type="radio"
                    value={array[i + 1]}
                    id={`hobby${i}`}
                    name={array[0]}
                    onChange={handleHobbyStyleChange}
                  />
                  <label htmlFor={`hobby${i}`}>{p}</label>
                </div>
              ))}
          </div>
        </div>
      </form>
      <button
        className={hobby !== null ? styled.btnActive : styled.btnHidden}
        onClick={handleClick}
      >
        다음
      </button>
    </div>
  );
};

export default SelectHobby;
