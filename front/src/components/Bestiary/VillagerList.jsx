import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as Api from "../../api";
import { Slider } from "@mui/material";
import { styled as Styled } from "@mui/material/styles";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
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
const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;
const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0;
  margin-right: 3rem;
  padding-left: 2rem;
  background-color: white;
  border: none;
  border-left: 1px solid #a5e4ff;
  border-radius: 0 1rem 1rem 0;
  transition: all 0.5s;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
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
  transition: all 0.3s;
  cursor: pointer;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
  &:hover {
    background-color: #cdcdcd;
    transform: translateY(-5%);
  }
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

const Select = styled.button`
  width: 12rem;
  height: 3rem;
  border: none;
  border-right: 1px solid #a5e4ff;
  border-radius: 1rem 0 0 1rem;
  background: white;
  transition: all 0.2s;
  cursor: pointer;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
  &:hover {
    opacity: 0.7;
  }
`;
const Option = styled.button`
  width: 9rem;
  height: 3rem;
  border: none;
  border-right: 1px solid #a5e4ff;
  border-radius: 0;
  background: white;
  transition: all 0.5s;
  cursor: pointer;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
  &:hover {
    opacity: 0.7;
  }
`;
const OptionWrapper = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 15.6%;
`;
const Selector = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VillagerList = () => {
  const navigate = useNavigate();
  const options = {
    이름: "name_ko",
    성격: "personality",
    취미: "hobby",
    색깔: "colors",
    스타일: "styles",
    티어: "tier",
    동물: "species",
  };

  const [villagers, setVillagers] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("검색조건");
  const [ipt, setIpt] = useState("");

  const scrollHandler = (e, val) => {
    const element = document.getElementById("content");
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    element.scrollLeft = (maxScrollLeft / 100) * val;
  };

  const clickHandler = (e) => {
    e.preventDefault();
    search();
  };

  const showOptions = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const optionHandler = (e) => {
    e.preventDefault();
    setOption(e.target.value);
    setShow(!show);
  };

  const search = async () => {
    const queryOption =
      option === "검색조건" ? "" : `&props=${options[option]}&values=${ipt}`;
    const queryString = `?fields=name_ko,image_photo,id${queryOption}`;
    try {
      const { data } = await Api.get(`characters/search${queryString}`);
      setVillagers(data.payload);
      setCount(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const inputHandler = (e) => {
    setIpt(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  const cardPerColumn = 3;
  const columns = [];

  for (let i = 0; i < parseInt(count / cardPerColumn); i++) {
    columns.push(
      villagers
        .slice(cardPerColumn * i, cardPerColumn * (i + 1))
        .map((villager, idx) => {
          return (
            <Card
              key={idx}
              src={villager.image_photo}
              onClick={() => navigate(`/detail/${villager.id}`)}
            >
              <Name>{villager.name_ko}</Name>
            </Card>
          );
        })
    );
  }
  const restCards = count % cardPerColumn;
  if (restCards > 0) {
    columns.push(
      villagers.slice(-restCards).map((villager, idx) => {
        return (
          <Card
            key={idx}
            src={villager.image_photo}
            onClick={() => navigate(`/detail/${villager.id}`)}
          >
            <Name>{villager.name_ko}</Name>
          </Card>
        );
      })
    );
  }
  return (
    <Container>
      <Navigator>
        <BackButton content={"뒤로가기"} destination={"bestiary"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>
      <Content>
        <ContentWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "70%",
              justifyContent: "center",
            }}
          >
            <Selector>
              <Select onClick={showOptions}>{option}</Select>
              <OptionWrapper id="options" show={show}>
                {Object.keys(options).map((option, i) => (
                  <Option key={i} value={option} onClick={optionHandler}>
                    {option}
                  </Option>
                ))}
              </OptionWrapper>
            </Selector>
            <SearchForm>
              <Input
                placeholder="검색어를 입력해주세요."
                onChange={inputHandler}
                value={ipt}
                onKeyUp={handleKeyUp}
              />
              <div>
                <Button type="submit" onClick={clickHandler}>
                  검색
                </Button>
              </div>
            </SearchForm>
          </div>
          <ContentContainer id="content">
            {columns.map((column, idx) => {
              return <Column key={idx}>{column}</Column>;
            })}
          </ContentContainer>
          <PrettoSlider onChange={scrollHandler} />
        </ContentWrapper>
      </Content>
    </Container>
  );
};

export default VillagerList;
