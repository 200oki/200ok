import React from "react";
import styled from "styled-components";
import * as Api from "../../api";

const Container = styled.div`
  margin-top: 20px;
  height: 40vw;
  width: 40vw;
  background-color: white;
`;

const MonthCalendar = ({ month }) => {
  const [villagers, setVillagers] = React.useState([]);
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
  }, []);
  return <Container />;
};

export default MonthCalendar;
