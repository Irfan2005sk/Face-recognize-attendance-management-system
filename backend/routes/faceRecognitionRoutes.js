const express = require('express');
const router = express.Router();

const {
  markFaceAttendance,
  getFaceLogs
} = require('../controllers/faceRecognitionController');

router.post('/mark', markFaceAttendance);
router.get('/logs', getFaceLogs);

module.exports = router;