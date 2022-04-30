import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Api from "../../api";
import styled from "styled-components";
import BackButton from "../common/BackButton";
import HomeButton from "../common/HomeButton";

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
      <nav>
        <button>뒤로</button>
        <button>홈</button>
      </nav>
      <div></div>
    </div>
  );
};
export default VillagerDetail;
