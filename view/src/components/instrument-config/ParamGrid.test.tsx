import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { ParamGrid } from "./ParamGrid";

// Mock ParamKnob and LetterDisplay to simple outputs
vi.mock("../elements/ParamKnob", () => ({
  ParamKnob: ({ param }: any) => <div data-testid="param-knob" data-param={param} />,
}));

vi.mock("../elements/LetterDisplay", () => ({
  LetterDisplay: ({ text }: any) => (
    <div data-testid="letter-display">{Array.isArray(text) ? text.join(" ") : text}</div>
  ),
}));

// Mock store and params mapping
vi.mock("../../StoredStateStore", async (orig) => {
  const actual: any = await (orig as any).importActual?.("../../StoredStateStore");
  return {
    ...actual,
    useStoredStateStore: () => ({ storedState: { selectedInstrument: "kick1" } }),
  };
});

describe("ParamGrid", () => {
  it("renders static labels", () => {
    render(<ParamGrid />);
    expect(screen.getByText("Level")).toBeInTheDocument();
    expect(screen.getByText("Panning")).toBeInTheDocument();
    expect(screen.getByText("Velocity")).toBeInTheDocument();
  });

  it("renders ParamKnobs for standard params of selected instrument", () => {
    const { getAllByTestId } = render(<ParamGrid />);
    const knobs = getAllByTestId("param-knob");
    const params = knobs.map((k) => k.getAttribute("data-param"));
    expect(params).toContain("kick1Level");
    expect(params).toContain("kick1Panning");
    expect(params).toContain("kick1Velocity");
  });

  it("renders custom parameter labels and knobs if defined", () => {
    const { getAllByTestId } = render(<ParamGrid />);
    const labels = getAllByTestId("letter-display");
    // From params.ts: kick1 custom name lines: ["", "DECAY"]
    expect(labels[0]).toHaveTextContent("DECAY");

    const knobs = getAllByTestId("param-knob");
    const params = knobs.map((k) => k.getAttribute("data-param"));
    expect(params).toContain("kick1Decay");
  });
});


