// import React, { useState, useEffect } from "react";
// import * as Api from "../../api";
// import { Chart, registerables } from "chart.js";
// import { Pie } from 'react-chartjs-2';
// Chart.register(...registerables)

// const SpeciesChart = () => {
//   const [dataList, setDataList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   async function getDataList() {
//     try {
//       const { data } = await Api.get('stats?groupName=gender');
//       setDataList([...Object.values(data.payload)]);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getDataList();
//   }, []);

//   return (
//     <div>
//       <Pie className="graphBack"
//         data={{
//           labels: dataList[1],
//           datasets: [
//             {
//               label: '# Species',
//               data: dataList[2],
//               backgroundColor: [
//                 'rgba(242, 34, 110, 0.2)',
//                 'rgba(5, 151, 242, 0.3)',
//               ],
//               borderColor: [
//                 'rgba(242, 34, 110, 1)',
//                 'rgba(5, 151, 242, 1)',
//               ],
//               borderWidth: 1
//             }
//           ]
//         }}
//         height={500}
//         width={500}
//         options={{
//           responsive: false,
//         }}
//       />
//       <div> 
//         <p>동물의 숲에서는 성별마다 성격이 존재합니다.</p>
//         <p>남성은 느끼함, 먹보, 무뚝뚝, 운동광 중 하나입니다.</p>
//         <p>여성은 단순 활발, 성숙함, 아이돌, 친절함 중 하나입니다.</p>
//       </div>
//     </div>
//   );
// }


// export default SpeciesChart;

// import React from "react";
// import ReactDOM from "react-dom";
// import HeatMap from "../src/HeatMap";

// const GenderChart = () => {
//   const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

//   // Display only even labels
//   const xLabelsVisibility = new Array(24)
//     .fill(0)
//     .map((_, i) => (i % 2 === 0 ? true : false));

//   const yLabels = ["Sun", "Mon", "Tue"];
//   const data = new Array(yLabels.length)
//     .fill(0)
//     .map(() =>
//       new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
//     );
//   return (
//     <HeatMap
//       xLabels={xLabels}
//       yLabels={yLabels}
//       xLabelsLocation={"bottom"}
//       xLabelsVisibility={xLabelsVisibility}
//       xLabelWidth={50}
//       data={data}
//       squares
//       onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
//       cellStyle={(background, value, min, max, data, x, y) => ({
//         background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
//         fontSize: "11px",
//       })}
//       cellRender={(value) => value && `${value}%`}
//       title={(value, unit) => `${value}`}
//     />
//   );

// }
// export default GenderChart;

import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 50 + 50))
  )

const GenderChart = () => {
  return (
    <div
      style={{
        width: '100%'
      }}
    >
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
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

export default GenderChart;