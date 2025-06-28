// frontend/components/charts/AnalyticsSection.jsx
import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
// This is crucial for Chart.js to know what elements to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to generate mock data for the charts
const generateMockChartData = () => {
    // Generate labels (e.g., last 7 days)
    const labels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i)); // Go back 6 days from today
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    // Generate random data for logins and job views
    const logins = labels.map(() => Math.floor(Math.random() * 200) + 50);
    const jobViews = labels.map(() => Math.floor(Math.random() * 100) + 20);

    return {
        lineChartData: {
            labels,
            datasets: [
                {
                    label: 'Daily Logins',
                    data: logins,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    tension: 0.4, // Makes the line curved
                },
                {
                    label: 'Job Views',
                    data: jobViews,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.4,
                },
            ],
        },
        barChartData: {
            labels: ['Recruiter A', 'Recruiter B', 'Recruiter C', 'Recruiter D', 'Recruiter E'],
            datasets: [
                {
                    label: 'Jobs Posted',
                    data: [80, 70, 60, 55, 40],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                },
            ],
        },
        doughnutChartData: {
            labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
            datasets: [
                {
                    data: [45, 30, 15, 7, 3], // Percentages of review ratings
                    backgroundColor: [
                        '#4CAF50', // Green
                        '#8BC34A', // Light Green
                        '#FFEB3B', // Yellow
                        '#FFC107', // Amber
                        '#FF5722', // Deep Orange
                    ],
                    hoverOffset: 4,
                },
            ],
        },
        summaryMetrics: {
            totalUsers: 1250,
            activeRecruiters: 320,
            totalReviews: 680,
            jobsPostedLastWeek: 150
        }
    };
};

const AnalyticsSection = () => {
    // Generate mock data directly here for simplicity (no backend call needed for this part)
    const mockData = generateMockChartData();

    // Common options for charts (can be customized per chart)
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows flexible sizing with parent div
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Default Chart Title', // This will be overridden per chart
            },
        },
    };

    // Simple inline styles for demonstration - you can move these to index.css or a dedicated CSS file
    const metricCardStyle = {
        background: '#f0f0f0',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '180px', // Ensure cards have some minimum width
        flexGrow: 1, // Allow cards to grow
    };

    const chartContainerStyle = {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        height: '400px', // Fixed height for charts to ensure consistent layout
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Needed for Chart.js responsive behavior
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h3 className="text-xl font-bold mb-6 text-[#1E3A8A]">Platform Overview</h3>

            {/* Summary Metrics Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                <div style={metricCardStyle}>Total Users: <strong>{mockData.summaryMetrics.totalUsers}</strong></div>
                <div style={metricCardStyle}>Active Recruiters: <strong>{mockData.summaryMetrics.activeRecruiters}</strong></div>
                <div style={metricCardStyle}>Total Reviews: <strong>{mockData.summaryMetrics.totalReviews}</strong></div>
                <div style={metricCardStyle}>Jobs Posted (Last Week): <strong>{mockData.summaryMetrics.jobsPostedLastWeek}</strong></div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <div style={chartContainerStyle}>
                    <Line
                        data={mockData.lineChartData}
                        options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Platform Usage Trends' } } }}
                    />
                </div>
                <div style={chartContainerStyle}>
                    <Bar
                        data={mockData.barChartData}
                        options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Top Recruiters by Jobs Posted' } } }}
                    />
                </div>
                {/* Doughnut chart takes full width on small screens, otherwise centers itself */}
                <div style={{ ...chartContainerStyle, gridColumn: '1 / -1', maxWidth: '500px', margin: '0 auto' }}>
                    <Doughnut
                        data={mockData.doughnutChartData}
                        options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Review Rating Distribution' } } }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;