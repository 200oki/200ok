import React from "react";
import styled from "styled-components";

const SpecialInfo = ({ options, villager }) => {
  /**
   * gender, birthday
   */
  const GenderKr = React.useMemo(() => {
    if (villager["gender"] && villager["gender"] === "Male") {
      return "남";
    }
    return "여";
  }, [villager]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Detail color="#5e314b" role="payload" style={{ color: "white" }}>
        스페셜 주민 입니다.
      </Detail>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "space-around",
        }}
        id="columnWrapper"
      >
        <Column>
          <DetailWrapper>
            <Detail color="#315E44" role="label" style={{ color: "white" }}>
              {options["gender"]}
            </Detail>
            <Detail
              color="white"
              role="payload"
              style={{ zIndex: "-1", position: "relative", left: "-40px" }}
            >
              {GenderKr}
            </Detail>
          </DetailWrapper>
        </Column>

        <Column>
          {/* {rightColumnKeys.map((v) => ( */}
          <DetailWrapper>
            <Detail color="#315E44" role="label" style={{ color: "white" }}>
              {/* {options[v]} */}
            </Detail>
            <Detail
              color="white"
              role="payload"
              style={{ zIndex: "-1", position: "relative", left: "-40px" }}
            >
              {/* {villager[v] === undefined
                    ? null
                    : villager[v] === "Male"
                    ? "남"
                    : villager[v] === "Female"
                    ? "여"
                    : villager[v].constructor === Array
                    ? villager[v].join(" ")
                    : villager[v]} */}
            </Detail>
          </DetailWrapper>
          {/* ))} */}
        </Column>
      </div>
    </div>
  );
};

const Detail = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => (props.role === "label" ? "10rem" : "20rem")};
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "TmoneyRoundWindExtraBold";
  font-size: 1.24rem;
  margin: 0;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

const DetailWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  height: 30vh;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export default SpecialInfo;
