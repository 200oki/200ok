import React from "react";
import styled from "../../css/read.module.css";
import BackButton from "../common/BackButton";

const Read = () => {
  return (
    <div className={styled.Wrapper}>
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
      >
        <BackButton content={"뒤로가기"} />
      </div>
      <div className={styled.divider}></div>
      <div className={styled.postWrapper}>
        <div className={styled.titleArea}>
          <div className={styled.title}>글제목입니당</div>
          <div>
            <span className={styled.writer}>작성자</span>{" "}
            <span
              className={styled.date}
              style={{ fontFamily: "TmoneyRoundWindRegular" }}
            >
              2022-05-06
            </span>
          </div>
        </div>
        <hr />
        <div className={styled.contentArea}>
          <div className={styled.imageArea}>
            <img src="/images/main_logo_rm.png" alt="user_upload_image" />
          </div>
          <div
            className={styled.textArea}
            style={{ fontFamily: "TmoneyRoundWindRegular" }}
          >
            글 내용을 여기에 넣을 거에요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
