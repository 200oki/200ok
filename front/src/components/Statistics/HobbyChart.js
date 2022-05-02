// import React from 'react';
// import { ResponsiveBar } from '@nivo/bar'

// const HobbyChart = () => {
//   const data = [
//     {
//       "hobby": "교육",
//       "female": 32,
//       "femaleColor": "hsl(205, 63%, 84.1%)",
//       "male": 32,
//       "maleColor": "hsl(52, 70%, 50%)",
//     },
//     {
//       "hobby": "놀이",
//       "female": 16,
//       "femaleColor": "hsl(205, 63%, 84.1%)",
//       "male": 49,
//       "maleColor": "hsl(245, 70%, 50%)",
//     },
//     {
//       "hobby": "운동",
//       "female": 12,
//       "femaleColor": "hsl(205, 63%, 84.1%)",
//       "male": 54,
//       "maleColor": "hsl(187, 70%, 50%)",
//     },
//     {
//       "hobby": "음악",
//       "female": 34,
//       "femaleColor": "hsl(205, 63%, 84.1%)",
//       "male": 27,
//       "maleColor": "hsl(325, 70%, 50%)",
//     },
//     {
//       "hobby": "자연",
//       "female": 27,
//       "femaleColor": "hsl(205, 63%, 84.1%)",
//       "male": 39,
//       "maleColor": "hsl(17, 70%, 50%)",
//     },
//     {
//       "hobby": "패션",
//       "female": 66,
//       "femaleColor": "hsl(205, 63%, 84.1%)",
//       "male": 0,
//       "maleColor": "hsl(154, 70%, 50%)",
//     },
//   ];
  
//   return (
//     <div style={{ width: '1200px', height: '500px' }}>
//     <ResponsiveBar
//       data={data}
//       keys={[
//         'female',
//         'male',
//       ]}
//       indexBy="hobby"
//       margin={{ top: 10, right: 300, bottom: 40, left: 300 }}
//       padding={0.3}
//       valueScale={{ type: 'linear' }}
//       indexScale={{ type: 'band', round: true }}
//       colors={{ scheme: 'nivo' }}
//       borderColor={{
//         from: 'color',
//         modifiers: [
//           [
//             'darker',
//             1.6
//           ]
//         ]
//       }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: 'Hobby',
//         legendPosition: 'middle',
//         legendOffset: 32
//       }}
//       axisLeft={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: 'food',
//         legendPosition: 'middle',
//         legendOffset: -40
//       }}
//       labelSkipWidth={12}
//       labelSkipHeight={12}
//       labelTextColor={{
//         from: 'color',
//         modifiers: [
//           [
//             'darker',
//             1.6
//           ]
//         ]
//       }}
//       legends={[
//         {
//           dataFrom: 'keys',
//           anchor: 'bottom-right',
//           direction: 'column',
//           justify: false,
//           translateX: 120,
//           translateY: 0,
//           itemsSpacing: 2,
//           itemWidth: 100,
//           itemHeight: 20,
//           itemDirection: 'left-to-right',
//           itemOpacity: 0.85,
//           symbolSize: 20,
//           effects: [
//             {
//               on: 'hover',
//               style: {
//                 itemOpacity: 1
//                 }
//               }
//             ]
//           }
//         ]
//       }
//       role="application"
//       ariaLabel="Nivo bar chart demo"
//       barAriaLabel={function(e){return e.id+": "+e.formattedValue+" Hobby: "+e.indexValue}}
//     />
//     </div>
//   );
// }


// export default HobbyChart;

import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

const HobbyChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats', '?groupName=style');
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
          },
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
        tooltips: {
          enabled: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero:true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize:11
            },
            scaleLabel:{
              display:false
            },
            gridLines: {
            }, 
            stacked: true
          }],
          yAxes: [{
            gridLines: {
              display:false,
              color: "#fff",
              zeroLineColor: "#fff",
              zeroLineWidth: 0
            },
            ticks: {
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize:11
            },
            stacked: true
          }]
        },
      }}
    />
  );
}

export default HobbyChart;