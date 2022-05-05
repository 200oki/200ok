import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "../../css/GuestPost.css";
import "moment/locale/ko";
import { GuestIdContext } from "../../context/GuestIdContext";

const AddGuestbook = () => {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [content, setContent] = useState("");
  const { setUserId } = useContext(GuestIdContext);

  const handleContentChange = (e) => {
    setIsTyping(true);
    setContent(e.target.value);
  };

  // 백엔드로 post 해주는 부분
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Api.post("guestbooks", {
        content: content,
      });
      console.log("data.payload==========>", data.payload);
      setUserId(data.payload.id);
      navigate("/guestbook");
      setIsTyping(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="guestbookPost">
      <form className="guestbookForm" onSubmit={handleSubmit}>
        <div className="contentBack">
          <textarea
            className="textarea"
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
            onClick={() => navigate("/guestbook")}
          >
            그만 쓸래
          </button>
          <button type="submit" className="submitBtn" onClick={handleSubmit}>
            오케이!
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGuestbook;
