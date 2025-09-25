import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DigitDisplay } from "./DigitDisplay";
import { vi } from "vitest";

// Mock the Digit component since it's complex to test
vi.mock("./Digit", () => ({
  Digit: ({ number, color, width, height }: any) => (
    <div
      data-testid="digit"
      data-number={number === undefined ? "undefined" : number}
      data-color={color}
      data-width={width}
      data-height={height}
    >
      {number ?? "dash"}
    </div>
  ),
}));

describe("DigitDisplay component", () => {
  it("renders with correct number of digit slots", () => {
    const { getAllByTestId } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={4}
        number={123}
        color="green"
      />
    );

    const digits = getAllByTestId("digit");
    expect(digits).toHaveLength(4);
  });

  it("displays the last X digits of a number", () => {
    const { getAllByTestId } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={3}
        number={12345}
        color="green"
      />
    );

    const digits = getAllByTestId("digit");
    expect(digits[0]).toHaveAttribute("data-number", "3");
    expect(digits[1]).toHaveAttribute("data-number", "4");
    expect(digits[2]).toHaveAttribute("data-number", "5");
  });

  it("pads with undefined for shorter numbers", () => {
    const { getAllByTestId } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={4}
        number={12}
        color="green"
      />
    );

    const digits = getAllByTestId("digit");
    expect(digits[0]).toHaveAttribute("data-number", "undefined");
    expect(digits[1]).toHaveAttribute("data-number", "undefined");
    expect(digits[2]).toHaveAttribute("data-number", "1");
    expect(digits[3]).toHaveAttribute("data-number", "2");
  });

  it("handles single digit numbers", () => {
    const { getAllByTestId } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={3}
        number={7}
        color="green"
      />
    );

    const digits = getAllByTestId("digit");
    expect(digits[0]).toHaveAttribute("data-number", "undefined");
    expect(digits[1]).toHaveAttribute("data-number", "undefined");
    expect(digits[2]).toHaveAttribute("data-number", "7");
  });

  it("handles zero", () => {
    const { getAllByTestId } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={2}
        number={0}
        color="green"
      />
    );

    const digits = getAllByTestId("digit");
    expect(digits[0]).toHaveAttribute("data-number", "undefined");
    expect(digits[1]).toHaveAttribute("data-number", "0");
  });

  it("passes correct props to Digit components", () => {
    const { getAllByTestId } = render(
      <DigitDisplay
        digitWidth={25}
        digitHeight={35}
        lineLength={2}
        number={42}
        color="red"
      />
    );

    const digits = getAllByTestId("digit");
    digits.forEach((digit) => {
      expect(digit).toHaveAttribute("data-width", "25");
      expect(digit).toHaveAttribute("data-height", "35");
      expect(digit).toHaveAttribute("data-color", "red");
    });
  });

  it("applies custom style", () => {
    const customStyle = { margin: "10px" };
    const { container } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={2}
        number={12}
        color="green"
        style={customStyle}
      />
    );

    const displayElement = container.querySelector(
      "div[style*='display: inline-block']"
    );
    expect(displayElement).toHaveStyle("margin: 10px");
  });

  it("applies default styling", () => {
    const { container } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={2}
        number={12}
        color="green"
      />
    );

    const displayElement = container.querySelector(
      "div[style*='display: inline-block']"
    );
    expect(displayElement).toHaveStyle("background: #222222");
    expect(displayElement).toHaveStyle("border: 1px solid #333333");
    expect(displayElement).toHaveStyle("line-height: 0");
  });

  it("renders glass overlay", () => {
    const { container } = render(
      <DigitDisplay
        digitWidth={20}
        digitHeight={30}
        lineLength={2}
        number={12}
        color="green"
      />
    );

    const glassElement = container.querySelector("div.glass");
    expect(glassElement).toBeInTheDocument();
    expect(glassElement).toHaveStyle("position: absolute");
  });
});
