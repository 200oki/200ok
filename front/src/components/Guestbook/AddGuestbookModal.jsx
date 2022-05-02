import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: relative;
  background-image: url("/images/guestbookPostBg.png");
  content: " ";
  display: block;
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  left: 10;
  top: 10;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const AddGuestbookModal = () => {

  return (
    <div>
      <Container>
        <h2>제목</h2>
        {/* <input type="submit">완성</input> */}
      </Container>
    </div>
  );
}

export default AddGuestbookModal;