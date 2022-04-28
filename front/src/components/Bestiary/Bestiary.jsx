import { useState } from "react";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import styled, { keyframes } from "styled-components";
import VillagerList from "./VillagerList";
import Statistics from "./Statistics";

const Navigator = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
&::before {
  background-image: url("/images/leafBgImg.jpg");
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

const Button = styled.button`
  border: none;
  color: black;
  padding: 10px;
  margin: 2rem;
  font-size: 2.4rem;
  line-height: 1.2em;
  border-radius: 2rem;
  text-align: center;
  cursor: pointer;
  width: 20rem;
  height: 4rem;
  box-shadow: 1px 3px 2px 1px rgba(25, 25, 25, 0.2);
  background-color: #fff9e4;
  font-family: TmoneyRoundWindExtraBold;
  transition: 0.1s linear;
  &:hover {
    background-color: #cdcdcd;
    transform: translateY(-10%);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bestiary = () => {
  const [toggle, setToggle] = useState("initial");

  const clickHandler = (e) => {
    e.preventDefault();
    setToggle(e.target.value);
  };

  return (
    <Container>
      <Navigator>
        <BackButton />
        <HomeButton />
      </Navigator>
      <Content>
        {toggle === "initial" && (
          <ButtonWrapper>
            <Button onClick={clickHandler} value="list">
              주민 도감
            </Button>
            <Button onClick={clickHandler} value="statistics">
              주민 통계
            </Button>
          </ButtonWrapper>
        )}
        {toggle === "list" && <VillagerList />}
        {toggle === "statistics" && <Statistics />}
      </Content>
    </Container>
  );
};

export default Bestiary;
