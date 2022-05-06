import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables)

const PopularityByGenderChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=popularity-by-gender');
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
    <Bar className="graphBack"
      data={{
        labels: dataList[1],
          datasets: [
          {
            label: '여성',
            data: dataList[2],
            backgroundColor: [
              'rgba(242, 135, 5, 0.3)'
            ],
            borderColor: [
              'rgba(242, 135, 5, 1)'
            ],
            
            borderWidth: 1
          },
          {
            label: '남성',
            data: dataList[3],
            backgroundColor: [
              'rgba(5, 151, 242, 0.3)',
            ],
            borderColor: [
              'rgba(5, 151, 242, 1)'
            ],
            
            borderWidth: 1
          },
        ],
      }}
      height={500}
      width={1200}
      options= {{
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        responsive: false,
        plugins: {
          datalabels: {
            color: 'white',
          },
        },
      }}
    />
  );
}

export default PopularityByGenderChart;