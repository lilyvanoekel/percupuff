import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { KnobDial } from "./KnobDial";

describe("KnobDial", () => {
  it("renders the correct number of tick lines", () => {
    const { container } = render(<KnobDial width={120} height={120} />);
    const lines = container.querySelectorAll("line");
    expect(lines.length).toBe(21);
  });

  it("applies provided width and height", () => {
    const { container } = render(<KnobDial width={200} height={150} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "150");
  });
});


