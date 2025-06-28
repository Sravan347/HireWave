// frontend/components/reviews/ReviewForm.jsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../services/api'; // Assuming your API service is here

export default function ReviewForm({ entityId, onReviewSubmitted }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a star rating.");
            return;
        }
        if (comment.trim() === '') {
            toast.error("Please enter your review comment.");
            return;
        }

        setSubmitting(true);
        try {
            // For show-off, this backend endpoint will simply return success
            // without actual database persistence.
            // In a real app, you'd send `reviewerId`, `reviewedEntityId`, etc.
            const res = await API.post('/reviews', {
                entityId,
                rating,
                comment,
                // You might add a placeholder reviewerName here if your mock backend expects it
                reviewerName: 'New Reviewer (Demo)' // Hardcoded for demo
            });

            toast.success(res.data.message || "Review submitted successfully!");
            setRating(0); // Reset form
            setComment(''); // Reset form

            // Call a prop function to inform parent that a review was submitted
            // This might trigger a re-fetch of the review list to show the "new" review
            if (onReviewSubmitted) {
                // For the demo, we can just pass the new review data (even if not saved)
                onReviewSubmitted({
                    id: `mock-review-${Date.now()}`, // Unique ID for key prop
                    rating,
                    comment,
                    reviewerName: 'New Reviewer (Demo)',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                });
            }

        } catch (err) {
            console.error("Review submission failed:", err);
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-[#1E3A8A]">Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Rating:
                    </label>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                            <Star
                                key={starValue}
                                size={24}
                                className={`cursor-pointer transition-colors duration-200 ${
                                    starValue <= rating ? 'text-yellow-400' : 'text-gray-400'
                                }`}
                                onClick={() => handleStarClick(starValue)}
                                fill={starValue <= rating ? '#FFD700' : 'none'}
                                stroke={starValue <= rating ? '#FFD700' : '#A0A0A0'}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                        Your Review:
                    </label>
                    <textarea
                        id="comment"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y min-h-[80px]"
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-[#2563EB] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#1E4DAB] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}