import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="sidebar">
      <h2>Attendance System</h2>
      <ul>
        <li>
          <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
        </li>
        <li>
          <Link to="/students" className={isActive('/students')}>Students</Link>
        </li>
        <li>
          <Link to="/courses" className={isActive('/courses')}>Courses</Link>
        </li>
        <li>
          <Link to="/attendance" className={isActive('/attendance')}>Attendance</Link>
        </li>
        <li>
          <Link to="/reports" className={isActive('/reports')}>Reports</Link>
        </li>
        <li>
          <Link to="/analytics" className={isActive('/analytics')}>Analytics</Link>
        </li>
        <li>
          <Link to="/notifications" className={isActive('/notifications')}>Notifications</Link>
        </li>
        <li>
          <Link to="/face-recognition" className={isActive('/face-recognition')}>Face Recognition</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
