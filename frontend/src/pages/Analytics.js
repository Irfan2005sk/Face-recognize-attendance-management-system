import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Charts from '../components/Charts';
import '../styles/dashboard.css';
import '../styles/analytics.css';

const Analytics = () => {
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
        const res = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="card">
          <h2>Analytics Overview</h2>
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
              <h3>Today's Attendance</h3>
              <p className="stat-value">{stats.todayAttendance}</p>
            </div>
            <div className="stat-card red-card">
              <h3>Attendance Rate</h3>
              <p className="stat-value">{stats.attendanceRate}%</p>
            </div>
          </div>
          
          <div className="chart-section">
            <div className="chart-wrapper">
              <h3>Attendance Distribution</h3>
              <Charts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
