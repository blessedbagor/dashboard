import {z} from 'zod';
import { 
    insertProductSchema,
    insertCartSchema,
    cartItemSchema,
    shippingAddressSchema, 
    insertOrderItemsSchema,
    insertOrderSchema,
    insertReviewSchema, 
    insertAffiliateLinkSchema
} from '@/lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: number;
    numReviews: number;
    createdAt: Date;
}

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemsSchema>;
export type Order = z.infer<typeof insertOrderSchema> &  {
    id: string;
    createdAt: Date;
    isPaid: boolean;
    paidAt: Date | null;
    isDelivered: boolean;
    deliveredAt: Date | null;
    orderitems: OrderItem[];
    user: {name: string; email: string;}
};

export type Review = z.infer<typeof insertReviewSchema> & {
 id: string;
 createdAt: Date;
 user?: {
    name: string
 };
};

export type Affiliate = z.infer<typeof insertAffiliateLinkSchema> & {
    id: string;
    createdAt: Date;
    user?: {name: string};
};

export type YouTubeEmbedProps = {
    videoId: string;
  };