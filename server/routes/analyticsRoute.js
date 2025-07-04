
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticController');



router.get('/dashboard/usage-trends', analyticsController.getUsageTrends);


router.get('/dashboard/summary', analyticsController.getSummaryMetrics);

module.exports = router;