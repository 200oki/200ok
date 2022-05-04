import styled from "styled-components";

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

const Details = ({ villager }) => {
  const options = {
    name_ko: "이름",
    gender: "성별",
    species: "동물",
    birthday: "생일",
    hobby: "취미",
    personality: "성격",
    colors: "좋아하는 색",
    styles: "선호 스타일",
    tier: "티어",
    rank: "티어 내 순위",
    favorite_song: "좋아하는 노래",
  };

  if (villager?.special) {
    const keys = ["gender", "birthday"];
    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "space-around" }} id="columnWrapper">
        <Column>
          {keys.slice(0, parseInt(keys.length / 2)).map((v) => (
            <DetailWrapper key={v}>
              <Detail color="green" role="label">
                {options[v]}
              </Detail>
              <Detail color="white" role="payload" style={{ zIndex: "-1", position: "relative", left: "-40px" }}>
                {villager[v] === undefined
                  ? null
                  : villager[v] === "Male"
                  ? "남"
                  : villager[v] === "Female"
                  ? "여"
                  : villager[v].constructor === Array
                  ? villager[v].join(" ")
                  : villager[v]}
              </Detail>
            </DetailWrapper>
          ))}
        </Column>
        <Column>
          {keys.slice(parseInt(keys.length / 2)).map((v) => (
            <DetailWrapper key={v}>
              <Detail color="green" role="label" style={{ position: "relative", left: "40px" }}>
                {options[v]}
              </Detail>
              <Detail color="white" role="payload">
                {villager[v] === undefined
                  ? null
                  : villager[v] === "Male"
                  ? "남"
                  : villager[v] === "Female"
                  ? "여"
                  : villager[v].constructor === Array
                  ? villager[v].join(" ")
                  : villager[v]}
              </Detail>
            </DetailWrapper>
          ))}
        </Column>
      </div>
    );
  } else {
    const keys = ["gender", "species", "hobby", "personality", "colors", "birthday", "styles", "tier", "rank", "favorite_song"];
    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "space-around" }} id="columnWrapper">
        <Column>
          {keys.slice(0, parseInt(keys.length / 2)).map((v) => (
            <DetailWrapper key={v}>
              <Detail color="green" role="label">
                {options[v]}
              </Detail>
              <Detail color="white" role="payload" style={{ zIndex: "-1", position: "relative", left: "-40px" }}>
                {villager[v] === undefined
                  ? null
                  : villager[v] === "Male"
                  ? "남"
                  : villager[v] === "Female"
                  ? "여"
                  : villager[v].constructor === Array
                  ? villager[v].join(" ")
                  : villager[v]}
              </Detail>
            </DetailWrapper>
          ))}
        </Column>
        <Column>
          {keys.slice(parseInt(keys.length / 2)).map((v) => (
            <DetailWrapper key={v}>
              <Detail color="green" role="label" style={{ position: "relative", left: "40px" }}>
                {options[v]}
              </Detail>
              <Detail color="white" role="payload">
                {villager[v] === undefined
                  ? null
                  : villager[v] === "Male"
                  ? "남"
                  : villager[v] === "Female"
                  ? "여"
                  : villager[v].constructor === Array
                  ? villager[v].join(" ")
                  : villager[v]}
              </Detail>
            </DetailWrapper>
          ))}
        </Column>
      </div>
    );
  }
};

export default Details;
