import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DigitSvg } from "./Digit";

describe("DigitSvg component", () => {
  it("renders with default props", () => {
    const { container } = render(<DigitSvg color="green" />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "160");
    expect(svg).toHaveAttribute("height", "240");
  });

  it("renders with custom dimensions", () => {
    const { container } = render(
      <DigitSvg color="red" width={200} height={300} />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "300");
  });

  it("renders all 7 segments", () => {
    const { container } = render(<DigitSvg color="green" number={8} />);

    // Should have 7 segments (a, b, c, d, e, f, g)
    const segments = container.querySelectorAll("use");
    expect(segments).toHaveLength(7);
  });

  it("shows all segments active for number 8", () => {
    const { container } = render(<DigitSvg color="green" number={8} />);

    const segments = container.querySelectorAll("use");
    segments.forEach((segment) => {
      expect(segment).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    });
  });

  it("shows correct segments for number 0", () => {
    const { container } = render(<DigitSvg color="green" number={0} />);

    // Number 0 should have segments: a, b, c, d, e, f (not g)
    const segmentG = container.querySelector("use.segment.g");
    expect(segmentG).toHaveStyle("fill: #444444"); // inactive
  });

  it("shows correct segments for number 1", () => {
    const { container } = render(<DigitSvg color="green" number={1} />);

    // Number 1 should only have segments b and c active
    const segmentB = container.querySelector("use.segment.b");
    const segmentC = container.querySelector("use.segment.c");
    const segmentA = container.querySelector("use.segment.a");

    expect(segmentB).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    expect(segmentC).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    expect(segmentA).toHaveStyle("fill: #444444"); // inactive
  });

  it("shows correct segments for number 7", () => {
    const { container } = render(<DigitSvg color="green" number={7} />);

    // Number 7 should have segments a, b, c active
    const segmentA = container.querySelector("use.segment.a");
    const segmentB = container.querySelector("use.segment.b");
    const segmentC = container.querySelector("use.segment.c");
    const segmentD = container.querySelector("use.segment.d");

    expect(segmentA).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    expect(segmentB).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    expect(segmentC).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    expect(segmentD).toHaveStyle("fill: #444444"); // inactive
  });

  it("uses red color when color prop is red", () => {
    const { container } = render(<DigitSvg color="red" number={8} />);

    const segments = container.querySelectorAll("use");
    segments.forEach((segment) => {
      expect(segment).toHaveStyle("fill: rgba(255, 50, 50, 1)");
    });
  });

  it("uses green color when color prop is green", () => {
    const { container } = render(<DigitSvg color="green" number={8} />);

    const segments = container.querySelectorAll("use");
    segments.forEach((segment) => {
      expect(segment).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    });
  });

  it("shows dash pattern for number -2", () => {
    const { container } = render(<DigitSvg color="green" number={-2} />);

    // Dash should only have segment g active
    const segmentG = container.querySelector("use.segment.g");
    const segmentA = container.querySelector("use.segment.a");

    expect(segmentG).toHaveStyle("fill: rgba(0, 230, 0, 1)");
    expect(segmentA).toHaveStyle("fill: #444444"); // inactive
  });

  it("shows all segments inactive for invalid number", () => {
    const { container } = render(<DigitSvg color="green" number={-1} />);

    const segments = container.querySelectorAll("use");
    segments.forEach((segment) => {
      expect(segment).toHaveStyle("fill: #444444");
    });
  });

  it("has correct segment class names", () => {
    const { container } = render(<DigitSvg color="green" number={8} />);

    expect(container.querySelector("use.segment.a")).toBeInTheDocument();
    expect(container.querySelector("use.segment.b")).toBeInTheDocument();
    expect(container.querySelector("use.segment.c")).toBeInTheDocument();
    expect(container.querySelector("use.segment.d")).toBeInTheDocument();
    expect(container.querySelector("use.segment.e")).toBeInTheDocument();
    expect(container.querySelector("use.segment.f")).toBeInTheDocument();
    expect(container.querySelector("use.segment.g")).toBeInTheDocument();
  });
});
