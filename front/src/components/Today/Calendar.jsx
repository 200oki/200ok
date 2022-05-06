import React from "react";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import styled, { keyframes } from "styled-components";
import MonthCalendar from "./MonthCalendar";

const Calendar = () => {
  return (
    <Container>
      <Navigator>
        <BackButton content={"뒤로가기"} destination={"today"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>
      <Content style={{ transform: "scale(1.2)" }}>
        <Tooltip id="toolTip">연도를 변경해 보세요!</Tooltip>
        <MonthCalendar />
      </Content>
    </Container>
  );
};

const Navigator = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
`;
const Container = styled.div`
  position: relative;
&::before {
  background-image: url("/images/leafBgImg.png");
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background-position: 50% 0;
  z-index: -100;
`;

const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  top: 30px;
  right: 50px;
`;
const Tooltip = styled.div`
  width: auto;
  display: none;
  position: absolute;
  font-family: TmoneyRoundWindRegular;
  top: 270px;
`;

export default Calendar;
