import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getWeeklyReport, getTopStudents, getLowAttendance, downloadPDF, downloadExcel } from '../services/reportService';
import '../styles/dashboard.css';

function Reports() {
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [lowAttendance, setLowAttendance] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const weekly = await getWeeklyReport();
      const top = await getTopStudents();
      const low = await getLowAttendance();
      
      setWeeklyReport(weekly);
      setTopStudents(top);
      setLowAttendance(low);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = await downloadPDF();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error downloading PDF');
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error downloading Excel');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Attendance Reports</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="pdf-btn" onClick={handleDownloadPDF}>Download PDF</button>
              <button className="excel-btn" onClick={handleDownloadExcel}>Download Excel</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card">
              <h3>Top Students</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((s, index) => (
                      <tr key={index}>
                        <td>{s.studentName || s.name}</td>
                        <td>{s.percentage || s.attendancePercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3>Low Attendance Alerts</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowAttendance.map((s, index) => (
                      <tr key={index}>
                        <td>{s.studentName || s.name}</td>
                        <td style={{ color: '#ef4444' }}>{s.percentage || s.attendancePercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
