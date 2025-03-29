import { getLatestProducts, getFeaturedProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import ProductCarousel from "@/components/shared/product/product-carousel";
import IconBoxes from "@/components/icon-boxes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DealCountdown from "@/components/deal-countdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'iGift | Your Best Life',
  description: 'We offer premium food supplements, innovative opportunities, and digital solutions to help you live your best life.',
  openGraph: {
    title: 'iGift | Your Best Life',
    description: 'iGift fuels your best life with wellness, income, and digital solutions.', 
    siteName: 'iGift',
    images: [
      {
        url: 'https://igift.ph/images/home.png', 
        width: 1200,
        height: 630,
        alt: 'iGift - Your Best Life',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const Homepage = async () => {
const latestProducts = await getLatestProducts();
const featuredProducts = await getFeaturedProducts();

  return ( 
  
  <>
  
  {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
  
  <ProductList 
  data={latestProducts} 
  title="Popular Packages"
  limit={4}
   />
   <div className='text-center mb-4'>
   <Link href='/shop'>
   <Button variant='default'>View All Packages</Button>
   </Link>
   </div>

   <IconBoxes />
   
   <DealCountdown />
   
  </> 
  
  );
}
 
export default Homepage ;