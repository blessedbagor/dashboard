'use server';
import {prisma} from '@/db/prisma';
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from 'next/cache';
import { insertProductSchema, updateProductSchema } from '../validators';
import { z } from 'zod';

// Get latest products
export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });

    // Normalize the rating field to ensure it's a number
    const normalizedData = data.map(product => ({
        ...product,
        rating: typeof product.rating === "string" ? Number(product.rating) : product.rating,
    }));

    return convertToPlainObject(normalizedData);
}

//Get single product by it's slug

export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: {slug: slug},
    });
}

//Get single product by it's ID
export async function getProductById(productId: string) {
    const data = await prisma.product.findFirst({
        where: {id: productId},
    });

    return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
    limit = PAGE_SIZE,
    page,
    price,
    rating,
    sort,
  }: {
    query?: string;
    limit?: number;
    page: number;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
  }) {
    const data = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const dataCount = await prisma.product.count();
  
    // Ensure rating is a number to match Product type expectations
    const formattedData = data.map((product) => ({
      ...product,
      rating: Number(product.rating), // Convert rating to number if it is a string
    }));
  
    return {
      price,
      rating,
      sort,
      data: formattedData,
      totalPages: Math.ceil(dataCount / limit),
    };
  }
  
// Delete a product

export async function deleteProduct(id: string) {
    try {
        const productExists = await prisma.product.findFirst({
            where: {id}
        });

        if(!productExists) throw new Error('Product not found');

        await prisma.product.delete({where: {id}});

        revalidatePath('/admin/products');

        return {
            success: true,
            message: 'Product deleted successfully',
        };
    } catch (error) {
        return {success: false, message: formatError(error)}
        
    }
}

//Create a product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
    try {
        const product = insertProductSchema.parse(data);
        await prisma.product.create({data: product});
        
        revalidatePath('/admin/products');

        return {
            success: true, 
            message: 'Product created successfully'
        };
    } catch (error) {
        return {success: false, message: formatError(error)};
    }
}

//Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
    try {
        const product = updateProductSchema.parse(data);
        
        const productExists = await prisma.product.findFirst({
            where: {id: product.id}
        });

        if(!productExists) throw new Error('Product does not exist');

        await prisma.product.update({
            where: {id: product.id},
            data: product
        });
        
        revalidatePath('/admin/products');

        return {
            success: true, 
            message: 'Product updated successfully'
        };
    } catch (error) {
        return {success: false, message: formatError(error)};
    }
}

// Get featured products
export async function getFeaturedProducts() {
    const data = await prisma.product.findMany({
        where: { isFeatured: true },
        orderBy: { createdAt: 'desc' },
        take: 4,
    });

    // Convert rating to number
    const products = data.map(product => ({
        ...product,
        rating: Number(product.rating),
    }));

    return convertToPlainObject(products);
}