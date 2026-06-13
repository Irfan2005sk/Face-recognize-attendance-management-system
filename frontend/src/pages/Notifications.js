import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';

const Notifications = () => {
  const notifications = [
    { id: 1, message: "New student 'John Doe' registered.", time: "2 hours ago" },
    { id: 2, message: "Attendance report for 'CS101' is ready.", time: "5 hours ago" },
    { id: 3, message: "Low attendance alert for 5 students.", time: "1 day ago" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="card">
          <h2>Notifications</h2>
          <div className="notification-list" style={{ marginTop: '20px' }}>
            {notifications.map(notif => (
              <div key={notif.id} className="notification-item" style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                <p style={{ margin: 0, fontWeight: '500' }}>{notif.message}</p>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{notif.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
