import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { ShippingAddress } from "@/types";
import { PencilIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";

export const metadata: Metadata = {
    title: 'Place Order',
};

const PlaceOrderPage = async () => {
    const cart = await getMyCart();
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) throw new Error ('User not found');

    const user = await getUserById(userId);

    if(!cart || cart.items.length === 0) redirect('/cart');
    if(!user.address) redirect('/shipping-address');
    if(!user.paymentMethod) redirect('/payment-method');

    const userAddress = user.address as ShippingAddress;


    return ( <>
    <CheckoutSteps current={3} />
        <h1 className="py-4 text-3xl font-bold">Place Order</h1>
        <div className="grid md:grid-cols-3 md:gap-5">
            <div className="md:col-span-2 overflow-x-auto space-y-4">
                <Card>
                    <CardContent className="p-4 gap-4">
                        <h2 className="text-xl pb-4">Shipping Address</h2>
                        <p>{userAddress.fullName}</p>
                        <p>
                            {userAddress.streetAddress}, {' '}
                            {userAddress.city}, {' '}
                            {userAddress.province}, {' '}
                            {userAddress.country} {' '}
                            {userAddress.postalCode}
                            
                        </p>
                        <Link href='/shipping-address'>
                        <Button variant="ghost" className="hover:text-yellow-500 hover:bg-transparent">
                            <PencilIcon />Edit
                        </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 gap-4">
                        <h2 className="text-xl pb-4">Payment Method</h2>
                        <p>{user.paymentMethod}</p>
                        <Link href='/payment-method'>
                        <Button variant="ghost" className="hover:text-yellow-500 hover:bg-transparent">
                            <PencilIcon />Edit
                        </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 gap-4">
                        <h2 className="text-xl pb-4">Order Items</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                   <TableHead>Item</TableHead>
                                   <TableHead className="text-center">Quantity</TableHead>
                                   <TableHead className="text-right">Price</TableHead>   
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) =>(
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
            <div className="mt-4">
                <Card>
                    <CardContent className="p-4 gap-4 space-y-4">
                        <h2 className="text-2xl pb-4">Order Details</h2>
                        <div className="flex justify-between">
                            <div>Items</div>
                            <div>{formatCurrency(cart.itemsPrice)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Shipping</div>
                            <div>{formatCurrency(cart.shippingPrice)}</div>
                        </div>
                        <div className="flex justify-between font-bold text-xl">
                            <div>Total</div>
                            <div>{formatCurrency(cart.totalPrice)}</div>
                        </div>
                        <PlaceOrderForm />
                    </CardContent>
                </Card>
            </div>
        </div>

  
    </> );
}
 
export default PlaceOrderPage;