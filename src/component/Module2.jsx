import React from "react";
import { Button } from "react-bootstrap";

const Module2 = () => {
  return (
    <div className="module-card">

      {/* Header */}
      <div className="module-header-parent">
        <div>
          <h5 className="module-title">Analytics &amp; Reports</h5>
          <p className="module-subtitle">Visual breakdown of your spending patterns</p>
        </div>
        <div className="m2-download-group">
          <div className="m2-download-btn-wrap">
            <span className="m2-download-label">Monthly Report</span>
            <Button variant="success" className="m2-download-btn">
              <span className="m2-btn-icon">&#8659;</span> Download Excel
            </Button>
          </div>
          <div className="m2-download-divider" />
          <div className="m2-download-btn-wrap">
            <span className="m2-download-label">Yearly Report</span>
            <Button variant="warning" className="m2-download-btn m2-download-btn--year">
              <span className="m2-btn-icon">&#8659;</span> Download Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="m2-charts-grid">

        <div className="m2-chart-card m2-chart-card--blue">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--blue">Monthly</span>
              <h6 className="m2-chart-title">Expense Distribution</h6>
              <p className="m2-chart-desc">Pie chart by category — this month</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--blue">&#9685;</div>
          </div>
          <div className="m2-chart-placeholder">
            <div className="m2-placeholder-ring m2-ring--blue" />
            <span className="m2-placeholder-text">Pie Chart — Month</span>
          </div>
        </div>

        <div className="m2-chart-card m2-chart-card--purple">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--purple">Yearly</span>
              <h6 className="m2-chart-title">Expense Distribution</h6>
              <p className="m2-chart-desc">Pie chart by category — this year</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--purple">&#9685;</div>
          </div>
          <div className="m2-chart-placeholder">
            <div className="m2-placeholder-ring m2-ring--purple" />
            <span className="m2-placeholder-text">Pie Chart — Year</span>
          </div>
        </div>

        <div className="m2-chart-card m2-chart-card--green">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--green">Monthly</span>
              <h6 className="m2-chart-title">Spending Trend</h6>
              <p className="m2-chart-desc">Bar graph by date — this month</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--green">&#9646;</div>
          </div>
          <div className="m2-chart-placeholder m2-chart-placeholder--bar">
            <div className="m2-bar-preview">
              {[60, 40, 75, 50, 85, 30, 65].map((h, i) => (
                <div key={i} className="m2-bar m2-bar--green" style={{ height: `${h}%` }} />
              ))}
            </div>
            <span className="m2-placeholder-text">Bar Graph — Month</span>
          </div>
        </div>

        <div className="m2-chart-card m2-chart-card--orange">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--orange">Yearly</span>
              <h6 className="m2-chart-title">Spending Trend</h6>
              <p className="m2-chart-desc">Bar graph by month — this year</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--orange">&#9646;</div>
          </div>
          <div className="m2-chart-placeholder m2-chart-placeholder--bar">
            <div className="m2-bar-preview">
              {[45, 70, 55, 80, 40, 90, 60, 75, 50, 85, 65, 35].map((h, i) => (
                <div key={i} className="m2-bar m2-bar--orange" style={{ height: `${h}%` }} />
              ))}
            </div>
            <span className="m2-placeholder-text">Bar Graph — Year</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Module2;
