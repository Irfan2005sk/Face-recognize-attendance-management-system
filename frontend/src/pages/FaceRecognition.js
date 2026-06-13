import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getCourses } from '../services/courseService';
import { markFaceAttendance } from '../services/attendanceService';
import '../styles/dashboard.css';

const FaceRecognition = () => {
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCoursesData();
  }, []);

  useEffect(() => {
    if (
      isCameraOpen &&
      videoRef.current &&
      streamRef.current
    ) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      streamRef.current = stream;
      setIsCameraOpen(true);

    } catch (err) {
      setMessage('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = streamRef.current?.getTracks() || [];
      tracks.forEach(track => track.stop());
      streamRef.current = null;
      videoRef.current.srcObject = null;
      setIsCameraOpen(false);
    }
  };

  const captureAndRecognize = async () => {
    if (!selectedCourse) {
      alert('Please select a course first');
      return;
    }

    setLoading(true);
    setMessage('Processing...');

    try {
      // Placeholder for face recognition logic
      setMessage('Face recognition is being simulated for this demo.');

      const res = await markFaceAttendance({
        studentName: 'Test Student',
        course: selectedCourse,
        confidence: 0.95
      });

      setMessage(res.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Recognition failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="card">
          <h2>Face Recognition Attendance</h2>

          <div className="course-selector">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="filter-select"
              style={{ marginLeft: 0 }}
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="camera-wrapper">
            {isCameraOpen ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
              />
            ) : (
              <div className="camera-placeholder">
                Camera is off
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          <div className="action-buttons">
            {!isCameraOpen ? (
              <button className="camera-btn" onClick={startCamera}>Start Camera</button>
            ) : (
              <>
                <button className="camera-btn" onClick={captureAndRecognize} disabled={loading}>
                  {loading ? 'Processing...' : 'Capture & Mark Attendance'}
                </button>
                <button className="delete-btn" onClick={stopCamera}>Stop Camera</button>
              </>
            )}
          </div>

          {message && (
            <div className={`status-message ${message.includes('success') ? 'status-success' : 'status-error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
