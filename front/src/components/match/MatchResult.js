import React, { useContext, useRef, useEffect, useState } from "react";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import styled from "../../css/match.module.css";
import MatchResultCompat from "./MatchResultCompat";
import MatchResultRank from "./MatchResultRank";
import MatchResultComment from "./MatchResultComment";
import BackButton from "../common/BackButton";
import Typewriter from "typewriter-effect";

import { ParamContext } from "../../context/ParamContext";
import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

const DIVIDER_HEIGHT = 5;

function MatchResult() {
  const navigator = useNavigate();
  const { setParam } = useContext(ParamContext);
  const { nickname, setNickname } = useContext(NicknameContext);
  const outerDivRef = useRef();

  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [myChar, setMyChar] = useState({});
  const [goodBad, setGoodBad] = useState([]);
  const [best3, setBest3] = useState([]);

  const { matchElem } = useContext(MatchElementContext);

  // result로 나온 data count를 1 증가시키고 count, id set
  const fetchResultData = async () => {
    try {
      const { data } = await Api.put("csmdata/counts", {
        birthday: `${matchElem[0]}-${matchElem[1]}`,
        colors: matchElem[2],
        personality: matchElem[3],
        hobby: matchElem[4],
        styles: matchElem[5],
      });
      setId(data.payload.id);
    } catch (err) {
      console.error(err);
    }
  };

  // 나와 궁합이 맞는 주민
  const fetchMyCharData = async () => {
    try {
      const { data } = await Api.get(`csmdata/${id}/count`);
      setMyChar(data.payload);
      console.log("goonghab", data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  // 나와 일치하는 유형별 궁합(2명)
  const fetchGoodBadData = async () => {
    try {
      const { data } = await Api.get(`csmdata/${id}?top=1&bottom=1`);
      setGoodBad(data.payload);
      console.log("goodBad", data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  // count를 기준으로 가장 많은 유형(3명)
  const fetchBest3Data = async () => {
    try {
      const { data } = await Api.get(`csmdata/counts`);
      setBest3(data.payload);
      console.log("best3", data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 데이터 요청
  const fetchCommentData = async () => {
    try {
      const { data } = await Api.get(
        `comments?villager=${id}&location=recommendation`
      );
      setCommentList([...Object.values(data.payload)]);
    } catch (err) {
      setCommentList([]);
      console.error(err);
    }
    return () => {};
  };

  useEffect(() => {
    fetchResultData();
    setParam(null);
  }, []);

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchMyCharData(),
        fetchGoodBadData(),
        fetchBest3Data(),
        fetchCommentData(),
      ]);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  }, [id]);

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
          <img src={myChar.image_photo} alt={"주민 사진"} />
        </div>
        <div className={styled.textWrapper}>
          <div>{nickname} 님과 잘 어울리는 주민은</div>
          <div className={styled.villagerName}>❝ {myChar.name_ko} ❞</div>
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
        <MatchResultCompat goodBad={goodBad} goToPosition={goToPosition} />
      </div>
      <div className={styled.inner}>
        <MatchResultRank best3={best3} goToPosition={goToPosition} />
      </div>
      <div className={styled.inner}>
        <MatchResultComment
          name={myChar.name_ko}
          goToPosition={goToPosition}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      </div>
    </div>
  );
}

export default MatchResult;
