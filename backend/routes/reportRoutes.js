const express = require('express');
const router = express.Router();

const {
  getStudentReport
} = require('../controllers/reportController');

router.get('/students', getStudentReport);

module.exports = router;