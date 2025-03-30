import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'iGift | Shop',
  description: 'Maximize health and savings with iGift Shop&apos;s product packages.',
  openGraph: {
    title: 'iGift | Shop ',
    description: 'Maximize health and savings with iGift Shop&apos;s product packages.', 
    siteName: 'iGift',
    images: [
      {
        url: 'https://igift.ph/images/customer.png', 
        width: 1200,
        height: 630,
        alt: 'Always Tired',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const SearchPage = async(props: {searchParams: Promise<{
    q?:string,
    price?:string,
    rating?:string,
    sort?:string,
    page?:string
}>}) => {

    const {
        q= 'all',
        price = 'all',
        rating = 'all',
        sort = 'newest',
        page = '1'
    } = await props.searchParams;

    const products = await getAllProducts({
        query: q,
        price,
        rating,
        sort,
        page: Number(page)
    });

    return <div className="grid md:grid-cols-4 md:gap-5">
    <div className="md:col-span-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.data.length === 0 && <div>No products found</div>}
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
  ;
}
 
export default SearchPage;