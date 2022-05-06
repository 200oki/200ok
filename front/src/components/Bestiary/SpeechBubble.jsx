import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  height: 8rem;
  width: 100%;
  min-width: 200px;
  background: ivory;
  display: flex;
  margin: 0;
  border-radius: 20px;
  font-size: 1.24rem;
  font-family: "TmoneyRoundWindExtraBold";
  justify-content: center;
  align-items: center;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const Pointer = styled.div`
  height: 40px;
  width: 40px;
  background: ivory;
  margin-top: -20px;
  transform: rotate(45deg);
  border-radius: 0px 0px 12px;
  position: absolute;
  left: 50vw;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const SpeechBubble = ({ payload }) => {
  return (
    <>
      <Bubble>
        안녕! 나는
        <span style={{ color: "#3881BC", fontSize: "1.5rem", marginLeft: "0.2em" }}>{payload}</span>!
      </Bubble>
      <Pointer />
    </>
  );
};
export default SpeechBubble;
