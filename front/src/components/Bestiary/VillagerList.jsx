import { useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import Slider from "@mui/material/Slider";
import { styled as Styled } from "@mui/material/styles";

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;
const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  margin-right: 3rem;
  height: 3rem;
  border: none;
  border-radius: 1rem;
  transition: all 0.5s;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  &:hover {
    opacity: 0.6;
  }
`;
const Button = styled.button`
  width: 5rem;
  height: 3rem;
  border: none;
  border-radius: 1rem;
  background: #a5e4ff;
  transition: all 0.5s;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #cdcdcd;
    transform: translateY(-5%);
  }
`;

const Wrapper = styled.div`
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
  overflow: auto;
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
  align-items: center;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const Row = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const VillagerList = () => {
  const searchVillager = async () => {
    const result = await Api.get("characters");
    return result;
  };

  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  // const handleResize = () => {
  //   setWindowSize({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };

  useEffect(() => {
    searchVillager();
    // window.addEventListener("resize", handleResize);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
  };

  const scrollHandler = (e, val) => {
    const element = document.getElementById("content");
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    element.scrollLeft = (maxScrollLeft / 100) * val;
  };
  return (
    <Wrapper>
      <SearchForm>
        <Input placeholder="검색어를 입력해주세요." />
        <Button type="submit" onClick={clickHandler}>
          검색
        </Button>
      </SearchForm>
      <ContentContainer id="content">
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card>1</Card>
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
        <Row>
          <Card />
          <Card />
          <Card />
        </Row>
      </ContentContainer>
      <PrettoSlider onChange={scrollHandler} />
    </Wrapper>
  );
};

export default VillagerList;
