import React from "react";
import styled from "styled-components";
import CharacterInfoKeys from "../../constant";
import Details from "./Details";

const NormalInfo = ({ villager }) => {
  const leftInfoKeys = ["gender", "species", "hobby", "personality", "colors"];
  const rightInfoKeys = ["birthday", "styles", "tier", "rank", "favorite_song"];
  const [leftDetails, setLeftDetails] = React.useState(null);
  const [rightDetails, setRightDetails] = React.useState(null);
  React.useEffect(() => {
    setLeftDetails(
      leftInfoKeys.map((key, index) => {
        return <Details key={`details-${index}`} label={CharacterInfoKeys[key]} value={villager[key]} />;
      })
    );
    setRightDetails(
      rightInfoKeys.map((key, index) => {
        return <Details key={`details-${index}`} label={CharacterInfoKeys[key]} value={villager[key]} />;
      })
    );
  }, [villager]);

  return (
    <Row>
      <Column>{leftDetails}</Column>
      <Column>{rightDetails}</Column>
    </Row>
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

const Column = styled.div`
  height: 30vh;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default NormalInfo;
