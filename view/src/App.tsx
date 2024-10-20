import { InstrumentConfig } from "./components/InstrumentConfig";
import { InstrumentPicker } from "./components/InstrumentPicker";
import { Logo } from "./components/Logo";

function App() {
  return (
    <div>
      <Logo />
      <InstrumentPicker />
      <InstrumentConfig />
    </div>
  );
}

export default App;
