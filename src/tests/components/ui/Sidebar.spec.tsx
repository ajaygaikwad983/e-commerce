import { render, screen } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/Sidebar";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Sidebar Component", () => {
  test("renders sidebar content", () => {
    render(
      <SidebarProvider>
        <div>Sidebar Content</div>
      </SidebarProvider>
    );

    expect(screen.getByText("Sidebar Content")).toBeInTheDocument();
  });
});