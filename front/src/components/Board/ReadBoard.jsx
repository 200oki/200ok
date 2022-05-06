import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import "../../css/readBoard.css";
import styled from "../../css/match.module.css";
import * as Api from "../../api";
import BackButton from "../common/BackButton";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { EditorState, Editor, convertFromRaw } from "draft-js";
import HomeButton from "../common/HomeButton";
import CommentIcon from "@mui/icons-material/Comment";
import { useStyles } from "../../utils/useStyles";

const Read = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isOpen, setIsOpen] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const classes = useStyles();

  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleContentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("comments", {
        villager: id,
        comment: commentContent,
        nickname: "익명",
        location: "post-comment",
      });
      setCommentList((current) => {
        const newComment = [...current];
        newComment.unshift(response.data.payload);
        return newComment;
      });
      setCommentContent("");
      console.log("댓글 post: ", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPostData = async () => {
    try {
      const { data } = await Api.get(`posts/${id}`);
      setPost(data.payload);

      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(data.payload.content))
        )
      );
      setImages(data.payload.images);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);
  // 댓글 데이터 요청
  const fetchCommentData = async () => {
    try {
      const { data } = await Api.get(
        `comments?villager=${id}&location=post-comment`
      );
      setCommentList([...Object.values(data.payload)]);
      console.log(commentList);
    } catch (err) {
      setCommentList([]);
      console.error(err);
    }
    return () => {};
  };

  const handleSidebar = () => {
    setIsOpen((isOpen) => !isOpen);
    if (isOpen) {
      document.querySelector(".sidebar").style.right = "-50vw";
      setTimeout(() => {
        document.querySelector(".sidebar-overlay").style.display = "none";
      }, 400);
    } else {
      document.querySelector(".sidebar").style.right = 0;
      document.querySelector(".sidebar-overlay").style.display = "flex";
    }
  };

  useEffect(() => {
    fetchPostData();
    fetchCommentData();
  }, [id]);

  return (
    <div className="ReadBoardWrapper">
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
      >
        <BackButton content={"뒤로가기"} />
      </div>

      <HomeButton
        Icon={CommentIcon}
        onClick={handleSidebar}
        className={classes.fab}
      />

      <div className="sidebar-overlay"></div>
      <div className="sidebar">
        <div className="sidebar-mid">
          <form className="postCommentForm" onSubmit={handleContentSubmit}>
            <div className="postCommentBack">
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                value={commentContent}
                onChange={handleContentChange}
                required
              />
            </div>
            <button type="submit" className="postCommentReg">
              등록
            </button>
          </form>
          {commentList.length > 0 ? (
            <div className="postCommentArea">
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
                    <span
                      className={styled.writer}
                      style={{ fontSize: "1.1rem" }}
                    >
                      {item.nickname}
                    </span>
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
            <div className="postCommentArea" style={{ textAlign: "center" }}>
              <span className={styled.writer}>
                아직 남겨진 댓글이 없어요 :(
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="postWrapper">
        <div className="titleArea">
          <div className="readBoardTitle">{post?.title}</div>
          <div>
            <span className="readBoardWriter">{post?.nickname}</span>{" "}
            <span
              className="readBoardDate"
              style={{ fontFamily: "TmoneyRoundWindRegular" }}
            >
              {moment(moment.utc(post?.createdAt).toDate()).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
          </div>
        </div>
        <hr />
        <div className="contentArea">
          <div className="postImageArea">
            {images.length > 0 ? (
              images.length === 1 ? (
                <div className="eachSlide">
                  <div
                    style={{
                      backgroundImage: `url(http://localhost:5001/uploads/${images[0]})`,
                    }}
                  ></div>
                </div>
              ) : (
                <Slide
                  easing="ease-in-out"
                  transitionDuration={800}
                  autoplay={false}
                >
                  {images.map((image, idx) => (
                    <div className="eachSlide" key={`image${idx}`}>
                      <div
                        style={{
                          backgroundImage: `url(http://localhost:5001/uploads/${images[idx]})`,
                        }}
                      ></div>
                    </div>
                  ))}
                </Slide>
              )
            ) : (
              <></>
            )}
          </div>
          <Editor editorState={editorState} readOnly={true} />
        </div>
      </div>
    </div>
  );
};

export default Read;
