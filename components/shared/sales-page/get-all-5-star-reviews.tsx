'use client';

import { useEffect, useState } from "react";
import { getReviewStats, getAllLatestFiveStarReviews } from "@/lib/actions/review.actions";
import { Review } from "@/types";
import { BadgeCheckIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "../product/rating";
import { formatDateTime } from "@/lib/utils";

export default function LatestFiveStarReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<{ averageRating: string; totalReviews: number }>({ averageRating: "0.00", totalReviews: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const reviewStatsResponse = await getReviewStats(); // Fetch average and total reviews
        setReviewStats(reviewStatsResponse);

        const response = await getAllLatestFiveStarReviews(); // Fetch five-star reviews
        setReviews(response.data); // Ensure that the response directly matches the Review type
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading latest five-star reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p>No five-star reviews found.</p>;
  }

  return (
    <div>
      {/* Review Stats */}
      <div className="flex p-4  rounded-xl shadow-md mb-6 max-w-3xl mx-auto justify-center items-center text-center">
        <span className='font-bold rounded-full bg-gold px-2'>{Number(reviewStats.averageRating).toFixed(1)}</span>
        <span className="mx-3">
            <Rating value={Number(reviewStats.averageRating)} />
        </span>
        <span>of <span className='font-bold'>{Number(reviewStats.totalReviews)}</span> Trusted Customer Reviews</span>
        </div>

      {/* Review Cards */}
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="flex flex-col md:flex-row gap-4 p-6  border-yellow-200 hover:border-yellow-400 border-2 rounded-2xl shadow-lg mt-6 max-w-3xl mx-auto"
        >
          {/* Right Text Section */}
          <CardContent className="flex flex-col justify-center text-center md:text-left w-full md:w-2/3">
            <div className="flex justify-center mt-2 md:justify-start">
              <Rating value={review.rating} />
            </div>
            <h3 className="text-2xl font-bold my-4">{review.title}</h3>
            <p className="mb-4">{review.description}</p>
          </CardContent>

          {/* Left Metadata Section */}
          <div className="rounded-2xl flex flex-col justify-center text-center md:text-left w-full md:w-1/3 order-last md:order-first mt-4 md:mt-0">
            <p className="text-lg mb-2">
              {review.user?.name || "Deleted User"}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeCheckIcon className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform fill-blue-500 text-white ml-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified Customer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </p>
            <p className="text-sm">{formatDateTime(review.createdAt).dateTime}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
