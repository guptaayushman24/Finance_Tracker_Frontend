import React from "react";
import { Button } from "react-bootstrap";

const Module2 = () => {
  return (
    <div className="module-card">

      <div className="download-section">
        <Button variant="success">Download Excel (Month)</Button>
        <Button variant="warning">Download Excel (Year)</Button>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h6>Pie Chart - Month</h6>
          <div className="chart-placeholder">Pie Chart Here</div>
        </div>

        <div className="chart-box">
          <h6>Pie Chart - Year</h6>
          <div className="chart-placeholder">Pie Chart Here</div>
        </div>

        <div className="chart-box">
          <h6>Bar Graph - Month</h6>
          <div className="chart-placeholder">Bar Chart Here</div>
        </div>

        <div className="chart-box">
          <h6>Bar Graph - Year</h6>
          <div className="chart-placeholder">Bar Chart Here</div>
        </div>
      </div>

    </div>
  );
};

export default Module2;