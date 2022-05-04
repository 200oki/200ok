import React, { useState, useContext } from "react";
import ExitButton from "../common/ExitButton.js";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/GuestPost.css";
import "moment/locale/ko";

const AddGuestbook = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setIsTyping(true);
    setContent(e.target.value);
  };

  // 백엔드로 post 해주는 부분
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("guestbooks", {
        content: content,
      });
      setContent((current) => {
        const newContent = [...current];
        newContent.push(response.data.payload);
        console.log("새거 :", newContent[newContent.length-1]); // 데이터 잘 들어있는지 확인

        // 모달을 띄워주기 위해 state로 다 가져가기
        navigate('/guestbook', 
          { state: { payload: newContent[newContent.length-1], modal: true } });
      });
      setIsTyping(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="guestbookPost">
      <form className="guestbookForm" onSubmit={handleSubmit}>
        <div className="contentBack">
          <textarea className="textarea"
            type="text"
            placeholder="내용을 입력해주세요"
            value={isTyping ? content : ""}
            onChange={handleContentChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="exitBtn">
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

export default AddGuestbook;