import { Digit } from "./components/elements/Digit";
import { Knob } from "./components/elements/Knob";
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
          <radialGradient id="knobGradient" cx="50%" cy="50%" r="90%">
            <stop offset="0%" stopColor="#333333" />
            <stop offset="100%" stopColor="#111111" />
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
        <Knob value={0} />
        <Knob value={20} />
        <Knob value={40} />
        <Knob value={60} />
        <Knob value={80} />
        <Knob value={100} />
      </div>
      <div style={{ display: "flex" }}>
        <Digit number={1} color="red" />
        <Digit number={2} color="green" />
        <Digit number={3} color="red" />
        <Digit number={4} color="green" />
        <Digit number={5} color="green" />
        <Digit number={8} color="green" />
      </div>
    </>
  );
}

export default App;
