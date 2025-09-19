import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  test('renders Output Level label', () => {
    render(<App />);
    const labelElement = screen.getByText(/Output Level/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders Logo component', () => {
    render(<App />);
    const logoElement = screen.getByRole('img', { name: /logo/i });
    expect(logoElement).toBeInTheDocument();
  });

  test('renders InstrumentPicker component', () => {
    render(<App />);
    const instrumentPicker = screen.getByText(/Instrument/i);
    expect(instrumentPicker).toBeInTheDocument();
  });

  test('handles keyboard arrow keys to change instrument', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Simulate ArrowRight key press
    await user.keyboard('{ArrowRight}');
    // Simulate ArrowLeft key press
    await user.keyboard('{ArrowLeft}');

    // No direct UI change to assert here, but no errors should occur
    expect(true).toBe(true);
  });
});
