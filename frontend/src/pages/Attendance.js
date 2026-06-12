import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AttendanceView from '../components/AttendanceView';
import '../styles/dashboard.css';

function Attendance() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <h1>Attendance Management</h1>

        <AttendanceView />

      </div>

    </div>
  );
}

export default Attendance;