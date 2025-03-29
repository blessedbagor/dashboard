'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({data}: {data: Product[] }) => {
    return <Carousel className='w-full mb-12' opts={{loop: true}}
    plugins={[
        Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
        })

    ]}>
        <CarouselContent>
            {data.map((product:Product) => (
                <CarouselItem key={product.id}>
                    <Link href={`/product/${product.slug}`}>
                    <div className="relative mx-auto">
                        <Image 
                        src={product.banner!} 
                        alt={product.name} 
                        width="0" 
                        height="0"
                        sizes='100vw' 
                        className='w-full h-auto rounded-md'/>
                    </div>
                    </Link>
                </CarouselItem>
            ))}
            </CarouselContent>
    </Carousel>;
}
 
export default ProductCarousel;