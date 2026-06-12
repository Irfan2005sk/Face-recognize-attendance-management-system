import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReportsView() {

  const [weeklyReport, setWeeklyReport] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [lowAttendance, setLowAttendance] = useState([]);

  useEffect(() => {
    fetchWeeklyReport();
    fetchTopStudents();
    fetchLowAttendance();
  }, []);

  const fetchWeeklyReport = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/reports/weekly'
      );

      setWeeklyReport(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopStudents = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/reports/top-students'
      );

      setTopStudents(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  const fetchLowAttendance = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/reports/low-attendance'
      );

      setLowAttendance(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div>

      {/* Weekly Report */}
      <div className="card">

        <h2>Weekly Report</h2>

        <table>

          <thead>

            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {weeklyReport.map((record) => (

              <tr key={record._id}>

                <td>{record.student?.name}</td>
                <td>{record.course?.name}</td>
                <td>{record.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <br />

      {/* Top Students */}

      <div className="card">

        <h2>Top Students</h2>

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Attendance %</th>
            </tr>

          </thead>

          <tbody>

            {topStudents.map((student) => (

              <tr key={student._id}>

                <td>{student.name}</td>
                <td>{student.attendancePercentage}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <br />

      {/* Low Attendance */}

      <div className="card">

        <h2>Low Attendance Students</h2>

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>

          </thead>

          <tbody>

            {lowAttendance.map((student) => (

              <tr key={student._id}>

                <td>{student.name}</td>
                <td>{student.email}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <br />

      <button className="pdf-btn">

        Download PDF Report

      </button>

      <button className="excel-btn">

        Download Excel Report

      </button>

    </div>

  );

}

export default ReportsView;