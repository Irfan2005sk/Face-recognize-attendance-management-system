const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  searchStudents,
  getStudentByName,
  getStudentHistory
} = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/', getStudents);
router.get('/search', searchStudents);
router.get('/name/:name', getStudentByName);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/:id/history', getStudentHistory);

module.exports = router;
