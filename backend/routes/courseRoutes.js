const express = require('express');
const router = express.Router();

const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getTopCourses
} = require('../controllers/courseController');

router.post('/', createCourse);
router.get('/', getCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/top', getTopCourses);

module.exports = router;