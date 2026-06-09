const express = require('express');
const router = express.Router();

const {
  getDashboardStats,
  getChartData
} = require('../controllers/dashboardController');

router.get('/stats', getDashboardStats);
router.get('/chart', getChartData);
module.exports = router;