import React, { useState, useEffect } from "react";
import { Image, Table, Tag, Input, Pagination, Select } from "antd";
const { Search } = Input;
const { Option } = Select;

const ETable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState("");
  const [total, setTotal] = useState();
  const [selectedMonth, setSelectedMonth] = useState("3");

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 50,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 100,
    },
    {
      title: "sold",
      dataIndex: "sold",
      width: 50,
      render: (sold) => (
        <Tag color={sold ? "green" : "red"}>{sold ? "True" : "False"}</Tag>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <Image width={100} height={100} src={image} />,
      width: 100,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/roxiler/products?page=${pagination.current}&perPage=${pagination.pageSize}&search=${searchText}&month=${selectedMonth}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { products, totalCount } = await response.json();
      setData(products);
      if (totalCount !== undefined) {
        setTotal(totalCount);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: totalCount,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination, searchText, selectedMonth]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination((prevPagination) => ({ ...prevPagination, current: 1 }));
  };

  const handleMonthChange = (value) => {
    console.log("value", value);
    setSelectedMonth(value ? value : "");
    // You can perform additional actions here if needed
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div style={{ margin: "2px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Search
            placeholder="Search"
            onSearch={handleSearch}
            style={{ width: 200, marginBottom: 16 }}
            allowClear
          />
        </div>
        <div>
          {window.innerWidth > 944 && (
            <Pagination
              current={pagination.current}
              total={total}
              itemRender={itemRender}
              pageSize={pagination.pageSize}
              onChange={(page, pageSize) => {
                setPagination({
                  ...pagination,
                  current: page,
                  pageSize: pageSize,
                });
              }}
            />
          )}
        </div>
        <div>
          <Select
            showSearch
            style={{ width: 200 }}
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
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={false} // Disable default pagination
        scroll={{ y: 300 }}
        size="small"
      />
      {window.innerWidth < 944 && (
        <div style={{ textAlign: "center", margin: "10px auto" }}>
          <Pagination
            current={pagination.current}
            total={total}
            itemRender={itemRender}
            pageSize={pagination.pageSize}
            onChange={(page, pageSize) => {
              setPagination({
                ...pagination,
                current: page,
                pageSize: pageSize,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ETable;
