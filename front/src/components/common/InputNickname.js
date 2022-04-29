import React, { useContext } from "react";
import Typewriter from "typewriter-effect";
import styled from "../../css/match.module.css";
import { useNavigate } from "react-router-dom";
import "../../css/typingFont.css";
import usePathParams from "../../utils/usePathParams";

import { NicknameContext } from "../../context/NicknameContext";

function InputNickname() {
  const { nickname, setNickname } = useContext(NicknameContext);
  const navigator = useNavigate();
  const pathname = usePathParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setNickname(nickname);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCheckUri = () => {
    if (pathname === "/game") {
      navigator("/game-intro");
    } else if (pathname === "/match") {
      navigator("/match-result");
    }
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
    console.log(nickname);
  };

  return (
    <div className={styled.Wrapper}>
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
