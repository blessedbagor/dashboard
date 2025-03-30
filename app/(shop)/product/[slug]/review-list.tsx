'use client';

import { useEffect } from "react";
import { Review } from "@/types";
import Link from "next/link";
import { useState } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheckIcon, Calendar } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/shared/product/rating";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



const ReviewList = ({userId, productId, productSlug}: {
   userId: string;
   productId: string;
   productSlug: string; 
}) => {

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const loadReviews = async() => {
            const res = await getReviews({productId});
            setReviews(res.data)
        }

        loadReviews();

    }, [productId]);
 
    // Reload reviews after created or updated
    const reload = async() => {
        const res = await getReviews({productId});
        setReviews([...res.data]);
    }

    return <div className="space-y-4">
        {reviews.length === 0 && <div>No reviews yet</div>}
        {
            userId ? (
                
                <ReviewForm userId={userId} productId={productId} onReviewSubmitted={reload}/>
            
            ) : (
                <div>
                    Please <Link className="text-yellow-500 px-2" href={`/sign-in?callbackUrl=/product/${productSlug}`} >
                    sign in
                    </Link>
                    to write a review.
                </div>  
            )}
            <div className="flex flex-col gap-3">
                {reviews.map((review) => (
                    <Card key={review.id}>
                        <CardHeader>
                            <div className="flex-between"><CardTitle>{review.title}</CardTitle></div>
                            <CardDescription>
                                {review.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-4 text-sm text-muted-foreground">
                                <Rating value={review.rating} />
                                <div className="flex items-center">
                                <Button 
                                variant="ghost" 
                                className="relative w-4 h-8 rounded-full mx-2 flex items-center justify-center bg-yellow-300 text-black"
                            >
                                <p className="text-sm">{review.user?.name?.charAt(0).toUpperCase() ?? 'U'}</p>
                                </Button>
                                    {review.user ? review.user.name : 'Anonymous'}
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
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="mr-1 h4- w-4"/>
                                    {formatDateTime(review.createdAt).dateTime}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) )}
            </div>
    </div>;
}
 
export default ReviewList;