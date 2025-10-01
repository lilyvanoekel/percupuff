import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { MidiAssignment } from "./MidiAssignment";

// Mock Button and DigitDisplay for simplicity
vi.mock("../elements/Button", () => ({
  Button: ({ onClick, children, pulseClass }: any) => (
    <button onClick={onClick} data-testid={`btn-${pulseClass || "nopulse"}`}>{children}</button>
  ),
}));

vi.mock("../elements/DigitDisplay", () => ({
  DigitDisplay: ({ number }: any) => <div data-testid="digit-display">{number}</div>,
}));

// Mock stores
const updateParam = vi.fn();
vi.mock("../../ParamStore", async (orig) => {
  const actual: any = await (orig as any).importActual?.("../../ParamStore");
  return {
    ...actual,
    useParamStore: () => ({
      paramState: { kick1Midi: 60 },
      updateParam,
    }),
  };
});

vi.mock("../../StoredStateStore", async (orig) => {
  const actual: any = await (orig as any).importActual?.("../../StoredStateStore");
  return {
    ...actual,
    useStoredStateStore: () => ({
      storedState: { selectedInstrument: "kick1" },
    }),
  };
});

// Mock MIDI helpers and patch connection
const addEndpointListener = vi.fn();
const removeEndpointListener = vi.fn();
vi.mock("../../common/patchConnection", () => ({
  getPatchConnection: () => ({ addEndpointListener, removeEndpointListener }),
}));

const playMidiNote = vi.fn();
vi.mock("../../common/midi", () => ({ playMidiNote: (...args: any[]) => playMidiNote(...args) }));

describe("MidiAssignment", () => {
  beforeEach(() => {
    updateParam.mockClear();
    addEndpointListener.mockClear();
    removeEndpointListener.mockClear();
    playMidiNote.mockClear();
  });

  it("renders label and current MIDI value", () => {
    render(<MidiAssignment />);
    expect(screen.getByText("Midi Assignment")).toBeInTheDocument();
    expect(screen.getByTestId("digit-display")).toHaveTextContent("60");
  });

  it("subscribes to noteOn and updates value when recording", () => {
    render(<MidiAssignment />);

    // Click the record button (first button rendered)
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    // Simulate incoming noteOn event using the latest subscribed handler
    const noteOnCalls = addEndpointListener.mock.calls.filter((c) => c[0] === "noteOn");
    const noteOnHandler = noteOnCalls[noteOnCalls.length - 1]?.[1];
    expect(noteOnHandler).toBeInstanceOf(Function);
    noteOnHandler?.({ pitch: 64 });
    expect(updateParam).toHaveBeenCalledWith("kick1Midi", 64);
  });

  it("does not update when not recording", () => {
    render(<MidiAssignment />);
    const noteOnHandler = addEndpointListener.mock.calls.find(
      (c) => c[0] === "noteOn"
    )?.[1];
    noteOnHandler?.({ pitch: 70 });
    expect(updateParam).not.toHaveBeenCalled();
  });

  it("plays note on play button click", () => {
    render(<MidiAssignment />);
    const buttons = screen.getAllByRole("button");
    // Second button is play
    fireEvent.click(buttons[1]);
    expect(playMidiNote).toHaveBeenCalled();
  });
});


