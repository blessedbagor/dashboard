import { Metadata } from "next";
import { getMyOrders } from "@/lib/actions/order.actions";
import { 
    formatCurrency, 
    formatDateTime, 
    formatId 
} from "@/lib/utils";
import Link from "next/link";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Eye, Frown } from "lucide-react";
import Pagination from "@/components/shared/pagination";

export const metadata: Metadata = {
    title: 'Orders',
};

const MyAccountOrderPage = async (props: {
    searchParams: Promise<{page: string}>
}) => {
    const { page } = await props.searchParams;

    const orders = await getMyOrders({
        page: Number(page) || 1,
    });

    return (
        <div className="space-y-2">
            <h2 className="h2-bold">Orders</h2>
            <div className="overflow-x-auto">
                {orders.data.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>DATE</TableHead>
                                <TableHead>TOTAL</TableHead>
                                <TableHead>PAID</TableHead>
                                <TableHead>DELIVERED</TableHead>
                                <TableHead>ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.data.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{formatId(order.id)}</TableCell>
                                    <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                                    <TableCell>
                                        {order.isPaid && order.paidAt
                                            ? formatDateTime(order.paidAt).dateTime
                                            : 'Not Paid'}
                                    </TableCell>
                                    <TableCell>
                                        {order.isDelivered && order.deliveredAt
                                            ? formatDateTime(order.deliveredAt).dateTime
                                            : 'Not Yet Delivered'}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/order/${order.id}`}>
                                            <Eye className="hover:text-yellow-500" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2">
                    <Frown size={128} strokeWidth={1.25} className=" text-gray-400" />
                    <h2 className="text-xl font-semibold">Your order page is empty.</h2>
                    <p>You have not placed any orders yet.</p>
                    <Link
                    href="/"
                    className="mt-4 rounded-md bg-yellow-500 px-4 py-2 text-sm text-white transition-colors hover:bg-yellow-400"
                    >
                        Go Shopping
                    </Link>
                </div>
                )}
                {orders.totalPages > 1 && (
                    <Pagination page={Number(page) || 1} totalPages={orders.totalPages} />
                )}
            </div>
        </div>
    );
};

export default MyAccountOrderPage;
