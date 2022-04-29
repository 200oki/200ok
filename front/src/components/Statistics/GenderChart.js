import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import styled from "../../css/match.module.css";
import StatBtn from "./StatBtn.js";
import {Chart, registerables} from "chart.js";
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

const GenderChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats', '?groupName=gender');
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
    <div>
      <Pie className="graphBack"
        data={{
          labels: dataList[1],
            datasets: [
            {
              label: dataList[1],
              data: dataList[2],
              backgroundColor: [
                'rgba(242, 226, 5, 0.3)',
                'rgba(5, 151, 242, 0.3)'
              ],
              borderColor: [
                'rgba(205, 173, 14, 1)',
                'rgba(54, 162, 235, 1)'
              ],
              weight: 100,
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
            chartArea: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
        }}
      />
      <p className="stats" style={{ marginTop: "30px", }}>
        {/* 성별은 npc 포함이라 갯수가 더 많음 어떻게 말하지?? */}
        성별은 npc 포함이라 수가 더 많습니다.
      </p>
    </div>
  );
}

export default GenderChart;