import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

const SpeciesChart = () => {
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
  
  console.log(dataList);
  return (
    <div>
      <Pie className="graphBack"
        data={{
          labels: dataList[1],
          datasets: [
            {
              label: '# Species',
              data: dataList[2],
              backgroundColor: [
                'rgba(242, 34, 110, 0.2)',
                'rgba(5, 151, 242, 0.3)',
              ],
              borderColor: [
                'rgba(242, 34, 110, 1)',
                'rgba(5, 151, 242, 1)',
              ],
              borderWidth: 1
            }
          ]
        }}
        height={500}
        width={500}
        options={{
          responsive: false,
        }}
      />
      <div> 
        <p>동물의 숲에서는 성별마다 성격이 존재합니다.</p>
        <p>남성은 느끼함, 먹보, 무뚝뚝, 운동광 중 하나입니다.</p>
        <p>여성은 단순 활발, 성숙함, 아이돌, 친절함 중 하나입니다.</p>
      </div>
    </div>
  );
}


export default SpeciesChart;