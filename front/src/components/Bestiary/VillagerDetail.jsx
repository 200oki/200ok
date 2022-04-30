import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Api from "../../api";
import styled from "styled-components";
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
    <div>
      <Navigator>
        <BackButton content={window.location.pathname === "/bestiary" ? "메인메뉴" : "뒤로가기"} />

        <HomeButton />
      </Navigator>
      <div></div>
    </div>
  );
};
export default VillagerDetail;
