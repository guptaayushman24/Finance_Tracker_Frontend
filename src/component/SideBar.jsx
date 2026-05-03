import React from "react"; // eslint-disable-line
import { useNavigate } from "react-router-dom";
const Sidebar = ({ active, setActive}) => {
  const navigate = useNavigate();
  const onLogout =()=>{
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signin");
    
  }
  return (
    <div className="sidebar">
      <h4 className="logo">Finance Tracker</h4>

      <button
        className={`sidebar-btn ${active === "module1" && "active"}`}
        onClick={() => setActive("module1")}
      >
        Expense Tracker
      </button>

      <button
        className={`sidebar-btn ${active === "module2" && "active"}`}
        onClick={() => setActive("module2")}
      >
       Expense Visualization
      </button>

      <div className="sidebar-spacer" />

      <button className="sidebar-logout-btn" onClick={()=>onLogout()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;