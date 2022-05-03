import React, { useState, useContext } from "react";
import moment from "moment";
import "moment/locale/ko";
import * as Api from "../../api";
import { useStyles } from "../../utils/useStyles";
import styled from "../../css/match.module.css";
import HomeButton from "../common/HomeButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { NicknameContext } from "../../context/NicknameContext";

function MatchResultComment({
  goToPosition,
  commentList,
  setCommentList,
  name,
}) {
  const [commentContent, setCommentContent] = useState("");
  const { nickname } = useContext(NicknameContext);

  const classes = useStyles();

  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("comments", {
        villager: name,
        comment: commentContent,
        nickname: nickname,
        location: "recommendation",
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

  return (
    <>
      <form className={styled.commentForm} onSubmit={handleContentSubmit}>
        <div className={styled.commentBack}>
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            value={commentContent}
            onChange={handleContentChange}
            required
          />
        </div>
        <button type="submit" className={styled.commentReg}>
          등록
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
