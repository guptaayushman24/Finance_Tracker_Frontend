import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosInstance from "../util/AxiosInstance";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const Module2 = () => {
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [showMonthModal, setShowMonthModal] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[new Date().getMonth()]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const downloadYearExcel = async () => {
    try {
      const response = await axiosInstance.post("http://localhost:8081/yearexpenseexcel", {
        year: selectedYear,
      }, { responseType: "blob" });
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `expenses_${selectedYear}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading Excel for year:", selectedYear);
    }
    setShowYearModal(false);
  };

  const downloadMonthExcel = async (month,year) => {
    try{
      console.log("Selected month is",month);
      const response = await axiosInstance.post("http://localhost:8081/monthexpenseexcel",{
        year:year,
        month:month
      }, { responseType: "blob" })
      if (response.status==200){
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `expenses_${selectedMonthYear}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
      setShowMonthModal(false);
    }
    catch(error){
      console.error("Error downloading Excel for year: and month:", selectedYear,selectedMonth)
    }
    
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
            <Button
              variant="success"
              className="m2-download-btn"
              onClick={() => setShowMonthModal(true)}
            >
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

      {/* Month + Year Selection Modal */}
      <Modal
        show={showMonthModal}
        onHide={() => setShowMonthModal(false)}
        centered
        size="md"
      >
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
            border: "none",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <Modal.Title style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
            <span style={{ marginRight: 8 }}>&#8659;</span>
            Download Monthly Report
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "1.5rem", background: "#f9fafb" }}>
          {/* Year selector */}
          <Form.Group className="mb-3">
            <Form.Label
              style={{ fontWeight: 600, fontSize: "0.82rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Select Year
            </Form.Label>
            <Form.Select
              value={selectedMonthYear}
              onChange={(e) => setSelectedMonthYear(Number(e.target.value))}
              style={{
                borderRadius: 8,
                border: "1.5px solid #d1fae5",
                background: "#fff",
                fontWeight: 600,
                color: "#065f46",
                boxShadow: "0 1px 4px rgba(22,163,74,0.07)",
                cursor: "pointer",
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Month grid */}
          <Form.Label
            style={{ fontWeight: 600, fontSize: "0.82rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}
          >
            Select Month
          </Form.Label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.5rem",
              marginTop: "0.4rem",
            }}
          >
            {MONTHS.map((name, idx) => {
              const monthNum = idx + 1;
              const isSelected = selectedMonth === name;
              return (
                <button
                  key={monthNum}
                  type="button"
                  onClick={() => setSelectedMonth(name)}
                  style={{
                    padding: "0.55rem 0.25rem",
                    borderRadius: 8,
                    border: isSelected ? "2px solid #16a34a" : "1.5px solid #e5e7eb",
                    background: isSelected
                      ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                      : "#fff",
                    color: isSelected ? "#fff" : "#374151",
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected
                      ? "0 2px 8px rgba(22,163,74,0.3)"
                      : "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Preview pill */}
          <div
            style={{
              marginTop: "1.2rem",
              textAlign: "center",
              background: "#ecfdf5",
              borderRadius: 8,
              padding: "0.55rem 1rem",
              border: "1px solid #bbf7d0",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#065f46" }}>
              {selectedMonth} {selectedMonthYear}
            </span>
            <span style={{ fontSize: "0.78rem", color: "#6b7280", marginLeft: 8 }}>
              selected
            </span>
          </div>
        </Modal.Body>

        <Modal.Footer
          style={{
            background: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
            borderRadius: "0 0 12px 12px",
            padding: "0.9rem 1.5rem",
          }}
        >
          <Button
            variant="outline-secondary"
            onClick={() => setShowMonthModal(false)}
            style={{ borderRadius: 8, fontWeight: 600, fontSize: "0.85rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={()=>downloadMonthExcel(selectedMonth,selectedMonthYear)}
            style={{
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.85rem",
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              border: "none",
              boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>&#8659;</span> Download
          </Button>
        </Modal.Footer>
      </Modal>

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
          <Button variant="warning" onClick={() => downloadYearExcel(selectedYear)}>
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
