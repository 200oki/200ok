import React, { useState, useEffect } from 'react';
import * as Api from "../../api";
import { HeatMapGrid } from 'react-grid-heatmap';

const SpeciesTierChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    <div
      style={{
        width: '100%'
      }}
    >
      <HeatMapGrid
        data={dataList.data}
        xLabels={dataList.xLabels}
        yLabels={dataList.yLabels}
        // Reder cell with tooltip
        cellRender={(x, y, value) => (
          <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? 'transparent' : '#777',
          fontSize: '.8rem'
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
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        yLabelsPos='right'
        square
      />
    </div>
  )
}

export default SpeciesTierChart;