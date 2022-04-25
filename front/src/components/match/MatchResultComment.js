import React, { useState, useContext } from "react";
import moment from "moment";
import "moment/locale/ko";
import * as Api from "../../api";
import styled from "../../css/match.module.css";

import { NicknameContext } from "../../context/NicknameContext";

function MatchResultComment({ resultComment, fetchCommentData }) {
  const [commentContent, setCommentContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { nickname } = useContext(NicknameContext);

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
      setCommentContent((cur) => {
        const newComment = [...cur];
        newComment.push(response.data.comments);
        return newComment;
      });
      setIsTyping(false);
      fetchCommentData();
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
      <div className={styled.commentArea}>
        {resultComment.map((item) => (
          <div
            className={styled.commentWrapper}
            key={resultComment.indexOf(item)}
          >
            <span className={styled.writer}>{item.nickname}</span>
            <span className={styled.commentDate}>
              {moment(moment.utc(item.createdAt).toDate()).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
            <div className={styled.commentContent}>{item.comment}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MatchResultComment;
