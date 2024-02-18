import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Select } from "antd";
import axios from "axios";
import "./BarChart.css"; // Import CSS file

const { Option } = Select;

const EBarChart = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("3");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/roxiler/bar-chart?month=${selectedMonth}`
        );
        setBarChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <Card
      title={<span className="bar-chart-title">Bar Chart Stats</span>}
      bordered={false}
      className="bar-chart-card" // Add class name here
      extra={
        <Select
          showSearch
          className="select-month" // Add class name here
          placeholder="Select Month"
          onChange={handleMonthChange}
          defaultValue={"3"}
        >
          <Option value="1">January</Option>
          <Option value="2">February</Option>
          <Option value="3">March</Option>
          <Option value="4">April</Option>
          <Option value="5">May</Option>
          <Option value="6">June</Option>
          <Option value="7">July</Option>
          <Option value="8">August</Option>
          <Option value="9">September</Option>
          <Option value="10">October</Option>
          <Option value="11">November</Option>
          <Option value="12">December</Option>
        </Select>
      }
    >
      <BarChart
        width={400}
        height={200}
        data={barChartData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="count"
          fill="#D0A2F7"
          activeBar={<Rectangle fill="#FF8911" stroke="#FF8911" />}
        />
      </BarChart>
    </Card>
  );
};

export default EBarChart;
