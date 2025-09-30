import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InstrumentConfig } from "./InstrumentConfig";

// Mock children to simple markers
vi.mock("../elements/InlineBlock", () => ({
  InlineBlock: ({ children }: any) => <div data-testid="inline-block">{children}</div>,
}));

vi.mock("./NameDisplay", () => ({
  NameDisplay: () => <div data-testid="name-display" />,
}));

vi.mock("./MidiAssignment", () => ({
  MidiAssignment: () => <div data-testid="midi-assignment" />,
}));

vi.mock("./ParamGrid", () => ({
  ParamGrid: () => <div data-testid="param-grid" />,
}));

describe("InstrumentConfig", () => {
  it("renders composed parts", () => {
    render(<InstrumentConfig />);
    expect(screen.getByTestId("name-display")).toBeInTheDocument();
    expect(screen.getByTestId("midi-assignment")).toBeInTheDocument();
    expect(screen.getByTestId("param-grid")).toBeInTheDocument();
    // InlineBlock wrappers exist
    const wrappers = screen.getAllByTestId("inline-block");
    expect(wrappers.length).toBeGreaterThanOrEqual(2);
  });
});


