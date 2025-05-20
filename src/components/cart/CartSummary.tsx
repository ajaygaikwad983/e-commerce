
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export const CartSummary = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    // This would be integrated with a payment processor in a real app
    alert("Checkout functionality would be implemented here");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Items ({state.itemCount}):</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total:</span>
            <span>${state.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
        {state.items.length > 0 && (
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-700"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
