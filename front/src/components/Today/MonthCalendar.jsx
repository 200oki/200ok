import React from "react";
import styled from "styled-components";
import * as Api from "../../api";
import * as Constant from "../../constant";

const Container = styled.div`
  margin-top: 20px;
  height: 900px;
  width: 1200px;
  background-color: black;
`;
const CharacterDot = styled.img`
  src: ${(props) => props.src};
  width: 60px;
  height: 60px;
`;

const MonthCalendar = ({ month }) => {
  const [villagers, setVillagers] = React.useState(null);
  const fieldsToGet = ["id", "name_ko", "image_icon", "birthday_day"];
  React.useEffect(() => {
    const getVillagers = async () => {
      try {
        const { data } = await Api.get(`characters/search?fields=${fieldsToGet.join(",")}&props=birthday_month&values=${month}`);
        setVillagers(data.payload);
      } catch (error) {
        console.error(error);
      }
    };
    getVillagers();
  }, [month]);
  const days = [];
  if (villagers) {
    villagers.map((villager) => {
      days[parseInt(villager.birthday_day) - 1] = [];
      days[parseInt(villager.birthday_day) - 1].push(villager);
    });
  }
  return (
    <Container>
      {villagers?.map((villager, index) => {
        return <CharacterDot key={`villager-${index}`} src={villager.image_icon} alt={villager.id} />;
      })}
    </Container>
  );
};

export default MonthCalendar;
