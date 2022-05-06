import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import * as Api from "../../api";
import moment from "moment";
import "moment/locale/ko";
import { Slider } from "@mui/material";
import { styled as Styled } from "@mui/material/styles";
import { Box, Modal, Typography } from "@mui/material";
import BackButton from "../common/BackButton";
import PostButton from "../common/PostButton";
import { useNavigate } from "react-router-dom";
import { guestbookImgList } from "../../utils/util";
import "../../css/guestBook.css";
import { GuestIdContext } from "../../context/GuestIdContext";

const GuestbookList = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false); // 모달 열기
  const [guestbook, setGuestbook] = useState([]);
  const [content, setContent] = useState([]);
  const [date, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [columns, setColumns] = useState([]);
  const { userId, setUserId } = useContext(GuestIdContext);

  // 글 쓰는 부분에서 state를 받아옴
  // state { payload: { id: number, content: string, createdAt: date }, modal: true }
  // 글을 post 한 후, modal 창을 띄우기 위함

  // 백엔드에서 방명록 전체를 받아옴
  const getDataList = async () => {
    try {
      const { data } = await Api.get("guestbooks");
      setGuestbook(data.payload);
      setCount(data.payload.length);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (guestbook.length !== 0) {
      const cardPerColumn = 2;
      for (let i = 0; i < parseInt(count / cardPerColumn); i++) {
        setColumns((v) => [
          ...v,
          guestbook.slice(cardPerColumn * i, cardPerColumn * (i + 1)).map((guestbook, idx) => {
            return <Card key={idx} src={guestbookImgList[guestbook.id % 5].img} onClick={() => handleClick(guestbook)} />;
          }),
        ]);
      }
      const restCards = count % cardPerColumn;

      if (restCards > 0) {
        setColumns((v) => [
          ...v,
          guestbook.slice(-restCards).map((guestbook, idx) => {
            return <Card key={idx} src={guestbookImgList[guestbook.id % 5].img} onClick={() => handleClick(guestbook)} />;
          }),
        ]);
      }
    }
  }, [guestbook]);

  useEffect(() => {
    if (columns.length !== 0) {
      setIsLoading(false);
    }
  }, [columns]);
  //guestbooks/userId?userId='${context}'
  //context 초기화
  const getModalData = async () => {
    try {
      const { data } = await Api.get(`guestbooks/userId?userId=${userId}`);
      console.log(data);
      setGuestbook(data.payload);
      setCount(data.payload.length);
      setContent(data.payload.content);
      setDate(data.payload.createdAt);
      setModal(true);
      setUserId(null);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDataList();
    // 처음에 null 값이 들어있어서 오류 => not null일 때만 사용하도록 조건 추가
    if (userId !== null) {
      console.log("userId no null");
      getModalData();
    }
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    bgcolor: "background.paper",
    backgroundImage: "url(/images/letterBg.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    boxShadow: 24,
    outline: "none",
    borderRadius: "0.3em",
    fontFamily: "TmoneyRoundWindRegular",
    p: 4,
  };

  const scrollHandler = (e, val) => {
    const element = document.getElementById("content");
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    element.scrollLeft = (maxScrollLeft / 100) * val;
  };

  // 모달로 방명록 보여주는 부분
  const handleClick = (element) => {
    setModal((v) => !v);
    setContent(element.content);
    setDate(element.createdAt);
    console.log("여긴가");
  };

  return (
    <Container>
      <Navigator>
        <BackButton content="뒤로가기" destination="/write" />
        <Wrapper>
          <PostButton onClick={() => navigate("/guestbook/post")} />
        </Wrapper>
      </Navigator>
      <Content>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ContentWrapper>
            <PrettoSlider onChange={scrollHandler} />
            <ContentContainer id="content">
              {columns.map((column, idx) => {
                return <Column key={idx}>{column}</Column>;
              })}
              <Modal open={modal} onClose={handleClick} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modalStyle} className="modalBg">
                  <div className={"guestContentWrapper postArea"}>
                    <p className="modalFont2">{content}</p>
                    <PostDiv>
                      <p
                        style={{ fontFamily: "TmoneyRoundWindRegular" }}
                        className="date"
                      >
                        {moment(moment.utc(date).toDate()).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </p>
                      <p className="sender">익명의 누군가로부터</p>
                    </PostDiv>
                  </div>
                </Box>
              </Modal>
            </ContentContainer>
          </ContentWrapper>
        )}
      </Content>
    </Container>
  );
};

const Navigator = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.8;
    z-index: -1;
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
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Column = styled.div`
  margin-right: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 20%;
`;

const PostDiv = styled.div`
  display: flex;
  font-size: 1.3rem;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  height: 90%;
`;

const PrettoSlider = Styled(Slider)({
  color: "#0099FA",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 40,
    width: 40,
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

export default GuestbookList;
