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
    <div
      style={{
        width: '100%'
      }}
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
        cellHeight='2rem'
        xLabelsPos='bottom'
        yLabelsPos='left'
        square
      />}
    </div>
  )
}

export default PopularityBySpeciesChart;