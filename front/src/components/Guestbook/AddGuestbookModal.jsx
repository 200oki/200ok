import React, { useState, useContext } from "react";
import DeleteButton from "../common/DeleteButton.js";
import * as Api from "../../api";
import "../../css/GuestPost.css";
import "moment/locale/ko";

const AddGuestbookModal = () => {
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
        return newContent;
      });
      setIsTyping(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="guestbookPost">
      <DeleteButton />
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
        <button type="submit" className="submitBtn">
          오케이!
        </button>
      </form>
    </div>
  );
}

export default AddGuestbookModal;