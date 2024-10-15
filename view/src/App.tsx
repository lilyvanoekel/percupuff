import { Digit } from "./components/elements/Digit";
import { KnobOld } from "./components/elements/Knob";
import { ParamKnob } from "./components/elements/ParamKnob";
import { Slider } from "./components/elements/Slider";

function App() {
  return (
    <>
      <svg width="0" height="0" viewBox="0 0 0 0">
        <defs>
          <g id="unit-h">
            <path d="M0 20 L20 40 L180 40 L200 20 L180 0 L20 0 Z"></path>
          </g>
          <g id="unit-v">
            <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
          </g>
          <radialGradient id="knobGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />{" "}
            <stop offset="40%" stopColor="rgba(255, 255, 255, 1)" />{" "}
            <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />{" "}
          </radialGradient>
          <linearGradient id="glassEffect" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id="glassGradient" cx="30%" cy="36%" r="70%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />{" "}
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.2)" />{" "}
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />{" "}
          </radialGradient>
        </defs>
      </svg>
      <div>Bello!</div>
      <Slider param="mainLevel" />
      <div style={{ display: "flex" }}>
        <KnobOld value={80} />
        {/* <Knob value={100} setValue={() => {}} />
        <Knob value={100} width={180} height={180} />
        <Knob value={100} width={60} height={60} /> */}
        <ParamKnob param="mainLevel" />
        <ParamKnob param="mainLevel" width={60} height={77} />
      </div>
      <div style={{ display: "flex" }}>
        <Digit number={1} color="red" width={160} height={240} />
        <Digit number={2} color="green" width={160} height={240} />
        <Digit number={3} color="red" width={160} height={240} />
        <Digit number={4} color="green" width={160} height={240} />
        <Digit number={5} color="green" width={160} height={240} />
        <Digit number={8} color="green" width={160} height={240} />
      </div>
    </>
  );
}

export default App;
