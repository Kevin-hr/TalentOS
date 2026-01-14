import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App", () => {
  it("renders the role selector when no role is set", () => {
    render(<App />);
    expect(screen.getByText("立即开始")).toBeInTheDocument();
  });
});
