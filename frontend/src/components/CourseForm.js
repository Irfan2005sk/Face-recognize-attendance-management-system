import React, { useState } from 'react';
import { createCourse } from '../services/courseService';

function CourseForm() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCourse({
        name: courseName,
        code: courseCode
      });

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
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">
          Add Course
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
