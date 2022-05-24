import React from "react";
import styled from "styled-components";
import * as Constant from "../../constant";
import Details from "./Details";

const NormalInfo = ({ villager }) => {
  const leftInfoKeys = ["gender", "species", "hobby", "personality", "colors"];
  const rightInfoKeys = ["birthday", "styles", "tier", "rank", "favorite_song"];
  const [leftDetails, setLeftDetails] = React.useState(null);
  const [rightDetails, setRightDetails] = React.useState(null);
  React.useEffect(() => {
    setLeftDetails(
      leftInfoKeys.map((key, index) => {
        const value = Array.isArray(villager[key]) ? villager[key].join(" ") : villager[key];
        // villager[key]가 배열인 경우 &nbsp가 중간에 삽입되어 하나의 문자열로 반환됩니다.
        return <Details key={`details-${index}`} label={Constant.CharacterInfoKeys[key]} value={value} />;
      })
    );
    setRightDetails(
      rightInfoKeys.map((key, index) => {
        const value = Array.isArray(villager[key]) ? villager[key].join(" ") : villager[key];
        return <Details key={`details-${index}`} label={Constant.CharacterInfoKeys[key]} value={value} />;
      })
    );
  }, [villager]);

  return (
    <Row id="columnWrapper">
      <Column>{leftDetails}</Column>
      <Column>{rightDetails}</Column>
    </Row>
  );
};

const Row = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
