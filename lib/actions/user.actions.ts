'use server';

import {
    paymentMethodSchema, 
    shippingAddressSchema, 
    signInFormSchema, 
    signUpFormSchema, 
    updateMemberSchema
} from '@/lib/validators';
import {auth, signIn, signOut} from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import {hashSync} from "bcrypt-ts-edge";
import { prisma } from '@/db/prisma';
import { formatError } from '@/lib/utils';
import { ShippingAddress } from '@/types';
import {z} from 'zod';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { getMyCart } from './cart.actions';


// Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown, 
formData: FormData ) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        await signIn('credentials', user);

        return {success: true, message: 'Signed in successfully' }
    } catch (error) {
       if(isRedirectError(error))  {
        throw error;
       }
    }

    return {success: false, message: 'Invalid email or password'}
}

export async function signOutUser() {
    const currentCart = await getMyCart();
    
    // Ensure the current cart exists before attempting to delete it
    if (currentCart?.id) {
      await prisma.cart.delete({ where: { id: currentCart.id } });
    }
  
    // Proceed with the sign-out process
    await signOut();
  }
  

// Sign up a user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        if (user.password !== user.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const plainPassword = user.password;
        user.password = hashSync(user.password);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        });

        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: formatError(error) };
    }
}

//Get user by the ID
export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
        where: {id: userId}
    });
    if(!user) throw new Error("User not found");
    return user;
}

//Update the user's address
export  async function updateUserAddress (data: ShippingAddress) {

    try {
        const session = await auth();


        const currentUser = await prisma.user.findFirst({
            where: {id: session?.user?.id}
        });

        if(!currentUser) throw new Error ('User not found');

        const address = shippingAddressSchema.parse(data);

        //Update address to the database

        await prisma.user.update({
            where: {id: currentUser.id},
            data: {address}
        });
        
        return {
            success: true,
            message: 'User updated successfully'
        }

    } catch (error) {
        return { success: false, message: formatError(error)}
    }
}

//Update user's payment method
export async function updateUserPaymentMethod(data: z.infer<typeof 
    paymentMethodSchema>) {

        try {
            const session = await auth();
            const currentUser = await prisma.user.findFirst({
                where: {id: session?.user?.id}
            });

            if(!currentUser) throw new Error ('User not found');

            const paymentMethod = paymentMethodSchema.parse(data);

            await prisma.user.update({
                where: {id: currentUser.id},
                data: {paymentMethod: paymentMethod.type}
            });

            return {
                success: true,
                message: 'User upated successfully'
            };

        } catch (error) {
            return {success: false, message: formatError(error)}
            
        }

}

// Update the user profile
export async function updateProfile(user: {name: string; email: string;}) {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id
            }
        });

        if(!currentUser) throw new Error('User not found');

        await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: user.name
            }
        });

        return {
            success: true, message: 'User updated successfully'
        }
        
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}

// Get all the members
export async function getAllMembers({
    limit = PAGE_SIZE,
    page
}: {
    limit?: number;
    page: number;
}) {
    const data = await prisma.user.findMany({
        orderBy: {createdAt: 'desc'},
        take: limit,
        skip: (page - 1) * limit,
    });

    const dataCount = await prisma.user.count();

    return {
        data,
        totalPages: Math.ceil(dataCount / limit),
    }
}

// Delete a member
export async function deleteMember(id: string) {
    try {
        const memberExists = await prisma.user.findFirst({
            where: {id}
        });

        if(!memberExists) throw new Error('Member not found');

        await prisma.user.delete({where: {id}});

        revalidatePath('/admin/members');

        return {
            success: true,
            message: 'Member deleted successfully',
        };
    } catch (error) {
        return {success: false, message: formatError(error)}
        
    }
}

//Update a member
export async function updateMember(user: z.infer<typeof updateMemberSchema>) {
    try {
        const memberExists = await prisma.user.findFirst({
            where: {id: user.id}
        });

        if(!memberExists) throw new Error('Member not found');

        await prisma.user.update({
            where: {id: user.id},
            data: {
                name: user.name,
                role: user.role
            }
        });

        revalidatePath('/admin/members');

        return {
            success: true,
            message: 'Member updated successfully'
        };
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}