import Link from "next/link";
import { deleteProduct, getAllProducts } from "@/lib/actions/product.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PencilIcon } from "lucide-react";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";

const AdminProductsPage = async(props: {
    searchParams: Promise<{
        page: string;
        query: string;
        category: string;
    }>
}) => {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const searchText = searchParams.query || '';
    const category = searchParams.category || '';

    const products = await getAllProducts ({
        query: searchText,
        page,
        category
    });
    
    return <div className="space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center">
            <h1 className="h2-bold mr-4">Products</h1>
        </div>
        <Button asChild variant="default">
            <Link href="/admin/product/add">
            Add Product
            </Link>
        </Button>
        </div>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>NAME</TableHead>
                    <TableHead className="text-center">PRICE</TableHead>
                    <TableHead className="text-center">CATEGORY</TableHead>
                    <TableHead>STOCK</TableHead>
                    <TableHead>RATING</TableHead>
                    <TableHead className="w-[100px] text-center">ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    products.data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{formatId(product.id)}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-center">{formatCurrency(product.price)}</TableCell>
                            <TableCell className="text-center">{product.category}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.rating}</TableCell>
                            <TableCell className="flex">
                                <Button asChild variant='ghost' className="hover:bg-transparent">
                                    <Link href={`/admin/product/${product.id}`}>
                                    <PencilIcon />
                                    </Link>
                                </Button>
                                <DeleteDialog id={product.id} action={deleteProduct} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        {products.totalPages > 1 && (
            <Pagination page={page} totalPages={products.totalPages} />
        )}
        </div>;
}
 
export default AdminProductsPage;