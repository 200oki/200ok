import React, { useContext, useRef, useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import styled from "../../css/match.module.css";
import MatchResultComment from "./MatchResultComment";

import { NicknameContext } from "../../context/NicknameContext";
import { style } from "@mui/system";

const DIVIDER_HEIGHT = 5;

function MatchResult() {
  const navigator = useNavigate();
  const { nickname, setNickname } = useContext(NicknameContext);
  const outerDivRef = useRef();
  const [resultComment, setResultComment] = useState([]);

  const fetchCommentData = async () => {
    try {
      const { data } = await Api.get(`comments/아그네스`, "recommendation");
      setResultComment(data.comments);
    } catch (err) {
      setResultComment([]);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, []);

  const wheelHandler = (e) => {
    e.preventDefault();

    const { deltaY } = e;
    const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
    const pageHeight = window.innerHeight;

    if (deltaY > 0) {
      // 스크롤 내릴 때
      if (scrollTop >= 0 && scrollTop < pageHeight) {
        outerDivRef.current.scrollTo({
          top: pageHeight + DIVIDER_HEIGHT,
          left: 0,
          behavior: "smooth",
        });
      } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        outerDivRef.current.scrollTo({
          top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
          left: 0,
          behavior: "smooth",
        });
      } else {
        outerDivRef.current.scrollTo({
          top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
          left: 0,
          behavior: "smooth",
        });
      }
    } else {
      // 스크롤 올릴 때
      if (scrollTop >= 0 && scrollTop < pageHeight) {
        outerDivRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
        outerDivRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        outerDivRef.current.scrollTo({
          top: pageHeight + DIVIDER_HEIGHT,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const goToPosition = (e) => {
    e.preventDefault();

    const pageHeight = window.innerHeight;

    if (e.target.innerText === "랭킹") {
      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: "smooth",
      });
    } else {
      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const outerDivRefCurrent = outerDivRef.current;

    outerDivRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const goToFirstPage = () => {
    setNickname("");
    navigator("/match");
  };

  return (
    <div className={styled.outer} ref={outerDivRef}>
      <div className={styled.inner}>
        <div className={styled.imgWrapper}>
          <img src="/images/Aurora.png" />
        </div>
        <div className={styled.textWrapper}>
          <div>{nickname} 님과 잘 어울리는 주민은</div>
          <div className={styled.villagerName}>❝ 오로라 ❞</div>
          <div>귀염뽀짝 어쩌구 저쩌구</div>
          <div>구구절절 쫑알쫑알</div>
          <div>최고의 궁합!</div>
        </div>
        <div className={styled.btnsWrapper}>
          <button>공유하기</button>
          <button onClick={goToFirstPage}>다시하기</button>
          <button onClick={(e) => goToPosition(e)}>랭킹</button>
          <button onClick={(e) => goToPosition(e)}>반응 남기기</button>
        </div>
      </div>
      <div className={styled.divider}></div>
      <div className={styled.inner}>랭킹 영역</div>
      <div className={styled.divider}></div>
      <div className={styled.inner}>
        <MatchResultComment
          resultComment={resultComment}
          fetchCommentData={fetchCommentData}
        />
      </div>
    </div>
  );
}

export default MatchResult;
