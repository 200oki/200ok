import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/Board.css";
import { BoardPostIdContext } from "../../context/BoardPostId";

const AddBoard = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postFiles, setPostFiles] = useState([]);
  const { setPostId } = useContext(BoardPostIdContext);

  const fileHandler = (e) => {
    if (e.target.files.length > 1) {
      // setPostFiles((v) => {
      //   return [[...e.target.files].map((item) => item[0])];
      // });
      [...e.target.files].map((item) => {
        console.log("mapTest======>", item);
        setPostFiles((v) => [...v, item]);
      });
    } else {
      console.log("one fileHandle", e.target.files);
      setPostFiles(e.target.files[0]);
    }
  };

  const handleNicknameChange = (e) => {
    setIsTyping(true);
    setNickname(e.target.value);
  };

  const handleTitleChange = (e) => {
    setIsTyping(true);
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setIsTyping(true);
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    if (content && title) {
      const formData = new FormData();

      postFiles.map((item) => formData.append("images", item));
      formData.append("title", title);
      formData.append("content", content);
      formData.append("nickname", nickname);

      console.log("formData=====>", formData.get("images"));
      try {
        const response = await axios.post(
          "http://localhost:5001/posts",
          formData,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setPostId(response.data.payload.id);
        navigate("/board");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="boardPost">
      <form className="boardForm" onSubmit={onSubmit}>
        <div className="contentBack">
          <div className="input">
            <input
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임을 입력해주세요"
              className="inputNickname"
            />
            <hr style={{ margin: "0 0 0 0" }} />
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
              className="inputTitle"
            />
            <input
              type="file"
              name="input_files"
              onChange={fileHandler}
              multiple
              className="inputFiles"
            />
          </div>
          <textarea
            className="boardTextarea"
            type="text"
            placeholder="내용을 입력해주세요"
            value={isTyping ? content : ""}
            onChange={handleContentChange}
            required
          />
        </div>
        <div className="alignButton">
          <button
            type="submit"
            className="exitBtn"
            onClick={() => navigate("/board")}
          >
            그만 쓸래
          </button>
          <button type="submit" className="submitBtn">
            오케이!
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBoard;
