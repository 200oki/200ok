import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/Board.css";

const AddBoard = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postfiles, setPostfiles] = useState({
    file: [],
  });

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

  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let files = e.target.profile_files.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let dataSet = {
      nickname,
      title,
      content,
    };

    formData.append("data", JSON.stringify(dataSet));
    
    try {
      const response = await axios({
        method: "POST",
        url: "posts",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      setContent((current) => {
        const newBoard = [...current];
        newBoard.push(response.data.payload);
        console.log("새거 :", newBoard.id); // 데이터 잘 들어있는지 확인

        navigate(`/board/${newBoard.id}`);
      });
      setIsTyping(false);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="boardPost">
      <form className="boardForm" onSubmit={(e) => onSubmit(e)}>
        <div className="contentBack">
          <div className="input">
            <input 
              value={nickname} 
              onChange={handleNicknameChange} 
              placeholder="닉네임을 입력해주세요" 
              className="inputNickname" 
            />
            <hr style={{margin: '0 0 0 0'}}/>
            <input 
              value={title} 
              onChange={handleTitleChange} 
              placeholder="제목을 입력해주세요"
              className="inputTitle" 
            />
            <input
              type="file"
              name="profile_files"
              multiple="multiple"
            />
          </div>
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
          <button type="submit" className="submitBtn">
            오케이!
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBoard;