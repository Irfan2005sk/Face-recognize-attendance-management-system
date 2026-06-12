import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';
import '../styles/dashboard.css';

function Courses() {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <h1>Course Management</h1>

        <CourseForm />

        <br />

        <CourseList />

      </div>

    </div>
  );
}

export default Courses;