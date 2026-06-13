import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';
import '../styles/faceRecognition.css';

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      setMessage('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
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
      
      // Simulate backend call
      const res = await axios.post('http://localhost:5000/api/face-recognition/mark', {
        studentName: 'Test Student', 
        course: selectedCourse,
        confidence: 0.95
      });

      setMessage(res.data.message);
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
