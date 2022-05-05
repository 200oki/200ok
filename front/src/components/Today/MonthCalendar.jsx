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
  return <Container />;
};

export default MonthCalendar;
