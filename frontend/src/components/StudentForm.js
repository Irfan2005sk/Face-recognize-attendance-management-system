import React, { useState } from 'react';
import { createStudent } from '../services/studentService';

function StudentForm() {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStudent(formData);
      alert('Student added successfully');
      setFormData({
        name: '',
        rollNumber: '',
        email: ''
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message
      );
    }
  };

  return (
    <div className="card">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">
          Register Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
