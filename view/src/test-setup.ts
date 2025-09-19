import "@testing-library/jest-dom";

// Polyfill for URL.createObjectURL in jsdom
if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = () => "mock-object-url";
}
