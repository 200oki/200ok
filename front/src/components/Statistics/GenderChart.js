import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';
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
      const { data } = await Api.get('stats?groupName=gender');
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
          동물의 숲에서 남녀 성비는 게이머가 보기에는 대체로 비슷한 편이지만
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          성비를 실제로 계산해 보면 117.3으로 상당한 남초 마을입니다.
        </Typography>
      </StatsModal>
      <Pie className="graphBack"
        data={{
          labels: dataList[1],
          datasets: [
            {
              label: '# Species',
              data: dataList[2],
              backgroundColor: [
                'rgba(242, 135, 5, 0.3)',
                'rgba(5, 151, 242, 0.3)',
              ],
              borderColor: [
                'rgba(242, 135, 5, 1)',
                'rgba(5, 151, 242, 1)',
              ],
              borderWidth: 1
            }
          ]
        }}
        height={500}
        width={500}
        options={{
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


export default SpeciesChart;