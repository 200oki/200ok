import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import "../../css/stats.css";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
import CustomModal from "../common/CustomModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";
Chart.register(...registerables)

const PersonalityChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setIsClicked((v) => !v);
  };
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=personality');
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
      <CustomModal open={isClicked} onClose={handleModal}>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          동물의 숲에서는 성별마다 성격이 존재합니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          남성은 느끼함, 먹보, 무뚝뚝, 운동광 중 하나입니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          여성은 단순 활발, 성숙함, 아이돌, 친절함 중 하나입니다.
        </Typography>
      </CustomModal>
      <Bar className="graphBack"
        data={{
          labels: dataList[1],
            datasets: [
            {
              data: dataList[2],
              backgroundColor: [
                'rgba(5, 151, 242, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 135, 5, 0.3)',
              ],
              borderColor: [
                'rgba(5, 151, 242, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 135, 5, 0.3)',
              ],

              borderWidth: 1,
              }
            ]
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
            legend: false // Hide legend
          },
        }}
      />
    </div>
  );
}

export default PersonalityChart;