import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ReviewForm from '../../components/reviews/ReviewForm';
import ReviewList from '../../components/reviews/ReviewList';

export default function RecruiterProfilePage() {
  const { recruiterId } = useParams();
  const [recruiterInfo, setRecruiterInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsUpdated, setReviewsUpdated] = useState(0);

  useEffect(() => {
    const fetchRecruiterMockInfo = () => {
      setIsLoading(true);
      setTimeout(() => {
        setRecruiterInfo({
          _id: recruiterId || 'recruiter123',
          name: 'Acme Corp Recruiting',
          email: 'hr@acmecorp.com',
          companyName: 'Acme Corporation',
          description:
            'Leading the future of innovation through exceptional talent acquisition. Our mission is to bridge the gap between top talent and innovative companies.',
          logo: 'https://via.placeholder.com/150/2563EB/FFFFFF?text=ACME',
        });
        setIsLoading(false);
      }, 500);
    };
    fetchRecruiterMockInfo();
  }, [recruiterId]);

  const handleReviewSubmitted = () => {
    toast.info('Thank you for your review!');
    setReviewsUpdated((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#E6E9F5]">
        <p className="text-xl text-[#2D3748]">Loading recruiter profile...</p>
      </div>
    );
  }

  if (!recruiterInfo) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#E6E9F5]">
        <p className="text-xl text-red-600">Recruiter not found or an error occurred.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10 bg-[#E6E9F5] min-h-screen">
      <Card className="mb-10 bg-white shadow-lg rounded-xl">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          <Avatar className="w-28 h-28 border-2 border-[#1A3A8F] shadow-md">
            <AvatarImage src={recruiterInfo.logo} alt={recruiterInfo.companyName} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-[#0A1A4A] mb-1">{recruiterInfo.companyName}</h1>
            <p className="text-lg text-[#2D3748] mb-1">
              Recruiter: <span className="font-semibold">{recruiterInfo.name}</span>
            </p>
            <p className="text-md text-[#2D3748] mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {recruiterInfo.email}
            </p>
            <p className="text-[#343434] leading-relaxed text-base">
              {recruiterInfo.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#0A1A4A] text-lg">Leave a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewForm
              entityId={recruiterInfo._id}
              onReviewSubmitted={handleReviewSubmitted}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-[#0A1A4A] text-2xl">What people are saying</CardTitle>
          </CardHeader>
          <Separator className="bg-[#7F5AF0]" />
          <CardContent className="mt-4">
            <ReviewList entityId={recruiterInfo._id} key={reviewsUpdated} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
