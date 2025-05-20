
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types";

export const useProducts = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    products,
    isLoading,
    error,
  };
};
