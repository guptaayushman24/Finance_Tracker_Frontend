import React from "react";

const Sidebar = ({ active, setActive }) => {
  return (
    <div className="sidebar">
      <h4 className="logo">Finance Tracker</h4>

      <button
        className={`sidebar-btn ${active === "module1" && "active"}`}
        onClick={() => setActive("module1")}
      >
        Module 1
      </button>

      <button
        className={`sidebar-btn ${active === "module2" && "active"}`}
        onClick={() => setActive("module2")}
      >
        Module 2
      </button>
    </div>
  );
};

export default Sidebar;