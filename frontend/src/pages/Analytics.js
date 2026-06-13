import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Charts from '../components/Charts';

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
          <div className="cards">
            <div className="card" style={{ background: '#3b82f6', color: 'white' }}>
              <h3>Total Students</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalStudents}</p>
            </div>
            <div className="card" style={{ background: '#10b981', color: 'white' }}>
              <h3>Total Courses</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalCourses}</p>
            </div>
            <div className="card" style={{ background: '#f59e0b', color: 'white' }}>
              <h3>Today's Attendance</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.todayAttendance}</p>
            </div>
            <div className="card" style={{ background: '#ef4444', color: 'white' }}>
              <h3>Attendance Rate</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.attendanceRate}%</p>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '500px' }}>
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
