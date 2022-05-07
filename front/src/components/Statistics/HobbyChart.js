import React, { useState, useEffect } from 'react';
import * as Api from "../../api";
import { BarChart, Bar, XAxis, YAxis,
	CartesianGrid, Legend, Tooltip } from 'recharts';
import StatsModal from "../common/StatsModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";

const HobbyChart = () => {
  // ** 백엔드랑 통신하면 애니메이션이 적용되지 않음 **
  // const [dataList, setDataList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  
  // async function getDataList() {
  //   try {
  //     const { data } = await Api.get('stats?groupName=hobby');
  //     setDataList([...Object.values(data.payload)]);
  //     console.log(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   getDataList();
  // }, []);
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setIsClicked((v) => !v);
  };

	const data = [
    { name: '교육', 여성: 32, 남성: 32 },
    { name: '놀이', 여성: 16, 남성: 49 },
    { name: '운동', 여성: 12, 남성: 54 },
    { name: '음악', 여성: 34, 남성: 30 },
    { name: '자연', 여성: 27, 남성: 39 },
    { name: '패션', 여성: 66, 남성: 0 },
  ];

	return (
    <div className="graphDesc">
      <div className={classes.desc} onClick={handleModal}>
        ?
      </div>
      <StatsModal open={isClicked} onClose={handleModal}>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          취미는 숫자가 딱 맞아 보이지만,
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          사실 성별 등으로 구분해서 살펴보면 보이는 것처럼 균일하지는 않습니다.
        </Typography>
      </StatsModal>
      <BarChart className="graphBack" width={1200} height={500} data={data} >
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="여성" stackId="a" fill="#F3D6A6" />
        <Bar dataKey="남성" stackId="a" fill="#BDDBF0" />
      </BarChart>
    </div>
	);
}

const typoStyles = {
  fontFamily: "TmoneyRoundWindRegular",
  fontSize: "1.2rem",
};

export default HobbyChart;
