import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
import CustomModal from "../common/CustomModal";
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
    <div>
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
      <CustomModal open={isClicked} onClose={handleModal}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className={classes.modalFont}
        >
          카드 뒤집기 게임
        </Typography>
        <hr />
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          1분동안 8쌍의 카드 짝을 찾는 게임입니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          총 6단계로 게임이 진행됩니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          단, 그 전에 시간을 모두 소모할 시 게임이 종료 됩니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className={classes.modalFont}
        >
          최종 점수는 각 단계 * 남은 시간으로 계산됩니다.
        </Typography>
      </CustomModal>
    </div>

  );
}

export default PopularityByGenderChart;