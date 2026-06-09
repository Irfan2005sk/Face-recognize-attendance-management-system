import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import CourseForm from './components/CourseForm';
import AttendanceView from './components/AttendanceView';
import Register from './pages/Register';
import Login from './pages/Login';
import Reports from './pages/Reports';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentForm />} />
        <Route path="/courses" element={<CourseForm />} />
        <Route path="/attendance" element={<AttendanceView />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route
          path="/reports"
          element={<Reports />}
        />
      </Routes>
    </Router>
  );
}

export default App;
