
const generateMockUsageTrends = (days = 7) => {
    const data = [];
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        data.push({
            date: date.toISOString().split('T')[0], 
            logins: Math.floor(Math.random() * 200) + 50, 
            jobViews: Math.floor(Math.random() * 100) + 20, 
            applications: Math.floor(Math.random() * 30) + 5 
        });
    }
    return data;
};


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


exports.getUsageTrends = (req, res) => {
   
    const days = parseInt(req.query.days) || 7;
    const mockData = generateMockUsageTrends(days);
    res.status(200).json(mockData);
};


exports.getSummaryMetrics = (req, res) => {
    const mockData = generateMockSummaryMetrics();
    res.status(200).json(mockData);
};