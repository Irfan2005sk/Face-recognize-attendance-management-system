import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceView() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);

  const [attendanceData, setAttendanceData] = useState({
    student: '',
    course: '',
    status: 'Present'
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/api/students');
  
    setStudents(res.data.students);
  };

  const fetchCourses = async () => {
    const res = await axios.get('http://localhost:5000/api/courses');
    setCourses(res.data);
  };

  const fetchAttendance = async () => {
    const res = await axios.get('http://localhost:5000/api/attendance');

    console.log("ATTENDANCE RESPONSE:", res.data);

    setRecords(Array.isArray(res.data) ? res.data : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/attendance',
        attendanceData
      );

      alert('Attendance marked successfully');

      fetchAttendance();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message
      );
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={attendanceData.student}
          onChange={(e) =>
            setAttendanceData({
              ...attendanceData,
              student: e.target.value
            })
          }
        >
          <option value="">Select Student</option>

          {(students || []).map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name}
            </option>
          ))}
        </select>

        <br /><br />

        <select
          value={attendanceData.course}
          onChange={(e) =>
            setAttendanceData({
              ...attendanceData,
              course: e.target.value
            })
          }
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option
              key={course._id}
              value={course._id}
            >
              {course.name}
            </option>
          ))}
        </select>

        <br /><br />

        <select
          value={attendanceData.status}
          onChange={(e) =>
            setAttendanceData({
              ...attendanceData,
              status: e.target.value
            })
          }
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <br /><br />

        <button type="submit">
          Mark Attendance
        </button>
      </form>

      <hr />

      <h2>Attendance Records</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.student?.name}</td>
              <td>{record.course?.name}</td>
              <td>
                {new Date(
                  record.date
                ).toLocaleDateString()}
              </td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceView;