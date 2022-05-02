import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Api from "../../api";
import styled, { keyframes } from "styled-components";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import SpeechBubble from "./SpeechBubble";

const Navigator = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
`;
const Wrapper = styled.div`
  position: relative;
  top: 30px;
  right: 50px;
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

const Detail = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => (props.role === "label" ? "5rem" : "10rem")};
  height: 40px;
  border-radius: 20px;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  margin: 0;
`;

const DetailWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VillagerDetail = () => {
  const [villager, setVillager] = useState({});
  const [keys, setKeys] = useState([]);
  const { id } = useParams();
  const getVillager = async () => {
    const { data } = await Api.get(`characters/${id}`);
    setVillager(data.payload);
  };
  useEffect(() => {
    getVillager().then(() => {
      console.log(keys);
    });
    if (villager.special) {
      setKeys(["gender", "birthday"]);
    } else {
      setKeys(["gender", "birthday", "species", "hobby", "personality", "colors", "styles", "tier", "rank", "favorite_song"]);
    }
  }, []);

  const options = {
    name_ko: "이름",
    gender: "성별",
    species: "동물",
    birthday: "생일",
    hobby: "취미",
    personality: "성격",
    colors: "좋아하는 색",
    styles: "선호 스타일",
    tier: "티어",
    rank: "티어 내 순위",
    favorite_song: "좋아하는 노래",
  };

  return (
    <Container>
      <Navigator>
        <BackButton content={"뒤로가기"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>
      <Content>
        <div style={{ height: "auto" }}>
          <SpeechBubble payload={villager.name_ko} />
          <img src={villager.image_photo} alt="주민사진" style={{ borderRadius: "50%", boxShadow: "1px 2px 2px 0px rgba(0, 0, 0, 0.2)", marginTop: "20px" }} />
        </div>
        {keys.map((v) => (
          <DetailWrapper key={v}>
            <Detail color="green" role="label" style={{ position: "relative", left: "30px" }}>
              {options[v]}
            </Detail>
            <Detail color="white" role="payload">
              {villager[v] === "Male" ? "남" : villager[v] === "Female" ? "여" : villager[v]}
            </Detail>
          </DetailWrapper>
        ))}
      </Content>
    </Container>
  );
};
export default VillagerDetail;
