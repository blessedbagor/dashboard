import ProductForm from '@/components/shared/admin/product-form';
import { getProductById } from '@/lib/actions/product.actions';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Update Product',
};

const AdminProductUpdatePage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();
 

  // Transform the product to match the expected type
  const transformedProduct = {
    ...product,
    rating: Number(product.rating), // Convert `rating` to a number
  };
  console.log(transformedProduct);
  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h1 className='h2-bold'>Update Product</h1>

      <ProductForm type='Update' product={transformedProduct} productId={product.id} />
    </div>
  );
};

export default AdminProductUpdatePage;