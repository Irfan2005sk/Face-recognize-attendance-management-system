import API from './api';

export const getAttendance = async (params) => {
  const response = await API.get('/attendance', { params });
  return response.data;
};

export const markAttendance = async (attendanceData) => {
  const response = await API.post('/attendance', attendanceData);
  return response.data;
};

export const markFaceAttendance = async (faceData) => {
  const response = await API.post('/face-recognition/mark', faceData);
  return response.data;
};

export const getFaceLogs = async () => {
  const response = await API.get('/face-recognition/logs');
  return response.data;
};

export const registerFace = async (faceData) => {
  const response = await API.post('/face-recognition/register', faceData);
  return response.data;
};
