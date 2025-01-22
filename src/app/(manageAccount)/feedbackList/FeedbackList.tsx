"use client";
import { IReviewItem } from "@/app/types/index.d";
import RenderStar from "@/components/renderStar";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

const FeedbackList = ({ reviewItem }: { reviewItem: IReviewItem[] }) => {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();

  const [comments, setComments] = useState<IReviewItem[]>(reviewItem); 
  const itemsPerPage = 5; 

  const nameFilter = searchParams.get("name") || "";
  const ratingFilter = parseInt(searchParams.get("rating") || "0", 10);
  const currentPage = Number(searchParams.get("page")) || 1;

  const filteredReviews = useMemo(() => {
    if (!nameFilter && !ratingFilter) {
      return comments; 
    }

    return comments.filter((item) => {
      const matchesName = nameFilter
        ? item.hotelName.toLowerCase().includes(nameFilter.toLowerCase())
        : true;
      const matchesRating = ratingFilter ? item.rating === ratingFilter : true;
      return matchesName && matchesRating;
    });
  }, [comments, nameFilter, ratingFilter]);

  // Calculate the reviews to display on the current page
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredReviews.slice(startIndex, endIndex);
  }, [filteredReviews, currentPage, itemsPerPage]);

  // Total number of pages
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;

  // Adjust currentPage if it exceeds totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      handlePageChange(totalPages);
    }
  }, [currentPage, totalPages]);

  function handleSearchName(name: string) {
    const params = new URLSearchParams(searchParams);
    if (name) {
      params.set("name", name);
    } else {
      params.delete("name");
    }
    params.set("page", "1"); // Reset to first page on filter change
    replace(`${pathname}?${params.toString()}`);
  }

  function handleSelectRating(rating: number) {
    const params = new URLSearchParams(searchParams);
    if (rating) {
      params.set("rating", rating.toString());
    } else {
      params.delete("rating");
    }
    params.set("page", "1"); 
    replace(`${pathname}?${params.toString()}`);
  }

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  const handleDelete = (id: number) => {
    const updatedComments = comments.filter((item) => item.id !== id);
    setComments(updatedComments);

   
    const newFilteredReviews = filteredReviews.filter(item => item.id !== id);
    const newTotalPages = Math.ceil(newFilteredReviews.length / itemsPerPage) || 1;
    if (currentPage > newTotalPages) {
      handlePageChange(newTotalPages);
    }
  };

  return (
    <div className="bg-[#a39e9e] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1000px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          My Hotel Reviews
        </h1>

        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Filter Your Reviews</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by hotel name"
              className="border border-gray-200 rounded-lg px-4 py-2 w-1/2"
              value={nameFilter}
              onChange={(e) => handleSearchName(e.target.value)}
            />
            <select
              className="w-1/2 border border-gray-300 rounded-lg p-2"
              value={ratingFilter || ""}
              onChange={(e) => handleSelectRating(Number(e.target.value))}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Your Hotel Reviews</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {paginatedReviews.length > 0 ? (
              paginatedReviews.map((item: IReviewItem) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start p-4 border-b border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-700">
                      {item.hotelName}
                    </p>
                    <p className="text-sm text-gray-500">"{item.review}"</p>
                    <p className="text-sm text-gray-400">
                      Reviewed on: {item.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <RenderStar ratingindex={item.rating + 1} />
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-4 my-5 py-1 rounded-lg text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center p-4">
                No reviews match your filters.
              </p>
            )}
          </div>
        </div>

        {/* Pagination Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
