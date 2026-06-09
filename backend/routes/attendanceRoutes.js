const express = require('express');
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getAttendanceReport
} = require('../controllers/attendanceController');

router.post('/', markAttendance);
router.get('/', getAttendance);
router.get('/reports', getAttendanceReport);

module.exports = router;