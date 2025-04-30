import { useEffect, useRef } from "react";
import { InlineBlock } from "./components/elements/InlineBlock";
import { Label } from "./components/elements/Label";
import { ParamKnob } from "./components/elements/ParamKnob";
import { InstrumentConfig } from "./components/instrument-config/InstrumentConfig";
import { InstrumentPicker } from "./components/InstrumentPicker";
import { Logo } from "./components/Logo";
import { useStoredStateStore } from "./StoredStateStore";

function App() {
  const { setPreviousInstrument, setNextInstrument } = useStoredStateStore();
  const setPreviousInstrumentRef = useRef(setPreviousInstrument);
  const setNextInstrumentRef = useRef(setNextInstrument);

  useEffect(() => {
    setPreviousInstrumentRef.current = setPreviousInstrument;
    setNextInstrumentRef.current = setNextInstrument;
  }, [setPreviousInstrument, setNextInstrument]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;

      e.preventDefault();
      if (e.key === "ArrowLeft") setPreviousInstrumentRef.current();
      if (e.key === "ArrowRight") setNextInstrumentRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="background">
      <Logo />
      <div
        className="ridge"
        style={{ marginTop: "-1px", marginBottom: "8px" }}
      ></div>
      <InlineBlock
        style={{
          textAlign: "center",
          marginLeft: "15px",
          marginRight: "15px",
          marginTop: "12.5px",
        }}
      >
        <div style={{ marginBottom: "6px" }}>
          <Label>Output Level</Label>
        </div>
        <ParamKnob param="mainLevel" width={90} height={115.5} />
      </InlineBlock>
      <InlineBlock>
        <InstrumentPicker />
      </InlineBlock>
      <div
        className="ridge"
        style={{ marginTop: "4px", marginBottom: "8px" }}
      ></div>
      <InstrumentConfig />
    </div>
  );
}

export default App;
