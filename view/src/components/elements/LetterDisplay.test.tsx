import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LetterDisplay } from "./LetterDisplay";
import { vi } from "vitest";

// Mock the SixteenSegment component since it's complex to test
vi.mock("./SixteenSegment", () => ({
  SixteenSegment: ({ character, color, width, height }: any) => (
    <div
      data-testid="segment"
      data-character={character}
      data-color={color}
      data-width={width}
      data-height={height}
    >
      {character}
    </div>
  ),
}));

describe("LetterDisplay component", () => {
  it("renders with correct number of lines and letters", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={5}
        numberOfLines={2}
        text={["HELLO", "WORLD"]}
        color="green"
      />
    );

    const segments = getAllByTestId("segment");
    expect(segments).toHaveLength(10); // 2 lines × 5 letters
  });

  it("displays text correctly", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={3}
        numberOfLines={1}
        text={["ABC"]}
        color="green"
      />
    );

    const segments = getAllByTestId("segment");
    expect(segments[0]).toHaveAttribute("data-character", "A");
    expect(segments[1]).toHaveAttribute("data-character", "B");
    expect(segments[2]).toHaveAttribute("data-character", "C");
  });

  it("pads with spaces for shorter text", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={5}
        numberOfLines={1}
        text={["HI"]}
        color="green"
      />
    );

    const segments = getAllByTestId("segment");
    expect(segments[0]).toHaveAttribute("data-character", "H");
    expect(segments[1]).toHaveAttribute("data-character", "I");
    expect(segments[2]).toHaveAttribute("data-character", " ");
    expect(segments[3]).toHaveAttribute("data-character", " ");
    expect(segments[4]).toHaveAttribute("data-character", " ");
  });

  it("handles empty text array", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={3}
        numberOfLines={2}
        text={[]}
        color="green"
      />
    );

    const segments = getAllByTestId("segment");
    expect(segments).toHaveLength(6); // 2 lines × 3 letters
    segments.forEach((segment) => {
      expect(segment).toHaveAttribute("data-character", " ");
    });
  });

  it("handles undefined text", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={3}
        numberOfLines={1}
        color="green"
      />
    );

    const segments = getAllByTestId("segment");
    expect(segments).toHaveLength(3);
    segments.forEach((segment) => {
      expect(segment).toHaveAttribute("data-character", " ");
    });
  });

  it("aligns text to the right", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={5}
        numberOfLines={1}
        text={["HI"]}
        color="green"
        align="right"
      />
    );

    const segments = getAllByTestId("segment");
    expect(segments[0]).toHaveAttribute("data-character", " ");
    expect(segments[1]).toHaveAttribute("data-character", " ");
    expect(segments[2]).toHaveAttribute("data-character", " ");
    expect(segments[3]).toHaveAttribute("data-character", "H");
    expect(segments[4]).toHaveAttribute("data-character", "I");
  });

  it("aligns text to the center", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={5}
        numberOfLines={1}
        text={["HI"]}
        color="green"
        align="center"
      />
    );

    const segments = getAllByTestId("segment");
    // For lineIndex 0 (even): Math.floor(3/2) = 1 space on left
    expect(segments[0]).toHaveAttribute("data-character", " ");
    expect(segments[1]).toHaveAttribute("data-character", "H");
    expect(segments[2]).toHaveAttribute("data-character", "I");
    expect(segments[3]).toHaveAttribute("data-character", " ");
    expect(segments[4]).toHaveAttribute("data-character", " ");
  });

  it("alternates center alignment for even/odd lines", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={5}
        numberOfLines={2}
        text={["HI", "OK"]}
        color="green"
        align="center"
      />
    );

    const segments = getAllByTestId("segment");
    // First line (index 0, even): Math.floor(3/2) = 1 space on left
    expect(segments[0]).toHaveAttribute("data-character", " ");
    expect(segments[1]).toHaveAttribute("data-character", "H");
    expect(segments[2]).toHaveAttribute("data-character", "I");
    expect(segments[3]).toHaveAttribute("data-character", " ");
    expect(segments[4]).toHaveAttribute("data-character", " ");

    // Second line (index 1, odd): Math.ceil(3/2) = 2 spaces on left
    expect(segments[5]).toHaveAttribute("data-character", " ");
    expect(segments[6]).toHaveAttribute("data-character", " ");
    expect(segments[7]).toHaveAttribute("data-character", "O");
    expect(segments[8]).toHaveAttribute("data-character", "K");
    expect(segments[9]).toHaveAttribute("data-character", " ");
  });

  it("passes correct props to SixteenSegment components", () => {
    const { getAllByTestId } = render(
      <LetterDisplay
        letterWidth={25}
        letterHeight={35}
        lineLength={2}
        numberOfLines={1}
        text={["AB"]}
        color="red"
      />
    );

    const segments = getAllByTestId("segment");
    segments.forEach((segment) => {
      expect(segment).toHaveAttribute("data-width", "25");
      expect(segment).toHaveAttribute("data-height", "35");
      expect(segment).toHaveAttribute("data-color", "red");
    });
  });

  it("applies custom style", () => {
    const customStyle = { margin: "10px" };
    const { container } = render(
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={2}
        numberOfLines={1}
        text={["AB"]}
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
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={2}
        numberOfLines={1}
        text={["AB"]}
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
      <LetterDisplay
        letterWidth={20}
        letterHeight={30}
        lineLength={2}
        numberOfLines={1}
        text={["AB"]}
        color="green"
      />
    );

    const glassElement = container.querySelector("div.glass");
    expect(glassElement).toBeInTheDocument();
    expect(glassElement).toHaveStyle("position: absolute");
  });
});
