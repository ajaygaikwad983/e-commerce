import { cn } from "@/lib/utils"; // Corrected path

describe("Utility Functions", () => {
  test("merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
    expect(cn("class1", false)).toBe("class1");
  });
});