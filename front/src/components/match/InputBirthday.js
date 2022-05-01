import React, { useContext, useState } from "react";
import styled from "../../css/match.module.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useStyles } from "../../utils/useStyles";

import { NicknameContext } from "../../context/NicknameContext";

function InputBirthday({ nextSlide }) {
  const { nickname } = useContext(NicknameContext);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const classes = useStyles();
  const selectStyles = {
    fontFamily: "TmoneyRoundWindRegular",
    fontSize: "15px",
    backgroundColor: "white",
  };

  const monthArr = Array(12)
    .fill()
    .map((v, i) => i + 1);
  const dayArr = Array(31)
    .fill()
    .map((v, i) => i + 1);

  const handleChangeM = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeD = (event) => {
    setDay(event.target.value);
  };

  return (
    <div className={`${styled.testContent} ${styled.Wrapper}`}>
      <div className={styled.testTitle}>{nickname}님의 생일은 언제인가요?</div>
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
        onClick={nextSlide}
      >
        다음
      </button>
    </div>
  );
}

export default InputBirthday;
