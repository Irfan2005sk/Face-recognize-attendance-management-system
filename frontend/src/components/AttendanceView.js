import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceView() {
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
    const res = await axios.get(
      'http://localhost:5000/api/students'
    );

    setStudents(res.data.students);
  };

  const fetchCourses = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/courses'
    );

    setCourses(res.data);
  };

  const fetchAttendance = async () => {
    const res = await axios.get(
      'http://localhost:5000/api/attendance'
    );

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

      setAttendanceData({
        student: '',
        course: '',
        status: 'Present'
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message
      );
    }
  };

  return (
    <div>

      {/* Mark Attendance Card */}
      <div className="card">

        <h2>Mark Attendance</h2>

        <form
          className="student-form"
          onSubmit={handleSubmit}
        >

          <select
            value={attendanceData.student}
            onChange={(e) =>
              setAttendanceData({
                ...attendanceData,
                student: e.target.value
              })
            }
          >
            <option value="">
              Select Student
            </option>

            {(students || []).map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            ))}
          </select>

          <select
            value={attendanceData.course}
            onChange={(e) =>
              setAttendanceData({
                ...attendanceData,
                course: e.target.value
              })
            }
          >
            <option value="">
              Select Course
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.name}
              </option>
            ))}
          </select>

          <select
            value={attendanceData.status}
            onChange={(e) =>
              setAttendanceData({
                ...attendanceData,
                status: e.target.value
              })
            }
          >
            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>
          </select>

          <button
            className="submit-btn"
            type="submit"
          >
            Mark Attendance
          </button>

        </form>

      </div>

      <br />

      {/* Records Card */}
      <div className="card">

        <h2>Attendance Records</h2>

        <input
          className="search-box"
          type="text"
          placeholder="Search Student..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

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
              .filter(
                (record) =>
                  record.student?.name
                    ?.toLowerCase()
                    .includes(
                      searchTerm.toLowerCase()
                    ) &&
                  (statusFilter === 'All' ||
                    record.status === statusFilter)
              )
              .map((record) => (
                <tr key={record._id}>

                  <td>
                    {record.student?.name}
                  </td>

                  <td>
                    {record.course?.name}
                  </td>

                  <td>
                    {new Date(
                      record.date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {record.status}
                  </td>

                </tr>
              ))}

          </tbody>

        </table>

        <br />

        <button className="camera-btn">
          Open Face Recognition Camera
        </button>

      </div>

    </div>
  );
}

export default AttendanceView;