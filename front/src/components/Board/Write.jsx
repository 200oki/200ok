import { useNavigate } from "react-router-dom";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import styled, { keyframes } from "styled-components";
import StyledItem from "../common/StyledItem";

const Write = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navigator>
        <BackButton content={"메인메뉴"} destination={"explore"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>
      <Content>
        <ButtonWrapper>
          <StyledItem onClick={() => navigate("/guestbook")} content="방명록" />
          <StyledItem onClick={() => navigate("/board")} content="게시판" />
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default Write;

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
  }
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

const ButtonWrapper = styled.div`
  width: 70%;
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
