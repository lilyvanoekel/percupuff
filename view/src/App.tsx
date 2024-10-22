import { InlineBlock } from "./components/elements/InlineBlock";
import { Label } from "./components/elements/Label";
import { ParamKnob } from "./components/elements/ParamKnob";
import { InstrumentConfig } from "./components/instrument-config/InstrumentConfig";
import { InstrumentPicker } from "./components/InstrumentPicker";
import { Logo } from "./components/Logo";

function App() {
  return (
    <div className="background">
      <Logo />
      <InlineBlock>
        <InstrumentPicker />
      </InlineBlock>
      <InlineBlock style={{ textAlign: "center", marginLeft: "10px" }}>
        <div style={{ marginBottom: "6px" }}>
          <Label>Main Level</Label>
        </div>
        <ParamKnob param="mainLevel" width={90} height={115.5} />
      </InlineBlock>
      <InstrumentConfig />
    </div>
  );
}

export default App;
