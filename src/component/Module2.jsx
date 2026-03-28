import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";

const Module2 = () => {
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const downloadYearExcel = async() => {
    console.log("Downloading Excel for year:", selectedYear);
    try{
      const response = await axiosInstance.post("http://localhost:8081/yearexpenseexcel",{
        year:selectedYear
      }, { responseType: 'blob' })
      if (response.status===200){
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `expenses_${selectedYear}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    }
    catch(error){
      console.error("Error in downloading the Excel for the"+" "+selectedYear);
    }
    setShowYearModal(false);
  };

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
            <Button
              variant="warning"
              className="m2-download-btn m2-download-btn--year"
              onClick={() => setShowYearModal(true)}
            >
              <span className="m2-btn-icon">&#8659;</span> Download Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Year Selection Modal */}
      <Modal
        show={showYearModal}
        onHide={() => setShowYearModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={()=>downloadYearExcel(selectedYear)}>
            <span className="m2-btn-icon">&#8659;</span> Download
          </Button>
        </Modal.Footer>
      </Modal>

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
