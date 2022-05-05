import React from "react";
import styled from "styled-components";
import CharacterInfoKeys from "../../constant";
import Details from "./Details";

const SpecialInfo = ({ villager }) => {
  return (
    <>
      <Special>스페셜 주민 입니다.</Special>
      <Row>
        <Details label={CharacterInfoKeys.gender} value={villager.gender} />
        <Details label={CharacterInfoKeys.birthday} value={villager.birthday} />
      </Row>
    </>
  );
};

const Row = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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
  margin-top: 50px;
`;

export default SpecialInfo;
