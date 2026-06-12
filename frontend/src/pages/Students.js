import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import '../styles/dashboard.css';

function Students() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <h1>Student Management</h1>

        <StudentForm />

        <br />

        <StudentList />

      </div>

    </div>
  );
}

export default Students;