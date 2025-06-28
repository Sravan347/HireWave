// backend/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticController');
// You might want to add authMiddleware and roleMiddleware here for a real app,
// but for "show-off" with minimal complexity, we'll omit it for now.
// const { protect, authorize } = require('../middleware/authMiddleware'); // Example

// Route to get usage trends data (e.g., daily logins, job views)
// For a real app, this would be protected and only accessible by admins
router.get('/dashboard/usage-trends', analyticsController.getUsageTrends);

// Route to get summary metrics (e.g., total users, active recruiters)
// For a real app, this would be protected and only accessible by admins
router.get('/dashboard/summary', analyticsController.getSummaryMetrics);

module.exports = router;