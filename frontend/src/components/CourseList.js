import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/courses'
    );

    setCourses(res.data);
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;

    await axios.delete(
      `http://localhost:5000/api/courses/${id}`
    );

    fetchCourses();
  };

  const editCourse = async (course) => {
    const newName = prompt(
      'Enter new course name:',
      course.name
    );

    if (!newName) return;

    await axios.put(
      `http://localhost:5000/api/courses/${course._id}`,
      {
        ...course,
        name: newName
      }
    );

    fetchCourses();
  };

  return (

    <div className="card">

      <h2>Course List</h2>

      <input
        className="search-box"
        type="text"
        placeholder="Search Course..."
      />

      <table>

        <thead>

          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.code}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => editCourse(course)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteCourse(course._id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;