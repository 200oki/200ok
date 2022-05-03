import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import "../../css/GuestPost.css";

const AddGuestbookModal = () => {
  const [content, setContent] = useState([]);

  // 백엔드로 post 해주는 부분
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("guestbooks", {
        content,
      });
      setContent((current) => {
        const newGuestBook = [...current];
        newGuestBook.push(response.payload);
        return newGuestBook;
      });
    } catch (err) {
      alert("내용을 입력해주세요!")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="내용을 입력해주세요" />
        <button>오케이!</button>
      </form>
    </div>
  );
}

export default AddGuestbookModal;