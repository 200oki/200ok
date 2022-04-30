import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Api from "../../api";

const VillagerDetail = () => {
  const { id } = useParams();
  // const getVillager = async () => {
  //   const { data } = await Api
  // }

  return <div>여기에 디테일</div>;
};
export default VillagerDetail;
