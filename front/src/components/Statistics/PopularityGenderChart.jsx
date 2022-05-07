import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
import StatsModal from "../common/StatsModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";
Chart.register(...registerables)

const PopularityByGenderChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setIsClicked((v) => !v);
  };
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=popularity-by-gender');
      setDataList([...Object.values(data.payload)]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataList();
  }, []);

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
          각 인기도 티어에 속한 여성/남성 주민의 비율을 도표화한 자료입니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          여성 캐릭터가 인기가 많은 경향이 뚜렷합니다. 여성 캐릭터들이 귀엽기 때문입니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          성격이나 취미는 인기도와 전혀 관련이 없습니다.
        </Typography>
      </StatsModal>
      <Bar className="graphBack"
        data={{
          labels: dataList[1],
            datasets: [
            {
              label: '여성',
              data: dataList[2],
              backgroundColor: [
                'rgba(242, 135, 5, 0.3)'
              ],
              borderColor: [
                'rgba(242, 135, 5, 1)'
              ],
              
              borderWidth: 1
            },
            {
              label: '남성',
              data: dataList[3],
              backgroundColor: [
                'rgba(5, 151, 242, 0.3)',
              ],
              borderColor: [
                'rgba(5, 151, 242, 1)'
              ],
              
              borderWidth: 1
            },
          ],
        }}
        height={500}
        width={1200}
        options= {{
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
          responsive: false,
          plugins: {
            datalabels: {
              color: 'white',
            },
          },
        }}
      />
    </div>
  );
}

const typoStyles = {
  fontFamily: "TmoneyRoundWindRegular",
  fontSize: "1.2rem",
};

export default PopularityByGenderChart;