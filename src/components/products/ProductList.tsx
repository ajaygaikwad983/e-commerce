
import { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ViewToggle } from "./ViewToggle";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
}) => {
  const [view, setView] = useState<"grid" | "list">("grid");

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <ViewToggle view={view} setView={setView} />
        </div>
        <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-24 rounded" />
              <Skeleton className="h-10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <ViewToggle view={view} setView={setView} />
      </div>
      <div className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} view={view} />
        ))}
      </div>
    </div>
  );
};
