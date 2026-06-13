import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../services/studentService';
import { getCourses } from '../services/courseService';
import { getAttendance, markAttendance } from '../services/attendanceService';

function AttendanceView() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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
    try {
      const data = await getStudents();
      setStudents(data.students);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const data = await getAttendance();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await markAttendance(attendanceData);
      alert('Attendance marked successfully');
      fetchAttendance();
      setAttendanceData({
        student: '',
        course: '',
        status: 'Present'
      });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Mark Attendance</h2>
        <form className="student-form" onSubmit={handleSubmit}>
          <select
            value={attendanceData.student}
            onChange={(e) => setAttendanceData({ ...attendanceData, student: e.target.value })}
            required
          >
            <option value="">Select Student</option>
            {(students || []).map((student) => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
          <select
            value={attendanceData.course}
            onChange={(e) => setAttendanceData({ ...attendanceData, course: e.target.value })}
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>
          <select
            value={attendanceData.status}
            onChange={(e) => setAttendanceData({ ...attendanceData, status: e.target.value })}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button className="submit-btn" type="submit">Mark Attendance</button>
        </form>
      </div>

      <br />

      <div className="card">
        <h2>Attendance Records</h2>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <input
            className="search-box"
            style={{ marginBottom: 0 }}
            type="text"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            style={{ marginLeft: 0 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records
                .filter(record =>
                  record.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (statusFilter === 'All' || record.status === statusFilter)
                )
                .map((record) => (
                  <tr key={record._id}>
                    <td>{record.student?.name}</td>
                    <td>{record.course?.name}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-pill ${record.status === 'Present' ? 'status-present' : 'status-absent'}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <br />
        <button className="camera-btn" onClick={() => navigate('/face-recognition')}>
          Open Face Recognition Camera
        </button>
      </div>
    </div>
  );
}

export default AttendanceView;
