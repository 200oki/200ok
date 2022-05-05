import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/Board.css";

const AddBoard = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleNicknameChange = (e) => {
    setIsTyping(true);
    setNickname(e.target.value);
  }

  const handleTitleChange = (e) => {
    setIsTyping(true);
    setTitle(e.target.value);
  }

  const handleContentChange = (e) => {
    setIsTyping(true);
    setContent(e.target.value);
  };

  // 백엔드로 post 해주는 부분
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("nick :", nickname);
    console.log("title :", title);
    console.log("content :", content);

    try {
      const response = await Api.post("guestbooks", {
        nickname,
        title,
        content,
      });
      setContent((current) => {
        const newBoard = [...current];
        newBoard.push(response.data.payload);
        console.log("새거 :", newBoard[newBoard.length-1]); // 데이터 잘 들어있는지 확인

        navigate(`/board/${newBoard.id}`);
      });
      setIsTyping(false);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="boardPost">
      <form className="boardForm" onSubmit={handleSubmit}>
        <div className="contentBack">
          <input value={nickname} onChange={handleNicknameChange} />
          <input value={title} onChange={handleTitleChange} />
          <textarea className="textarea"
            type="text"
            placeholder="내용을 입력해주세요"
            value={isTyping ? content : ""}
            onChange={handleContentChange}
            required
          />
        </div>
        <div className="alignButton">
          <button type="submit" className="exitBtn" onClick={() => navigate('/board')}>
            그만 쓸래
          </button>
          <button type="submit" className="submitBtn" onClick={(e) => handleSubmit(e)} >
            오케이!
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBoard;