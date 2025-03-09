import React, { useState } from "react";
import { Link } from "react-router-dom";

// Types
export interface ReviewItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

interface ReviewsHistoryProps {
  initialReviews?: ReviewItem[];
}

const ReviewsHistory: React.FC<ReviewsHistoryProps> = ({
  initialReviews = [],
}) => {
  // State for reviews
  const [reviews, setReviews] = useState<ReviewItem[]>(
    initialReviews.length > 0
      ? initialReviews
      : [
          {
            id: "1",
            productId: "product-1",
            productName: "Wireless Headphones",
            productImage: "https://via.placeholder.com/100",
            rating: 4,
            title: "Great sound quality",
            content:
              "The sound quality is excellent and the battery life is impressive. Very comfortable to wear for long periods.",
            date: "2023-02-15T14:30:00Z",
            helpful: 5,
          },
          {
            id: "2",
            productId: "product-2",
            productName: "Smart Watch",
            productImage: "https://via.placeholder.com/100",
            rating: 5,
            title: "Excellent fitness tracker",
            content:
              "This smartwatch has exceeded my expectations. The fitness tracking features are accurate and the battery life is great.",
            date: "2023-01-20T10:15:00Z",
            helpful: 8,
          },
        ]
  );

  // Filter options
  const [sortOption, setSortOption] = useState("newest");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Paginate reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Render star rating
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Delete review handler (mock functionality)
  const handleDeleteReview = (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">My Reviews</h3>
        <p className="mt-1 text-sm text-gray-500">
          Reviews you've left for products
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            No reviews yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't written any product reviews
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Filter and sort controls */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <label
                    htmlFor="rating-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Filter by Rating
                  </label>
                  <select
                    id="rating-filter"
                    value={filterRating === null ? "" : filterRating}
                    onChange={(e) =>
                      setFilterRating(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sort-options"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sort by
                  </label>
                  <select
                    id="sort-options"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Showing {currentReviews.length} of {filteredReviews.length}{" "}
                reviews
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="divide-y divide-gray-200">
            {currentReviews.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">
                  No reviews match your filters. Try adjusting your criteria.
                </p>
              </div>
            ) : (
              currentReviews.map((review) => (
                <div key={review.id} className="px-6 py-5">
                  <div className="flex items-start">
                    {review.productImage && (
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={review.productImage}
                          alt={review.productName}
                          className="h-16 w-16 object-cover rounded border border-gray-200"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <Link
                          to={`/products/${review.productId}`}
                          className="text-lg font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          {review.productName}
                        </Link>
                        <div className="text-sm text-gray-500">
                          {formatDate(review.date)}
                        </div>
                      </div>

                      <div className="mt-1 flex items-center">
                        {renderStarRating(review.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {review.rating}/5
                        </span>
                      </div>

                      <h4 className="mt-2 text-base font-medium text-gray-900">
                        {review.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {review.content}
                      </p>

                      <div className="mt-3 flex items-center text-sm">
                        <span className="text-gray-500">
                          {review.helpful} people found this review helpful
                        </span>
                      </div>

                      <div className="mt-3 flex space-x-4">
                        <Link
                          to={`/products/${review.productId}`}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          View Product
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Delete Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                <div className="flex-1 flex justify-center">
                  <div className="hidden md:flex">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          } ${i === 0 ? "rounded-l-md" : ""} ${
                            i === totalPages - 1 ? "rounded-r-md" : ""
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex md:hidden">
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsHistory;
