'use server';

import { z } from "zod";
import { insertAffiliateLinkSchema } from "../validators";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

//Create & Update Share Service
export async function createUpdateShareService(data: z.infer<typeof insertAffiliateLinkSchema>) {
    try {
        const session = await auth();
        if(!session) throw new Error('User not authenticated');

        //Validate and store the share service information
        const share = insertAffiliateLinkSchema.parse({
            ...data,
            userId: session?.user?.id,
        });

        //Check if user already setup the share service
        const shareServiceExist = await prisma.affiliate.findFirst({
            where: {userId: share.userId}
        });

        await prisma.$transaction(async(tx) => {
            if(shareServiceExist) {
                //Update share service
                await tx.affiliate.update({
                    where: {id: shareServiceExist.id},
                    data: {
                       referralCode: share.referralCode,
                       affiliateLink: share.affiliateLink 
                    }
                })
            } else {
                //Setup share service
                await tx.affiliate.create({data: share});
            }
        });

        revalidatePath('/dashboard/share');

        return {
            success: true,
            message: 'Share Service Updated Successfully'
        }

    } catch (error) {
        return {success: false, message: formatError(error)}
        
    }
}

// Retrieve a share service setup for the current authenticated user
export async function getShareServiceById() {
    const session = await auth();
  
    if (!session) {
      throw new Error('User is not authenticated');
    }
  
    return prisma.affiliate.findFirst({
      where: { userId: session.user.id },
    });
  }
  
  //Get Affiliate Link by ReferralCode
  export async function getAffiliateLinkByReferralCode(referralCode: string) {
    return await prisma.affiliate.findFirst({
        where: {referralCode: referralCode},
        include: {
            user: {
              select: {
                name: true,
              },
            },
          },
    });
  }