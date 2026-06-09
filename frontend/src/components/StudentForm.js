import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post(
        'http://localhost:5000/api/students',
        formData
      );

      alert('Student added successfully');

      // Reset form
      setFormData({
        name: '',
        rollNumber: '',
        email: ''
      });

    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response?.data);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message
      );
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Register Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;