import React from "react";
import styled from "styled-components";
import * as Constant from "../../constant";
import Details from "./Details";

const SpecialInfo = ({ villager }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Special>스페셜 주민 입니다.</Special>
      <Row>
        <Details label={Constant.CharacterInfoKeys.gender} value={villager.gender} />
        <Details label={Constant.CharacterInfoKeys.birthday} value={villager.birthday} />
      </Row>
    </div>
  );
};

const Row = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
`;

const Special = styled.div`
  background-color: #5e314b;
  width: 300px;
  color: white;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
`;

export default SpecialInfo;
