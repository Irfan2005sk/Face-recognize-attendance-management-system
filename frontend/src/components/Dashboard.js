import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalAttendance: 0,
    todayAttendance: 0,
    attendanceRate: 0
  });
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Attendance Management System</h1>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Students</h3>
          <h2>{stats.totalStudents}</h2>
        </div>

        <div className="card">
          <h3>Total Courses</h3>
          <h2>{stats.totalCourses}</h2>
        </div>

        <div className="card">
          <h3>Total Attendance</h3>
          <h2>{stats.totalAttendance}</h2>
        </div>

        <div className="card">
          <h3>Today's Attendance</h3>
          <h2>{stats.todayAttendance}</h2>
        </div>

        <div className="card">
          <h3>Attendance Rate</h3>
          <h2>{stats.attendanceRate}%</h2>
        </div>
      </div>

      <div className="nav-buttons">
        <Link to="/students"><button>Students</button></Link>
        <Link to="/courses"><button>Courses</button></Link>
        <Link to="/attendance"><button>Attendance</button></Link>
        <Link to="/reports"><button>Reports</button></Link>
        <Link to="/student-list">
          <button>View Students</button>
        </Link>
        <Link to="/course-list">
          <button>View Courses</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;