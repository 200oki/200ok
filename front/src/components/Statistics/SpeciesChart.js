import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
import StatsModal from "../common/StatsModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";
Chart.register(...registerables)

const SpeciesChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setIsClicked((v) => !v);
  };
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=species');
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
          동물의 숲에는 정말 다양한 동물들이 살고 있습니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          개미핥기 같은 동물도 있고, 소는 수소와 암소 두 종류가 있습니다.
        </Typography>
      </StatsModal>
      <Bar className="graphBack"
        data={{
          labels: dataList[1],
            datasets: [
            {
              data: dataList[2],
              backgroundColor: [
                'rgba(242, 135, 5, 0.3)'
              ],
              borderColor: [
                'rgba(242, 135, 5, 1)'
              ],
              borderWidth: 1
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

const typoStyles = {
  fontFamily: "TmoneyRoundWindRegular",
  fontSize: "1.2rem",
};

export default SpeciesChart;