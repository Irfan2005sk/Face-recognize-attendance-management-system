import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Charts from '../components/Charts';
import API from '../services/api';
import '../styles/dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalAttendance: 0,
    todayAttendance: 0,
    attendanceRate: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h1>Dashboard Overview</h1>
        <div className="stats-grid">
          <div className="stat-card blue-card">
            <h3>Total Students</h3>
            <p className="stat-value">{stats.totalStudents}</p>
          </div>
          <div className="stat-card green-card">
            <h3>Total Courses</h3>
            <p className="stat-value">{stats.totalCourses}</p>
          </div>
          <div className="stat-card orange-card">
            <h3>Present Today</h3>
            <p className="stat-value">{stats.todayAttendance}</p>
          </div>
          <div className="stat-card red-card">
            <h3>Absent Today</h3>
            <p className="stat-value">{stats.totalStudents - stats.todayAttendance}</p>
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-wrapper">
            <h3>Attendance Distribution</h3>
            <Charts present={stats.todayAttendance} absent={stats.totalStudents - stats.todayAttendance} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
