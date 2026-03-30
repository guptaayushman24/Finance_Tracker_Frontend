import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import axiosInstance from "../util/AxiosInstance";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const PIE_COLORS = [
  "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b",
  "#ef4444", "#06b6d4", "#ec4899", "#84cc16",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

// Convert { Category: amount } map → [{ name, value, fill }]
const mapToChartData = (obj) =>
  Object.entries(obj || {}).map(([name, value], i) => ({
    name,
    value,
    fill: PIE_COLORS[i % PIE_COLORS.length],
  }));

// Convert { key: amount } map → [{ name, amount }]
const mapToBarData = (obj) =>
  Object.entries(obj || {}).map(([name, amount]) => ({ name, amount }));

const Module2 = () => {
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [showMonthModal, setShowMonthModal] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[new Date().getMonth()]);

  // Chart filter states
  const [pieMonthYear, setPieMonthYear] = useState(currentYear);
  const [pieMonthMonth, setPieMonthMonth] = useState(MONTHS[new Date().getMonth()]);
  const [barMonthYear, setBarMonthYear] = useState(currentYear);
  const [barMonthMonth, setBarMonthMonth] = useState(MONTHS[new Date().getMonth()]);
  const [pieYearFilter, setPieYearFilter] = useState(currentYear);
  const [barYearFilter, setBarYearFilter] = useState(currentYear);

  // Chart data states
  const [pieMonthData, setPieMonthData] = useState([]);
  const [pieYearData, setPieYearData] = useState([]);
  const [barMonthData, setBarMonthData] = useState([]);
  const [barYearData, setBarYearData] = useState([]);

  // Loading states
  const [loadingPieMonth, setLoadingPieMonth] = useState(false);
  const [loadingPieYear, setLoadingPieYear] = useState(false);
  const [loadingBarMonth, setLoadingBarMonth] = useState(false);
  const [loadingBarYear, setLoadingBarYear] = useState(false);

  const fetchPieMonth = useCallback(async () => {
    setLoadingPieMonth(true);
    try {
      const response = await axiosInstance.get("https://userexpense-production.up.railway.app/piechartbymonth", {
        params: { monthName: pieMonthMonth, year: pieMonthYear },
      });
      setPieMonthData(mapToChartData(response.data));
    } catch (e) {
      console.error("Pie chart (month) error:", e);
    } finally {
      setLoadingPieMonth(false);
    }
  }, [pieMonthMonth, pieMonthYear]);

  const fetchPieYear = useCallback(async () => {
    setLoadingPieYear(true);
    try {
      const res = await axiosInstance.get("https://userexpense-production.up.railway.app/piechartbyyear", {
        params: { year: pieYearFilter },
      });
      setPieYearData(mapToChartData(res.data));
    } catch (e) {
      console.error("Pie chart (year) error:", e);
    } finally {
      setLoadingPieYear(false);
    }
  }, [pieYearFilter]);

  const fetchBarMonth = useCallback(async () => {
    setLoadingBarMonth(true);
    try {
      const res = await axiosInstance.get("https://userexpense-production.up.railway.app/bargraphbymonth", {
        params: { monthName: barMonthMonth, year: barMonthYear },
      });
      setBarMonthData(mapToBarData(res.data));
    } catch (e) {
      console.error("Bar chart (month) error:", e);
    } finally {
      setLoadingBarMonth(false);
    }
  }, [barMonthMonth, barMonthYear]);

  const fetchBarYear = useCallback(async () => {
    setLoadingBarYear(true);
    try {
      const res = await axiosInstance.get("https://userexpense-production.up.railway.app/bargraphbyyear", {
        params: { year: barYearFilter },
      });
      setBarYearData(mapToBarData(res.data));
    } catch (e) {
      console.error("Bar chart (year) error:", e);
    } finally {
      setLoadingBarYear(false);
    }
  }, [barYearFilter]);

  useEffect(() => { fetchPieMonth(); }, [fetchPieMonth]);
  useEffect(() => { fetchPieYear(); }, [fetchPieYear]);
  useEffect(() => { fetchBarMonth(); }, [fetchBarMonth]);
  useEffect(() => { fetchBarYear(); }, [fetchBarYear]);

  const downloadYearExcel = async () => {
    try {
      const response = await axiosInstance.post("https://userexpense-production.up.railway.app/yearexpenseexcel", {
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

  const downloadMonthExcel = async (month, year) => {
    try {
      const response = await axiosInstance.post("https://userexpense-production.up.railway.app/monthexpenseexcel", {
        year,
        month,
      }, { responseType: "blob" });
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `expenses_${year}_${month}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
      setShowMonthModal(false);
    } catch (error) {
      console.error("Error downloading Excel for month:", month, year);
    }
  };

  const ChartLoader = () => (
    <div className="m2-chart-placeholder">
      <span className="m2-placeholder-text">Loading...</span>
    </div>
  );

  const EmptyChart = ({ text }) => (
    <div className="m2-chart-placeholder">
      <span className="m2-placeholder-text">{text || "No data available"}</span>
    </div>
  );

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
      <Modal show={showMonthModal} onHide={() => setShowMonthModal(false)} centered size="md">
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
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 600, fontSize: "0.82rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Select Year
            </Form.Label>
            <Form.Select
              value={selectedMonthYear}
              onChange={(e) => setSelectedMonthYear(Number(e.target.value))}
              style={{ borderRadius: 8, border: "1.5px solid #d1fae5", background: "#fff", fontWeight: 600, color: "#065f46", cursor: "pointer" }}
            >
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Label style={{ fontWeight: 600, fontSize: "0.82rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Select Month
          </Form.Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginTop: "0.4rem" }}>
            {MONTHS.map((name, idx) => {
              const isSelected = selectedMonth === name;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedMonth(name)}
                  style={{
                    padding: "0.55rem 0.25rem",
                    borderRadius: 8,
                    border: isSelected ? "2px solid #16a34a" : "1.5px solid #e5e7eb",
                    background: isSelected ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)" : "#fff",
                    color: isSelected ? "#fff" : "#374151",
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {name.slice(0, 3)}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "1.2rem", textAlign: "center", background: "#ecfdf5", borderRadius: 8, padding: "0.55rem 1rem", border: "1px solid #bbf7d0" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#065f46" }}>{selectedMonth} {selectedMonthYear}</span>
            <span style={{ fontSize: "0.78rem", color: "#6b7280", marginLeft: 8 }}>selected</span>
          </div>
        </Modal.Body>

        <Modal.Footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", borderRadius: "0 0 12px 12px", padding: "0.9rem 1.5rem" }}>
          <Button variant="outline-secondary" onClick={() => setShowMonthModal(false)} style={{ borderRadius: 8, fontWeight: 600, fontSize: "0.85rem" }}>Cancel</Button>
          <Button
            variant="success"
            onClick={() => downloadMonthExcel(selectedMonth, selectedMonthYear)}
            style={{ borderRadius: 8, fontWeight: 700, fontSize: "0.85rem", background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", border: "none", display: "flex", alignItems: "center", gap: 6 }}
          >
            <span>&#8659;</span> Download
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Year Selection Modal */}
      <Modal show={showYearModal} onHide={() => setShowYearModal(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Select Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
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

        {/* Monthly Pie Chart */}
        <div className="m2-chart-card m2-chart-card--blue">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--blue">Monthly</span>
              <h6 className="m2-chart-title">Expense Distribution</h6>
              <p className="m2-chart-desc">Pie chart by category — this month</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--blue">&#9685;</div>
          </div>
          <div className="m2-chart-filters">
            <select className="m2-chart-select" value={pieMonthYear} onChange={(e) => setPieMonthYear(Number(e.target.value))}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select className="m2-chart-select" value={pieMonthMonth} onChange={(e) => setPieMonthMonth(e.target.value)}>
              {MONTHS.map((m) => <option key={m} value={m}>{m.slice(0, 3)}</option>)}
            </select>
          </div>
          {loadingPieMonth ? <ChartLoader /> : pieMonthData.length === 0 ? <EmptyChart text="No data for selected period" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieMonthData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} />
                <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Yearly Pie Chart */}
        <div className="m2-chart-card m2-chart-card--purple">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--purple">Yearly</span>
              <h6 className="m2-chart-title">Expense Distribution</h6>
              <p className="m2-chart-desc">Pie chart by category — this year</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--purple">&#9685;</div>
          </div>
          <div className="m2-chart-filters">
            <select className="m2-chart-select" value={pieYearFilter} onChange={(e) => setPieYearFilter(Number(e.target.value))}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          {loadingPieYear ? <ChartLoader /> : pieYearData.length === 0 ? <EmptyChart text="No data for selected year" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieYearData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} />
                <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Monthly Bar Chart */}
        <div className="m2-chart-card m2-chart-card--green">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--green">Monthly</span>
              <h6 className="m2-chart-title">Spending Trend</h6>
              <p className="m2-chart-desc">Bar graph by date — this month</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--green">&#9646;</div>
          </div>
          <div className="m2-chart-filters">
            <select className="m2-chart-select" value={barMonthYear} onChange={(e) => setBarMonthYear(Number(e.target.value))}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select className="m2-chart-select" value={barMonthMonth} onChange={(e) => setBarMonthMonth(e.target.value)}>
              {MONTHS.map((m) => <option key={m} value={m}>{m.slice(0, 3)}</option>)}
            </select>
          </div>
          {loadingBarMonth ? <ChartLoader /> : barMonthData.length === 0 ? <EmptyChart text="No data for selected period" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barMonthData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
                <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Yearly Bar Chart */}
        <div className="m2-chart-card m2-chart-card--orange">
          <div className="m2-chart-card-header">
            <div>
              <span className="m2-chart-badge m2-chart-badge--orange">Yearly</span>
              <h6 className="m2-chart-title">Spending Trend</h6>
              <p className="m2-chart-desc">Bar graph by month — this year</p>
            </div>
            <div className="m2-chart-icon m2-chart-icon--orange">&#9646;</div>
          </div>
          <div className="m2-chart-filters">
            <select className="m2-chart-select" value={barYearFilter} onChange={(e) => setBarYearFilter(Number(e.target.value))}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          {loadingBarYear ? <ChartLoader /> : barYearData.length === 0 ? <EmptyChart text="No data for selected year" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barYearData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
                <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                <Bar dataKey="amount" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
};

export default Module2;
