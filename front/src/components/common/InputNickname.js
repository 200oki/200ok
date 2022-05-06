import React, { useEffect, useContext } from "react";
import Typewriter from "typewriter-effect";
import styled from "../../css/match.module.css";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../utils/useStyles";
import "../../css/typingFont.css";
import usePathParams from "../../utils/usePathParams";
import BackButton from "./BackButton";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

function InputNickname() {
  const { nickname, setNickname } = useContext(NicknameContext);
  const { setId } = useContext(MatchElementContext);
  const { setIdKo } = useContext(MatchElementContext);
  const { setMatchElem } = useContext(MatchElementContext);
  const navigator = useNavigate();
  const pathname = usePathParams();
  const classes = useStyles();

  // 1. InputNickname 페이지로 왔을 때 최초 닉네임 초기화
  // 2. MatchElem 요소들 초기화
  useEffect(() => {
    setNickname("");
    setId(null);
    setIdKo(null);
    setMatchElem([]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNickname(nickname);
  };

  const handleCheckUri = () => {
    if (pathname === "/game") {
      navigator("/game-intro");
    } else if (pathname === "/match") {
      navigator("/match-intro");
    }
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div className={styled.Wrapper}>
      <div className={classes.navBar}>
        <BackButton content={"메인으로"} destination="explore" />
      </div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("닉네임을 입력해주세요.")
            .callFunction(() => {
              console.log("String typed out!");
            })
            .pauseFor(2500)
            .callFunction(() => {
              console.log("All strings were deleted");
            })
            .start();
        }}
      />
      <form onSubmit={handleSubmit} className={styled.inputForm}>
        <div className={styled.inputBack}>
          <input value={nickname} onChange={handleChange} />
        </div>
        <button
          type="button"
          className={nickname.length > 0 ? styled.btnActive : styled.btnHidden}
          onClick={handleCheckUri}
        >
          확인
        </button>
      </form>
    </div>
  );
}

export default InputNickname;
