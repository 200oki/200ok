import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import * as Api from "../../api";
import * as Constant from "../../constant";
import { DateContext } from "../../context/DateContext";
import PseudoTable from "./PseudoTable";

const MonthCalendar = () => {
  const navigate = useNavigate();
  const { date, setDate } = React.useContext(DateContext);
  const [year, setYear] = React.useState(2022);
  const [tempYear, setTempYear] = React.useState(year);
  const [month, setMonth] = React.useState(parseInt(date.month));
  const fieldsToGet = ["id", "name_ko", "image_icon", "birthday_day"];
  const [stateWeek, setStateWeek] = React.useState(null);

  const [isLoading, setLoading] = React.useState(false);

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
      const { data } = await Api.get(`characters/search?fields=${fieldsToGet.join()}&props=birthday_month&values=${month}`);
      return data.payload;
    } catch (error) {
      console.error(error);
    }
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      setYear(e.target.value);
    }
  };

  const hoverHandler = () => {
    document.getElementById("toolTip").style.opacity = 1;
  };
  const leaveHandler = () => {
    document.getElementById("toolTip").style.opacity = 0;
  };

  React.useLayoutEffect(() => {
    setLoading(true);
    getVillagers()
      .then((res) => {
        const days = [];
        res.map((villager) => {
          if (Array.isArray(days[parseInt(villager.birthday_day) - 1])) {
            days[parseInt(villager.birthday_day) - 1].push(villager);
          } else {
            days[parseInt(villager.birthday_day) - 1] = [];
            days[parseInt(villager.birthday_day) - 1].push(villager);
          }
        });
        return days;
      })
      .then((days) => {
        for (let i = 0; i < Constant.MonthDays[month]; i++) {
          if (!!!days[i]) {
            days[i] = [];
          }
        }
        return days;
      })
      .then((days) => {
        // offset weekday month by month
        const firstDayofMonth = new Date(`${year}-${month}-01`);
        const offset = firstDayofMonth.getDay();

        for (let i = 0; i < offset; i++) {
          days.unshift("offset");
        }
        return days;
      })
      .then((days) => {
        const weeks = [[], [], [], [], [], []];
        days.forEach((day, i) => {
          weeks[parseInt(i / 7)][i % 7] = day;
        });
        return weeks;
      })
      .then((weeks) => {
        setStateWeek(weeks);
        setLoading(false);
      });
  }, [year, month]);

  const clickHandler = (e, value) => {
    setDate({
      month: month,
      day: value,
    });
    navigate("/today");
  };

  return (
    <table style={{ height: "750px" }}>
      <thead style={{ height: "100px" }}>
        <tr align="center">
          <th colSpan="7">
            <div style={{ marginBottom: "10px" }}>
              <Input
                value={tempYear}
                onChange={(e) => {
                  setTempYear(e.target.value);
                }}
                onKeyUp={enterHandler}
                onMouseOver={hoverHandler}
                onMouseLeave={leaveHandler}
              />
              <span style={{ cursor: "default" }}>년</span>
            </div>
            <DateNavigator>
              <img
                src="/images/triangle.png"
                alt="left"
                style={{
                  width: "2rem",
                  height: "1.5rem",
                  transform: "rotate(-90deg)",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              />
              <div
                style={{
                  fontSize: "2rem",
                  lineHeight: "1.5rem",
                  width: "1.5rem",
                  cursor: "default",
                }}
              >
                {month}
              </div>
              <span style={{ cursor: "default" }}>월</span>
              <img
                src="/images/triangle.png"
                alt="right"
                style={{
                  width: "2rem",
                  height: "1.5rem",
                  transform: "rotate(90deg)",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              />
            </DateNavigator>
          </th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "rgb(0,0,0,0.6)" }}>
        <tr align="center">
          <Weekday style={{ color: "red" }}>Sun</Weekday>
          <Weekday>Mon</Weekday>
          <Weekday>Tue</Weekday>
          <Weekday>Wed</Weekday>
          <Weekday>Thu</Weekday>
          <Weekday>Fri</Weekday>
          <Weekday style={{ color: "blue" }}>Sat</Weekday>
        </tr>
        {!isLoading && stateWeek ? (
          stateWeek.map((week, index) => {
            const weekNumber = index;
            return (
              <tr key={index}>
                {week.map((day, index) => {
                  const dayNumber = index;
                  if (day === "offset") {
                    return <Day key={`key - ${index}`} offset={true}></Day>;
                  } else if (day.length === 0) {
                    return (
                      <Day
                        key={`key - ${index}`}
                        onClick={(e) => {
                          clickHandler(e, weekNumber * 7 + dayNumber + 1 - offset);
                        }}
                      >
                        {weekNumber * 7 + dayNumber + 1 - offset}
                        <div style={{ width: "50px", height: "50px" }} />
                      </Day>
                    );
                  } else {
                    return (
                      <Day
                        key={`key - ${index}`}
                        onClick={(e) => {
                          clickHandler(e, weekNumber * 7 + dayNumber + 1 - offset);
                        }}
                      >
                        <div>{weekNumber * 7 + dayNumber + 1 - offset}</div>
                        <div
                          style={{
                            width: "150px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          {day.map((villager) => {
                            return <CharacterDot key={villager.id} src={villager.image_icon} alt={villager.id} />;
                          })}
                        </div>
                      </Day>
                    );
                  }
                })}
              </tr>
            );
          })
        ) : (
          <PseudoTable />
        )}
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
  padding: 10px;
  width: 150px;
  height: 80px;
  color: white;
  cursor: ${(props) => (props.offset ? "default" : "pointer")};
  &:hover {
    opacity: 0.6;
  }
`;
const Weekday = styled.td`
  height: 30px;
  cursor: default;
  color: white;
`;
const twinkling = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
`;
const Input = styled.input`
  width: 4rem;
  cursor: text;
  background: none;
  border: none;
  border-radius: 0.6rem;
  background-color: lightgreen;
  font-size: 1.3rem;
  text-align: center;
  animation: ${twinkling} 0.5s alternate ease-in-out infinite;
`;
export default MonthCalendar;
