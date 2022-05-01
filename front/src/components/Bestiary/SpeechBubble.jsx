import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  height: 250px;
  width: 40%;
  min-width: 200px;
  background: ivory;
  display: block;
  margin: 50px auto 0px;
  border-radius: 20px;
  font-size: 200px;
  text-align: center;
`;

const StyledDiv_2 = styled.div`
  height: 40px;
  width: 40px;
  background: ivory;
  margin: -22px auto 0px;
  transform: rotate(45deg);
  border-radius: 0px 0px 12px;
  position: relative;
  left: calc(0.5vw - 50px);
`;

const StyledDiv_3 = styled.div`
  height: 250px;
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

const StyledDiv_4 = styled.div`
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

export function SpeechBubble() {
  return (
    <>
      <div>
        <StyledDiv>!</StyledDiv>

        <StyledDiv_2 />
      </div>

      <div>
        <StyledDiv_3 />
        <StyledDiv_4 />
      </div>
    </>
  );
}
export default SpeechBubble;
