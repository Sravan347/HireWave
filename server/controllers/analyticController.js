

// Helper function to generate mock usage trends data
const generateMockUsageTrends = (days = 7) => {
    const data = [];
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i)); // Go back `days-1` days from today
        data.push({
            date: date.toISOString().split('T')[0], // YYYY-MM-DD format
            logins: Math.floor(Math.random() * 200) + 50, // 50 to 249 logins
            jobViews: Math.floor(Math.random() * 100) + 20, // 20 to 119 job views
            applications: Math.floor(Math.random() * 30) + 5 // 5 to 34 applications
        });
    }
    return data;
};

// Helper function to generate mock summary metrics
const generateMockSummaryMetrics = () => {
    return {
        totalUsers: 1250 + Math.floor(Math.random() * 50),
        activeRecruiters: 320 + Math.floor(Math.random() * 10),
        totalReviews: 680 + Math.floor(Math.random() * 20),
        jobsPostedLastWeek: 150 + Math.floor(Math.random() * 15),
        approvedRecruiters: 850 + Math.floor(Math.random() * 20),
        pendingRecruiters: 30 + Math.floor(Math.random() * 5)
    };
};

/**
 * @desc Get mock usage trends data for Chart.js
 * @route GET /api/analytics/dashboard/usage-trends
 * @access Admin (for demo, no real auth check here)
 */
exports.getUsageTrends = (req, res) => {
    // You can use query params to control days, e.g., ?days=30
    const days = parseInt(req.query.days) || 7;
    const mockData = generateMockUsageTrends(days);
    res.status(200).json(mockData);
};

/**
 * @desc Get mock summary metrics for the dashboard cards
 * @route GET /api/analytics/dashboard/summary
 * @access Admin (for demo, no real auth check here)
 */
exports.getSummaryMetrics = (req, res) => {
    const mockData = generateMockSummaryMetrics();
    res.status(200).json(mockData);
};