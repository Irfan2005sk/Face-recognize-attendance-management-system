const express = require('express');
const router = express.Router();

const {
  registerFace,
  markFaceAttendance,
  getFaceLogs
} = require('../controllers/faceRecognitionController');

router.post('/register', registerFace);
router.post('/mark', markFaceAttendance);
router.get('/logs', getFaceLogs);

module.exports = router;