// frontend/components/reviews/ReviewList.jsx
import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem'; // Import the single review item component
import API from '../../services/api'; // Assuming your API service is here
import { toast } from 'react-toastify'; // For notifications

export default function ReviewList({ entityId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                // This endpoint will be created in the backend to serve mock reviews
                const response = await API.get(`/reviews/entity/${entityId}`);
                setReviews(response.data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setError("Failed to load reviews. Please try again later.");
                toast.error("Failed to load reviews!");
            } finally {
                setLoading(false);
            }
        };

        if (entityId) { // Only fetch if entityId is provided
            fetchReviews();
        }
    }, [entityId]); // Re-fetch reviews if entityId changes

    if (loading) {
        return <div className="text-center py-4 text-gray-600">Loading reviews...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    if (reviews.length === 0) {
        return <div className="text-center py-4 text-gray-600">No reviews yet. Be the first to leave one!</div>;
    }

    return (
        <div className="space-y-4">
            {reviews.map(review => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
}