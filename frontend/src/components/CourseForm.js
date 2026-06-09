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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Create</button>
    </form>
  );
}

export default CourseForm;
