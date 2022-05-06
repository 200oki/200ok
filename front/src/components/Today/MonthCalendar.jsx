import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../../api";
import * as Constant from "../../constant";

const MonthCalendar = () => {
  const navigate = useNavigate();
  const [month, setMonth] = React.useState(1);
  const [villagers, setVillagers] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const fieldsToGet = ["id", "name_ko", "image_icon", "birthday_day"];
  const year = 2022;
  const days = [];
  const weeks = [[], [], [], [], [], []];
  const [stateWeek, setStateWeek] = React.useState(null);
  // offset weekday month by month
  const firstDayofMonth = new Date(`${year}-${month}-01`);
  const offset = firstDayofMonth.getDay();

  const handleClick = (e) => {
    if (e.target.alt === "left") {
      if (month > 1) {
        setMonth(month - 1);
      } else {
        setMonth(12);
      }
    } else {
      if (month < 12) {
        setMonth(month + 1);
      } else {
        setMonth(1);
      }
    }
  };

  const getVillagers = async () => {
    try {
      const { data } = await Api.get(`characters/search?fields=${fieldsToGet.join(",")}&props=birthday_month&values=${month}`);
      setVillagers(data.payload);
    } catch (error) {
      console.error(error);
    }
  };
  const parseVillagers = () => {
    villagers.map((villager) => {
      if (Array.isArray(days[parseInt(villager.birthday_day) - 1])) {
        days[parseInt(villager.birthday_day) - 1].push(villager);
      } else {
        days[parseInt(villager.birthday_day) - 1] = [];
        days[parseInt(villager.birthday_day) - 1].push(villager);
      }
    });

    // empty date (birthday no one)
    for (let i = 0; i < Constant.MonthDays[month]; i++) {
      if (!!!days[i]) {
        days[i] = [];
      }
    }

    for (let i = 0; i < offset; i++) {
      days.unshift("offset");
    }

    days.forEach((day, i) => {
      weeks[parseInt(i / 7)][i % 7] = day;
    });
    setStateWeek(weeks);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getVillagers();
  }, [month]);

  React.useEffect(() => {
    if (villagers) {
      parseVillagers();
    }
  }, [month]);

  return (
    <table>
      <thead>
        <tr align="center">
          <th colSpan="7">
            <p>{year}년</p>
            <DateNavigator>
              <img
                src="/images/triangle.png"
                alt="left"
                style={{ width: "2rem", height: "1.5rem", transform: "rotate(-90deg)", cursor: "pointer" }}
                onClick={handleClick}
              />
              <div style={{ fontSize: "2rem", lineHeight: "1.5rem", width: "1.5rem" }}>{month}</div>
              <span>월</span>
              <img
                src="/images/triangle.png"
                alt="right"
                style={{ width: "2rem", height: "1.5rem", transform: "rotate(90deg)", cursor: "pointer" }}
                onClick={handleClick}
              />
            </DateNavigator>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr align="center">
          <td style={{ color: "red" }}>Sun</td>
          <td>Mon</td>
          <td>Tue</td>
          <td>Wed</td>
          <td>Thu</td>
          <td>Fri</td>
          <td style={{ color: "blue" }}>Sat</td>
        </tr>
        {!isLoading &&
          stateWeek.map((week, index) => {
            const weekNumber = index;
            return (
              <tr key={index}>
                {week.map((day, index) => {
                  const dayNumber = index;
                  if (day === "offset") {
                    return (
                      <Day key={`key - ${index}`}>
                        <span></span>
                      </Day>
                    );
                  } else if (day.length === 0) {
                    return <Day key={`key - ${index}`}>{weekNumber * 7 + dayNumber + 1 - offset}</Day>;
                  } else {
                    return (
                      <Day
                        key={`key - ${index}`}
                        onClick={() => {
                          navigate("/today");
                        }}
                      >
                        {weekNumber * 7 + dayNumber + 1 - offset}
                        {day.map((villager) => {
                          return <CharacterDot key={villager.id} src={villager.image_icon} alt={villager.id} />;
                        })}
                      </Day>
                    );
                  }
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const DateNavigator = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CharacterDot = styled.img`
  src: ${(props) => props.src};
  width: 50px;
  height: 50px;
`;
const Day = styled.td`
  width: 150px;
  height: 70px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
export default MonthCalendar;
