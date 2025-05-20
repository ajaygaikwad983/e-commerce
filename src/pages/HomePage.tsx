
import { ProductList } from "@/components/products/ProductList";
import { useProducts } from "@/hooks/useProducts";

const HomePage = () => {
  const { products, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading products</h2>
        <p className="mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div>
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
