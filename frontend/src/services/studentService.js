import API from './api';

export const getStudents = async (params) => {
  const response = await API.get('/students', { params });
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await API.post('/students', studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await API.put(`/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`);
  return response.data;
};

export const searchStudents = async (name) => {
  const response = await API.get('/students/search', { params: { name } });
  return response.data;
};

export const getStudentHistory = async (id) => {
  const response = await API.get(`/students/${id}/history`);
  return response.data;
};
