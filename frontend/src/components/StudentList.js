import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/students'
      );

      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Delete this student?')) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const editStudent = async (student) => {
    const newName = prompt(
      'Enter new name:',
      student.name
    );

    if (!newName) return;

    try {
      await axios.put(
        `http://localhost:5000/api/students/${student._id}`,
        {
          ...student,
          name: newName
        }
      );

      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.email}</td>

              <td>
                <button
                  onClick={() =>
                    editStudent(student)
                  }
                >
                  Edit
                </button>

                {' '}

                <button
                  onClick={() =>
                    deleteStudent(student._id)
                  }
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

export default StudentList;