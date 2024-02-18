import React, { useEffect, useState } from "react";
import { Card, Select } from "antd";
import axios from "axios";
import "./Statistics.css"; // Import CSS file

const { Option } = Select;

const ECard = () => {
  const [statisticsData, setStatisticsData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("3");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/roxiler/statistics?month=${selectedMonth}`
        );

        setStatisticsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedMonth !== null) {
      fetchData();
    }
  }, [selectedMonth]);

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  return (
    <Card
      title={<span className="statistics-card-title">Statistics</span>}
      className="statistics-card" // Add class name here
      extra={
        <Select
          showSearch
          className="select-month" // Add class name here
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
      }
    >
      <div className="flex-container">
        <Card
          title="Total Sale"
          bordered={false}
          className="statistics-item-card total-sale-card" // Add class names here
        >
          {statisticsData && statisticsData.totalSaleAmount}
        </Card>

        <Card
          title={<span>Sold Items</span>}
          bordered={false}
          className="statistics-item-card sold-items-card" // Add class names here
        >
          {statisticsData && statisticsData.totalSoldItems}
        </Card>

        <Card
          title={<span>Unsold Items</span>}
          bordered={false}
          className="statistics-item-card unsold-items-card" // Add class names here
        >
          {statisticsData && statisticsData.totalUnsoldItems}
        </Card>
      </div>
    </Card>
  );
};

export default ECard;
