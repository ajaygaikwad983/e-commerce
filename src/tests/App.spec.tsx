import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("App Component", () => {
  test("renders the home page by default", () => {
    render(<App />); // Remove the extra BrowserRouter wrapper

    expect(screen.getByText("Products")).toBeInTheDocument();
  });
});