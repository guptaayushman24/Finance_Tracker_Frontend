import React, { useState } from "react";
import Sidebar from "../component/SideBar";
import Module1 from "../component/Module1";
import Module2 from "../component/Module2";
import "../css/dashboard.css"
const Dashboard = () => {
  const [activeModule, setActiveModule] = useState("module1");

  return (
    <div className="dashboard-container">
      <Sidebar active={activeModule} setActive={setActiveModule} />

      <div className="content-area">
        {activeModule === "module1" && <Module1 />}
        {activeModule === "module2" && <Module2 />}
      </div>
    </div>
  );
};

export default Dashboard;