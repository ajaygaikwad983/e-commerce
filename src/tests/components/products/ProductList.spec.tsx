import { render, screen } from "@testing-library/react";
import { ProductList } from "@/components/products/ProductList";
import { CartProvider } from "@/context/CartContext";

describe("ProductList Component", () => {
  test("renders products in grid view", () => {
    const products = [
      { id: 1, title: "Product 1", price: 100, description: "Description 1", image: "image1.jpg" },
      { id: 2, title: "Product 2", price: 200, description: "Description 2", image: "image2.jpg" },
    ];

    render(
      <CartProvider>
        <ProductList products={products} isLoading={false} />
      </CartProvider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});