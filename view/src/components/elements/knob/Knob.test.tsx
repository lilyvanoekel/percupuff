import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Knob } from "./Knob";

// Mock KnobDial to avoid SVG complexity
vi.mock("./KnobDial", () => ({
  KnobDial: ({ width, height }: any) => (
    <svg data-testid="knob-dial" width={width} height={height} />
  ),
}));

describe("Knob", () => {
  it("renders with default size and includes KnobDial and overlay svg", () => {
    const setValue = vi.fn();
    const { container, getByTestId } = render(
      <Knob value={50} setValue={setValue} />
    );

    // KnobDial present
    expect(getByTestId("knob-dial")).toBeInTheDocument();
    // Top-level container dimensions via inline style
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveStyle("width: 120px");
    expect(root).toHaveStyle("height: 120px");
    // Overlay circle exists
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("uses disabled fill when disabled", () => {
    const setValue = vi.fn();
    const { container } = render(<Knob value={10} setValue={setValue} disabled />);
    const circle = container.querySelector("circle");
    expect(circle).toHaveAttribute("fill", "black");
  });

  it("adopts provided width and height", () => {
    const setValue = vi.fn();
    const { container } = render(
      <Knob value={30} setValue={setValue} width={200} height={160} />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveStyle("width: 200px");
    expect(root).toHaveStyle("height: 160px");
  });

  it("updates value on mouse drag", () => {
    const setValue = vi.fn();
    const { container } = render(<Knob value={50} setValue={setValue} />);

    // Mousedown to start tracking at center
    const svgInteractive = container.querySelectorAll("svg")[1] as SVGElement;
    fireEvent.mouseDown(svgInteractive, { clientX: 100, clientY: 100 });

    // Move mouse upward/right to increase value
    fireEvent.mouseMove(window, { clientX: 130, clientY: 70 });

    expect(setValue).toHaveBeenCalled();
    // Should clamp between 0 and 100
    const lastCall = setValue.mock.calls[setValue.mock.calls.length - 1][0];
    expect(lastCall).toBeGreaterThanOrEqual(0);
    expect(lastCall).toBeLessThanOrEqual(100);

    // Mouseup stops dragging
    fireEvent.mouseUp(window);
  });

  it("updates value on touch drag", () => {
    const setValue = vi.fn();
    const { container } = render(<Knob value={40} setValue={setValue} />);

    const svgInteractive = container.querySelectorAll("svg")[1] as SVGElement;
    fireEvent.touchStart(svgInteractive, {
      touches: [{ clientX: 100, clientY: 100 }],
    } as any);

    fireEvent.touchMove(window, {
      touches: [{ clientX: 120, clientY: 80 }],
    } as any);

    expect(setValue).toHaveBeenCalled();
    const lastCall = setValue.mock.calls[setValue.mock.calls.length - 1][0];
    expect(lastCall).toBeGreaterThanOrEqual(0);
    expect(lastCall).toBeLessThanOrEqual(100);

    fireEvent.touchEnd(window);
  });
});


