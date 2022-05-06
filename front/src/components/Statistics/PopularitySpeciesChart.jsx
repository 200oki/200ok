import React, { useState, useEffect } from 'react';
import * as Api from "../../api";
import { HeatMapGrid } from 'react-grid-heatmap';

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`)
const yLabels = ['1', '2', '3', '4', '5', '6']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 50 + 50))
  )

const PopularityBySpeciesChart = () => {
  const [dataList, setDataList] = useState(null);
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
    <div>
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
            background: `rgb(12, 160, 44, ${ratio})`,
            fontSize: '.8rem',
            color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
          })}
          cellHeight='2.5rem'
          xLabelsPos='bottom'
          yLabelsPos='left'
          square
        />}
      </div>
      <div className="popularitySpeciesDesc">
        1로 갈수록 인기가 많습니다. <br />
        대체로 귀엽거나 친숙한 동물일수록 미약하게 인기가 많은 경향이 있습니다. <br />
        하지만, 일반적으로 귀엽다고 여겨지는 동물이더라도 
        개별 캐릭터의 디자인에 따라 생김새가 천차만별이기 때문에 <br />
        <u>일반화하기에는 무리가 있습니다.</u>
      </div>
    </div>
  )
}

export default PopularityBySpeciesChart;