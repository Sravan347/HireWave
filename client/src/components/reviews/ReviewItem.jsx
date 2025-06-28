// frontend/components/reviews/ReviewItem.jsx
import React from 'react';
import { Star } from 'lucide-react'; // Assuming you have lucide-react installed

export default function ReviewItem({ review }) {
    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={18}
                    fill={i < rating ? '#FFD700' : 'none'} // Filled gold for rating, empty otherwise
                    stroke={i < rating ? '#FFD700' : '#A0A0A0'} // Stroke color for consistency
                />
            );
        }
        return <div className="flex items-center gap-1">{stars}</div>;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{review.reviewerName || 'Anonymous User'}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="mb-2">
                {renderStars(review.rating)}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
                {review.comment}
            </p>
        </div>
    );
}