import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import {
  StoredStateStoreProvider,
  useStoredStateStore,
} from "./StoredStateStore";
import { ParamStoreProvider } from "./ParamStore";
import { instrumentKeys } from "./params";

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <StoredStateStoreProvider>
      <ParamStoreProvider>{component}</ParamStoreProvider>
    </StoredStateStoreProvider>
  );
};

describe("App component", () => {
  test("renders Output Level label", () => {
    renderWithProvider(<App />);
    const labelElement = screen.getByText(/Output Level/i);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders InstrumentPicker component", () => {
    renderWithProvider(<App />);
    const instrumentPicker = screen.getByText("🐮");
    expect(instrumentPicker).toBeInTheDocument();
  });

  test("handles keyboard arrow keys to change instrument", () => {
    let currentInstrument = "";

    const TestComponent = () => {
      const { storedState } = useStoredStateStore();
      currentInstrument = storedState.selectedInstrument;
      return null;
    };

    renderWithProvider(
      <>
        <App />
        <TestComponent />
      </>
    );

    // Initially should be first instrument
    expect(currentInstrument).toBe(instrumentKeys[0]);

    // Press ArrowRight - should change to next instrument
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(currentInstrument).toBe(instrumentKeys[1]);

    // Press ArrowLeft - should change back to first instrument
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(currentInstrument).toBe(instrumentKeys[0]);
  });
});
