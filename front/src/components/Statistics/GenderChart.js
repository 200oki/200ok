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
                'rgba(242, 135, 5, 0.3)',
                'rgba(5, 151, 242, 0.3)',
              ],
              borderColor: [
                'rgba(242, 135, 5, 1)',
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
    </div>
  );
}


export default SpeciesChart;