import { Metadata } from "next";
import { auth } from "@/auth";
import { getOrderSummary } from "@/lib/actions/order.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSignIcon, Box, EyeIcon, ShoppingBasket, Users } from "lucide-react";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import MonthlySalesOverviewCharts from "./charts";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Admin Dashboard',
}

const AdminHomePage = async () => {
    const session = await auth();
    
    if (session?.user?.role !== 'admin') {
        return redirect('/dashboard');
    };
    
    const summary = await getOrderSummary();

    return <div className="space-y-4">

        <div className="flex space-x-4 items-center mb-4">
        <h2 className="h2-bold">Admin Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <BadgeDollarSignIcon />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                    {formatCurrency(summary.totalSales?._sum?.totalPrice?.toString() || "0")}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <Box />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatNumber(summary.ordersCount)}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Members</CardTitle>
                    <Users />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatNumber(summary.usersCount)}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <ShoppingBasket />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {formatNumber(summary.productsCount)}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                <CardTitle>Monthly Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                <MonthlySalesOverviewCharts 
                data={{
                salesData: summary.salesData?.length ? summary.salesData : [{ month: "No Data", totalSales: 0 }],
                }} 
                />
                </CardContent>
            </Card>

            <Card className="col-span-3">
                <CardHeader>
                <CardTitle>Latest Orders</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>MEMBER</TableHead>
                            <TableHead>DATE</TableHead>
                            <TableHead>TOTAL</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {summary.latestSales && summary.latestSales.length > 0 ? (
                    summary.latestSales.map((order) => (
                        <TableRow key={order.id}>
                        <TableCell>
                            {order?.user?.name ? order.user.name : 'Deleted Member'}
                        </TableCell>
                        <TableCell>
                            {formatDateTime(order.createdAt).dateOnly}
                        </TableCell>
                        <TableCell>
                            {formatCurrency(order.totalPrice)}
                        </TableCell>
                        <TableCell>
                            <Link href={`/admin/order/${order.id}`} className="flex hover:text-gray-500 text-yellow-500">
                            <EyeIcon size={20} strokeWidth={1.25} /> View
                            </Link>
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                        No sales data available.
                        </TableCell>
                    </TableRow>
                    )}

                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    </div>;
};
 
export default AdminHomePage;