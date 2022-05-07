import React, { useState, useEffect } from 'react';
import * as Api from "../../api";
import { HeatMapGrid } from 'react-grid-heatmap';
import StatsModal from "../common/StatsModal";
import { Typography } from "@mui/material";
import { useStyles } from "../../utils/useStyles";

const PopularityBySpeciesChart = () => {
  const [dataList, setDataList] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setIsClicked((v) => !v);
  };

  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=popularity-by-species');
      setDataList([...Object.values(data.payload)]);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getDataList();
  }, []);
  
  console.log("data :", dataList);

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
          1로 갈수록 인기가 많습니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          대체로 귀엽거나 친숙한 동물일수록 미약하게 인기가 많은 경향이 있습니다.
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          하지만, 일반적으로 귀엽다고 여겨지는 동물이더라도 
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          개별 캐릭터의 디자인에 따라 생김새가 천차만별이기 때문에
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={ typoStyles }
          className={classes.modalFont2}
        >
          <u>일반화하기에는 무리가 있습니다.</u>
        </Typography>
      </StatsModal>
      <div
        className="graphBack"
      >
        {dataList && <HeatMapGrid
          data={dataList[3]}
          xLabels={dataList[1]}
          yLabels={dataList[2]}
          // Reder cell with tooltip
          cellRender={(x, y, value) => (
            <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
          )}
          xLabelsStyle={(index) => ({
            fontSize: '.8rem',
            color: '#777'
          })}
          yLabelsStyle={() => ({
            fontSize: '.7rem',
            textTransform: 'uppercase',
            color: '#777'
          })}
          cellStyle={(_x, _y, ratio) => ({
            background: `rgb(33, 154, 255, ${ratio})`,
            fontSize: '.8rem',
            color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
          })}
          cellHeight='3.1rem'
          xLabelsPos='bottom'
          yLabelsPos='left'
          square
        />}
      </div>
    </div>
  )
}

const typoStyles = {
  fontFamily: "TmoneyRoundWindRegular",
  fontSize: "1.2rem",
};

export default PopularityBySpeciesChart;