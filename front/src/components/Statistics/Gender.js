import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import styled from "../../css/match.module.css";
import StatBtn from "./StatBtn.js";
import {Chart, registerables} from "chart.js";
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

// 젠더는 npc도 포함이라 더 갯수가 많다고 적어주기!

const Gender = () => {
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
    <Pie 
      data={{
        labels: dataList[1],
          datasets: [
          {
            label: dataList[1],
            data: dataList[2],
            backgroundColor: [
              'rgba(242, 214, 74, 0.5)',
              'rgba(54, 162, 235, 0.3)'
            ],
            borderColor: [
              'rgba(205, 173, 14, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
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
          chartArea: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          },
      }}
    />
  );
}

export default Gender;