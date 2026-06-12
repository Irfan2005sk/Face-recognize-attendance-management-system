import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Charts from '../components/Charts';
import '../styles/dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="dashboard-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <h1>Dashboard</h1>

                <div className="cards">

                    <div className="card">
                        <h3>Total Students</h3>
                        <p>{stats.totalStudents}</p>
                    </div>

                    <div className="card">
                        <h3>Total Courses</h3>
                        <p>{stats.totalCourses}</p>
                    </div>

                    <div className="card">
                        <h3>Present Today</h3>
                        <p>{stats.todayAttendance}</p>
                    </div>

                    <div className="card">
                        <h3>Absent Today</h3>
                        <p>{stats.totalAttendance - stats.todayAttendance}</p>
                    </div>

                </div>

                <Charts />

            </div>

        </div>
    );
}

export default Dashboard;