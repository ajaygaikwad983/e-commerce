
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  view: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, view }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card
      className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md ${
        view === "list" ? "grid grid-cols-1 md:grid-cols-4 gap-4" : ""
      }`}
    >
      <div
        className={`${
          view === "list" ? "md:col-span-1" : ""
        } overflow-hidden flex items-center justify-center p-4 bg-gray-50`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-48 w-auto max-w-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div
        className={`flex flex-col flex-1 ${
          view === "list" ? "md:col-span-3" : ""
        }`}
      >
        <CardHeader className="p-4 pb-0">
          <h3 className="text-lg font-medium leading-tight">
            {truncateText(product.title, view === "grid" ? 40 : 80)}
          </h3>
          <p className="text-xl font-semibold text-primary mt-2">
            ${product.price.toFixed(2)}
          </p>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-1">
          <p className="text-gray-600 text-sm">
            {truncateText(product.description, view === "grid" ? 100 : 200)}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant="default"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
