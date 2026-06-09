import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get('/api/attendance/reports');
      setReports(res.data);
    };
    fetchReports();
  }, []);

  const exportCSV = () => {
    const csvContent = [
      ['Student', 'Course', 'Attendance %'],
      ...reports.map(r => [r.studentName, r.courseName, r.percentage])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_report.csv';
    a.click();
  };

  return (
    <div>
      <h2>Attendance Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, idx) => (
            <tr key={idx}>
              <td>{r.studentName}</td>
              <td>{r.courseName}</td>
              <td>{r.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportCSV}>Export CSV</button>
    </div>
  );
}

export default Reports;
