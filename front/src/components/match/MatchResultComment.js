import React, { useState, useContext } from "react";
import moment from "moment";
import "moment/locale/ko";
import * as Api from "../../api";
import { useStyles } from "../../utils/useStyles";
import styled from "../../css/match.module.css";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchCommentContext } from "../../context/MatchCommentContext";

function MatchResultComment({ goToPosition }) {
  const [commentContent, setCommentContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { nickname } = useContext(NicknameContext);
  const { comment, setComment } = useContext(MatchCommentContext);

  const classes = useStyles();

  const handleContentChange = (e) => {
    setIsTyping(true);
    setCommentContent(e.target.value);
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("comments", {
        villager: "아그네스",
        comment: commentContent,
        nickname: nickname,
        location: "recommendation",
      });
      setComment((current) => {
        const newComment = [...current];
        newComment.unshift(response.data.payload);
        return newComment;
      });
      setIsTyping(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className={styled.commentForm} onSubmit={handleContentSubmit}>
        <div className={styled.commentBack}>
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            value={isTyping ? commentContent : ""}
            onChange={handleContentChange}
            required
          />
        </div>
        <button type="submit" className={styled.commentReg}>
          등록
        </button>
      </form>
      {comment.length > 0 ? (
        <div className={styled.commentArea}>
          {comment.map((item) => (
            <div className={styled.commentWrapper} key={comment.indexOf(item)}>
              <span className={styled.writer}>{item.nickname}</span>
              <span className={styled.commentDate}>
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
          ))}
        </div>
      ) : (
        <div className={styled.commentArea} style={{ textAlign: "center" }}>
          <span className={styled.writer}>아직 남겨진 댓글이 없어요 :(</span>
        </div>
      )}

      <HomeButton
        Icon={ArrowUpwardIcon}
        className={classes.topBtn}
        onClick={goToPosition}
      />
    </>
  );
}

export default MatchResultComment;
