import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Api from "../../api";
import styled, { keyframes } from "styled-components";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";
import SpeechBubble from "./SpeechBubble";
import BestFriends from "./BestFriends";
import Info from "./Info";

const VillagerDetail = () => {
  const [villager, setVillager] = useState(null);
  const [friends, setFriends] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getVillager = async () => {
      try {
        const { data } = await Api.get(`characters/${id}`);
        setVillager(data.payload);
      } catch (error) {
        console.error(error);
      }
    };
    getVillager();
  }, [id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data } = await Api.get(`csmdata/${id}?top=3&bottom=0`);
        setFriends(data.payload);
      } catch (error) {
        console.error(error);
      }
    };
    getFriends();
  }, [id]);

  return (
    <Container>
      <Navigator>
        <BackButton content={"뒤로가기"} />
        <Wrapper>
          <HomeButton />
        </Wrapper>
      </Navigator>

      <Content>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div id="img-bubble">
            <SpeechBubble payload={villager?.name_ko} />
            <VillagerImg src={villager?.image_photo} alt={`주민 ${villager?.name_ko}의 사진`} />
          </div>
          {friends && <BestFriends friends={friends} />}
        </div>
        {villager && <Info villager={villager} />}
      </Content>
    </Container>
  );
};

const VillagerImg = styled.img`
  border-radius: 50%;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
  src: ${(props) => props.src};
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
export default VillagerDetail;
