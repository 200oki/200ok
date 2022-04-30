import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Api from "../../api";
import styled, { keyframes } from "styled-components";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";

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

const VillagerDetail = () => {
  const [villager, setVillager] = useState({});
  const { id } = useParams();
  const getVillager = async () => {
    const { data } = await Api.get(`characters/${id}`);
    setVillager(data.payload);
  };
  useEffect(() => {
    getVillager();
  }, []);
  return (
    <Container>
      <Navigator>
        <BackButton content={"뒤로가기"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>
      <Content>
        <img src={villager.image_photo} alt="주민사진" style={{ borderRadius: "50%" }} />
        <div>상세페이지 디테일입력</div>
      </Content>
    </Container>
  );
};
export default VillagerDetail;
