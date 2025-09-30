import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { NameDisplay } from "./NameDisplay";

// Mock the LetterDisplay to avoid complex SVG rendering
vi.mock("../elements/LetterDisplay", () => ({
  LetterDisplay: ({ text }: any) => (
    <div data-testid="letter-display">{Array.isArray(text) ? text.join(" ") : text}</div>
  ),
}));

// Mock the Button to a native button for easy interaction
vi.mock("../elements/Button", () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick} data-testid="mock-button">{children}</button>
  ),
}));

// Mock the store to control selected instrument and handlers
const setPreviousInstrument = vi.fn();
const setNextInstrument = vi.fn();

vi.mock("../../StoredStateStore", async (orig) => {
  const actual: any = await (orig as any).importActual?.("../../StoredStateStore");
  return {
    ...actual,
    useStoredStateStore: () => ({
      storedState: { selectedInstrument: "kick1" },
      setPreviousInstrument,
      setNextInstrument,
    }),
  };
});

describe("NameDisplay", () => {
  beforeEach(() => {
    setPreviousInstrument.mockClear();
    setNextInstrument.mockClear();
  });

  it("renders label and instrument name", () => {
    render(<NameDisplay />);
    expect(screen.getByText("Selected Sound")).toBeInTheDocument();
    // From params: kick1 -> "Acoustic Kick" -> uppercased
    expect(screen.getByTestId("letter-display")).toHaveTextContent("ACOUSTIC KICK");
  });

  it("invokes previous/next handlers on clicks", () => {
    render(<NameDisplay />);
    const buttons = screen.getAllByTestId("mock-button");
    // First button is previous, second is next
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(setPreviousInstrument).toHaveBeenCalledTimes(1);
    expect(setNextInstrument).toHaveBeenCalledTimes(1);
  });
});


