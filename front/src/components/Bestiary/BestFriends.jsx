import styled from "styled-components";
import { useEffect, useState } from "react";

const BestFriends = (height, offset) => {
  const BestFriendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${height}px;
    width: auto;
    position: absolute;
    right: calc(50vw - ${offset}px);
  `;

  const LabelBf = styled.div`
    background-color: white;
  `;
  const IconBf = styled.img`
    src: ${(props) => props.src};
  `;

  return (
    <BestFriendWrapper>
      <LabelBf>최고의 궁합</LabelBf>
    </BestFriendWrapper>
  );
};
export default BestFriends;
