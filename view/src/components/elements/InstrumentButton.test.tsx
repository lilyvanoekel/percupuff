import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { InstrumentButton } from "./InstrumentButton";
import { HSL } from "../../common/color/hsl";

describe("InstrumentButton component", () => {
  const mockColor = HSL(120, 50, 50);

  it("renders", () => {
    const { container } = render(<InstrumentButton color={mockColor} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <InstrumentButton color={mockColor} onClick={handleClick} />
    );

    const buttonElement = container.querySelector("div");
    fireEvent.click(buttonElement!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not throw error when clicked without onClick handler", () => {
    const { container } = render(<InstrumentButton color={mockColor} />);

    const buttonElement = container.querySelector("div");
    expect(() => {
      fireEvent.click(buttonElement!);
    }).not.toThrow();
  });

  it("applies custom style", () => {
    const customStyle = { margin: "10px" };
    const { container } = render(
      <InstrumentButton color={mockColor} style={customStyle} />
    );

    const buttonElement = container.querySelector("div");
    expect(buttonElement).toHaveStyle("margin: 10px");
  });

  it("shows different appearance when active", () => {
    const { container: inactiveContainer } = render(
      <InstrumentButton color={mockColor} active={false} />
    );
    const { container: activeContainer } = render(
      <InstrumentButton color={mockColor} active={true} />
    );

    // Active state should have additional visual elements
    const inactiveGlow = inactiveContainer.querySelector(
      "rect[style*='filter: blur(4px)']"
    );
    const activeGlow = activeContainer.querySelector(
      "rect[style*='filter: blur(4px)']"
    );

    expect(inactiveGlow).not.toBeInTheDocument();
    expect(activeGlow).toBeInTheDocument();
  });

  it("uses different colors when active vs inactive", () => {
    const { container: inactiveContainer } = render(
      <InstrumentButton color={mockColor} active={false} />
    );
    const { container: activeContainer } = render(
      <InstrumentButton color={mockColor} active={true} />
    );

    const inactiveColor = inactiveContainer.querySelector("rect[fill*='hsl']");
    const activeColor = activeContainer.querySelector("rect[fill*='hsl']");

    expect(inactiveColor).toHaveAttribute("fill", "hsl(120, 50%, 50%)");
    expect(activeColor).toHaveAttribute("fill", "hsl(120, 100%, 90%)");
  });
});
