import React, { useContext } from "react";
import styled from "../../css/match.module.css";
import StyledItem from "../StyledItem";

import { NicknameContext } from "../../context/NicknameContext";

function InputNickname() {
  const { nickname, setNickname } = useContext(NicknameContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * TODO: try-catch
     */
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
    console.log(nickname);
  };

  return (
    <div className={styled.Wrapper}>
      <div className={styled.title}>닉네임을 입력해주세요</div>
      <form onSubmit={handleSubmit} className={styled.form}>
        <div className={styled.inputBack}>
          <input value={nickname} onChange={handleChange} />
        </div>
        <button
          type="submit"
          className={nickname.length > 0 ? styled.btnActive : styled.btnHidden}
        >
          확인
        </button>
      </form>
    </div>
  );
}

export default InputNickname;
