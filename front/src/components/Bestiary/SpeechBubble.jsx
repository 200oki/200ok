import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 8rem;
`;

const Bubble = styled.div`
  height: 8rem;
  width: 100%;
  min-width: 200px;
  background: ivory;
  display: flex;
  margin: 50px auto 0px;
  border-radius: 20px;
  font-size: 1.24rem;
  font-family: "TmoneyRoundWindExtraBold";
  justify-content: center;
  align-items: center;
`;

const Pointer = styled.div`
  height: 40px;
  width: 40px;
  background: ivory;
  margin: -22px auto 0px;
  transform: rotate(45deg);
  border-radius: 0px 0px 12px;
  position: relative;
  left: calc(0.5vw - 50px);
`;

const BubbleShadow = styled.div`
  height: 8rem;
  width: 40%;
  min-width: 200px;
  background: ivory;
  display: block;
  margin: 50px auto 0px;
  border-radius: 20px;
  font-size: 200px;
  text-align: center;
  background: gray;
  filter: blur(20px);
  position: relative;
  top: -315px;
  z-index: -1;
`;

const PointerShadow = styled.div`
  height: 40px;
  width: 40px;
  background: ivory;
  margin: -22px auto 0px;
  transform: rotate(45deg);
  border-radius: 0px 0px 12px;
  position: relative;
  left: calc(0.5vw - 50px);
  background: gray;
  filter: blur(20px);
  position: relative;
  top: -315px;
  z-index: -1;
`;

export function SpeechBubble({ payload }) {
  return (
    <Wrapper>
      <div>
        <Bubble>
          <span>안녕! 나는 </span>
          <span style={{ color: "#3881BC", fontSize: "1.5rem" }}>{payload}</span>
          <span>야!</span>
        </Bubble>
        <Pointer />
      </div>
      <div>
        <BubbleShadow />
        <PointerShadow />
      </div>
    </Wrapper>
  );
}
export default SpeechBubble;
