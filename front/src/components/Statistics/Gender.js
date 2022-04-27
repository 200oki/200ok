import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from "../../css/match.module.css";
import {Chart, registerables} from 'chart.js'
Chart.register(...registerables)

const Gender = () => {
  return (
    <div className={styled.Wrapper}>
      <Bar 
        data={{
          labels: ['Female', 'Male'],
            datasets: [
            {
              label: '# Gender',
              data: [208, 244],
              backgroundColor: [
                'rgba(242, 214, 74, 0.8)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(205, 173, 14, 1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
              }
            ]
        }}
        height={400}
        width={400}
        options= {{
            responsive: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
        }}
      />
    </div>
  );
}

export default Gender;