'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { updateOrderToPaidCOD, deliverOrder } from "@/lib/actions/order.actions";
import { useTransition } from "react";
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";


const AdminOrderDetailsTable = ({
    order,
    isAdmin
} : {
    order: Order;
    isAdmin: boolean;
}) => {
    const {
        shippingAddress,
        orderitems,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentMethod,
        isDelivered,
        isPaid,
        paidAt,
        deliveredAt 
    } = order;

    // Button to mark order as paid
    const MarkAsPaidButton = () => {
        const [isPending, startTransition] = useTransition();
        const {toast} = useToast();

        return (
            <Button
            type = 'button'
            disabled = {isPending}
            onClick = {() => startTransition(async() => {
                const res = await updateOrderToPaidCOD(order.id);
                toast({
                    variant: res.success ? 'default' : 'destructive',
                    description: res.message
                })
            })}
            >
            {isPending ? 'processing...' : 'Mark As Paid'}
            </Button>
        );
    };

    // Button to mark order as delivered
    const MarkAsDeliveredButton = () => {
        const [isPending, startTransition] = useTransition();
        const {toast} = useToast();

        return (
            <Button
            type = 'button'
            disabled = {isPending}
            onClick = {() => startTransition(async() => {
                const res = await deliverOrder(order.id);
                toast({
                    variant: res.success ? 'default' : 'destructive',
                    description: res.message
                })
            })}
            >
            {isPending ? 'processing...' : 'Mark As Delivered'}
            </Button>
        );
    };
    
    return <>
    <h1 className="py-4 text-3xl">Order <span className="bg-yellow-500 rounded-full px-4">{formatId(order.id)}</span></h1>
    <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
            <Card>
                <CardContent>
                    <h2 className="text-2xl pb-4 pt-2">Payment Method</h2>
                    <p>{paymentMethod}</p>
                    {isPaid ? (
                        <Badge variant='secondary'>
                            Paid at: {formatDateTime(paidAt!).dateTime}
                        </Badge>
                    ) : (<Badge variant='destructive'> Not Paid</Badge>)}
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <h2 className="text-2xl pb-4 pt-2">Shipping Address</h2>
                    <p>{shippingAddress.fullName}</p>
                    <p>
                        {shippingAddress.streetAddress}, {' '}
                        {shippingAddress.city}, {' '}
                        {shippingAddress.province}, {' '}
                        {shippingAddress.country} {shippingAddress.postalCode}
                    </p>
                    {isDelivered ? (
                        <Badge variant='secondary'>
                            Delivered at: {formatDateTime(deliveredAt!).dateTime}
                        </Badge>
                    ) : (<Badge variant='destructive'> Not Yet Delivered</Badge>)}
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4 gap-4">
                    <h2 className="text-2xl pb-4">Order Items</h2>
                    <Table>
                            <TableHeader>
                                <TableRow>
                                   <TableHead>Item</TableHead>
                                   <TableHead className="text-center">Quantity</TableHead>
                                   <TableHead className="text-right">Price</TableHead>   
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderitems.map((item) =>(
                                    <TableRow key={item.slug}>
                                        <TableCell>
                                            <Link href={`/product/${item.slug}`} className="flex items-center">
                                            <Image src={item.image} alt={item.name} width={50} height={50} className="rounded"/>
                                            <span className="px-2">{item.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="px-2 text-center">{item.qty}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </CardContent>
            </Card>
        </div>
        <div className="mt-4 w-full">
        <Card>
            <CardContent className="p-4 gap-4 space-y-4">
                <h2 className="text-2xl pb-4">Order Details</h2>
            <div className="flex justify-between">
                <div>Subtotal</div>
             <div>{formatCurrency(itemsPrice)}</div>
            </div>
            <div className="flex justify-between">
                <div>Shipping</div>
            <div>{formatCurrency(shippingPrice)}</div>
            </div>
            <div className="flex justify-between font-bold text-xl">
                <div>Total</div>
            <div>{formatCurrency(totalPrice)}</div>
            </div>
            {/* Cash on Delivery */}
            {
                isAdmin && !isPaid && paymentMethod === 'COD' && (
                    <MarkAsPaidButton />
                )
            }
            {
                isAdmin && isPaid && !isDelivered && (
                    <MarkAsDeliveredButton />
                )
            }
            </CardContent>
        </Card>
        </div>
    </div>
    </> ;
};
 
export default AdminOrderDetailsTable;