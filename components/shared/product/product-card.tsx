import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";

const ProductCard = ({product}:{product: Product}) => {
    return (<Card className="w-full max-w-sm border">
        <CardHeader className="p-0 items-center">
            <Link href={`/product/${product.slug}`}>
            <Image 
            src={product.images [0]} 
            alt={product.name} 
            height={300} 
            width={300} 
            priority={true}
            className="rounded-t-md w-full h-auto object-cover" 
            />
            </Link>
        </CardHeader>
        <CardContent className="p-4 grid gap-4">
            <Link href={`/product/${product.slug}`}>
            <h2 className="text-sm font-medium">{product.name}</h2>
            </Link>
            <div className="flex-between gap-4">
               <Rating value={Number(product.rating)} />
               {product.stock > 0 ? (
                <ProductPrice value={Number(product.price)} />
               ):(
                <p className="text-destructive">OUT OF STOCK</p>
               )}
            </div>
        </CardContent>
    </Card>);
}
 
export default ProductCard;