import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';
import StatsModal from "../common/StatsModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";
Chart.register(...registerables)

const StyleChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setIsClicked((v) => !v);
  };
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=style');
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
      <StatsModal open={isClicked} onClose={handleModal}>
          <Typography
            id="modal-modal-description"
            sx={ typoStyles }
            className={classes.modalFont2}
          >
            동물의 숲 주민들은 심플한 옷을 즐겨입는 편입니다.
          </Typography>
        </StatsModal>
      <Pie className="graphBack"
        data={{
          labels: dataList[1],
            datasets: [
            {
              data: dataList[2],
              backgroundColor: [
                'rgba(242, 34, 110, 0.2)',
                'rgba(242, 135, 5, 0.3)',
                'rgba(242, 226, 5, 0.3)',
                'rgba(3, 166, 60, 0.3)',
                'rgba(5, 151, 242, 0.3)',
                'rgba(134, 5, 240, 0.15)',
              ],
              borderColor: [
                'rgba(242, 34, 110, 1)',
                'rgba(242, 135, 5, 1)',
                'rgba(242, 226, 5, 1)',
                'rgba(3, 166, 60, 1)',
                'rgba(5, 151, 242, 1)',
                'rgba(134, 5, 240, 1)',
              ],
              borderWidth: 1,
              }
            ]
        }}
        height={500}
        width={500}
        options= {{
          responsive: false,
        }}
      />
    </div>
  );
}

const typoStyles = {
  fontFamily: "TmoneyRoundWindRegular",
  fontSize: "1.2rem",
};


export default StyleChart;