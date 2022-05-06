import React, { useState, useContext, useEffect } from "react";
import styled from "../../css/match.module.css";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const SelectStyle = ({ array }) => {
  const navigator = useNavigate();
  const { nickname } = useContext(NicknameContext);
  const { id, setId } = useContext(MatchElementContext);
  const { matchElem, setMatchElem } = useContext(MatchElementContext);
  const { setIdKo } = useContext(MatchElementContext);

  const [style, setStyle] = useState(null);

  const handleClick = (e) => {
    handleTestSubmit(e);
  };

  const handleHobbyStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();

    setMatchElem([...matchElem, [style]]);
  };

  // result로 나온 data count를 1 증가시키고 count, id와 idKo set
  const fetchResultData = async () => {
    try {
      const { data } = await Api.put("csmdata/counts", {
        birthday: `${matchElem[0]}-${matchElem[1]}`,
        colors: matchElem[2],
        personality: matchElem[3],
        hobby: matchElem[4],
        styles: matchElem[5],
      });
      setIdKo(data.payload.character.name_ko);
      setId(data.payload.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("MatchElem", matchElem);
    if (matchElem.length === 6 && id === null) {
      fetchResultData();
      return navigator("/match-result");
    }
  }, [matchElem, id]);

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>
        {nickname}님의 스타일을 알려주세요!
      </div>
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
                    id={`style${i}`}
                    name={array[0]}
                    onChange={handleHobbyStyleChange}
                  />
                  <label htmlFor={`style${i}`}>{p}</label>
                </div>
              ))}
          </div>
        </div>
      </form>
      <button
        className={style !== null ? styled.btnActive : styled.btnHidden}
        onClick={handleClick}
      >
        다음
      </button>
    </div>
  );
};

export default SelectStyle;
