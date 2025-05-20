
import { CartItem as CartItemType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="overflow-hidden flex items-center justify-center p-4 bg-gray-50">
            <img
              src={item.image}
              alt={item.title}
              className="object-contain h-32 w-auto max-w-full"
            />
          </div>

          <div className="md:col-span-3 p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-xl font-semibold text-primary mt-2">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between mt-4 gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="flex items-center gap-1"
              >
                <Trash className="h-4 w-4" />
                Remove
              </Button>

              <div className="flex items-center border rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecrement}
                  className="h-10 px-3"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleIncrement}
                  className="h-10 px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
