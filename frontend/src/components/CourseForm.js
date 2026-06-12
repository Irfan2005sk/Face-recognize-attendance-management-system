import React, { useState } from 'react';
import axios from 'axios';

function CourseForm() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/courses',
        {
          name: courseName,
          code: courseCode
        }
      );

      alert('Course created successfully!');

      setCourseName('');
      setCourseCode('');
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message
      );
    }
  };

  return (
    <div className="card">

      <h2>Add Course</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Create Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <button type="submit">
          Add Course
        </button>

      </form>

    </div>
  );
}

export default CourseForm;
