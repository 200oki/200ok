import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables)

const SpeciesChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=species');
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
            data: dataList[2],
            backgroundColor: [
              'rgba(242, 135, 5, 0.3)'
            ],
            borderColor: [
              'rgba(242, 135, 5, 1)'
            ],
            borderWidth: 1
            }
          ]
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
          legend: false // Hide legend
        },
      }}
    />
  );
}

export default SpeciesChart;