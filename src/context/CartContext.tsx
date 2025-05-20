import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "@/components/ui/sonner";

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

// Define the actions that can be performed on the cart
type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

// Define the shape of the context
interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Create the initial state
const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a reducer to handle the cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update the quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + 1,
          total: state.total + action.payload.price,
        };
      } else {
        // If the item doesn't exist, add it with quantity 1
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          itemCount: state.itemCount + 1,
          total: state.total + action.payload.price,
        };
      }
    }
    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!itemToRemove) return state;

      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        items: filteredItems,
        itemCount: state.itemCount - itemToRemove.quantity,
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    }
    case "UPDATE_QUANTITY": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex === -1) return state;

      const item = state.items[existingItemIndex];
      const quantityDifference = action.payload.quantity - item.quantity;

      if (action.payload.quantity <= 0) {
        // If the quantity is 0 or less, remove the item
        const filteredItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        return {
          ...state,
          items: filteredItems,
          itemCount: state.itemCount - item.quantity,
          total: state.total - item.price * item.quantity,
        };
      }

      // Otherwise update the quantity
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: action.payload.quantity,
      };

      return {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount + quantityDifference,
        total: state.total + item.price * quantityDifference,
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

// Create a provider component to wrap the app with
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast(`Added ${product.title.substring(0, 20)}... to cart`);
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    toast("Item removed from cart");
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
