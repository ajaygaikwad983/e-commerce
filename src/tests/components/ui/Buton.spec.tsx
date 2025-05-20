import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest"; //
import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  test("renders the button with text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});