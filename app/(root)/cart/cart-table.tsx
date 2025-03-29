'use client';

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Frown, Loader, Minus, Plus } from "lucide-react";
import {Cart} from "@/types";
import Link from 'next/link';
import Image from 'next/image';
import { 
    Table, 
    TableBody, 
    TableHead, 
    TableHeader,
    TableRow,
    TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";




const CartTable = ({cart}: {cart?: Cart}) => {
    const router = useRouter();
    const {toast} = useToast();
    const [isPending, startTransition] = useTransition();

    return (  
        <>
            <h1 className="py-4 h2-bold">Cart</h1>
            {!cart || cart.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                    <Frown size={128} strokeWidth={1.25} className=" text-gray-400" />
                    <h2 className="text-xl font-semibold">Cart is empty</h2>
                    <Link
                    href="/shop"
                    className="mt-4 rounded-md bg-yellow-500 px-4 py-2 text-sm text-white transition-colors hover:bg-yellow-400"
                    >
                        Go Shopping
                    </Link>
                </div>
            ) : (
             <div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.items.map((item) => (
                                <TableRow key={item.slug}>
                                    <TableCell>
                                    <Link href={`/product/${item.slug}`} className="flex items-center">
                                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded" />
                                    <span className="px-2">{item.name}</span>
                                    </Link>
                                    </TableCell>
                                    <TableCell className="flex-center gap-2">
                                        <Button disabled={isPending} variant="outline" type="button" 
                                        onClick={() => startTransition(async() => {
                                            const res = await removeItemFromCart(item.productId);

                                            if(!res.success) {
                                                toast({
                                                    variant: 'destructive',
                                                    description: res.message
                                                })
                                            }
                                        })  }>
                                            {isPending ? (
                                                <Loader className="w-4 h-4 animate-spin" />
                                            ) : (
                                            <Minus className="w-4 h-4" />
                                            ) }
                                        </Button>
                                            <span>{item.qty}</span>
                                        <Button disabled={isPending} variant="outline" type="button" 
                                        onClick={() => startTransition(async() => {
                                            const res = await addItemToCart(item);

                                            if(!res.success) {
                                                toast({
                                                    variant: 'destructive',
                                                    description: res.message
                                                })
                                            }
                                        })  }>
                                            {isPending ? (
                                                <Loader className="w-4 h-4 animate-spin" />
                                            ) : (
                                            <Plus className="w-4 h-4" />
                                            ) }
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                            {formatCurrency(item.price)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Card>
                    <CardContent className="p-4 gap-4">
                        <div className="pb-3 text-xl">
                        Subtotal ({cart.items.reduce((a,c) => a + c.qty, 0)}):
                        <span className="font-bold ml-4">{formatCurrency(cart.itemsPrice)}</span>
                        </div>
                        <Button className="w-full" disabled={isPending} onClick={() => 
                            startTransition(() => router.push('/shipping-address'))}>
                                {isPending ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowRight className="w-4 h-4" />
                                )} Proceed to Checkout
                            </Button>
                    </CardContent>
                </Card>
             </div>
            )}
        </> 
    
    );
}
 
export default CartTable;