import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import "../../css/GuestPost.css";

const AddGuestbookModal = () => {

  return (
    <div className="guestbookPostBg">
      <h2>제목</h2>
      <div className="guestbook">
        <textarea>
          내용
        </textarea>
      </div>
    </div>
  );
}

export default AddGuestbookModal;