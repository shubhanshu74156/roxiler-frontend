import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Select } from "antd";
import axios from "axios";
import "./pieChart.css"; // Import CSS file
const { Option } = Select;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const EPieChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("3");
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/roxiler/pie-chart?month=${selectedMonth}`
        );
        setPieData(response.data);
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
    <div className="pie-chart-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2px",
        }}
      >
        <p className="pie-chart-title">Pie Chart</p>
        <Select
          showSearch
          className="select-month"
          placeholder="Select Month"
          onChange={handleMonthChange}
          allowClear
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
      </div>

      <PieChart width={450} height={250}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ index }) => {
            const { _id } = pieData[index];
            return `${_id}`;
          }}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default EPieChart;
