import React, { useContext, useRef, useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import styled from "../../css/match.module.css";
import MatchResultCompat from "./MatchResultCompat";
import MatchResultRank from "./MatchResultRank";
import MatchResultComment from "./MatchResultComment";
import BackButton from "../common/BackButton";
import Typewriter from "typewriter-effect";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchCommentContext } from "../../context/MatchCommentContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const DIVIDER_HEIGHT = 5;
const v = "아그네스";
const l = "recommendation";

function MatchResult() {
  const navigator = useNavigate();
  const { nickname, setNickname } = useContext(NicknameContext);
  const { setComment } = useContext(MatchCommentContext);
  const outerDivRef = useRef();

  const [sample, setSample] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { matchElem } = useContext(MatchElementContext);

  const fetchCommentData = async () => {
    try {
      const { data } = await Api.get(`comments?villager=${v}&location=${l}`);
      setComment([...Object.values(data.payload)]);
    } catch (err) {
      setComment([]);
      console.error(err);
    }
    return () => {};
  };

  const getChar = async () => {
    try {
      const { data } = await Api.get(
        `characters/random?size=3&fields=id%2Cname_ko%2Cimage_photo`
      );
      setSample([...Object.values(data.payload)]);
    } catch (err) {
      console.error(err);
    }
    return () => {};
  };

  const goToPosition = (e) => {
    e.preventDefault();

    const PAGE_HEIGHT = window.innerHeight;

    if (e.target.innerText === "유형별 궁합") {
      outerDivRef.current.scrollTo({
        top: PAGE_HEIGHT + DIVIDER_HEIGHT,
        left: 0,
        behavior: "smooth",
      });
    } else if (e.target.innerText === "가장 많은 유형") {
      outerDivRef.current.scrollTo({
        top: PAGE_HEIGHT * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: "smooth",
      });
    } else if (e.target.innerText === "반응 남기기") {
      outerDivRef.current.scrollTo({
        top: PAGE_HEIGHT * 3 + DIVIDER_HEIGHT * 3,
        left: 0,
        behavior: "smooth",
      });
    } else {
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const goToFirstPage = () => {
    setNickname("");
    navigator("/match");
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCommentData(); // 매칭된 주민 캐릭터 댓글 요청
      getChar();
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return (
      <div className={`${styled.loadingWrapper} ${styled.LoadingTitle}`}>
        {nickname}님과 찰떡궁합인 주민을 찾고 있어요
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString("...:)").pauseFor(1000).start();
          }}
          options={{ loop: true, cursor: "", deleteSpeed: 100 }}
        />
      </div>
    );
  }

  return (
    <div className={styled.outer} ref={outerDivRef}>
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
      >
        <BackButton content={"메인으로"} destination={"explore"} />
      </div>
      <div className={styled.inner}>
        <div className={styled.imgWrapper}>
          <img src="/images/Aurora.png" alt={"주민 사진"} />
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
          <button onClick={goToPosition}>유형별 궁합</button>
          <button onClick={goToPosition}>가장 많은 유형</button>
          <button onClick={goToPosition}>반응 남기기</button>
        </div>
      </div>
      <div className={styled.inner}>
        <MatchResultCompat sample={sample} goToPosition={goToPosition} />
      </div>
      <div className={styled.inner}>
        <MatchResultRank sample={sample} goToPosition={goToPosition} />
      </div>
      <div className={styled.inner}>
        <MatchResultComment goToPosition={goToPosition} />
      </div>
    </div>
  );
}

export default MatchResult;
