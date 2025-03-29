'use server';

import { z } from "zod";
import { insertReviewSchema } from "../validators";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

//Create & Update Reviews
export async function createUpdateReview (data: z.infer<typeof insertReviewSchema>) {
    try {
        const session = await auth();

        if(!session) throw new Error('User not authenticated');

        // Validate and store the review
        const review = insertReviewSchema.parse({
            ...data,
            userId: session?.user?.id,
        });

        //Get product that is being reviewed
        const product = await prisma.product.findFirst({
            where: {id: review.productId}
        });

        if(!product) throw new Error('Product not found');
        
        //Check if the user already reviewed
        const reviewExist = await prisma.review.findFirst({
            where: {
                productId: review.productId,
                userId: review.userId
            }
        });

        await prisma.$transaction(async(tx) => {
            if(reviewExist) {
                //Update review
                    await tx.review.update({
                        where: {id: reviewExist.id},
                        data: {
                            title: review.title,
                            description: review.description,
                            rating: review.rating
                        }
                    })
            } else {
                //Create review
                await tx.review.create({data: review});
            }
            //Get average rating
            const averageRating = await tx.review.aggregate({
                _avg: {rating: true},
                where: {productId: review.productId}
            });

            //Get the number of reviews
            const numReviews = await tx.review.count({
                where: {productId: review.productId}
            });

            //Update the rating and numReviews in the product table
            await tx.product.update({
                where: {id: review.productId},
                data: {
                    rating: averageRating._avg.rating || 0,
                    numReviews
                }
            });

        });

        revalidatePath(`/product/${product.slug}`);

        return {
            success: true,
            message: 'Review updated successfully',
        };

    } catch (error) {
        return {success: false, message: formatError(error)};
    }
};


// Get all reviews of the product
export async function getReviews({productId} : {productId: string}) {
    const data = await prisma.review.findMany({
        where: {
            productId: productId
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        },
        orderBy: {
           createdAt: 'desc',
        },
    });

    return {data};
}

//Get all five star reviews
export async function getAllLatestFiveStarReviews() {
    const data = await prisma.review.findMany({
        take: 8,
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            rating: 5
        },
    });

    return {data};
}

// Get all reviews with their ratings to calculate the average and count
export async function getReviewStats() {
    const data = await prisma.review.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  
    const totalReviews = data.length;
  
    // Calculate average rating (rounded to 2 decimal places)
    const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : "0.00";
  
    return {
      totalReviews,
      averageRating,
    };
  }

//Get a review written by the current user
export async function getReviewByProductId({productId} : {productId: string}) {

    const session = await auth();

    if(!session) throw new Error ('User is not authenticated');

   return await prisma.review.findFirst({
        where: {
            productId,
            userId: session?.user?.id,
        }
    })

}