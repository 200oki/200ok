import React, { useState, useEffect } from 'react';
import * as Api from "../../api";
import { BarChart, Bar, XAxis, YAxis,
	CartesianGrid, Legend, Tooltip } from 'recharts';

const HobbyChart = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getDataList() {
    try {
      const { data } = await Api.get('stats?groupName=hobby');
      setDataList([...Object.values(data.payload)]);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataList();
  }, []);


	const data = dataList[1];

	return (
		<BarChart className="graphBack" width={1200} height={500} data={data} >
			<CartesianGrid />
			<XAxis dataKey="name" />
			<YAxis />
      <Tooltip />
      <Legend />
			<Bar dataKey="x" stackId="a" fill="#F5F197" />
			<Bar dataKey="y" stackId="a" fill="#BDDBF0" />
		</BarChart>
	);
}

export default HobbyChart;
