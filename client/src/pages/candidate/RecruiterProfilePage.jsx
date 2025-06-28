// frontend/pages/candidate/RecruiterProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get recruiter ID from URL
import ReviewList from '../../components/reviews/ReviewList';
import ReviewForm from '../../components/reviews/ReviewForm';
import { toast, ToastContainer } from 'react-toastify'; // Make sure ToastContainer is imported if you use it globally or here
import 'react-toastify/dist/ReactToastify.css';

export default function RecruiterProfilePage() {
    // This recruiterId would typically come from a link (e.g., from a job card)
    // For testing, you can manually navigate to /recruiters/any-id-here
    const { recruiterId } = useParams();
    const [recruiterInfo, setRecruiterInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewsUpdated, setReviewsUpdated] = useState(0); // State to trigger review list re-fetch

    useEffect(() => {
        // In a real application, you would fetch real recruiter data here:
        // API.get(`/recruiters/${recruiterId}`)
        // For this show-off project, we'll use mock data.
        const fetchRecruiterMockInfo = () => {
            setIsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                setRecruiterInfo({
                    _id: recruiterId || 'recruiter123', // Use ID from URL or a default for display
                    name: 'Acme Corp Recruiting',
                    email: 'hr@acmecorp.com',
                    companyName: 'Acme Corporation',
                    description: 'Leading the future of innovation through exceptional talent acquisition. We believe in connecting the right people with the right opportunities. Our mission is to bridge the gap between top talent and innovative companies.',
                    logo: 'https://via.placeholder.com/150/2563EB/FFFFFF?text=ACME' // Placeholder logo
                });
                setIsLoading(false);
            }, 500);
        };

        fetchRecruiterMockInfo();
    }, [recruiterId]);

    // This function is passed to ReviewForm to trigger a refresh of the ReviewList
    const handleReviewSubmitted = (newReviewData) => {
        toast.info("Thank you for your review! Updating reviews list...");
        // Increment state to force ReviewList to re-render and re-fetch (even mock data)
        setReviewsUpdated(prev => prev + 1);
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-xl text-gray-700">Loading recruiter profile...</p>
            </div>
        );
    }

    if (!recruiterInfo) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-xl text-red-600">Recruiter not found or an error occurred.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* ToastContainer for notifications */}
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            {/* Recruiter Profile Header Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                    src={recruiterInfo.logo}
                    alt={`${recruiterInfo.companyName} logo`}
                    className="w-28 h-28 rounded-full border-2 border-[#2563EB] object-cover shadow-sm"
                />
                <div>
                    <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">{recruiterInfo.companyName}</h1>
                    <p className="text-xl text-gray-700 mb-2">Recruiter: <span className="font-semibold">{recruiterInfo.name}</span></p>
                    <p className="text-md text-gray-600 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        {recruiterInfo.email}
                    </p>
                    <p className="text-gray-800 leading-relaxed text-base">
                        {recruiterInfo.description}
                    </p>
                </div>
            </div>

            {/* Reviews Section: Form and List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Review Form (left/top column) */}
                <div className="md:col-span-1">
                    <ReviewForm entityId={recruiterInfo._id} onReviewSubmitted={handleReviewSubmitted} />
                </div>

                {/* Review List (right/bottom columns) */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 border-b pb-3">What people are saying:</h2>
                    {/* The key prop forces ReviewList to re-mount and re-fetch reviews when reviewsUpdated changes */}
                    <ReviewList entityId={recruiterInfo._id} key={reviewsUpdated} />
                </div>
            </div>
        </div>
    );
}