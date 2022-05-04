import React from "react";
import styled from "styled-components";
import CharacterInfoKeys from "../../constant";
import Details from "./Details";

const SpecialInfo = ({ villager }) => {
  return (
    <Row>
      <Details label={CharacterInfoKeys.gender} value={villager.gender} />
      <Details label={CharacterInfoKeys.birthday} value={villager.birthday} />
    </Row>
  );
};

const Row = styled.div`
  height: 30vh;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default SpecialInfo;
