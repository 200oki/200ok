import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import { PieChart } from 'react-minimal-pie-chart';

const GenderChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats', '?groupName=gender');
      console.log([...Object.values(data)]);
      return data.payload;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataList().then((dataList) => {
      setDataList([...Object.values(dataList)]);
      console.log(dataList[1][0]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <PieChart className="graphBack"
        data={dataList[1]}
        label={({ dataEntry }) => dataEntry.value}
        animate
      />
      <p className="desc">
        {/* 성별은 npc 포함이라 갯수가 더 많음 어떻게 말하지?? */}
        * 성별은 npc 포함이라 수가 더 많습니다 *
      </p>
    </div>
  );
  
}

export default GenderChart;