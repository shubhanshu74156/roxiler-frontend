import "./App.css";
import ETable from "./components/table/Table";
import ECard from "./components/statistics/Statistics";
import EBarChart from "./components/barChart/BarChart";
import EPieChart from "./components/pieChart/PieChart";

function App() {
  return (
    <div
      style={{
        margin: "5px",
      }}
    >
      <div className="grid-container">
        <div className="item1">
          <ECard />
        </div>
        <div className="item2">
          <EPieChart />
        </div>
        <div className="item3">
          <EBarChart />
        </div>
      </div>

      <hr
        style={{ backgroundColor: "#F0F3FF", height: "1px", border: "none" }}
      />
      <ETable />
    </div>
  );
}

export default App;
