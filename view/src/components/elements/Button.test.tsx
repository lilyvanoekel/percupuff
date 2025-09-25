import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Button } from "./Button";
import { HSL } from "../../common/color/hsl";

describe("Button component", () => {
  const mockGlowColor = HSL(120, 50, 50);

  it("renders children", () => {
    render(
      <Button glowColor={mockGlowColor}>
        <span>Test Button</span>
      </Button>
    );

    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Button glowColor={mockGlowColor} onClick={handleClick}>
        <span>Click me</span>
      </Button>
    );

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not throw error when clicked without onClick handler", () => {
    render(
      <Button glowColor={mockGlowColor}>
        <span>Click me</span>
      </Button>
    );

    expect(() => {
      fireEvent.click(screen.getByText("Click me"));
    }).not.toThrow();
  });

  it("applies custom dimensions", () => {
    const { container } = render(
      <Button glowColor={mockGlowColor} width={100} height={120}>
        <span>Test</span>
      </Button>
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "100");
    expect(svg).toHaveAttribute("height", "120");
  });

  it("applies custom style", () => {
    const customStyle = { margin: "10px" };
    const { container } = render(
      <Button glowColor={mockGlowColor} style={customStyle}>
        <span>Test</span>
      </Button>
    );

    const buttonElement = container.querySelector(
      "div[style*='display: inline-block']"
    );
    expect(buttonElement).toHaveStyle("margin: 10px");
  });

  it("applies pulse class when provided", () => {
    const { container } = render(
      <Button glowColor={mockGlowColor} pulseClass="pulse-animation">
        <span>Test</span>
      </Button>
    );

    const glowElement = container.querySelector("rect[fill*='hsl']");
    expect(glowElement).toHaveClass("pulse-animation");
  });

  it("uses the provided glow color", () => {
    const customColor = HSL(200, 75, 60);
    const { container } = render(
      <Button glowColor={customColor}>
        <span>Test</span>
      </Button>
    );

    const glowElement = container.querySelector("rect[fill*='hsl']");
    expect(glowElement).toHaveAttribute("fill", "hsl(200, 75%, 60%)");
  });
});
