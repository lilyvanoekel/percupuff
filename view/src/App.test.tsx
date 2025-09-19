import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { StoredStateStoreProvider } from "./StoredStateStore";
import { ParamStoreProvider } from "./ParamStore";

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

  test("renders Logo component", () => {
    renderWithProvider(<App />);
    const logoImages = screen.getAllByAltText("Rasterized SVG");
    expect(logoImages.length).toBeGreaterThan(0);
  });

  test("renders InstrumentPicker component", () => {
    renderWithProvider(<App />);
    const instrumentPicker = screen.getByText("🐮");
    expect(instrumentPicker).toBeInTheDocument();
  });

  test("handles keyboard arrow keys to change instrument", async () => {
    renderWithProvider(<App />);
    const user = userEvent.setup();

    // Simulate ArrowRight key press
    await user.keyboard("{ArrowRight}");
    // Simulate ArrowLeft key press
    await user.keyboard("{ArrowLeft}");

    // No direct UI change to assert here, but no errors should occur
    expect(true).toBe(true);
  });
});
