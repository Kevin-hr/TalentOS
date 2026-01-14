import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RoleSelector } from "./RoleSelector";

describe("RoleSelector", () => {
  const onStart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<RoleSelector onStart={onStart} />);
  });

  it("should render the main slogan", () => {
    expect(screen.getByText("别找工作了，让工作来找你")).toBeInTheDocument();
  });

  it("should render feature titles", () => {
    expect(screen.getByText("开口，就是 Offer 面")).toBeInTheDocument();
    expect(screen.getByText("简历，秒过 HR")).toBeInTheDocument();
    expect(screen.getByText("薪资，必超期望")).toBeInTheDocument();
  });

  it("should call onStart when clicking CTA", () => {
    fireEvent.click(screen.getByText("立即开始"));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
