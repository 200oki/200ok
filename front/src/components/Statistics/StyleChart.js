import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

const StyleChart = () => {
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
            label: dataList[1],
            data: dataList[2],
            backgroundColor: [
              'rgba(242, 34, 110, 0.2)',
              'rgba(5, 151, 242, 0.3)',
              'rgba(3, 166, 60, 0.3)',
              'rgba(242, 226, 5, 0.3)',
              'rgba(242, 135, 5, 0.3)',
              'rgba(134, 5, 240, 0.15)',
            ],
            borderColor: [
              'rgba(242, 34, 110, 1)',
              'rgba(5, 151, 242, 1)',
              'rgba(3, 166, 60, 1)',
              'rgba(242, 226, 5, 1)',
              'rgba(242, 135, 5, 1)',
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
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          // chartArea: {
          //   backgroundColor: 'rgba(0, 0, 0, 0.7)'
          // },
      }}
    />
  );
}

export default StyleChart;