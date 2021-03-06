import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import "moment/locale/ko";
import "../../css/GameHof.css";
import BackButton from "../common/BackButton";
import { useStyles } from "../../utils/useStyles";
import * as Api from "../../api";
import { Typography } from "@mui/material";
import styled from "../../css/match.module.css";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { NicknameContext } from "../../context/NicknameContext";

const DIVIDER_HEIGHT = 5;

const GameHOF = () => {
  const classes = useStyles();
  const [rank, setRank] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const { nickname } = useContext(NicknameContext);
  const outerDivRef = useRef();

  const typoStyles = {
    fontFamily: "TmoneyRoundWindExtraBold",
    fontSize: "1.5rem",
  };

  const getData = async () => {
    try {
      const { data } = await Api.get("scores");
      setRank(data.rankList);
    } catch (e) {
      console.log(e);
    }
  };

  const getComment = async () => {
    try {
      const { data } = await Api.get("comments?location=honor");
      setCommentList([...Object.values(data.payload)]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("comments", {
        comment: commentContent,
        nickname,
        location: "honor",
      });
      setCommentList((current) => {
        const newComment = [...current];
        newComment.unshift(response.data.payload);
        return newComment;
      });
      setCommentContent("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
    getComment();
  }, []);

  const goToPosition = (e) => {
    e.preventDefault();

    const PAGE_HEIGHT = window.innerHeight;

    if (e.target.innerText === "????????? ?????????") {
      outerDivRef.current.scrollTo({
        top: PAGE_HEIGHT + DIVIDER_HEIGHT,
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

  return (
    <div className={`${styled.outer}`} ref={outerDivRef}>
      <div className={classes.navBar}>
        <BackButton
          content="????????????"
          className={classes.leftArrow}
          destination="explore"
        />
      </div>
      <div className={styled.inner}>
        <div className="rankWrap">
          <div className="imageWrap">
            <img src="images/trophy_rm.png" alt="trophy" />
            <div className={`hofTitle txt-shine`}>????????? ??????</div>
          </div>
          {rank.map((item, idx) => {
            return (
              <div className="rankList" key={idx}>
                <Typography sx={typoStyles} variant="body1" textAlign="center">
                  {idx + 1}???
                </Typography>
                <Typography sx={typoStyles} variant="body1" textAlign="center">
                  {item.nickname}
                </Typography>
                <Typography sx={typoStyles} variant="body1" textAlign="center">
                  {item.score}???
                </Typography>
              </div>
            );
          })}
        </div>
        <button className="goToCommentBtn" onClick={goToPosition}>
          ????????? ?????????
        </button>
      </div>
      <div className={styled.inner}>
        <form className={styled.commentForm} onSubmit={handleCommentSubmit}>
          <div className={styled.commentBack}>
            <input
              type="text"
              value={commentContent}
              onChange={handleContentChange}
              placeholder="????????? ??????????????????"
              required
            />
          </div>
          <button type="submit" className={styled.commentReg}>
            ??????
          </button>
        </form>
        {commentList.length > 0 ? (
          <div className={styled.commentArea}>
            {commentList.map((item, idx) => {
              return (
                <div
                  className={
                    idx % 2 === 0
                      ? `${styled.commentWrapper} ${styled.speechBubbleLeft}`
                      : `${styled.commentWrapper} ${styled.speechBubbleRight}`
                  }
                  key={commentList.indexOf(item)}
                >
                  <span className={styled.writer}>{item.nickname}</span>
                  <span
                    className={styled.commentDate}
                    style={{ fontFamily: "TmoneyRoundWindRegular" }}
                  >
                    {moment(moment.utc(item.createdAt).toDate()).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </span>
                  <div
                    className={styled.commentContent}
                    style={{ fontFamily: "TmoneyRoundWindRegular" }}
                  >
                    {item.comment}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styled.commentArea} style={{ textAlign: "center" }}>
            <span className={styled.writer}>?????? ????????? ????????? ????????? :(</span>
          </div>
        )}
        <HomeButton
          Icon={ArrowUpwardIcon}
          className={classes.topBtn}
          onClick={goToPosition}
        />
      </div>
    </div>
  );
};

export default GameHOF;
