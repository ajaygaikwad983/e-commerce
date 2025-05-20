import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { state } = useCart();

  return (
    <nav className="py-4 px-6 border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ShopEase with Rohan
        </Link>
        <Link to="/cart" aria-label="cart">
          <Button variant="ghost" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {state.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {state.itemCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
};
