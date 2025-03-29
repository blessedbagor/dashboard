import { auth } from "@/auth";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow
} from "@/components/ui/table";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";
import { 
    formatCurrency,
    formatDateTime, 
    formatId 
} from "@/lib/utils";
import { Frown, Pencil} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import DeleteDialog from "@/components/shared/delete-dialog";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: 'Admin Orders'
};

const AdminOrdersPage = async (props: {
    searchParams: Promise<{page: string}>}) => {


        const {page = '1'} = await props.searchParams;

        const session = await auth();
            
                    if (session?.user?.role !== 'admin') {
                            return redirect('/my-account');
                        };

        const orders = await getAllOrders({
            page: Number(page),
        });

        return (
            <div className="space-y-2">
                <div className="flex">
                <h2 className="h2-bold mr-4">Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    {orders.data.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>NAME</TableHead>
                                    <TableHead>DATE</TableHead>
                                    <TableHead>TOTAL</TableHead>
                                    <TableHead>PAID</TableHead>
                                    <TableHead>DELIVERED</TableHead>
                                    <TableHead className="text-center">ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.data.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{formatId(order.id)}</TableCell>
                                        <TableCell>{order?.user?.name ? order.user.name : 'Deleted Member'}</TableCell>
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
                                        <TableCell className='text-center'>
                                            <Button asChild variant='ghost' className="hover:text-yellow-500 hover:bg-transparent">
                                            <Link href={`/admin/order/${order.id}`}>
                                                <Pencil />
                                            </Link>
                                            </Button>
                                            <DeleteDialog id={order.id} action={deleteOrder} />
                                            
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
 
export default AdminOrdersPage;