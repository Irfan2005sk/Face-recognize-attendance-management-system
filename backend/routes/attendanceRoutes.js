const express = require('express');
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getAttendanceReport,
  getAttendanceStats
} = require('../controllers/attendanceController');

router.post('/', markAttendance);
router.get('/', getAttendance);
router.get('/reports', getAttendanceReport);
router.get('/stats', getAttendanceStats);

module.exports = router;