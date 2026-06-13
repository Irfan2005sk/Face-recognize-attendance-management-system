import React, { useEffect, useState } from 'react';
import { getStudents, deleteStudent, updateStudent } from '../services/studentService';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data.students);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (student) => {
    const newName = prompt('Enter new name:', student.name);
    if (!newName || newName === student.name) return;

    try {
      await updateStudent(student._id, { name: newName });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Student List</h2>
      <input
        className="search-box"
        type="text"
        placeholder="Search Student..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(students || [])
              .filter(student =>
                student.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.email}</td>
                  <td className="action-btns">
                    <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
