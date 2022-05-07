import React, { useContext, useEffect, useState } from "react";
import styled from "../../css/match.module.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useStyles } from "../../utils/useStyles";

import { NicknameContext } from "../../context/NicknameContext";
import { MatchElementContext } from "../../context/MatchElementContext";

function InputBirthday({ nextSlide }) {
  const { nickname } = useContext(NicknameContext);
  const { matchElem, setMatchElem } = useContext(MatchElementContext);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const classes = useStyles();
  const selectStyles = {
    fontFamily: "TmoneyRoundWindRegular",
    fontSize: "15px",
    backgroundColor: "white",
  };
  const month31 = [1, 3, 5, 7, 8, 10, 12];
  const month30 = [4, 6, 9, 11];
  const [dayArr, setDayArr] = useState([]);

  const monthArr = Array(12)
    .fill()
    .map((v, i) => i + 1);

  useEffect(() => {
    if (month31.includes(month)) {
      setDayArr(
        Array(31)
          .fill()
          .map((v, i) => i + 1)
      );
    } else if (month30.includes(month)) {
      setDayArr(
        Array(30)
          .fill()
          .map((v, i) => i + 1)
      );
    } else if (month === 2) {
      setDayArr(
        Array(28)
          .fill()
          .map((v, i) => i + 1)
      );
    } else {
      setDayArr([]);
    }
  }, [month]);

  const handleChangeM = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeD = (event) => {
    console.log(day);
    console.log(typeof day);
    setDay(event.target.value);
  };

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>
        {nickname}님의 생일은 언제인가요?
        <span className={styled.subTestTitle}>(1 / 5)</span>
      </div>
      <div className={styled.birthFormWrapper}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={month}
            onChange={handleChangeM}
            displayEmpty
            className={classes.selectBtn}
            sx={selectStyles}
          >
            <MenuItem value="">
              <em>Month</em>
            </MenuItem>
            {monthArr.map((m, i) => (
              <MenuItem value={m} key={i}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={day}
            onChange={handleChangeD}
            displayEmpty
            className={classes.selectBtn}
            sx={selectStyles}
          >
            <MenuItem value="">
              <em>Day</em>
            </MenuItem>
            {dayArr.map((d, i) => (
              <MenuItem value={d} key={i}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <button
        className={month && day ? styled.btnActive : styled.btnHidden}
        onClick={() => {
          if (month < 10 && day < 10) {
            setMatchElem([...matchElem, `0${month}`, `0${day}`]);
          } else if (month < 10 && day > 10) {
            setMatchElem([...matchElem, `0${month}`, `${day}`]);
          } else if (month > 10 && day < 10) {
            setMatchElem([...matchElem, `${month}`, `0${day}`]);
          } else {
            setMatchElem([...matchElem, `${month}`, `${day}`]);
          }
          nextSlide();
        }}
      >
        다음
      </button>
    </div>
  );
}

export default InputBirthday;
