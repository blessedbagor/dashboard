
import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound, redirect } from "next/navigation";
import AdminOrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";

export const metadata : Metadata = {
    title: 'Order Details',
}; 


const AdminOrderDetailsPage = async (props: {
    params: Promise<{
        id: string
    }>;
}) => {
    const {id} = await props.params;

    const session = await auth();
    
            if (session?.user?.role !== 'admin') {
                    return redirect('/dashboard');
                }

    const order = await getOrderById(id);
    
    if(!order) notFound();


    return (<AdminOrderDetailsTable 
    order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
            }}
            isAdmin={session?.user?.role === 'admin' || false} 
        />
    );
};
 
export default AdminOrderDetailsPage;