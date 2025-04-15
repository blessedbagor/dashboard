import { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Box, ShoppingBasket, Wallet2Icon } from "lucide-react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
    title: 'Dashboard',
}

const UserPage = async () => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className="space-y-6">
            <div className="flex space-x-4  items-center mb-4">
                <h2 className="h2-bold">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <CircleDollarSign />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            0
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
                            0
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                        <Wallet2Icon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            0
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        <ShoppingBasket />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            0
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
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
                            <TableBody></TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            </div>
            {/* <div className="max-w-md space-y-4">
            <h2 className="h2-bold">My Account</h2>
            <MyAccountForm /> */}
        </SessionProvider>
    );
};

export default UserPage;