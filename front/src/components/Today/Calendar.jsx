import React from "react";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import styled, { keyframes } from "styled-components";

const DateNavigator = styled.div`
  width: 10vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

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

const pop = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Content = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${pop} 1s linear forwards;
`;
const Wrapper = styled.div`
  position: relative;
  top: 30px;
  right: 50px;
`;
const MonthCalendar = styled.div`
  margin-top: 20px;
  height: 40vw;
  width: 40vw;
  background-color: white;
`;
const Calendar = () => {
  const [month, setMonth] = React.useState(1);
  const handleClick = (e) => {
    if (e.target.alt === "left") {
      if (month > 1) {
        setMonth(month - 1);
      } else {
        setMonth(12);
      }
    } else {
      if (month < 12) {
        setMonth(month + 1);
      } else {
        setMonth(1);
      }
    }
  };
  return (
    <Container>
      <Navigator>
        <BackButton content={"뒤로가기"} destination={"today"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>
      <Content>
        <DateNavigator>
          <img
            src="/images/triangle.png"
            alt="left"
            style={{ width: "2rem", height: "1.5rem", transform: "rotate(-90deg)", cursor: "pointer" }}
            onClick={handleClick}
          />
          <div style={{ fontSize: "2rem", lineHeight: "1.5rem" }}>{month}</div>
          <img
            src="/images/triangle.png"
            alt="right"
            style={{ width: "2rem", height: "1.5rem", transform: "rotate(90deg)", cursor: "pointer" }}
            onClick={handleClick}
          />
        </DateNavigator>
        <MonthCalendar />
      </Content>
    </Container>
  );
};

export default Calendar;
