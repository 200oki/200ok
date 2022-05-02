import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as Api from "../../api";
import { Slider } from "@mui/material";
import { styled as Styled } from "@mui/material/styles";
import BackButton from "../common/BackButton";
import GuestbookAddForm from "./GuestbookAddForm";
import { useNavigate } from "react-router-dom";

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
  background-image: url("/images/guestbookBg.jpg");
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

const ContentWrapper = styled.div`
  width: 85vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: space-around;
  overflow: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 25px;
  background-color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

const Column = styled.div`
  margin-right: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Name = styled.div`
  background-color: white;
  width: 100%;
  height: 40px;
  border-radius: 0 0 25px 25px;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  position: relative;
  top: 50%;
`;

const PrettoSlider = Styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Guestbook = () => {
  const navigate = useNavigate();

  const [guestbook, setGuestbook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('guestbooks', '');
      setGuestbook([...Object.values(data.payload)]);
      console.log(data.payload);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataList();
  }, []);

  const scrollHandler = (e, val) => {
    const element = document.getElementById("content");
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    element.scrollLeft = (maxScrollLeft / 100) * val;
  };

  const cardPerColumn = 3;
  const columns = [];

  for (let i = 0; i < parseInt(count / cardPerColumn); i++) {
    columns.push(
      guestbook.slice(cardPerColumn * i, cardPerColumn * (i + 1)).map((guestbook, idx) => {
        return (
          <Card key={idx} src={guestbook.image_photo} onClick={() => navigate(`/guestbook/${guestbook.id}`)}>
            <Name>{guestbook.name_ko}</Name>
          </Card>
        );
      })
    );
  }
  const restCards = count % cardPerColumn;
  if (restCards > 0) {
    columns.push(
      guestbook.slice(-restCards).map((guestbook, idx) => {
        return (
          <Card key={idx} src={guestbook.image_photo} onClick={() => navigate(`/guestbook/${guestbook.id}`)}>
            <Name>{guestbook.name_ko}</Name>
          </Card>
        );
      })
    );
  }
  return (
    <Container>
      <Navigator>
        <BackButton content={window.location.pathname === "/explore" ? "메인메뉴" : "뒤로가기"} />
        <Wrapper>
          <GuestbookAddForm />
        </Wrapper>
      </Navigator>
      <Content>
        <ContentWrapper>
          <PrettoSlider onChange={scrollHandler} />
          <ContentContainer id="content">
            {columns.map((column, idx) => {
              return <Column key={idx}>{column}</Column>;
            })}
          </ContentContainer>
        </ContentWrapper>
      </Content>
    </Container>
  );
};


export default Guestbook;