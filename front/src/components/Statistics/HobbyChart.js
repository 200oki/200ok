// import React from 'react';
// import { ResponsiveBar } from '@nivo/bar'

// // make sure parent container have a defined height when using
// // responsive component, otherwise height will be 0 and
// // no chart will be rendered.
// // website examples showcase many properties,
// // you'll often use just a few of them.
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

import React from 'react';
import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas
} from 'index';

export default class HobbyC extends React.Component {
  state = {
    useCanvas: false
  };
  render() {
    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    return (
      <div>
        <ShowcaseButton
          onClick={() => this.setState({useCanvas: !useCanvas})}
          buttonContent={content}
        />
        <XYPlot width={300} height={300} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries data={[{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}]} />
          <BarSeries data={[{x: 2, y: 12}, {x: 4, y: 2}, {x: 5, y: 11}]} />
        </XYPlot>
      </div>
    );
  }
}