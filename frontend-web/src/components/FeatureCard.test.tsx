import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeatureCard } from "./FeatureCard";
import { Zap } from "lucide-react";

describe("FeatureCard", () => {
  it("should render the title, description, and icon", () => {
    const props = {
      icon: Zap,
      title: "Test Title",
      description: "Test Description",
      color: "#FFFFFF",
    };

    render(<FeatureCard {...props} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    const iconWrapper = screen
      .getByText("Test Title")
      .closest(".group")
      ?.querySelector(".w-10.h-10");
    expect(iconWrapper).toBeInTheDocument();
  });
});
