import API from './api';

export const getWeeklyReport = async () => {
  const response = await API.get('/reports/weekly');
  return response.data;
};

export const getTopStudents = async () => {
  const response = await API.get('/reports/top-students');
  return response.data;
};

export const getLowAttendance = async () => {
  const response = await API.get('/reports/low-attendance');
  return response.data;
};

export const downloadPDF = async () => {
  const response = await API.get('/reports/pdf', { responseType: 'blob' });
  return response.data;
};

export const downloadExcel = async () => {
  const response = await API.get('/reports/excel', { responseType: 'blob' });
  return response.data;
};
