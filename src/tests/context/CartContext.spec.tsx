import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

describe("CartContext", () => {
  test("adds an item to the cart", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, title: "Test Product", price: 10 });
    });

    expect(result.current.state.itemCount).toBe(1);
    expect(result.current.state.total).toBe(10);
  });
});